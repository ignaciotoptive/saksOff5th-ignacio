import React from 'react';
import Product from './Product';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/store/cartSlice';

function ProductsList({ products }) {
  const dispatch = useDispatch();
  const onAddToCart = (product) => {
    dispatch(addProduct(product));
  };
  return (
    <div>
      {products.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <p className="text-5xl font-bold my-[5em]">
          There are no Products to display :(
        </p>
      )}
    </div>
  );
}

export default ProductsList;
