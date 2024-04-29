import { View, Text } from 'react-native';
import React from 'react';
import { Button } from '@gluestack-ui/themed';
import { useAuth } from '@/lib/zustand/auth';
import { router } from 'expo-router';

type Props = {};

const home = (props: Props) => {
  const { clearUser } = useAuth();
  const logOut = () => {
    clearUser();
    router.replace('/');
  };
  return (
    <View>
      <Button onPress={logOut}>
        <Text>Log out</Text>
      </Button>
      <Text>home</Text>
    </View>
  );
};

export default home;
