import { Box, Card } from '@gluestack-ui/themed';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../constants';

type Props = {
  children: React.ReactNode;
  mt?: number;
  flex?: number;
};

export const CardCase = ({ children, mt, flex }: Props): JSX.Element => {
  return (
    <Card bg={colors.milk} mt={mt} flex={flex}>
      {children}
    </Card>
  );
};

const styles = StyleSheet.create({});
