import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, View, Text, Pressable } from 'react-native';

type Props = {};

export const Banner = ({}: Props): JSX.Element => {
  const onPress = () => {
    router.push('/sessions');
  };
  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, marginTop: 20 })}
      onPress={onPress}
    >
      <Image
        source={require('../../../assets/images/bg.png')}
        style={{ width: '100%', height: 150, borderRadius: 10 }}
        contentFit="cover"
        alt="banner"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({});
