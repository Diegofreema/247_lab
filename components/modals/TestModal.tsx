import { useTest } from "@/lib/zustand/useTest";
import { Dialog } from "@rneui/themed";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "@/constants";
import { Image } from "expo-image";

type Props = {
  img: string;
};

export const TestModal = ({ img }: Props): JSX.Element => {
  const { isOpen, onClose } = useTest();

  return (
    <Dialog isVisible={isOpen} onBackdropPress={onClose}>
      {img ? (
        <Image
          source={{
            uri: img,
          }}
          style={{ width: "100%", height: 400 }}
          contentFit="cover"
        />
      ) : (
        <ActivityIndicator size="large" color={colors.green} />
      )}
    </Dialog>
  );
};
