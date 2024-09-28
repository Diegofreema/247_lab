import { BoldHeader } from '@/components/ui/BoldHeader';
import { Container } from '@/components/ui/Container';
import { TextInput } from '@/components/ui/TextInput';
import { VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { LoadingComponent } from '@/components/ui/Modals/LoadingModal';
import { MyButton } from '@/components/ui/MyButton';
import { colors } from '@/constants';
import { api } from '@/lib/helper';
import { useAuth } from '@/lib/zustand/auth';
import axios from 'axios';
import { useFormik } from 'formik';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
type Props = {};
const validationSchema = yup.object().shape({
  email: yup.string().required('Full name is required'),
  password: yup.string().required('Password is required'),
});
const Login = (props: Props) => {
  const router = useRouter();
  const [secured, setSecured] = useState(true);
  const { setUser } = useAuth();
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
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('🚀 ~ onSubmit: ~ values:', values);
      const formattedPassword = values.password
        .replace(/[#?\/\\%&]/g, '')
        .replace(/:/g, '');
      try {
        const { data } = await axios.get(
          `${api}api=patientlogin&email=${values.email}&pasword=${formattedPassword}`
        );
        console.log(data, 'sent data');

        if (data.result === 'incorrect email or password') {
          Toast.show({
            type: 'transparentToast',
            text1: 'Please try again',
            text2: 'Incorrect credentials',
            position: 'top',
          });
          return;
        }

        if (data?.patientid) {
          setUser(data?.patientid);
          Toast.show({
            type: 'transparentToast',
            text1: 'Login Successful',
            text2: `Welcome back`,
            position: 'top',
          });
          resetForm();
          router.push('/home');
        }
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

  const { email, password } = values;
  console.log('🚀 ~ Login ~ email:', email, password);
  console.log(errors);

  return (
    <>
      <LoadingComponent isLoading={isSubmitting} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: 'white' }}
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
                keyboardType="email-address"
                value={email}
                placeholder="Email"
                onChangeText={handleChange('email')}
                autoCapitalize="none"
              />

              {errors.email && touched.email && (
                <Text style={{ color: 'red' }}>{errors.email}</Text>
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
              text={isSubmitting ? 'Logging in...' : 'Log In'}
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
