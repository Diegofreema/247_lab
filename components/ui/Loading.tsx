import { colors } from "@/constants";
import { Box } from "@gluestack-ui/themed";
import { ActivityIndicator } from "react-native-paper";

export const Loading = () => {
  return (
    <Box
      bg="$white"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size="large" color={colors.green} />
    </Box>
  );
};
