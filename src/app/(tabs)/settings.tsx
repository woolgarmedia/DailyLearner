import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import type { PermissionStatus } from 'expo-notifications';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { T } from '@/components/Typography';
import { Palette, Spacing } from '@/constants/theme';
import {
  formatTime,
  getPermissionStatus,
  scheduleDailyReminder,
  sendTestNotification,
} from '@/lib/notifications';
import { useSettings } from '@/store/settings';

export default function SettingsScreen() {
  const { state, loaded, set } = useSettings();
  const [permission, setPermission] = useState<PermissionStatus | 'unknown'>('unknown');
  const [showPicker, setShowPicker] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getPermissionStatus()
      .then((s) => setPermission(s))
      .catch(() => setPermission('unknown'));
  }, []);

  const onToggle = async (next: boolean) => {
    setBusy(true);
    try {
      const updated = await set({ enabled: next });
      const result = await scheduleDailyReminder(updated);
      if (!result.ok) {
        Alert.alert(
          'Notifications need permission',
          'Enable notifications for Daily Learner in your phone’s Settings → Apps → Daily Learner → Notifications.',
        );
        await set({ enabled: false });
      } else {
        const perm = await getPermissionStatus();
        setPermission(perm);
      }
    } finally {
      setBusy(false);
    }
  };

  const onTimeChange = async (_event: unknown, selected?: Date) => {
    if (Platform.OS !== 'ios') setShowPicker(false);
    if (!selected) return;
    const hour = selected.getHours();
    const minute = selected.getMinutes();
    const updated = await set({ hour, minute });
    if (updated.enabled) await scheduleDailyReminder(updated);
  };

  const onSendTest = async () => {
    setBusy(true);
    try {
      const result = await sendTestNotification();
      if (!result.ok) {
        Alert.alert(
          'Cannot send test',
          'Notifications permission is not granted. Enable it in your phone’s settings.',
        );
      } else {
        Alert.alert('Test scheduled', 'You should see a notification in about 3 seconds.');
      }
    } finally {
      setBusy(false);
    }
  };

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: Palette.cream }} />;
  }

  const now = new Date();
  now.setHours(state.hour, state.minute, 0, 0);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Palette.cream }}
      contentContainerStyle={{ padding: Spacing.four, paddingBottom: Spacing.seven }}>
      <T variant="label" color={Palette.muted}>
        Settings
      </T>
      <T variant="h1" style={{ marginTop: 8 }}>
        Daily Reminder
      </T>
      <T variant="small" style={{ marginTop: 8, marginBottom: Spacing.four }}>
        One notification per day at a time you choose. Content updates to show today’s lesson and deliverable.
      </T>

      <Card style={{ padding: Spacing.three }}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <T variant="h3">Enable daily reminder</T>
            <T variant="small" style={{ marginTop: 4 }}>
              {state.enabled
                ? `Scheduled for ${formatTime(state.hour, state.minute)} every day`
                : 'Off'}
            </T>
          </View>
          <Switch
            value={state.enabled}
            onValueChange={onToggle}
            disabled={busy}
            trackColor={{ false: Palette.border, true: Palette.accent }}
            thumbColor={Palette.cream}
          />
        </View>
      </Card>

      <Card style={{ padding: Spacing.three, marginTop: Spacing.three }}>
        <T variant="h3">Reminder time</T>
        <T variant="small" style={{ marginTop: 4, marginBottom: 14 }}>
          Tap to change. The schedule updates immediately.
        </T>
        <Pressable
          onPress={() => setShowPicker(true)}
          style={({ pressed }) => [
            styles.timeBlock,
            pressed && { backgroundColor: Palette.cardAlt },
          ]}>
          <T variant="hero" style={{ color: Palette.dark, fontSize: 44, lineHeight: 48 }}>
            {formatTime(state.hour, state.minute)}
          </T>
        </Pressable>
        {showPicker ? (
          <DateTimePicker
            value={now}
            mode="time"
            display="default"
            is24Hour
            onChange={onTimeChange}
          />
        ) : null}
      </Card>

      <View style={{ marginTop: Spacing.four, gap: 10 }}>
        <Button label="Send test notification" variant="secondary" onPress={onSendTest} />
        <T variant="small" style={{ textAlign: 'center' }}>
          Fires in ~3 seconds with your current day’s content.
        </T>
      </View>

      <View style={styles.permRow}>
        <T variant="label" color={Palette.muted}>
          Permission status
        </T>
        <T
          variant="mono"
          color={
            permission === 'granted'
              ? Palette.success
              : permission === 'denied'
                ? Palette.error
                : Palette.muted
          }>
          {permission}
        </T>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  timeBlock: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    backgroundColor: Palette.cardAlt,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Palette.border,
    alignItems: 'center',
  },
  permRow: {
    marginTop: Spacing.five,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: Palette.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
