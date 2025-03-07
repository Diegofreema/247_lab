import { AntDesign } from "@expo/vector-icons";
import { HStack } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { MyText } from "./MyText";

type Props = {
  title?: string;
};

export const NavHeader = ({ title }: Props): JSX.Element => {
  const router = useRouter();

  const navigate = () => {
    router.back();
  };
  return (
    <HStack my={2} justifyContent="space-between" alignItems="center">
      <Pressable
        onPress={navigate}
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 },
          { padding: 4 },
        ]}
      >
        <AntDesign name="arrowleft" size={30} color="black" />
      </Pressable>
      {title && (
        <MyText
          text={title}
          style={{ color: "black", fontSize: 20, fontFamily: "PoppinsBold" }}
        />
      )}

      <View style={{ width: 30 }} />
    </HStack>
  );
};
