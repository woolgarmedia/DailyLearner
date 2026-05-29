import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { Fonts, Palette } from '@/constants/theme';

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: focused ? 22 : 20, marginTop: 2 }}>{label}</Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Palette.accent,
        tabBarInactiveTintColor: Palette.muted,
        tabBarStyle: {
          backgroundColor: Palette.card,
          borderTopColor: Palette.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.sansMedium,
          fontSize: 11,
          letterSpacing: 0.4,
        },
        headerStyle: {
          backgroundColor: Palette.dark,
        },
        headerTintColor: Palette.cream,
        headerTitleStyle: {
          fontFamily: Fonts.serifBold,
          fontSize: 20,
          color: Palette.cream,
        },
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learning Path',
          tabBarIcon: ({ focused }) => <TabIcon label="📚" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: '60-Day Plan',
          tabBarIcon: ({ focused }) => <TabIcon label="📅" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          title: 'Completed',
          tabBarIcon: ({ focused }) => <TabIcon label="✅" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
