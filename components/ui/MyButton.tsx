import { colors } from "@/constants";

import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Button } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type Props = {
  text: string;
  onPress: () => void;
  loading?: boolean;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  icon?: IconSource | undefined;
};

export const MyButton = ({
  text,
  textStyle,
  onPress,
  style,
  loading,
  icon,
}: Props): JSX.Element => {
  return (
    <Button
      loading={loading}
      onPress={onPress}
      icon={icon}
      rippleColor={colors.green2}
      contentStyle={[
        {
          height: 50,
          borderRadius: 5,
          backgroundColor: colors.green,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
      style={{ borderRadius: 5 }}
      textColor="white"
      labelStyle={[{ fontFamily: "Poppins", color: "white" }, textStyle]}
    >
      {text}
    </Button>
  );
};
