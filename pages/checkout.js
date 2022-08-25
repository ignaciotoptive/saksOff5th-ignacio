import React, { useState } from 'react';
import axios from 'axios';
import sumBy from 'lodash/sumBy';
import Link from 'next/link';
import { userFromRequest } from '@/utils/auth';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, clearCart } from '@/store/cartSlice';
import Product from '@/components/Product';
import Layout from '@/components/Layout';

function Checkout({ user }) {
  const products = useSelector(selectProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderFailed, setOrderFailed] = useState(false);
  const dispatch = useDispatch();

  const onCheckout = () => {
    setIsLoading(true);
    axios
      .post('/api/order', {
        products: products.map((product) => product.id),
        userId: user.id,
      })
      .then(() => {
        dispatch(clearCart());
        setOrderCreated(true);
      })
      .catch(() => {
        setOrderFailed(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold">Products in your cart</h2>
      {products?.length ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product, idx) => (
              <Product key={`${product.id}-${idx}`} product={product} />
            ))}
          </div>
          <div className="text-right text-3xl font-bold">
            <span>{'Total: '}</span>
            <span className="text-accent">
              ${sumBy(products, 'price').toFixed(2)}
            </span>
          </div>
          {orderFailed && (
            <p className={'text-3xl font-bold my-5 text-error'}>
              {'Your order could not be created :('}
            </p>
          )}
          <button
            className="btn btn-primary btn-lg w-full"
            onClick={onCheckout}
            disabled={isLoading || orderFailed}
          >
            Buy Now!
          </button>
        </div>
      ) : (
        <div>
          <p
            className={[
              'text-5xl font-bold my-[5em]',
              orderCreated ? 'text-success' : '',
            ].join(' ')}
          >
            {!orderCreated
              ? 'Your cart is currently empty'
              : 'Order was successfully created!'}
          </p>
          <Link href="/">
            <button className="btn btn-primary btn-lg w-full">Go Home</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Layout(Checkout);

export async function getServerSideProps(context) {
  const user = await userFromRequest(context.req);

  return {
    props: {
      user,
    },
  };
}
