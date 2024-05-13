import { useUser } from '@/lib/zustand/useUser';
import { StyleSheet, View, Text } from 'react-native';
import { Loading } from '../Loading';
import { ListItem } from '@rneui/themed';
import { MyText } from '../MyText';
import { colors } from '../../../constants';
import { Box } from '@gluestack-ui/themed';

type Props = {};

export const ProfileBody = ({}: Props): JSX.Element => {
  const { user } = useUser();

  return (
    <Box>
      <ProfileItem subTitle="Email address" title={user?.email} />
      <ProfileItem subTitle="Phone" title={user?.phone} />
      <ProfileItem subTitle="Community" title={user?.communityname} />
      <ProfileItem subTitle="State of Residence" title={user?.statename} />
      <ProfileItem subTitle="Address" title={user?.streetaddress} />
    </Box>
  );
};

const styles = StyleSheet.create({
  subTitle: { fontSize: 10, fontFamily: 'Poppins', color: colors.grey },
  title: { fontSize: 15, fontFamily: 'PoppinsMedium', color: colors.black },
});

const ProfileItem = ({ subTitle, title }: { subTitle: string; title: any }) => {
  const bottomDivider = subTitle === 'Address' ? false : true;
  return (
    <ListItem
      bottomDivider={bottomDivider}
      containerStyle={{ backgroundColor: 'transparent' }}
    >
      <ListItem.Content>
        <ListItem.Subtitle>
          <MyText text={subTitle} style={styles.subTitle} />
        </ListItem.Subtitle>
        <ListItem.Title>
          <MyText text={title} style={styles.title} />
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};
