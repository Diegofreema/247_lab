import { useTest } from '@/lib/zustand/useTest';
import { Dialog } from '@rneui/themed';
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ErrorComponent } from '../ui/Error';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '@/constants';
import { useTestFetch } from '@/lib/tanstack/queries';

type Props = {};

export const TestModal = ({}: Props): JSX.Element => {
  const { isOpen, onClose, branchId, catId } = useTest();
  const { data, isError, isPaused, refetch, isPending } = useTestFetch(
    branchId as string,
    catId as string
  );

  console.log({ branchId, catId });

  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isPending) {
    return <ActivityIndicator color={colors.green} />;
  }

  console.log(data);

  return <Dialog isVisible={isOpen} onBackdropPress={onClose}></Dialog>;
};

const styles = StyleSheet.create({});
