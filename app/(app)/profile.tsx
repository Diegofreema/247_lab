import React from "react";
import { Container } from "@/components/ui/Container";
import { CardCase } from "@/components/ui/Card";
import { ProfileImg } from "@/components/ui/profile/ProfileImg";
import { NavHeader } from "@/components/ui/NavHeader";
import { HStack } from "@gluestack-ui/themed";
import { MyButton } from "@/components/ui/MyButton";
import { ProfileBody } from "@/components/ui/profile/ProfileBody";
import { router } from "expo-router";

const profile = () => {
  const onPress = () => {
    router.push("/edit-profile");
  };
  return (
    <Container>
      <NavHeader title="Profile" />

      <CardCase mt={20}>
        <HStack justifyContent="space-between" alignItems="center">
          <ProfileImg
            containerStyle={{ flexDirection: "row" }}
            imageStyle={{ width: 50, height: 50 }}
          />
          <MyButton
            icon="account-edit-outline"
            text="Edit"
            onPress={onPress}
            style={{ height: 35 }}
          />
        </HStack>
      </CardCase>

      <CardCase mt={25}>
        <ProfileBody />
      </CardCase>
    </Container>
  );
};

export default profile;
