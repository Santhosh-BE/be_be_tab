import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
export const AddressSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  street: yup.string().required('street is required'),
  city: yup.string().required('city is required'),
  state: yup.string().required('state is required'),
  zip: yup.string().required('zip is required'),
  type: yup
    .string()
    .oneOf(['Residential', 'Commercial', 'Park', 'Office', 'Other'])
    .required('Type is required'),
  notes: yup.string().nullable(),
});
