import { colors } from '@/constants';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

type Props = {};

export const Loading = ({}: Props): JSX.Element => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={colors.green} />
    </View>
  );
};

const styles = StyleSheet.create({});
