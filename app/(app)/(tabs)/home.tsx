import React, { useMemo } from 'react';
import { useAuth } from '@/lib/zustand/auth';
import { Container } from '@/components/ui/Container';
import { ProfileHeader } from '@/components/ui/home/ProfileHeader';
import { Loading } from '@/components/ui/Loading';
import { Banner } from '@/components/ui/home/Banner';
import { TestCat, TestSkeleton } from '@/components/ui/home/TestCat';
import {
  useGetServices,
  useLabs,
  useProfile,
  useResults,
} from '@/lib/tanstack/queries';
import { ErrorComponent } from '@/components/ui/Error';
import { Branches } from '@/components/ui/home/Branches';
import { BottomFlatList } from '@/components/ui/home/Bottom';

type Props = {};

const home = (props: Props) => {
  const { id } = useAuth();

  const { data, isError, isPaused, refetch, isPending } = useProfile();
  const {
    data: results,
    isError: isErrorResults,
    isPending: isPendingResults,
    refetch: refetchResults,
    isPaused: isPausedResults,
  } = useResults();
  const {
    data: labs,
    isError: isErrorLabs,
    isPaused: isPausedLabs,
    isPending: isPendingLabs,
    refetch: refetchLab,
  } = useLabs(id);

  const handleRefetch = () => {
    refetch();
    refetchLab();
    refetchResults();
  };

  if (
    isError ||
    isErrorLabs ||
    isPausedLabs ||
    isPaused ||
    isErrorResults ||
    isPausedResults
  ) {
    return <ErrorComponent refetch={handleRefetch} />;
  }

  if (isPending || isPendingLabs || isPendingResults) {
    return <Loading />;
  }
  const fourLabs = labs?.slice(0, 4);
  const sevenResults = results?.slice(0, 7);
  return (
    <Container>
      <ProfileHeader user={data} />
      <Banner />
      <Branches labs={fourLabs} />
      <BottomFlatList results={sevenResults} />
    </Container>
  );
};

export default home;
