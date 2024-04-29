import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { StateType } from '../@types';

export const useStates = () => {
  const getStates = async () => {
    const { data } = await axios.get(
      'http://247laboratory.net/branches/getstates'
    );

    const formattedData = data.map((state: any) => ({
      key: state.statename,
      value: state.statename,
    }));

    return formattedData as StateType[];
  };
  return useQuery({
    queryKey: ['states'],
    queryFn: getStates,
  });
};
