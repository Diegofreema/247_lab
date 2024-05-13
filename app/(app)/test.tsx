import { View, Text } from 'react-native';
import React from 'react';
import { Container } from '@/components/ui/Container';
import { NavHeader } from '@/components/ui/NavHeader';
import { useLocalSearchParams } from 'expo-router';
import { useTestCat } from '@/lib/tanstack/queries';
import { Loading } from '@/components/ui/Loading';
import { ErrorComponent } from '@/components/ui/Error';

type Props = {};

const test = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isError, isPaused, refetch, isPending } = useTestCat(
    id as string
  );

  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isPending) {
    return <Loading />;
  }

  console.log(data[0]);

  return (
    <Container>
      <NavHeader title="Tests & Results" />
    </Container>
  );
};

export default test;
