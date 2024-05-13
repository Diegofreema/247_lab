import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '../helper';
import Toast from 'react-native-toast-message';

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
