import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { useLocalSearchParams } from 'expo-router';
import { useResults } from '@/lib/tanstack/queries';
import { ErrorComponent } from '@/components/ui/Error';
import { Loading } from '@/components/ui/Loading';

type Props = {};

const singleTest = (props: Props) => {
  const { ref } = useLocalSearchParams<{ ref: string }>();
  const {
    data: results,
    isError: isErrorResults,
    isPending: isPendingResults,
    refetch: refetchResults,
    isPaused: isPausedResults,
  } = useResults();

  const singleResult = useMemo(() => {
    if (results) {
      return results.find((result) => result.ref === ref);
    }
  }, [results, ref]);
  const handleRefetch = () => {
    refetchResults();
  };

  if (isErrorResults || isPausedResults) {
    return <ErrorComponent refetch={handleRefetch} />;
  }

  if (isPendingResults) {
    return <Loading />;
  }

  return (
    <Container>
      <Text>singleTest</Text>
    </Container>
  );
};

export default singleTest;
