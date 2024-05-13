import { FlatList, StyleSheet, Text } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { useLocalSearchParams } from 'expo-router';
import { useTestFetch } from '@/lib/tanstack/queries';
import { ErrorComponent } from '@/components/ui/Error';
import { Loading } from '@/components/ui/Loading';
import { EmptyText } from '@/components/ui/EmptyText';
import { Test } from '@/lib/@types';
import { CardCase } from '@/components/ui/Card';
import { NavHeader } from '@/components/ui/NavHeader';
import { MyText } from '@/components/ui/MyText';
import { HStack } from '@gluestack-ui/themed';
import { Switch } from 'react-native-paper';
import { Divider } from '@rneui/themed';
import { MyButton } from '@/components/ui/MyButton';
import { Value, useBookMutation } from '@/lib/tanstack/mutation';
import { useAuth } from '@/lib/zustand/auth';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';

const Book = () => {
  const { branchId, catId } = useLocalSearchParams<{
    branchId: string;
    catId: string;
  }>();
  const {
    data: refData,
    mutate,
    isPending: isPendingMutation,
  } = useBookMutation();
  console.log(refData);

  const { data, isError, isPaused, refetch, isPending } = useTestFetch(
    branchId as string,
    catId as string
  );

  const getParams = useCallback((params: Value) => {
    mutate(params);
  }, []);

  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <Container>
      <NavHeader title="Select Test" />
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <BookItem
            index={index}
            item={item}
            onGetParams={getParams}
            branchId={branchId}
            isLoading={isPendingMutation}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.id}
        ListEmptyComponent={<EmptyText text="No test found" />}
        contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
      />
    </Container>
  );
};

export default Book;

const styles = StyleSheet.create({});

const BookItem = ({
  item,
  index,
  onGetParams,
  branchId,
  isLoading,
}: {
  item: Test;
  index: number;
  onGetParams: (params: Value) => void;
  branchId: string | undefined;
  isLoading: boolean;
}) => {
  const [selected, setSelected] = useState(false);
  const { id } = useAuth();
  const onToggleHomeService = () => setSelected(!selected);
  const testName = item?.test.split('-')[0];
  const totalPrice = item?.test.split('-')[1].replace(' ', '').replace('N', '');
  const homeServiceFee = +item.logistics;
  const basePrice = +totalPrice.replace(',', '');

  console.log(homeServiceFee + basePrice);

  const finalPrice = useMemo(() => {
    if (selected) {
      return basePrice + homeServiceFee;
    } else {
      return basePrice;
    }
  }, [selected]);
  const logisticValue = useMemo(() => {
    if (selected) {
      return homeServiceFee;
    } else {
      return 0;
    }
  }, [selected]);
  console.log({ logisticValue });

  const onBook = () => {
    onGetParams({
      testid: item.id,
      patientid: id as string,
      logisticsvalue: logisticValue,
      branchid: branchId as string,
    });
  };
  const AnimationDirection = index % 2 === 0 ? SlideInLeft : SlideInRight;
  return (
    <Animated.View entering={AnimationDirection}>
      <CardCase gap={10}>
        <TestItem title={testName} subTitle={'Test'} />
        <TestItem title={`₦${totalPrice}`} subTitle={'Base Price'} />

        {item?.homeservice === 'Available' && (
          <TestItem title={`₦${item?.logistics}`} subTitle={'Home service'} />
        )}
        <HStack justifyContent="space-between" alignItems="center">
          <MyText text={'Accept home service'} style={{ color: 'black' }} />
          <Switch value={selected} onValueChange={onToggleHomeService} />
        </HStack>
        <Divider style={{ marginVertical: 10 }} />
        <TestItem title={`₦${finalPrice}`} subTitle={'Total Price'} />
        <MyButton text="Proceed" onPress={onBook} loading={isLoading} />
      </CardCase>
    </Animated.View>
  );
};

const TestItem = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <MyText
        text={subTitle}
        style={{ color: 'black', fontFamily: 'Poppins' }}
      />
      <MyText
        text={title}
        style={{ color: 'black', fontFamily: 'PoppinsBold' }}
      />
    </HStack>
  );
};
