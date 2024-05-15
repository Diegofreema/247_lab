export type StateType = {
  key: string;
  value: string;
};
// fname, lname, phone, email, statename, communityname, streetaddress;
export type UserType = {
  email: string;
  fname: string;
  lname: string;
  phone: string;
  statename: string;
  streetaddress: string;
  communityname: string;
};

export type ServiceType = {
  id: number;
  branch_id: number;
  categoryname: string;
  servicetitle: string;
  cost: number;
  netproshare: number;
  partnershare: number;
};

export type ValueType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  state: string;
  community: string;
};

export type LabBranch = {
  id: string;
  branch: string;
};

export type Cat = {
  categoryname: string;
};

export type Results = {
  test: string;
  branchaddress: string;
  branch: string;
  TestRef: string;
  Datex: string;
  status: 'Ready' | 'Pending';
  download: string;
  color: string;
  ref: string;
  fileext: string;
};

export type Test = {
  logistics: string;
  test: string;
  id: string;
  homeservice: 'Unavailable' | 'Available';
  cost: string;
};
