import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { APP } from '../constants/AppVariables';
import { MainLayout } from '../components/layout';
import AddressForm from '../pages/AddressForm';

const Login = lazy(() => import('../pages/Auth/Login'));
const Signup = lazy(() => import('../pages/Auth/Signup'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Upload = lazy(() => import('../pages/Upload'));
const ViewGallery = lazy(() => import('../pages/ViewGallery'));
const ManageAddress = lazy(() => import('../pages/ManageAddress'));
const MapToAddress = lazy(() => import('../pages/MapToAddress'));
const MediaToContent = lazy(() => import('../pages/MediaToContent'));
const CountryForm = lazy(() => import('../pages/CountryForm'));
const CountryList = lazy(() => import('../pages/CountryList'));
const CustomerServiceList = lazy(
  () => import('../pages/CustomerService/CustomerServiceList'),
);
const CustomerServiceForm = lazy(
  () => import('../pages/CustomerService/CustomerForm'),
);
const Photos = lazy(() => import('../pages/Photos'));
const Videos = lazy(() => import('../pages/Videos'));
const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={APP.ROUTE.LOGIN} element={<Login />} />
          <Route path={APP.ROUTE.SIGNUP} element={<Signup />} />
          <Route element={<MainLayout />}>
            <Route path={APP.ROUTE.DASHBOARD} element={<Dashboard />} />
            <Route path={APP.ROUTE.COUNTRY_LIST} element={<CountryList />} />
            <Route path={APP.ROUTE.UPLOAD_MEDIA} element={<Upload />} />
            <Route path={APP.ROUTE.VIEW_GALLERY} element={<ViewGallery />} />
            <Route path={APP.ROUTE.ADDRESS_FORM} element={<AddressForm />} />
            <Route path={APP.ROUTE.COUNTRY_FORM} element={<CountryForm />} />
            <Route
              path={APP.ROUTE.CUSTOMER_SERVICE_FORM}
              element={<CustomerServiceForm />}
            />
            <Route
              path={APP.ROUTE.CUSTOMER_SERVICE_LIST}
              element={<CustomerServiceList />}
            />
            <Route path={APP.ROUTE.PHOTOS} element={<Photos />} />
            <Route path={APP.ROUTE.VIDEOS} element={<Videos />} />
            <Route
              path={APP.ROUTE.MANAGE_ADDRESS}
              element={<ManageAddress />}
            />
            <Route path={APP.ROUTE.MAP_TO_ADDRESS} element={<MapToAddress />} />
            <Route
              path={APP.ROUTE.MEDIA_TO_CONTENT}
              element={<MediaToContent />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
