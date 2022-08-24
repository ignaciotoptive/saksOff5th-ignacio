// Add Product Form
import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';

function ImportProducts() {
  const {
    register,
    formState: { errors },
  } = useForm();
  const inputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    return axios
      .post('/api/product/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
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

  const onLoadFile = (event) => {
    const [file] = event.target.files;
    if (!file) return;
    // reset file input
    event.target.value = null;
    return onSubmit(file);
  };

  return (
    <div className="text-center space-y-10">
      <form className="flex flex-col items-center">
        <Head>
          <title>Import Products</title>
        </Head>
        <div className="space-y-8 text-center">
          <h1 className="text-center text-3xl font-bold">Import Products</h1>
          <label htmlFor="file"></label>
          <input
            hidden
            type="file"
            accept="text/csv"
            {...register('file')}
            ref={inputRef}
            onChange={onLoadFile}
          />

          {isError && <p className="text-error">Invalid product schema</p>}
        </div>
      </form>
      <button
        className="btn w-64 rounded-full btn-primary"
        disabled={Object.keys(errors).length > 0 || isLoading}
        onClick={() => inputRef.current.click()}
      >
        Import Products from CSV
      </button>
    </div>
  );
}

export default Layout(ImportProducts);
