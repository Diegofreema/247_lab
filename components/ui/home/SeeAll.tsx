import { HStack } from '@gluestack-ui/themed';
import { StyleSheet, View, Text } from 'react-native';
import { MyText } from '../MyText';
import { colors } from '@/constants';
import { Link } from 'expo-router';
import { ExpoRouter } from 'expo-router/types/expo-router';

type Props = {
  heading: string;
  link: ExpoRouter.Href;
  hide?: boolean;
};

export const SeeAll = ({ heading, link, hide }: Props): JSX.Element => {
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <MyText
        text={heading}
        style={{
          color: colors.black,
          fontFamily: 'PoppinsMedium',
          fontSize: 15,
        }}
      />
      {!hide && (
        <Link href={link}>
          <Text style={{ fontFamily: 'PoppinsMedium', color: colors.green }}>
            See All
          </Text>
        </Link>
      )}
    </HStack>
  );
};

const styles = StyleSheet.create({});
