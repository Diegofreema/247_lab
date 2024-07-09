import { FlatList, Pressable } from 'react-native';
import React from 'react';
import { Container } from '@/components/ui/Container';
import { NavHeader } from '@/components/ui/NavHeader';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTestCat } from '@/lib/tanstack/queries';
import { Loading } from '@/components/ui/Loading';
import { ErrorComponent } from '@/components/ui/Error';
import { CardCase } from '@/components/ui/Card';
import { EmptyText } from '@/components/ui/EmptyText';
import { Cat } from '@/lib/@types';
import { MyText } from '@/components/ui/MyText';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { useTest } from '@/lib/zustand/useTest';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const test = () => {
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

  return (
    <Container>
      <NavHeader title="Tests" />
      {/* <TestModal /> */}
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <CatItem index={index} item={item} id={id} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.categoryname}
        ListEmptyComponent={<EmptyText text="No Categories found" />}
        contentContainerStyle={{ paddingBottom: 20, gap: 20 }}
      />
    </Container>
  );
};

export default test;

const CatItem = ({
  item,
  index,
  id,
}: {
  item: Cat;
  index: number;
  id: string | undefined;
}) => {
  const AnimateMotion = index % 2 === 0 ? SlideInLeft : SlideInRight;
  const router = useRouter();
  const { onOpen, getIds } = useTest();
  const onPress = () => {
    router.push(`/book?branchId=${id}&catId=${item?.categoryname}`);
  };
  return (
    <AnimatedPressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        marginBottom: 15,
      })}
      entering={AnimateMotion.springify().delay(200).damping(20)}
    >
      <CardCase>
        <MyText text={item?.categoryname} style={{ color: 'black' }} />
      </CardCase>
    </AnimatedPressable>
  );
};
