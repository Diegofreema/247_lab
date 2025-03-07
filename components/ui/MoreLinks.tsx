import { colors } from "@/constants";
import { profileLinks } from "@/lib/data";
import { VStack } from "@gluestack-ui/themed";
import { Icon, ListItem } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { MyText } from "./MyText";
import { Href, useRouter } from "expo-router";
import { useUser } from "@/lib/zustand/useUser";
import { useAuth } from "@/lib/zustand/auth";
import { useDelete } from "@/lib/zustand/useOpenDelete";
import { DeleteModal } from "./Modals/deleteModal";

export const MoreLinks = () => {
  return (
    <VStack gap={10} mt={25}>
      {profileLinks.map((item, i) => (
        <LinkItem key={i} item={item} />
      ))}
      <DeleteModal />
    </VStack>
  );
};

const styles = StyleSheet.create({
  text: {},
  container: {
    backgroundColor: colors.milk,
    borderRadius: 15,
  },
});

type ItemType = {
  item: (typeof profileLinks)[0];
};
const LinkItem = ({ item }: ItemType) => {
  const { clearUser } = useUser();
  const { clearUser: clearId } = useAuth();
  const { onOpen } = useDelete();
  const router = useRouter();
  const logout = () => {
    clearId();
    clearUser();
    router.push("/");
  };
  const onPress = () => {
    if (item?.link) {
      router.push(item.link as Href<string | object>);
    } else if (item.name === "trash") {
      onOpen();
    } else if (item.name === "log-out") {
      logout();
    }
  };

  const color =
    item.name === "log-out" || item.name === "trash"
      ? colors.red
      : colors.green;
  return (
    <ListItem containerStyle={styles.container} onPress={onPress}>
      <Icon name={item.name} type="feather" color={color} size={30} />
      <ListItem.Content>
        <ListItem.Title style={styles.text}>
          <MyText
            text={item.label}
            style={{ color: color, fontFamily: "PoppinsBold" }}
          />
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};
