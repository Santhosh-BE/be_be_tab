import React, { useEffect } from 'react';
import CommonForm from '../../components/CommonForm';
import * as yup from 'yup';
import {
  useCountryCreateApiMutation,
  useGetCountryByIdApiQuery,
  useUpdateCountryApiMutation,
} from '../../services/api/CountryApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { APP } from '../../constants/AppVariables';
import { toast } from 'react-toastify';
const ServiceCenterFormFields = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter name',
  },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    placeholder: 'Enter description',
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    type: 'text',
    placeholder: 'Enter phone number',
  },
  {
    id: 'thumbnailImageUrl',
    label: 'Thumbnail Image',
    type: 'file', // Assuming you use ImageUploadGrid
    accept: 'image/*',
  },
];

const serviceCenterFormValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  thumbnailImageUrl: yup
    .array()
    .of(yup.mixed())
    .min(1, 'At least one photo is required') // ✅ Add this line
    .required('At least one photo is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?\d{7,15}$/, 'Invalid phone number'),
});

const CustomerForm = () => {
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
      navigate(APP.ROUTE.CUSTOMER_SERVICE_LIST);
    } else {
      createCountryApi(payload).unwrap();
      navigate(APP.ROUTE.CUSTOMER_SERVICE_LIST);
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
        fields={ServiceCenterFormFields}
        schema={serviceCenterFormValidationSchema}
        onSubmit={onSubmit}
        onCancel={() => navigate(APP.ROUTE.CUSTOMER_SERVICE_LIST)}
        defaultValues={getDefaultValues()}
        // fieldVisibility={fieldVisibility}
      />
    </div>
  );
};

export default CustomerForm;
