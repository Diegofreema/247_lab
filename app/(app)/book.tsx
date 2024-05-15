import { FlatList, StyleSheet, Text } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Container } from '@/components/ui/Container';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
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
import { BookItem } from '@/components/ui/BookItem';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import Toast from 'react-native-toast-message';
import { useUser } from '@/lib/zustand/useUser';
import axios from 'axios';

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
  const { user } = useUser();
  console.log(refData, 'refData');
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>(null);
  const { data, isError, isPaused, refetch, isPending } = useTestFetch(
    branchId as string,
    catId as string
  );
  useEffect(() => {
    if (refData?.ref) {
      paystackWebViewRef.current?.startTransaction();
    }
  }, [refData?.ref]);
  const getParams = useCallback((params: Value) => {
    mutate(params);
  }, []);

  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isPending) {
    return <Loading />;
  }

  if (!user) return <Redirect href="/" />;

  const { email } = user;

  const totalCost = Number(refData?.servicecost) + Number(refData?.logistics);

  return (
    <Container>
      <NavHeader title="Select Test" />
      <Paystack
        paystackKey="pk_test_ed76c81770ed30bfd8734bd6086aa6e2e2057088"
        billingEmail={`${email}.com`}
        amount={totalCost}
        channels={[
          'card',
          'bank',
          'ussd',
          'mobile_money',
          'qr',
          'bank_transfer',
        ]}
        onCancel={(e) => {
          Toast.show({
            type: 'transparentToast',
            text1: 'Payment Cancelled',
            position: 'top',
          });
        }}
        onSuccess={async (res) => {
          await axios.post(
            `https://247laboratory.net/checkout.aspx?zxc=${refData?.ref}`
          );
          Toast.show({
            type: 'transparentToast',
            text1: 'Payment successful',
            text2: 'You have successfully booked this test',
            position: 'top',
          });

          router.back();
        }}
        // @ts-ignore
        ref={paystackWebViewRef}
      />
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
