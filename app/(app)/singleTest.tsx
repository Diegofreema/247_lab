import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { Link, Redirect, useLocalSearchParams } from 'expo-router';
import { useResults } from '@/lib/tanstack/queries';
import { ErrorComponent } from '@/components/ui/Error';
import { Loading } from '@/components/ui/Loading';
import { ListItem } from '@rneui/themed';
import { HStack, VStack } from '@gluestack-ui/themed';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { CardCase } from '@/components/ui/Card';
import { Icon } from 'react-native-paper';
import { MyText } from '@/components/ui/MyText';
import { colors } from '@/constants';
import { NavHeader } from '@/components/ui/NavHeader';
import { MyButton } from '@/components/ui/MyButton';
import { TestModal } from '@/components/modals/TestModal';
import { useTest } from '@/lib/zustand/useTest';

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
  const { onOpen } = useTest();
  const singleResult = useMemo(() => {
    if (results) {
      return results.find((result) => result.ref === ref);
    }
  }, [ref]);

  if (!singleResult) {
    return <Redirect href={'/home'} />;
  }
  const handleRefetch = () => {
    refetchResults();
  };

  if (isErrorResults || isPausedResults) {
    return <ErrorComponent refetch={handleRefetch} />;
  }

  if (isPendingResults) {
    return <Loading />;
  }

  const {
    Datex,
    TestRef,
    branch,
    branchaddress,
    color,
    download,
    fileext,
    ref: singleRef,
    status,
    test,
  } = singleResult;
  console.log({
    branch,
    branchaddress,
    color,
    download,
    fileext,
    ref: singleRef,
  });

  const statusColor = status === 'Pending' ? 'orange' : 'green';
  const formattedTest = test.split('-')[1] + `${test.split('-')[2] || ''}`;
  const onShowImage = () => {
    onOpen();
  };
  const resultIsAvailable = download === 'View Result';
  return (
    <>
      <TestModal
        img={`https://247laboratory.net/uploads/${singleRef}${fileext}`}
      />
      <Container>
        <NavHeader title={formattedTest} />
        <Animated.View
          entering={SlideInLeft.delay(500).springify().damping(20)}
        >
          <CardCase>
            <View style={{ position: 'absolute', top: 17, left: 10 }}>
              <Icon source={'eyedropper'} size={20} color={colors.green} />
            </View>

            <VStack pl={20}>
              <HStack justifyContent="space-between" mb={5}>
                <HStack gap={5}>
                  <MyText
                    text={formattedTest}
                    style={{ color: colors.black, fontFamily: 'PoppinsBold' }}
                  />
                </HStack>
                <MyText
                  text={Datex}
                  style={{ color: colors.black, fontFamily: 'Poppins' }}
                />
              </HStack>
              <Item leftText="Branch" rightText={branch} />
              <Item leftText="Address" rightText={branchaddress} />

              <HStack justifyContent="space-between">
                <HStack gap={5}>
                  <MyText
                    text={'Status'}
                    style={{ color: colors.black, fontFamily: 'PoppinsBold' }}
                  />
                  <MyText
                    text={status}
                    style={{ color: statusColor, fontFamily: 'PoppinsBold' }}
                  />
                </HStack>

                {resultIsAvailable && (
                  <Pressable
                    onPress={onShowImage}
                    style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                  >
                    <Text
                      style={{ color: colors.green, fontFamily: 'Poppins' }}
                    >
                      View Result
                    </Text>
                  </Pressable>
                )}
              </HStack>
            </VStack>
          </CardCase>
        </Animated.View>
      </Container>
    </>
  );
};

export default singleTest;

const Item = ({
  leftText,
  rightText,
}: {
  leftText: string;
  rightText?: string;
}) => {
  return (
    <HStack justifyContent="space-between" mb={5} gap={15} alignItems="center">
      <HStack gap={5}>
        <MyText
          text={leftText}
          style={{ color: colors.black, fontFamily: 'PoppinsBold' }}
        />
      </HStack>
      {rightText && (
        <MyText
          text={rightText}
          style={{
            color: colors.black,
            fontFamily: 'Poppins',
            flex: leftText === 'Address' ? 1 : undefined,
            marginRight: leftText === 'Address' ? -5 : 0,
          }}
        />
      )}
    </HStack>
  );
};
