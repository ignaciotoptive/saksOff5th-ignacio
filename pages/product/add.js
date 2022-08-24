// Add Product Form
import React, { useState } from 'react';
import startCase from 'lodash/startCase';
import forEach from 'lodash/forEach';
import Head from 'next/head';
import Router from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout';
import { CATEGORY } from '@/utils/types';

const fieldsSpec = [
  {
    name: 'SKU',
    type: 'text',
    options: { required: true },
  },
  {
    name: 'price',
    type: 'string',
    options: { required: true, min: 0 },
  },
  {
    name: 'inventory',
    type: 'text',
    options: { min: 0, max: 100 },
  },
  {
    name: 'shipmentDaysMin',
    type: 'text',
    options: { min: 0, max: 100 },
  },
  {
    name: 'shipmentDaysMax',
    type: 'text',
    options: { min: 0, max: 100 },
  },
  {
    name: 'image',
    type: 'file',
  },
  {
    name: 'isActive',
    type: 'checkbox',
  },
];

function AddProduct() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      SKU: 'UIA7824289912',
      price: 149.99,
      inventory: 50,
      shipmentDaysMin: 3,
      shipmentDaysMax: 5,
      isActive: true,
      category: CATEGORY.OTHER,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (params) => {
    setIsLoading(true);
    const formData = new FormData();
    forEach(params, (value, param) => {
      if (param === 'image') formData.append('image', params.image[0]);
      else formData.append(param, value);
    });
    return axios
      .post('/api/product', formData, {
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

  return (
    <form
      className="flex flex-col items-center "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Head>
        <title>Add New Product</title>
      </Head>
      <div className="space-y-8 text-center">
        <h1 className="text-center text-3xl font-bold">Add New Product</h1>
        <div className="space-y-4 grid md:grid-cols-2 my-10">
          {fieldsSpec.map((field) => (
            <div key={field.name} className="grid grid-cols-2">
              <label>{field.label || startCase(field.name)}</label>
              <input
                className={
                  'input input-bordered w-full max-w-md' +
                  (field.type == 'checkbox' ? ' checkbox-sm' : '')
                }
                type={field.type}
                {...(field.type == 'file' && { accept: 'image/*' })}
                {...register(field.name, field.options)}
              />
            </div>
          ))}
        </div>

        <button
          className="btn w-64 rounded-full btn-primary "
          type="submit"
          disabled={Object.keys(errors).length > 0 || isLoading}
        >
          Create
        </button>

        {isError && (
          <p className="text-error">New Product could not be created</p>
        )}
      </div>
    </form>
  );
}

export default Layout(AddProduct);
