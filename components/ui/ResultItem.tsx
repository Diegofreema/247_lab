import { Results } from '@/lib/@types';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { CardCase } from './Card';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { VStack } from '@gluestack-ui/themed';
import { HStack } from '@gluestack-ui/themed';
import { MyText } from './MyText';
import { colors } from '@/constants';
import { Link } from 'expo-router';

export const ResultItem = ({
  item,
  index,
}: {
  item: Results;
  index: number;
}) => {
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
  const formattedTest = test?.split('-')[1] + `${test?.split('-')[2] || ''}`;
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
                text={formattedTest}
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
