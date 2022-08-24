import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import { setAuthState } from '@/store/authSlice';

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (params) => {
    setIsLoading(true);
    return axios
      .post('/api/auth/login', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        dispatch(setAuthState(true));
        Router.push('/');
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      className="flex flex-col items-center "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Head>
        <title>Login</title>
      </Head>

      <div className="space-y-8">
        <h1 className="text-center text-3xl font-bold">Login</h1>

        <label className="flex flex-col" htmlFor="email">
          Email
          <input
            className="input input-bordered w-full max-w-xs"
            type="text"
            {...register('email', { required: true })}
          />
        </label>

        <label className="flex flex-col" htmlFor="password">
          Password
          <input
            className="input input-bordered w-full max-w-xs"
            type="password"
            {...register('password', { required: true })}
          />
        </label>

        <button
          className="btn w-64 rounded-full btn-primary "
          type="submit"
          disabled={Object.keys(errors).length > 0 || isLoading}
        >
          Login
        </button>

        {isError && (
          <p className="text-error">User password combination not found</p>
        )}
      </div>
    </form>
  );
};

export default Layout(Login);
