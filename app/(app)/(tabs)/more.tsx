import React from 'react';
import { Container } from '@/components/ui/Container';
import { ProfileImg } from '@/components/ui/profile/ProfileImg';
import { Center } from '@gluestack-ui/themed';
import { MoreLinks } from '@/components/ui/MoreLinks';

type Props = {};

const history = (props: Props) => {
  return (
    <Container>
      <Center mt={15}>
        <ProfileImg />
      </Center>
      <MoreLinks />
    </Container>
  );
};

export default history;
