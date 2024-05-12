import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/lib/zustand/auth';
import { colors } from '@/constants';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={23} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { id, getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, []);
  if (!id) {
    return <Redirect href="/" />;
  }
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'white',
            borderWidth: 0,
            borderTopWidth: 0,
            elevation: 0,
            paddingBottom: 5,
          },
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.grey,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'PoppinsMedium',
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name="home"
                color={focused ? colors.green : colors.grey}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="sessions"
          options={{
            title: 'Sessions',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name="book"
                color={focused ? colors.green : colors.grey}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: 'More',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name="cog"
                color={focused ? colors.green : colors.grey}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
