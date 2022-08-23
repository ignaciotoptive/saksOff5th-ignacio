import React from 'react';
import Product from './Product';

function ProductsList({ products }) {
  return (
    <div>
      <h2 className="text-3xl font-bold">Products</h2>
      {products.length ? (
        <div className="columns-1 sm:columns-2 md:columns-4 gap-4">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <p className="text-5xl font-bold">
          There are no Products to display :(
        </p>
      )}
    </div>
  );
}

export default ProductsList;
