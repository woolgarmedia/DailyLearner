import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  useFonts as useDMSans,
} from '@expo-google-fonts/dm-sans';
import { DMMono_400Regular, DMMono_500Medium, useFonts as useDMMono } from '@expo-google-fonts/dm-mono';
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  useFonts as usePlayfair,
} from '@expo-google-fonts/playfair-display';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import { Palette } from '@/constants/theme';
import { scheduleDailyReminder } from '@/lib/notifications';
import { progressStore } from '@/store/progress';
import { settingsStore } from '@/store/settings';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [dmSans] = useDMSans({ DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold });
  const [dmMono] = useDMMono({ DMMono_400Regular, DMMono_500Medium });
  const [playfair] = usePlayfair({ PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold });

  const ready = dmSans && dmMono && playfair;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  // Keep the scheduled notification's content fresh: refresh on app open, and
  // whenever the user's current day changes. Notifications are local-only so
  // skip on web where the underlying API isn't supported.
  useEffect(() => {
    if (Platform.OS === 'web') return;
    let cancelled = false;
    let lastDay = -1;

    async function refresh() {
      try {
        await Promise.all([settingsStore.load(), progressStore.load()]);
        if (cancelled) return;
        if (settingsStore.getState().enabled) {
          await scheduleDailyReminder();
        }
      } catch (e) {
        console.warn('reminder refresh failed', e);
      }
    }

    refresh();

    const unsub = progressStore.subscribe((s) => {
      if (s.currentDay !== lastDay) {
        lastDay = s.currentDay;
        if (settingsStore.getState().enabled) {
          scheduleDailyReminder().catch((e) =>
            console.warn('day-change reschedule failed', e),
          );
        }
      }
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, []);

  if (!ready) {
    return <View style={{ flex: 1, backgroundColor: Palette.cream }} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Palette.cream },
          headerTitleStyle: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 18 },
          headerTintColor: Palette.dark,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: Palette.cream },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="topic/[id]" options={{ title: 'Topic', presentation: 'card' }} />
        <Stack.Screen
          name="quiz/[id]"
          options={{ title: 'Quiz', presentation: 'modal', headerShown: true }}
        />
        <Stack.Screen name="day/[num]" options={{ title: 'Day', presentation: 'card' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
