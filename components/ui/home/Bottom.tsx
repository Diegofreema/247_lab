import { Results } from '@/lib/@types';
import { Box, HStack, VStack } from '@gluestack-ui/themed';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SeeAll } from './SeeAll';
import { useAuth } from '@/lib/zustand/auth';
import { CardCase } from '../Card';
import { MyText } from '../MyText';
import { EmptyText } from '../EmptyText';
import { MyButton } from '../MyButton';
import { colors } from '@/constants';
import { Link, router } from 'expo-router';
import { Icon } from 'react-native-paper';
import Animated, { SlideInLeft } from 'react-native-reanimated';
type Props = {
  results: Results[];
};

export const BottomFlatList = ({ results }: Props): JSX.Element => {
  const { id } = useAuth();
  const hide = results?.length === 0;
  return (
    <Box flex={1}>
      <SeeAll
        heading="Resent Results"
        hide={hide}
        link={`/test?patientId=${id}`}
      />
      <FlatList
        style={{ marginTop: 10, flex: 1 }}
        data={results}
        keyExtractor={(item) => item.ref}
        renderItem={({ item, index }) => (
          <ResultItem item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, gap: 15, flexGrow: 1 }}
        ListEmptyComponent={<BottomEmpty />}
      />
    </Box>
  );
};

const styles = StyleSheet.create({});

const ResultItem = ({ item, index }: { item: Results; index: number }) => {
  const {
    Datex,
    TestRef,
    branch,
    branchaddress,
    color,
    download,
    fileext,
    ref,
    status,
    test,
  } = item;

  const statusColor = status === 'Pending' ? 'orange' : 'green';

  return (
    <Animated.View
      entering={SlideInLeft.delay(500 * index)
        .springify()
        .damping(20)}
    >
      <CardCase>
        <View style={{ position: 'absolute', top: 17, left: 10 }}>
          <Icon source={'eyedropper'} size={20} color={colors.green} />
        </View>

        <VStack pl={20}>
          <HStack justifyContent="space-between" mb={5}>
            <HStack gap={5}>
              <MyText
                text={test}
                style={{ color: colors.black, fontFamily: 'PoppinsBold' }}
              />
            </HStack>
            <MyText
              text={Datex}
              style={{ color: colors.black, fontFamily: 'Poppins' }}
            />
          </HStack>

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

            <Link asChild href={`/singleTest?ref=${ref}`}>
              <Text
                style={{
                  color: colors.green,
                  fontFamily: 'Poppins',
                  textDecorationLine: 'underline',
                }}
              >
                {'View details'}
              </Text>
            </Link>
          </HStack>
        </VStack>
      </CardCase>
    </Animated.View>
  );
};

const BottomEmpty = () => {
  const { width } = useWindowDimensions();
  return (
    <VStack width={width * 0.9} alignItems="center" mt={30}>
      <MyText
        text="No results yet, please book a test."
        style={{
          textAlign: 'center',
          color: colors.black,
          fontSize: 18,
          fontFamily: 'PoppinsMedium',
          marginBottom: 20,
        }}
      />
      <MyButton
        text="Book a test"
        onPress={() => router.push('/labs')}
        icon="beaker-outline"
        style={{ width: 150 }}
      />
    </VStack>
  );
};
