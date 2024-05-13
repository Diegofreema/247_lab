import {
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Box, VStack } from '@gluestack-ui/themed';

import { useRouter } from 'expo-router';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { api } from '@/lib/helper';
import { Container } from '@/components/ui/Container';
import { NavHeader } from '@/components/ui/NavHeader';
import { ConfirmModal } from '@/components/ui/Modals/ConfirmModal';
import { BoldHeader } from '@/components/ui/BoldHeader';
import { TextInput } from '@/components/ui/TextInput';
import { colors } from '@/constants';
import { MyButton } from '@/components/ui/MyButton';
import { useCommunity, useStates } from '@/lib/tanstack/queries';
import { ErrorComponent } from '@/components/ui/Error';
import { Loading } from '@/components/ui/Loading';
import { useAuth } from '@/lib/zustand/auth';
import { StateType } from '@/lib/@types';
import { ActivityIndicator } from 'react-native-paper';
import { useCommunities } from '@/hooks/useCommunities';
import { RegisterSchema, defaultDateOfBirth } from '@/lib/validators';

type Props = {};

const signUp = (props: Props) => {
  const router = useRouter();
  const [date, setDate] = useState(new Date(defaultDateOfBirth));
  const [showModal, setShowModal] = useState(false);
  const { data, isPending, isError, refetch, isPaused } = useStates();

  const [show, setShow] = useState(false);

  const {
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
    setValues,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      address: '',
      dateOfBirth: format(defaultDateOfBirth, 'yyyy-mm-dd'),
      state: 'Abuja',
      community: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const {
        address,
        dateOfBirth,
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        state,
        community,
      } = values;

      const formattedPassword = password
        .replace(/[#?\/\\%&]/g, '')
        .replace(/:/g, '');
      try {
        const { data } = await axios.post(
          `${api}api=registerpatient&email=${email}&fname=${firstName}&lname=${lastName}&phone=${phoneNumber}&dob=${dateOfBirth}&statename=${state}&communityname=${community}&address=${address}&pasword=${formattedPassword}`
        );
        console.log(data, 'sent data');

        if (data?.patientid) {
          setShowModal(true);
          Toast.show({
            type: 'transparentToast',
            text1: 'Account has been created',
            text2: 'Welcome to 247lab, Please sign in',
            position: 'top',
          });
          return;
        }

        if (data?.result === 'Email Already Exist') {
          Toast.show({
            type: 'transparentToast',
            text1: 'Email already exist',
            text2: 'Please use another email address',
            position: 'top',
          });
          return;
        }

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong. Please try again',
          position: 'top',
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'transparentToast',
          text1: 'Error',
          text2: 'Something went wrong',
          position: 'top',
        });
      }
    },
  });
  const {
    address,
    confirmPassword,
    dateOfBirth,
    email,
    firstName,

    lastName,
    password,
    phoneNumber,
    community,
    state,
  } = values;

  const { communities, fetching } = useCommunities(state);
  const handleRefetch = () => {
    refetch();
  };
  if (isError || isPaused) {
    return <ErrorComponent refetch={handleRefetch} />;
  }

  if (isPending) {
    return <Loading />;
  }

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      setValues({ ...values, dateOfBirth: format(currentDate, 'yyyy-mm-dd') });
    }
  };

  const showMode = () => {
    setShow(true);
  };

  // const onChangeIos = () => {
  //   setValues({ ...values, dateOfBirth: format(date, 'yyyy-MM-dd') });
  // };
  const onPress = () => {
    router.replace('/onboard');
    setShowModal(false);
    resetForm();
  };

  console.log(errors);

  return (
    <Container>
      <ConfirmModal name={firstName} onPress={onPress} isVisible={showModal} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        <NavHeader />
        <VStack mt={30}>
          <BoldHeader
            text="Sign up"
            subText="Enter your details on to create account"
          />
        </VStack>

        <VStack mt={40} gap={25}>
          <>
            <TextInput
              value={firstName}
              placeholder="First name"
              onChangeText={handleChange('firstName')}
            />
            {touched.firstName && errors.firstName && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.firstName}
              </Text>
            )}
          </>
          <>
            <TextInput
              value={lastName}
              placeholder="Last name"
              onChangeText={handleChange('lastName')}
            />

            {touched.lastName && errors.lastName && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.lastName}
              </Text>
            )}
          </>
          <>
            <TextInput
              keyboardType="email-address"
              value={email}
              placeholder="Email"
              onChangeText={handleChange('email')}
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.email}
              </Text>
            )}
          </>
          <>
            <TextInput
              value={phoneNumber}
              placeholder="Phone"
              onChangeText={handleChange('phoneNumber')}
              keyboardType="phone-pad"
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.phoneNumber}
              </Text>
            )}
          </>

          <>
            <SelectList
              search={false}
              boxStyles={{
                ...styles2.border,
                justifyContent: 'flex-start',
                backgroundColor: 'white',
                alignItems: 'center',
              }}
              inputStyles={{
                textAlign: 'left',
                color: 'black',
              }}
              fontFamily="Poppins"
              setSelected={handleChange('state')}
              data={data}
              defaultOption={{
                key: 'Abuja',
                value: 'Abuja',
              }}
              save="key"
              placeholder="State"
            />

            {touched.state && errors.state && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.state}
              </Text>
            )}
          </>

          <>
            {fetching ? (
              <Box style={[styles2.border, { paddingLeft: 15 }]}>
                <ActivityIndicator color="black" />
              </Box>
            ) : (
              <SelectList
                search={false}
                boxStyles={{
                  ...styles2.border,
                  justifyContent: 'flex-start',
                  backgroundColor: 'white',
                  alignItems: 'center',
                }}
                inputStyles={{
                  textAlign: 'left',
                  color: 'black',
                }}
                fontFamily="Poppins"
                setSelected={handleChange('community')}
                data={communities}
                defaultOption={communities?.[0]}
                save="key"
                placeholder="Community"
              />
            )}

            {touched.state && errors.state && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.state}
              </Text>
            )}
          </>
          <>
            {Platform.OS === 'android' && (
              <>
                <Pressable
                  onPress={showMode}
                  style={({ pressed }) => pressed && { opacity: 0.5 }}
                >
                  <TextInput
                    value={dateOfBirth}
                    placeholder="Date of Birth"
                    editable={false}
                  />
                </Pressable>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    onChange={onChange}
                    display="spinner"
                  />
                )}
              </>
            )}
            {Platform.OS === 'ios' && (
              <>
                <Pressable
                  onPress={showMode}
                  style={({ pressed }) => pressed && { opacity: 0.5 }}
                >
                  <TextInput
                    value={format(date, 'dd/MM/yyyy')}
                    placeholder="Date of Birth"
                    editable={false}
                  />
                </Pressable>
                {show && (
                  <>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={'date'}
                      is24Hour={true}
                      onChange={onChange}
                      display="spinner"
                      style={{ height: 120, marginTop: -10 }}
                    />
                  </>
                )}
              </>
            )}
            {touched.dateOfBirth && errors.dateOfBirth && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.dateOfBirth}
              </Text>
            )}
          </>

          <>
            <TextInput
              value={address}
              placeholder="Street Address"
              onChangeText={handleChange('address')}
            />
            {touched.address && errors.address && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.address}
              </Text>
            )}
          </>
          <>
            <TextInput
              value={password}
              placeholder="Password"
              onChangeText={handleChange('password')}
            />
            {touched.password && errors.password && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.password}
              </Text>
            )}
          </>
          <>
            <TextInput
              value={confirmPassword}
              placeholder="Confirm Password"
              onChangeText={handleChange('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.confirmPassword}
              </Text>
            )}
          </>

          <MyButton
            loading={isSubmitting}
            onPress={() => handleSubmit()}
            text={isSubmitting ? 'Creating...' : 'Create Account'}
          />
        </VStack>
      </ScrollView>
    </Container>
  );
};

export default signUp;

const styles2 = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    minHeight: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
