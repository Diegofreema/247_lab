import { UserType } from '@/lib/@types';
import { Avatar, Box, HStack, VStack } from '@gluestack-ui/themed';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { MyText } from '../MyText';
import { colors } from '@/constants';
import { Link } from 'expo-router';

type Props = {
  user: UserType;
};

export const ProfileHeader = ({ user }: Props): JSX.Element => {
  const { fname, lname } = user;
  const firstLetter = fname?.charAt(0).toUpperCase();
  const lastLetter = lname?.charAt(0).toUpperCase();
  return (
    <Link href="/profile" asChild>
      <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
        <HStack mt={10} gap={5}>
          <Box
            borderRadius={50}
            bg={colors.green}
            alignItems="center"
            justifyContent="center"
            style={{ width: 50, height: 50 }}
          >
            <MyText
              text={`${firstLetter}${lastLetter}`}
              style={{ fontSize: 20 }}
            />
          </Box>
          <VStack>
            <MyText
              text={`Hello, ${fname} `}
              style={{ fontSize: 15, color: colors.black }}
            />
            <MyText
              text={`Let’s Check Your health`}
              style={{ fontSize: 12, color: colors.grey }}
            />
          </VStack>
        </HStack>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({});
