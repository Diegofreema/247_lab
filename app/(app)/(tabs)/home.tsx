import React, { useMemo } from 'react';
import { useAuth } from '@/lib/zustand/auth';
import { Container } from '@/components/ui/Container';
import { ProfileHeader } from '@/components/ui/home/ProfileHeader';
import { Loading } from '@/components/ui/Loading';
import { Banner } from '@/components/ui/home/Banner';
import { TestCat, TestSkeleton } from '@/components/ui/home/TestCat';
import { useGetServices, useProfile } from '@/lib/tanstack/queries';
import { ErrorComponent } from '@/components/ui/Error';

type Props = {};

const home = (props: Props) => {
  const { clearUser } = useAuth();

  const { data, isError, isPaused, refetch, isPending } = useProfile();

  // const cats = useMemo(() => {
  //   const cts = data?.map((item) => item.categoryname);
  //   return [...new Set(cts)];
  // }, [data]);

  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <Container>
      <ProfileHeader user={data} />
      <Banner />
      {/* {isPending ? <TestSkeleton /> : <TestCat cats={cats} />} */}
    </Container>
  );
};

export default home;
