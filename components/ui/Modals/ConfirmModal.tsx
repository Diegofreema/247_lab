import { Image, useWindowDimensions, View } from "react-native";
import Modal from "react-native-modal";
import { MyText } from "../MyText";
import { MyButton } from "../MyButton";
import { colors } from "@/constants";

type Props = {
  onPress: () => void;
  name: string;
  isVisible: boolean;
};

export const ConfirmModal = ({
  isVisible,
  name,
  onPress,
}: Props): JSX.Element => {
  const { width } = useWindowDimensions();
  const finalWidth = width - 100;
  return (
    <View>
      <Modal
        isVisible={isVisible}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 40,
            alignItems: "center",
            gap: 10,
            width: finalWidth,
            height: finalWidth,
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../../../assets/images/confirm.png")}
            style={{ width: 60, height: 60 }}
            resizeMode="contain"
          />
          <MyText
            style={{ fontFamily: "PoppinsBold", fontSize: 18, color: "black" }}
            text="Account Created"
          />
          <MyText
            style={{
              fontFamily: "Poppins",
              fontSize: 13,
              textAlign: "center",
              color: colors.black,
            }}
            text={`Welcome to 247Lab`}
          />

          <MyButton text="Continue" onPress={onPress} style={{ width: 150 }} />
        </View>
      </Modal>
    </View>
  );
};
