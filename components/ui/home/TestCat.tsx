import { Box, HStack } from '@gluestack-ui/themed';
import { Pressable, StyleSheet, Text } from 'react-native';
import { MyText } from '../MyText';
import { colors } from '@/constants';
import { Skeleton } from '@rneui/themed';
import { Link } from 'expo-router';

type Props = {
  cats: string[];
};

export const TestCat = ({ cats }: Props): JSX.Element => {
  console.log('🚀 ~ TestCat ~ cats:', cats);
  return (
    <Box mt={25}>
      <HStack justifyContent="space-between" alignItems="center">
        <MyText text="Tests Categories" style={{ color: colors.black }} />
        <Link href="/" asChild>
          <Text style={{ color: colors.green, fontFamily: 'PoppinsBold' }}>
            See all
          </Text>
        </Link>
      </HStack>
      <HStack mt={5} gap={5}>
        {cats?.slice(0, 5)?.map((cat, i) => (
          <Item key={i} item={cat} />
        ))}
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({});

export const TestSkeleton = (): JSX.Element => {
  const array = [1, 2, 3, 4, 5];
  return (
    <Box mt={25}>
      <HStack justifyContent="space-between" alignItems="center">
        <Skeleton animation="pulse" width={100} height={20} />
        <Skeleton animation="pulse" width={100} height={20} />
      </HStack>
      <HStack mt={5} gap={5}>
        {array.map((_, i) => (
          <Skeleton
            key={i}
            animation="pulse"
            style={{ flex: 1, borderRadius: 5 }}
            height={60}
          />
        ))}
      </HStack>
    </Box>
  );
};

const Item = ({ item }: { item: string }) => {
  console.log(item);

  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        padding: 5,
        width: '20%',
        height: 60,
        borderRadius: 5,
        backgroundColor: colors.milk,
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <MyText
        text={item}
        style={{ color: colors.black, fontSize: 12, fontFamily: 'PoppinsBold' }}
      />
    </Pressable>
  );
};
