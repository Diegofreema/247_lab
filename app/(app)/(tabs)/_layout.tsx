import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/lib/zustand/auth';
import { colors } from '@/constants';
import { TabBarButton } from '@/components/ui/tabbarButton';
import { Feather } from 'lucide-react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={23} style={{ marginBottom: -3 }} {...props} />;
}

const tabBarActiveTintColor = colors.green;
const tabBarInactiveTintColor = colors.darkGrey;

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
            tabBarButton: (props) => (
              <TabBarButton
                {...props}
                activeTintColor={tabBarActiveTintColor}
                inactiveTintColor={tabBarInactiveTintColor}
                icon={({ color }) => <TabBarIcon name="home" color={color} />}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="labs"
          options={{
            title: 'Book',
            tabBarButton: (props) => (
              <TabBarButton
                {...props}
                activeTintColor={tabBarActiveTintColor}
                inactiveTintColor={tabBarInactiveTintColor}
                icon={({ color }) => (
                  <TabBarIcon name="calendar" color={color} />
                )}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: 'More',
            tabBarButton: (props) => (
              <TabBarButton
                {...props}
                activeTintColor={tabBarActiveTintColor}
                inactiveTintColor={tabBarInactiveTintColor}
                icon={({ color }) => <TabBarIcon name="cog" color={color} />}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
