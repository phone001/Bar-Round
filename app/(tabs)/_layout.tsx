// 메뉴 탭 레이아웃
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import { menu } from '@/common/menu';
import { MenuProps } from '@/common/interface/MenuInterface';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
     >
      { menu.map((item:MenuProps) => (
        <Tabs.Screen
        key={item.name}
        name={item.name}
        options={{
          title: item.title,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={item.icon} color={color} />,
        }}
        />
      ))}
    </Tabs>
  );
}
