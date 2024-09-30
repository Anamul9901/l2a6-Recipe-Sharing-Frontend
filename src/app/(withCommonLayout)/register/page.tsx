'use client';
import FXForm from '@/src/components/form/FXForm';
import FXInput from '@/src/components/form/FXInput';
import Loading from '@/src/components/UI/loading';
import { useRegisterMutation } from '@/src/redux/features/auth/authApi';
import { setUser } from '@/src/redux/features/auth/authSlice';
import { useAppDispatch } from '@/src/redux/hooks';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import React from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const Register = () => {
  const dispatch = useAppDispatch();

  const [resigter, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = await resigter(data).unwrap();
    console.log('res-', res);
    if (res?.data) {
      const { email, name, _id, profileImg } = res?.data;
      const finalUserData = { email, name, _id, profileImg };
      dispatch(setUser({ user: finalUserData, token: res?.data?.token }));
    }
  };
  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
        <h3 className="my-2 text-xl font-bold">Register with --</h3>
        <p className="mb-4">Welcome to --</p>
        <div className="w-[35%]">
          <FXForm
            defaultValues={{
              name: 'User',
              email: 'user@gmail.com',
              password: 'user',
            }}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <FXInput name="name" label="name" size="sm" />
            </div>
            <div className="py-3">
              <FXInput name="email" label="Email" size="sm" />
            </div>
            <div className="py-3">
              <FXInput name="password" label="Password" size="sm" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 text-default"
              size="lg"
              type="submit"
            >
              Registration
            </Button>
          </FXForm>

          <div className="text-center">
            Already have an account ? <Link href={'/login'}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
