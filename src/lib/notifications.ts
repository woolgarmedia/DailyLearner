import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { PLAN } from '@/data/plan';
import { topicById } from '@/data/topics';
import { progressStore } from '@/store/progress';
import { settingsStore, type NotificationSettings } from '@/store/settings';

const CHANNEL_ID = 'daily-reminders';

// Foreground behaviour: show banner + sound, no badge (SDK 53+ API)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: 'Daily reminders',
    description: 'A daily nudge to do your learning session.',
    importance: Notifications.AndroidImportance.HIGH,
    lightColor: '#B85C2A',
    enableVibrate: true,
  });
}

export async function getPermissionStatus(): Promise<Notifications.PermissionStatus> {
  const { status } = await Notifications.getPermissionsAsync();
  return status;
}

export async function ensurePermission(): Promise<boolean> {
  const existing = await Notifications.getPermissionsAsync();
  if (existing.status === 'granted') return true;
  if (!existing.canAskAgain) return false;
  const result = await Notifications.requestPermissionsAsync();
  return result.status === 'granted';
}

function buildContent(): { title: string; body: string } {
  const currentDay = progressStore.getState().currentDay;
  const planDay = PLAN.find((d) => d.day === currentDay);
  if (!planDay) {
    return {
      title: 'Daily Learner',
      body: 'Time for today’s session — open the app and pick up where you left off.',
    };
  }
  const topic = planDay.topicId ? topicById(planDay.topicId) : null;
  const totalMinutes = planDay.blocks.reduce((s, b) => s + b.minutes, 0);
  const subtitle = topic ? `${topic.icon} ${topic.title}` : planDay.title;
  return {
    title: `Day ${planDay.day} — ${planDay.title}`,
    body: `~${totalMinutes} min · ${subtitle}`,
  };
}

export async function cancelAllReminders(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function scheduleDailyReminder(
  settings?: NotificationSettings,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const s = settings ?? settingsStore.getState();
  await cancelAllReminders();
  if (!s.enabled) return { ok: true };

  const granted = await ensurePermission();
  if (!granted) {
    // Roll back enabled state if user denied
    await settingsStore.set({ enabled: false });
    return { ok: false, reason: 'permission-denied' };
  }

  await ensureAndroidChannel();
  const { title, body } = buildContent();

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: s.hour,
      minute: s.minute,
    },
  });

  return { ok: true };
}

export async function sendTestNotification(): Promise<{ ok: true } | { ok: false; reason: string }> {
  const granted = await ensurePermission();
  if (!granted) return { ok: false, reason: 'permission-denied' };
  await ensureAndroidChannel();
  const { title, body } = buildContent();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `🔔 Test · ${title}`,
      body,
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 3,
    },
  });
  return { ok: true };
}

export function formatTime(hour: number, minute: number): string {
  const h = hour.toString().padStart(2, '0');
  const m = minute.toString().padStart(2, '0');
  return `${h}:${m}`;
}
