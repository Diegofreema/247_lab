import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { VStack } from '@gluestack-ui/themed';
import { NavHeader } from '@/components/ui/NavHeader';
import { Container } from '@/components/ui/Container';
import { BoldHeader } from '@/components/ui/BoldHeader';
import { TextInput } from '@/components/ui/TextInput';

import { MyButton } from '@/components/ui/MyButton';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { api } from '@/lib/helper';
import Toast from 'react-native-toast-message';
import { LoadingComponent } from '@/components/ui/Modals/LoadingModal';
import { useAuth } from '@/lib/zustand/auth';
import { colors } from '@/constants';
type Props = {};
const validationSchema = yup.object().shape({
  username: yup.string().required('Full name is required'),
  password: yup.string().required('Password is required'),
});
const Login = (props: Props) => {
  const router = useRouter();
  const [secured, setSecured] = useState(true);
  const { setId } = useAuth();
  const {
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('🚀 ~ onSubmit: ~ values:', values);
      const formattedPassword = values.password
        .replace(/[#?\/\\%&]/g, '')
        .replace(/:/g, '');
      try {
        const { data } = await axios.post(
          `http://247laboratory.net/branches/signin`,
          {
            username: values.username,
            password: formattedPassword,
          }
        );
        console.log(data.error, 'sent data');

        if (data.error === 'invalid login codes') {
          Toast.show({
            type: 'transparentToast',
            text1: 'Please try again',
            text2: 'Incorrect credentials',
            position: 'top',
          });
          return;
        }

        // setId(data);
        // router.push('/home');
      } catch (error) {
        console.log(error, 'error from form');
        Toast.show({
          type: 'transparentToast',
          text1: 'Please try again',
          text2: 'Something went wrong',
          position: 'top',
        });
      }
    },
  });
  const navigate = () => {
    router.push('/sign-up');
  };

  const { username, password } = values;
  console.log('🚀 ~ Login ~ username:', username, password);
  console.log(errors);

  return (
    <>
      <LoadingComponent isLoading={isSubmitting} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      >
        <Container>
          <VStack mt={30}>
            <BoldHeader
              text="Sign in"
              subText="Enter your Login details on to continue"
            />
          </VStack>

          <VStack mt={40} gap={25}>
            <>
              <TextInput
                value={username}
                placeholder="Full name"
                onChangeText={handleChange('username')}
              />

              {errors.username && touched.username && (
                <Text style={{ color: 'red' }}>{errors.username}</Text>
              )}
            </>

            <>
              <TextInput
                value={password}
                secureTextEntry={secured}
                placeholder="Password"
                onChangeText={handleChange('password')}
                password
                secured={secured}
                setSecured={setSecured}
              />

              {errors.password && touched.password && (
                <Text style={{ color: 'red' }}>{errors.password}</Text>
              )}
            </>

            <Pressable
              onPress={() => router.push('/forgot')}
              style={({ pressed }) => [
                styles.textContainer,
                { opacity: pressed ? 0.5 : 1 },
              ]}
            >
              <Text style={styles.text}>Forgot password</Text>
            </Pressable>

            <MyButton
              loading={isSubmitting}
              onPress={() => handleSubmit()}
              text="Login"
            />

            <Pressable
              onPress={navigate}
              style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                { padding: 4 },
              ]}
            >
              <Text style={styles.createAccountText}>
                Don’t have an account?{' '}
                <Text style={styles.text}>Create Account</Text>
              </Text>
            </Pressable>
          </VStack>
        </Container>
      </ScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  text: {
    color: colors.green,
    fontFamily: 'Poppins',
  },
  textContainer: {
    alignSelf: 'flex-end',
  },
  createAccountText: {
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});
