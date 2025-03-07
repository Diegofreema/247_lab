import { Box } from "@gluestack-ui/themed";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

type Props = {
  children: PropsWithChildren<any>;
};

export const Container = ({ children }: Props): JSX.Element => {
  return <Box style={[styles.container]}>{children}</Box>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});
