import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '../helper';
import Toast from 'react-native-toast-message';
import { useAuth } from '../zustand/auth';

export type Value = {
  logisticsvalue: any;
  branchid: string;
  patientid: string;
  testid: string;
};

export const useBookMutation = () => {
  return useMutation({
    mutationFn: async ({
      branchid,
      patientid,
      testid,
      logisticsvalue,
    }: Value) => {
      const { data } = await axios.get(
        `${api}api=book&branchid=${branchid}&logisticsvalue=${logisticsvalue}&patientid=${patientid}&testid=${testid}`
      );

      return data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error.message);
      Toast.show({
        type: 'transparentToast',
        text1: 'Failed to book',
        text2: 'Please try again',
        position: 'top',
      });
    },
  });
};
export const useDeleteAccount = () => {
  const { id } = useAuth();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.get(
        `https://247labapi.netpro.software/api.aspx?api=deleteuser&myuserid=${id}`
      );

      return data;
    },
    onSuccess: (data) => {
      Toast.show({
        type: 'transparentToast',
        text1: 'Success',
        text2: 'Profile deleted successfully',
        position: 'top',
      });
    },
    onError: (error) => {
      console.log(error.message);
      Toast.show({
        type: 'transparentToast',
        text1: 'Failed to delete profile',
        text2: 'Please try again later',
        position: 'top',
      });
    },
  });
};
