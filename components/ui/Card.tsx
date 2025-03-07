import { Card } from "@gluestack-ui/themed";
import { colors } from "../../constants";

type Props = {
  children: React.ReactNode;
  mt?: number;
  flex?: number;
  gap?: number;
};

export const CardCase = ({ children, mt, flex, gap }: Props): JSX.Element => {
  return (
    <Card bg={colors.milk} mt={mt} flex={flex} gap={gap}>
      {children}
    </Card>
  );
};
