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
