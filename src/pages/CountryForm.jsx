import React, { useEffect } from 'react';
import CommonForm from '../components/CommonForm';
import * as yup from 'yup';
import {
  useCountryCreateApiMutation,
  useGetCountryByIdApiQuery,
  useUpdateCountryApiMutation,
} from '../services/api/CountryApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { APP } from '../constants/AppVariables';
import { toast } from 'react-toastify';
const RegionFormFields = [
  {
    id: 'country',
    label: 'Country',
    type: 'text',
    placeholder: 'Enter Country',
  },
  {
    id: 'countryCode',
    label: 'Country Code',
    type: 'text',
    placeholder: 'Enter Country Code',
  },
  {
    id: 'regions',
    label: 'Regions',
    type: 'text',
    placeholder: 'Enter Regions',
  },
  {
    id: 'areas',
    label: 'Areas',
    type: 'text',
    placeholder: 'Enter Areas',
  },
  {
    id: 'pincode',
    label: 'Pincode',
    type: 'text',
    placeholder: 'Enter Pincode',
  },
  {
    id: 'serviceCenterName',
    label: 'Service Center Name',
    type: 'text',
    placeholder: 'Enter Service Center Name',
  },
  {
    id: 'addressLine1',
    label: 'Address Line 1',
    type: 'text',
    placeholder: 'Enter Address Line 1',
  },
  {
    id: 'addressLine2',
    label: 'Address Line 2',
    type: 'text',
    placeholder: 'Enter Address Line 2',
  },
  {
    id: 'photos',
    label: 'Upload Photos (URLs)',
    type: 'file',
    placeholder: 'Enter Photo URL (comma separated)',
    accept: 'image/*',
  },
];

const regionFormValidationSchema = yup.object().shape({
  country: yup.string().required('Country is required'),
  countryCode: yup
    .string()
    .required('Country code is required')
    .max(2, 'Country code must be 3 characters long'),
  regions: yup.string().required('Regions code is required'),
  areas: yup.string().required('Area name is required'),
  pincode: yup
    .string()
    .required('Pincode is required')
    .matches(/^\d+$/, 'Pincode must be numeric'),
  serviceCenterName: yup.string().required('Service center name is required'),
  addressLine1: yup.string().required('Address line 1 is required'),
  addressLine2: yup.string().required('Address line 2 is required'),
  photos: yup
    .array()
    .of(yup.mixed())
    .min(1, 'At least one photo is required') // ✅ Add this line
    .required('At least one photo is required'),
});

const CountryForm = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [createCountryApi, createCountryApiResponse] =
    useCountryCreateApiMutation();
  const [updateCountryApi, updateCountryApiResponse] =
    useUpdateCountryApiMutation();
  const countryDataById = useGetCountryByIdApiQuery({ id }, { skip: !id });
  console.log(countryDataById, 'Country Data By Id');
  const navigate = useNavigate();

  const getDefaultValues = () => {
    if (!countryDataById.data) return;
    const firstRegion = countryDataById.data.regions?.[0];
    const firstArea = firstRegion?.areas?.[0];

    return {
      country: countryDataById.data.country,
      countryCode: countryDataById.data.countryCode,
      regions: firstRegion?.name,
      areas: firstArea?.name,
      pincode: firstArea?.pincode,
      serviceCenterName: firstArea?.serviceCenterName,
      addressLine1: firstArea?.addressLine1,
      addressLine2: firstArea?.addressLine2,
      photos: firstArea?.photos?.map((photo) => photo.name) || [],
    };
  };
  console.log(getDefaultValues(), 'Default Values');

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    const payload = {
      country: data.country,
      countryCode: data.countryCode,
      regions: [
        {
          name: data.regions,
          areas: [
            {
              name: data.areas,
              pincode: data.pincode,
              serviceCenterName: data.serviceCenterName,
              addressLine1: data.addressLine1,
              addressLine2: data.addressLine2,
              photos: data.photos,
            },
          ],
        },
      ],
    };
    if (id) {
      updateCountryApi({ body: payload, id }).unwrap();
      toast('Updated SuccessFully');
      navigate(APP.ROUTE.COUNTRY_LIST);
    } else {
      createCountryApi(payload).unwrap();
    }
  };
  console.log(createCountryApiResponse, 'Create Country Response');
  useEffect(() => {
    if (createCountryApiResponse?.isSuccess) {
      toast.success('Created SuccessFully');
      navigate(APP.ROUTE.COUNTRY_LIST);
    } else if (createCountryApiResponse?.isError) {
      toast.error(createCountryApiResponse?.error?.data?.error);
    }
  }, [createCountryApiResponse]);
  useEffect(() => {
    if (updateCountryApiResponse?.isSuccess) {
      toast.success('Created SuccessFully');
      navigate(APP.ROUTE.COUNTRY_LIST);
    } else if (updateCountryApiResponse?.isError) {
      toast.error(updateCountryApiResponse?.error?.data?.error);
    }
  }, [updateCountryApiResponse]);
  return (
    <div>
      <CommonForm
        fields={RegionFormFields}
        schema={regionFormValidationSchema}
        onSubmit={onSubmit}
        onCancel={() => navigate(APP.ROUTE.COUNTRY_LIST)}
        defaultValues={getDefaultValues()}
        isLoading={createCountryApiResponse?.isLoading}
        // fieldVisibility={fieldVisibility}
      />
    </div>
  );
};

export default CountryForm;
