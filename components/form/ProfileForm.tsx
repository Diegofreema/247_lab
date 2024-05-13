import { StyleSheet, Text, ScrollView } from 'react-native';
import { TextInput } from '../ui/TextInput';
import { SelectList } from 'react-native-dropdown-select-list';
import { ActivityIndicator } from 'react-native-paper';
import { Box, VStack } from '@gluestack-ui/themed';
import { useFormik } from 'formik';
import { EditFormSchema } from '@/lib/validators';
import { api } from '@/lib/helper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useAuth } from '@/lib/zustand/auth';
import { useStates } from '@/lib/tanstack/queries';
import { useCommunities } from '@/hooks/useCommunities';
import { ErrorComponent } from '../ui/Error';
import { Loading } from '../ui/Loading';
import { MyButton } from '../ui/MyButton';
import { useUser } from '@/lib/zustand/useUser';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';

export const ProfileForm = (): JSX.Element => {
  const { id } = useAuth();
  const { data, isPending, isError, refetch, isPaused } = useStates();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
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
      phoneNumber: '',
      address: '',
      state: 'Abuja',
      community: '',
    },
    validationSchema: EditFormSchema,
    onSubmit: async (values) => {
      const { address, email, firstName, lastName, state, community } = values;

      try {
        const { data } = await axios.post(
          `${api}api=updatepatientinfo&patientid=${id}&email=${email}&fname=${firstName}&lname=${lastName}&phone=${phoneNumber}&statename=${state}&communityname=${community}&address=${address}`
        );
        console.log(data, 'sent data');

        if (data?.result === 'You cannot update your data at this time') {
          Toast.show({
            type: 'transparentToast',
            text1: 'Failed to update',
            text2: 'You cannot update your data at this time',
            position: 'top',
          });
          return;
        }

        if (data?.result === 'updated') {
          Toast.show({
            type: 'transparentToast',
            text1: 'Successfully updated',
            text2: 'Your profile has been updated',
            position: 'top',
          });
          queryClient.invalidateQueries({ queryKey: ['profile'] });
          router.back();
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

  useEffect(() => {
    if (!user) return;
    setValues({
      ...values,
      address: user.streetaddress,
      email: user.email,
      community: user.communityname,
      firstName: user.fname,
      lastName: user.lname,
      phoneNumber: user.phone,
      state: user.statename,
    });

    setIsLoading(false);
  }, [user]);

  const { address, email, firstName, lastName, phoneNumber, community, state } =
    values;
  const handleRefetch = () => {
    refetch();
  };
  const { communities, fetching } = useCommunities(state);
  if (isError || isPaused) {
    return <ErrorComponent refetch={handleRefetch} />;
  }

  if (isPending || isLoading) {
    return <Loading />;
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
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
              key: state,
              value: state,
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

        <MyButton
          loading={isSubmitting}
          onPress={() => handleSubmit()}
          text={isSubmitting ? 'Updating...' : 'Update Profile'}
        />
      </VStack>
    </ScrollView>
  );
};

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
