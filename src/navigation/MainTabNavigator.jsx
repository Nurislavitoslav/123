import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import MapScreen from '../screens/MapScreen';
import CreateScreen from '../screens/CreateScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

const icons = {
  Dashboard: 'list-outline',
  Map: 'map-outline',
  Create: 'add-circle-outline',
  Profile: 'person-outline',
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={
              focused
                ? icons[route.name].replace('-outline', '')
                : icons[route.name]
            }
            size={24}
            color={color}
          />
        ),
        tabBarActiveTintColor: colors.PRIMARY,
        tabBarInactiveTintColor: colors.TEXT_MUTED,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopColor: colors.BORDER,
          backgroundColor: colors.SURFACE,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Лента' }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Карта' }} />
      <Tab.Screen name="Create" component={CreateScreen} options={{ title: 'Добавить' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} />
    </Tab.Navigator>
  );
}
