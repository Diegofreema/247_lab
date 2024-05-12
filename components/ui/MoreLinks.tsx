import { colors } from '@/constants';
import { profileLinks } from '@/lib/data';
import { VStack } from '@gluestack-ui/themed';
import { Icon, ListItem } from '@rneui/themed';
import { StyleSheet, View, Text } from 'react-native';
import { MyText } from './MyText';
import { useRouter } from 'expo-router';

type Props = {};

export const MoreLinks = ({}: Props): JSX.Element => {
  return (
    <VStack gap={10} mt={25}>
      {profileLinks.map((item, i) => (
        <LinkItem key={i} item={item} />
      ))}
    </VStack>
  );
};

const styles = StyleSheet.create({
  text: {},
  container: {
    backgroundColor: colors.milk,
    borderRadius: 15,
  },
});

type ItemType = {
  item: (typeof profileLinks)[0];
};
const LinkItem = ({ item }: ItemType) => {
  const router = useRouter();

  const onPress = () => {
    router.push(item.link);
  };

  const color = item.name === 'log-out' ? colors.red : colors.green;
  return (
    <ListItem containerStyle={styles.container} onPress={onPress}>
      <Icon name={item.name} type="feather" color={color} size={30} />
      <ListItem.Content>
        <ListItem.Title style={styles.text}>
          <MyText
            text={item.label}
            style={{ color: color, fontFamily: 'PoppinsBold' }}
          />
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};
