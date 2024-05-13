import { useUser } from '@/lib/zustand/useUser';
import { StyleSheet, View, Text, ViewStyle, StyleProp } from 'react-native';
import { MyText } from '../MyText';
import { colors } from '@/constants';
import { HStack } from '@gluestack-ui/themed';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ViewStyle>;
};

export const ProfileImg = ({
  containerStyle,
  imageStyle,
}: Props): JSX.Element => {
  const { user } = useUser();

  const firstLetter = user?.fname.charAt(0).toUpperCase();
  const lastLetter = user?.lname.charAt(0).toUpperCase();
  console.log('🚀 ~ file: ProfileImg.tsx:ProfileImg ~ user:', user);

  return (
    <View style={[{ alignItems: 'center', gap: 5 }, containerStyle]}>
      <View style={[styles.subCon, imageStyle]}>
        <MyText text={`${firstLetter}${lastLetter}`} style={{ fontSize: 20 }} />
      </View>
      <HStack gap={2} alignItems="center">
        <MyText
          text={user?.fname.slice(0, 6)}
          style={{
            fontSize: 13,
            color: 'black',
            fontFamily: 'PoppinsMedium',
            textTransform: 'capitalize',
          }}
        />
        <MyText
          text={user?.lname.slice(0, 6)}
          style={{
            fontSize: 13,
            color: 'black',
            fontFamily: 'PoppinsMedium',
            textTransform: 'capitalize',
          }}
        />
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  subCon: {
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 50,
  },
});
