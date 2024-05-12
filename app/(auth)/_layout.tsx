import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/lib/zustand/auth';
import { NavHeader } from '@/components/ui/NavHeader';

type Props = {};

const AuthLayout = (props: Props) => {
  const { id, getUser } = useAuth();
  console.log('🚀 ~ file: _layout.tsx:AuthLayout ~ id:', id);

  useEffect(() => {
    getUser();
  }, []);
  if (id) {
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
