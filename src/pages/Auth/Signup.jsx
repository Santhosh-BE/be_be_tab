import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { SignupSchema } from '../../schema/Schema';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { APP } from '../../constants/AppVariables';
import { useSignUpApiMutation } from '../../services/api/AuthApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [signupApi, signupApiResponse] = useSignUpApiMutation(); // Assuming you have a signup API mutation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    console.log(data, 'Login Data');
    signupApi({ email: data.email, password: data.password });
    localStorage.setItem('authToken', data);
    // navigate(APP.ROUTE.LOGIN);
  };
  useEffect(() => {
    if (signupApiResponse.isSuccess) {
      navigate(APP.ROUTE.LOGIN);
      toast.success('Account Created Successfully..');
    } else if (signupApiResponse.isError) {
      console.error('Signup failed:', signupApiResponse.error);
      toast.error(signupApiResponse?.error?.data?.error);
    }
  }, [signupApiResponse]);
  console.log(signupApiResponse, 'Signup Response');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 w-full">
      <div className="rounded-lg w-full max-w-5xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://knowmax-ai-website.s3.amazonaws.com/wp-content/uploads/2023/12/26004145/Customer-Service-Call-Center.webp"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 w-full p-10 bg-white">
          <div className="flex flex-col items-center mb-6">
            {/* <img
              src={'signupTitle'}
              alt="Signup Illustration"
              className="w-1/2 h-1/2 object-cover"
            /> */}
            <h1>BE-BE-TAB Registration</h1>
            <div className="border-t w-full mt-2 mb-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-700 mb-4">Signup</h1>

          <div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between space-x-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                    {...register('firstName')}
                    className="pr-10 h-14"
                  />
                  <div className="min-h-[20px]">
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    placeholder="Enter your lastName"
                    {...register('lastName')}
                    className="pr-10 h-14"
                  />
                  <div className="min-h-[20px]">
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className="pr-10 h-14"
                />
                <div className="min-h-[20px]">
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    {...register('password')}
                    className="pr-10 h-14"
                  />
                </div>
                <div className="min-h-[20px]">
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-4 h-10 rounded-2xl"
                isLoading={signupApiResponse?.isLoading}
              >
                Signup
              </Button>
            </form>
            <div className="flex items-center justify-start mt-2">
              <span>Already have an account? </span>
              <Link to={APP.ROUTE.LOGIN} className="text-sm text-[#0F31AD]  ">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
