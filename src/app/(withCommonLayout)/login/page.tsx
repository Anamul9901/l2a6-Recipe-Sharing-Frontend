'use client';
import FXForm from '@/src/components/form/FXForm';
import FXInput from '@/src/components/form/FXInput';
import Loading from '@/src/components/UI/loading';
import { useLoginMutation } from '@/src/redux/features/auth/authApi';
import { setUser } from '@/src/redux/features/auth/authSlice';
import { useAppDispatch } from '@/src/redux/hooks';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import React from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const Login = () => {
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = await loginUser(data).unwrap();
    console.log('res-', res);
    if (res?.data) {
      const { email, name, _id, profileImg } = res?.data?.data;
      const finalUserData = { email, name, _id, profileImg };
      dispatch(setUser({ user: finalUserData, token: res?.data?.token }));
    }
  };
  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with --</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[35%]">
          <FXForm
            onSubmit={onSubmit}
            defaultValues={{ email: 'user@gmail.com', password: 'user' }}
          >
            <div className="py-3">
              <FXInput name="email" label="Email" type="email" size="sm" />
            </div>
            <div className="py-3">
              <FXInput
                name="password"
                label="Password"
                type="password"
                size="sm"
              />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </FXForm>

          <div className="text-center">
            Don&lsquo;t have account ? <Link href={'/register'}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
