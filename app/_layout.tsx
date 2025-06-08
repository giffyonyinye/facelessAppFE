import React from 'react';
import { Stack } from 'expo-router';
import { colors, fontFamily } from '../constants/theme';
import { useFonts, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Montserrat_600SemiBold });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerTitleStyle: { fontFamily, fontSize: 22 },
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </View>
  );
}
