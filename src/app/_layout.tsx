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
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import { Palette } from '@/constants/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [dmSans] = useDMSans({ DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold });
  const [dmMono] = useDMMono({ DMMono_400Regular, DMMono_500Medium });
  const [playfair] = usePlayfair({ PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold });

  const ready = dmSans && dmMono && playfair;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

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
