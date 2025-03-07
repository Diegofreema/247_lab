import { Box } from "@gluestack-ui/themed";
import { FlatList, Pressable } from "react-native";
import { MyText } from "../MyText";
import { colors } from "@/constants";
import { LabBranch } from "@/lib/@types";
import { EmptyText } from "../EmptyText";
import { CardCase } from "../Card";
import { useUser } from "@/lib/zustand/useUser";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import { router, usePathname } from "expo-router";
import { SeeAll } from "./SeeAll";
type Props = {
  labs: LabBranch[];
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Branches = ({ labs }: Props): JSX.Element => {
  const { user } = useUser();
  const hide = labs.length < 2;
  return (
    <Box mt={20}>
      <FlatList
        ListHeaderComponent={
          <SeeAll
            heading="Select a branch close to you"
            hide={hide}
            link="/labs"
          />
        }
        numColumns={2}
        data={labs}
        renderItem={({ item, index }) => (
          <BranchItem item={item} index={index} />
        )}
        keyExtractor={(item) => item?.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, gap: 15 }}
        columnWrapperStyle={{ gap: 15 }}
        ListEmptyComponent={
          <EmptyText
            text={`No branches found in ${user?.statename} state yet`}
          />
        }
      />
    </Box>
  );
};

export const BranchItem = ({
  item,
  index,
}: {
  item: LabBranch;
  index: number;
}) => {
  const AnimateMotion = index % 2 === 0 ? SlideInLeft : SlideInRight;
  const onPress = () => {
    router.push(`/test?id=${item?.id}`);
  };
  const pathname = usePathname();
  const isHome = pathname === "/home";
  return (
    <AnimatedPressable
      onPress={onPress}
      entering={AnimateMotion.delay(500).springify().damping(20)}
      style={{ width: isHome ? "48%" : "100%" }}
    >
      <CardCase flex={1}>
        <MyText
          text={item?.branch}
          style={{
            color: colors.black,
            fontFamily: "PoppinsBold",
            textAlign: "center",
          }}
        />
      </CardCase>
    </AnimatedPressable>
  );
};
