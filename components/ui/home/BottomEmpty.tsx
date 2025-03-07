import { useWindowDimensions } from "react-native";
import Animated, { ZoomInUp } from "react-native-reanimated";
import { MyText } from "../MyText";
import { colors } from "@/constants";
import { router } from "expo-router";
import { MyButton } from "../MyButton";

export const BottomEmpty = () => {
  const { width } = useWindowDimensions();
  return (
    <Animated.View
      entering={ZoomInUp.springify().damping(80).stiffness(200)}
      style={{ width: width * 0.9, alignItems: "center", marginTop: 30 }}
    >
      <MyText
        text="No results yet, please book a test."
        style={{
          textAlign: "center",
          color: colors.black,
          fontSize: 18,
          fontFamily: "PoppinsMedium",
          marginBottom: 20,
        }}
      />
      <MyButton
        text="Book a test"
        onPress={() => router.push("/labs")}
        icon="beaker-outline"
        style={{ width: 150 }}
      />
    </Animated.View>
  );
};
