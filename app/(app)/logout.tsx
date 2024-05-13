import { useAuth } from '@/lib/zustand/auth';
import { useUser } from '@/lib/zustand/useUser';
import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';

function logout() {
  const { clearUser: clearId } = useAuth();
  const { clearUser } = useUser();
  useEffect(() => {
    clearId();
    clearUser();
  }, []);

  return <Redirect href="/" />;
}

export default logout;
