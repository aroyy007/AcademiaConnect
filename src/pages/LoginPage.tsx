import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { demoCredentials } from '../lib/demoCredentials';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const loginSchema = z.object({
  email: z.string().email().endsWith('@eastdelta.edu.bd', 'Must be an EDU email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  isAdmin: z.boolean().default(false),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      isAdmin: false,
    },
  });

  const isAdmin = watch('isAdmin');

  const handleDemoLogin = (type: 'admin' | 'student1' | 'student2' | 'student3') => {
    let credentials;
    if (type === 'admin') {
      credentials = demoCredentials.admin;
      setValue('isAdmin', true);
    } else {
      const studentIndex = parseInt(type.replace('student', '')) - 1;
      credentials = demoCredentials.students[studentIndex];
      setValue('isAdmin', false);
    }
    setValue('email', credentials.email);
    setValue('password', credentials.password);
  };

  const onSubmit = async (data: LoginForm) => {
    try {
      let user;
      console.log("admin : ", data)
      if (data.isAdmin) {
        if (data.email === demoCredentials.admin.email && data.password === demoCredentials.admin.password) {
          user = demoCredentials.admin;
          login(user, demoCredentials.admin.token)
          toast.success('Login successful!');
          navigate(data.isAdmin ? '/admin' : '/home');
        }
      } else {
        user = demoCredentials.students.find(
          (student) => student.email === data.email && student.password === data.password
        );


        const res = await axios.post("http://localhost:9000/api/auth/login", { ...data })
        const res_data = res?.data;
        console.log(res_data)

        if (res_data?.success) {
          login(res_data?.data, res_data?.token)
          toast.success('Login successful!');
          navigate(data.isAdmin ? '/admin' : '/home');
        } else {
          toast.error('Invalid credentials');
          return;
        }
      }

      // if (!user) {
      //   toast.error('Invalid credentials');
      //   return;
      // }

      // login(user);
      // toast.success('Login successful!');
      // navigate(data.isAdmin ? '/admin' : '/home');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
      return;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {isAdmin ? 'Admin Email' : 'EDU Email'}
              </label>
              <div className="mt-1">
                <input
                  {...register('email')}
                  type="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  {...register('password')}
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                {...register('isAdmin')}
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900">
                Login as Administrator
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Signing in...' : `Sign in as ${isAdmin ? 'Admin' : 'Student'}`}
              </button>
            </div>
          </form>

          <div className='w-full flex items-center justify-center mt-4 text-sm'>
                <Link to={"/signup"}>Don&apos;t have an account? Sign up now</Link>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDemoLogin('admin')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Demo Admin
              </button>
              <button
                onClick={() => handleDemoLogin('student1')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Demo Student 1
              </button>
              <button
                onClick={() => handleDemoLogin('student2')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Demo Student 2
              </button>
              <button
                onClick={() => handleDemoLogin('student3')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Demo Student 3
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}