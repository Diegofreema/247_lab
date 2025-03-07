import { useWindowDimensions, View } from "react-native";
import Modal from "react-native-modal";
import { MyText } from "../MyText";
import { MyButton } from "../MyButton";
import { HStack } from "@gluestack-ui/themed";
import { useDelete } from "@/lib/zustand/useOpenDelete";
import { useDeleteAccount } from "@/lib/tanstack/mutation";

export const DeleteModal = (): JSX.Element => {
  const { width } = useWindowDimensions();
  const { isOpen, onClose } = useDelete();
  const { mutateAsync, isPending } = useDeleteAccount();
  const onPress = () => {
    onClose();
  };

  const onDelete = async () => {
    await mutateAsync();
  };
  const finalWidth = width - 100;
  return (
    <View>
      <Modal
        isVisible={isOpen}
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
          <MyText
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 18,
              color: "red",
              textAlign: "center",
            }}
            text="This process can not be undone"
          />
          <MyText
            style={{
              fontFamily: "PoppinsBold",
              fontSize: 18,
              color: "black",
              textAlign: "center",
            }}
            text="Are you sure you want to delete your profile?"
          />

          <HStack gap={10} flex={1}>
            <MyButton text="Cancel" onPress={onPress} style={{ width: 100 }} />
            <MyButton
              loading={isPending}
              text="Delete"
              onPress={onDelete}
              style={{ width: 100, backgroundColor: "red" }}
            />
          </HStack>
        </View>
      </Modal>
    </View>
  );
};
