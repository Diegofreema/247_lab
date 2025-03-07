import { colors } from "@/constants";
import { VStack } from "@gluestack-ui/themed";
import { StyleProp, Text, TextStyle, useWindowDimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

type Props = {
  text: string;
  subText?: string;
  style?: StyleProp<TextStyle>;
};

export const BoldHeader = ({ text, subText, style }: Props): JSX.Element => {
  const { height } = useWindowDimensions();
  return (
    <VStack gap={10}>
      <Text
        style={[
          { fontFamily: "PoppinsBold", fontSize: RFValue(23, height) },
          style,
        ]}
      >
        {" "}
        {text}
      </Text>
      {subText && (
        <Text
          style={[
            {
              fontFamily: "Poppins",
              fontSize: RFValue(13, height),
              color: colors.grey,
            },
            style,
          ]}
        >
          {" "}
          {subText}
        </Text>
      )}
    </VStack>
  );
};
