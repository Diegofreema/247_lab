import { FlatList } from 'react-native';
import React from 'react';
import { Container } from '@/components/ui/Container';
import { NavHeader } from '@/components/ui/NavHeader';
import { useLabs } from '@/lib/tanstack/queries';
import { useAuth } from '@/lib/zustand/auth';
import { ErrorComponent } from '@/components/ui/Error';
import { Loading } from '@/components/ui/Loading';
import { EmptyText } from '@/components/ui/EmptyText';
import { useUser } from '@/lib/zustand/useUser';
import { BranchItem } from '@/components/ui/home/Branches';

type Props = {};

const test = (props: Props) => {
  const { id } = useAuth();
  const { user } = useUser();
  const {
    data: labs,
    isError: isErrorLabs,
    isPaused: isPausedLabs,
    isPending: isPendingLabs,
    refetch: refetchLab,
  } = useLabs(id);
  const handleRefetch = () => {
    refetchLab();
  };

  if (isErrorLabs || isPausedLabs) {
    return <ErrorComponent refetch={handleRefetch} />;
  }

  if (isPendingLabs) {
    return <Loading />;
  }
  return (
    <Container>
      <NavHeader title="All Labs" />
      <FlatList
        data={labs}
        renderItem={({ item, index }) => (
          <BranchItem item={item} index={index} />
        )}
        keyExtractor={(item) => item?.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, gap: 15 }}
        ListEmptyComponent={
          <EmptyText
            text={`No branches found in ${user?.statename} state yet`}
          />
        }
      />
    </Container>
  );
};

export default test;
