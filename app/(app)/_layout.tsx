import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/lib/zustand/auth';
import { StatusBar } from 'expo-status-bar';
type Props = {};

const Layout = (props: Props) => {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)" />
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({});
