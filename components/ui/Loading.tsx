import { colors } from '@/constants';
import { Box } from '@gluestack-ui/themed';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

type Props = {};

export const Loading = ({}: Props): JSX.Element => {
  return (
    <Box
      bg="$white"
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <ActivityIndicator size="large" color={colors.green} />
    </Box>
  );
};

const styles = StyleSheet.create({});
