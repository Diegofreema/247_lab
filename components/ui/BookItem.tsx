import { Value } from '@/lib/tanstack/mutation';
import { useAuth } from '@/lib/zustand/auth';
import { useMemo, useState } from 'react';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { CardCase } from './Card';
import { HStack } from '@gluestack-ui/themed';
import { MyText } from './MyText';
import { Divider, Switch } from 'react-native-paper';
import { MyButton } from './MyButton';
import { Test } from '@/lib/@types';

export const BookItem = ({
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
  const testName = item?.test.split('- N')[0];
  const basePrice = +item?.cost;
  const homeServiceFee = item?.logistics ? +item.logistics : 0;

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
        <TestItem title={`₦${basePrice}`} subTitle={'Base Price'} />

        {item?.logistics && (
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
