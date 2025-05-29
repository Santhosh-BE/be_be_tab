import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LoginSchema } from '../../schema/Schema';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data) => {
    console.log(data, 'Login Data');
    localStorage.setItem('authToken', data);
    navigate(APP.ROUTE.DASHBOARD);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 w-full">
      <div className="rounded-lg w-full max-w-5xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://knowmax-ai-website.s3.amazonaws.com/wp-content/uploads/2023/12/26004145/Customer-Service-Call-Center.webp"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 w-full p-10 bg-white">
          <div className="flex flex-col items-center mb-6">
            <img
              src={'loginTitle'}
              alt="Login Illustration"
              className="w-1/2 h-1/2 object-cover"
            />
            <div className="border-t w-full mt-2 mb-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-700 mb-4">Login</h1>

          <div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className="pr-10 h-14"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
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
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end mt-2">
                <Link to="#" className="text-sm text-[#0F31AD]  ">
                  Forget Password
                </Link>
              </div>

              <Button type="submit" className="w-full mt-4 h-10 rounded-2xl">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
