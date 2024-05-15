import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Cat,
  LabBranch,
  Results,
  ServiceType,
  StateType,
  Test,
  UserType,
} from '../@types';
import { useAuth } from '../zustand/auth';
import { useUser } from '../zustand/useUser';

const api = process.env.EXPO_PUBLIC_URL;

export const useStates = () => {
  const getStates = async () => {
    const { data } = await axios.get(
      `https://247labapi.netpro.software/api.aspx?api=getstates`
    );

    const formattedData = data.map((state: any) => ({
      key: state.statename,
      value: state.statename,
    }));

    console.log(data);

    return formattedData as StateType[];
  };
  return useQuery({
    queryKey: ['states'],
    queryFn: getStates,
  });
};

export const useCommunity = (state: string) => {
  console.log('🚀 ~ useCommunity ~ state:', state);
  const getCommunity = async () => {
    const { data } = await axios.get(
      `https://247labapi.netpro.software/api.aspx?api=getcommunities&statename=${state}`
    );
    console.log('🚀 ~ useCommunity ~ data:', data);
    const formattedData = data.map((community: any) => ({
      key: community?.commname,
      value: community?.commname,
    }));

    return formattedData as StateType[];
  };
  return useQuery({
    queryKey: ['community', state],
    queryFn: getCommunity,
  });
};

export const useGetServices = () => {
  const getServices = async () => {
    const response = await axios.get(
      'http://247laboratory.net/branches/getservices'
    );
    let data = [];
    if (Object.prototype.toString.call(response.data) === '[object Object]') {
      data.push(response.data);
    } else if (
      Object.prototype.toString.call(response.data) === '[object Array]'
    ) {
      data = [...response.data];
    }

    return data as ServiceType[];
  };
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });
};

export const useProfile = () => {
  const { id } = useAuth();
  const { getUser } = useUser();
  const getProfile = async () => {
    const { data } = await axios.get(
      `${api}api=getpatientinfo&patientid=${id}`
    );

    getUser(data);
    return data as UserType;
  };

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
};

export const useLabs = (id: any) => {
  const getLabs = async () => {
    const response = await axios.get(`${api}api=getlab&patientid=${id}`);
    let data = [];
    if (Object.prototype.toString.call(response.data) === '[object Object]') {
      data.push(response.data);
    } else if (
      Object.prototype.toString.call(response.data) === '[object Array]'
    ) {
      data = [...response.data];
    }
    return data as LabBranch[];
  };

  return useQuery({
    queryKey: ['labs', id],
    queryFn: getLabs,
  });
};
export const useTestCat = (id: string) => {
  const getTestCatssd = async () => {
    const { data } = await axios.get(
      `${api}api=gettestcategory&branchid=${id}`
    );
    return data;
  };

  return useQuery<Cat[]>({
    queryKey: ['testCats'],
    queryFn: getTestCatssd,
  });
};
export const useResults = () => {
  const { id } = useAuth();
  const getResults = async () => {
    const response = await axios.get(
      `${api}api=getpasttestinfo&patientid=${id}`
    );
    let data = [];
    if (Object.prototype.toString.call(response.data) === '[object Object]') {
      data.push(response.data);
    } else if (
      Object.prototype.toString.call(response.data) === '[object Array]'
    ) {
      data = [...response.data];
    }

    return data;
  };

  return useQuery<Results[]>({
    queryKey: ['results'],
    queryFn: getResults,
  });
};
export const useTestFetch = (branchId: string, cat: string) => {
  const { id } = useAuth();
  const getTests = async () => {
    const response = await axios.get(
      `${api}api=gettest&patientid=${id}&branchid=${branchId}&testcategoryid=${cat}`
    );
    let data = [];
    if (Object.prototype.toString.call(response.data) === '[object Object]') {
      data.push(response.data);
    } else if (
      Object.prototype.toString.call(response.data) === '[object Array]'
    ) {
      data = [...response.data];
    }

    return data;
  };

  return useQuery<Test[]>({
    queryKey: ['tests', branchId, cat],
    queryFn: getTests,
  });
};
