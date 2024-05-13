import * as yup from 'yup';

export const defaultDateOfBirth = new Date(
  new Date().setFullYear(new Date().getFullYear() - 18)
);
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
export const RegisterSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(
      passwordRegExp,
      'Password must include at least one capital letter, one number, one lower case letter, and one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  community: yup.string().required('Community is required'),
  state: yup.string().required('State is required'),
});

export const EditFormSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  community: yup.string().required('Community is required'),
  state: yup.string().required('State is required'),
});
