import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (params) =>
    axios
      .post('/api/auth/login', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        Router.push('/');
      });

  return (
    <form
      className="h-screen u-center flex flex-col items-center space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Head>
        <title>Login</title>
      </Head>

      <div className="space-y-8">
        <h1 className="self-start text-xl">Login</h1>

        <label className="flex flex-col" htmlFor="email">
          Email
          <input type="text" {...register('email', { required: true })} />
        </label>

        <label className="flex flex-col" htmlFor="password">
          Password
          <input
            type="password"
            {...register('password', { required: true })}
          />
        </label>

        <button
          className="u-button"
          type="submit"
          disabled={Object.keys(errors).length > 0 || isLoading}
        >
          Login
        </button>

        {isError && <p>User password combination not found</p>}
      </div>
    </form>
  );
};

export default Login;
