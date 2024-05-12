import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

type Props = {
  text?: string | number;
  style?: StyleProp<TextStyle>;
};

export const MyText = ({ text, style }: Props): JSX.Element => {
  return (
    <Text style={[{ fontFamily: 'Poppins', color: 'white' }, style]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({});
