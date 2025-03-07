import { FlatList } from "react-native";
import React from "react";
import { Container } from "@/components/ui/Container";
import { useResults } from "@/lib/tanstack/queries";
import { ErrorComponent } from "@/components/ui/Error";
import { Loading } from "@/components/ui/Loading";
import { ResultItem } from "@/components/ui/ResultItem";
import { BottomEmpty } from "@/components/ui/home/BottomEmpty";

const Page = () => {
  const {
    data: results,
    isError: isErrorResults,
    isPending: isPendingResults,
    refetch: refetchResults,
    isPaused: isPausedResults,
  } = useResults();

  const handleRefetch = () => {
    refetchResults();
  };

  if (isErrorResults || isPausedResults) {
    return <ErrorComponent refetch={handleRefetch} />;
  }

  if (isPendingResults) {
    return <Loading />;
  }
  return (
    <Container>
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
    </Container>
  );
};

export default Page;
