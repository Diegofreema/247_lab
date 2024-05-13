import { View, Text } from 'react-native';
import React from 'react';
import { Container } from '@/components/ui/Container';
import { ProfileForm } from '@/components/form/ProfileForm';
import { NavHeader } from '@/components/ui/NavHeader';

type Props = {};

const EditProfile = (props: Props) => {
  return (
    <Container>
      <NavHeader title="Edit Profile" />
      <ProfileForm />
    </Container>
  );
};

export default EditProfile;
