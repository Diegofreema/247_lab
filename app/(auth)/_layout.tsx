import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/lib/zustand/auth';
import { NavHeader } from '@/components/ui/NavHeader';

type Props = {};

const AuthLayout = (props: Props) => {
  const { user, getUser } = useAuth();
  console.log('🚀 ~ AuthLayout ~ id:', user);
  useEffect(() => {
    getUser();
  }, []);
  if (user?.uniqueid) {
    return <Redirect href="/home" />;
  }

  return (
    <>
      <StatusBar style="dark" />

      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
