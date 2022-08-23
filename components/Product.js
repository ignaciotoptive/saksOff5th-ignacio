import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/authSlice';
import { ROLE } from '@/utils/types';
function Product({ product }) {
  const user = useSelector(selectUser);
  return (
    <div className="flex justify-center py-4">
      <div class="card card-compact w-72 bg-base-300 shadow-xl">
        <figure>
          <img
            src={
              product.Images.length
                ? product.Images[0].url
                : '/images/no-image.jpg'
            }
            alt="product-image"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-accent text-2xl">$ {product.price}</h2>
          <p className="text-start text-xs text-base-content">
            SKU: {product.SKU}
          </p>
          <p className="text-start">
            Ships between {product.shipmentDaysMin}-{product.shipmentDaysMax}{' '}
            days
          </p>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">{product.category}</div>
          </div>
          {user?.role === ROLE.CUSTOMER && (
            <div class="card-actions justify-end">
              <button class="btn btn-sm rounded-xl btn-primary">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
