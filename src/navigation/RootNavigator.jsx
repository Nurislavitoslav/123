import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';
import LoginScreen from '../screens/LoginScreen';
import { colors } from '../constants/colors';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.BACKGROUND },
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        // Временно вместо MainTabNavigator ставим заглушку
        <Stack.Screen name="Main" component={() => null} />
      )}
    </Stack.Navigator>
  );
}
