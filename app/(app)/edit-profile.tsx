import React from "react";
import { Container } from "@/components/ui/Container";
import { ProfileForm } from "@/components/form/ProfileForm";
import { NavHeader } from "@/components/ui/NavHeader";

const EditProfile = () => {
  return (
    <Container>
      <NavHeader title="Edit Profile" />
      <ProfileForm />
    </Container>
  );
};

export default EditProfile;
