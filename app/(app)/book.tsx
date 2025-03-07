import { FlatList } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import * as StoreReview from "expo-store-review";
import { Container } from "@/components/ui/Container";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useTestFetch } from "@/lib/tanstack/queries";
import { ErrorComponent } from "@/components/ui/Error";
import { Loading } from "@/components/ui/Loading";
import { EmptyText } from "@/components/ui/EmptyText";
import { NavHeader } from "@/components/ui/NavHeader";
import { useBookMutation, Value } from "@/lib/tanstack/mutation";
import { BookItem } from "@/components/ui/BookItem";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import Toast from "react-native-toast-message";
import { useUser } from "@/lib/zustand/useUser";
import axios from "axios";

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
  console.log(refData, "refData");
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>(null);
  const { data, isError, isPaused, refetch, isPending } = useTestFetch(
    branchId as string,
    catId as string,
  );
  useEffect(() => {
    if (refData?.ref) {
      paystackWebViewRef.current?.startTransaction();
    }
  }, [refData?.ref]);
  const getParams = useCallback(
    (params: Value) => {
      mutate(params);
    },
    [mutate],
  );

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
        paystackKey="pk_live_34dcb421bb4e9e6f20fdf2c993f2b44c9e436fbe"
        billingEmail={`${email}.com`}
        amount={totalCost}
        channels={[
          "card",
          "bank",
          "ussd",
          "mobile_money",
          "qr",
          "bank_transfer",
        ]}
        onCancel={(e) => {
          Toast.show({
            type: "transparentToast",
            text1: "Payment Cancelled",
            position: "top",
          });
        }}
        onSuccess={async (res) => {
          await axios.post(
            `https://247laboratory.net/checkout.aspx?zxc=${refData?.ref}`,
          );
          Toast.show({
            type: "transparentToast",
            text1: "Payment successful",
            text2: "You have successfully booked this test",
            position: "top",
          });

          router.back();
          await StoreReview.requestReview();
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
        contentContainerStyle={{ paddingBottom: 20, gap: 20 }}
      />
    </Container>
  );
};

export default Book;
