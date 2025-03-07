import { Results } from "@/lib/@types";
import { Box } from "@gluestack-ui/themed";
import { FlatList } from "react-native";
import { SeeAll } from "./SeeAll";
import { useAuth } from "@/lib/zustand/auth";
import { BottomEmpty } from "./BottomEmpty";
import { ResultItem } from "../ResultItem";

type Props = {
  results: Results[];
};

export const BottomFlatList = ({ results }: Props): JSX.Element => {
  const { id } = useAuth();
  const hide = results?.length === 0;
  return (
    <Box flex={1}>
      <SeeAll
        heading="Resent Results"
        hide={hide}
        link={`/results?patientId=${id}`}
      />
      <FlatList
        style={{ marginTop: 10, flex: 1 }}
        data={results}
        keyExtractor={(item) => item.ref}
        renderItem={({ item, index }) => (
          <ResultItem item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, gap: 15, flexGrow: 1 }}
        ListEmptyComponent={() => <BottomEmpty />}
      />
    </Box>
  );
};
