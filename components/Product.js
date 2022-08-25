import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/authSlice';
import { ROLE } from '@/utils/types';
import ImageFallback from '@/components/ImageFallback';

function Product({ product, onAddToCart }) {
  const user = useSelector(selectUser);
  const image = product.Images.length ? product.Images[0] : {};

  return (
    <div className="flex justify-center sm:py-4">
      <div className="card card-side card-compact w-full sm:flex-col bg-base-300 shadow-xl">
        <figure>
          <ImageFallback
            width={image.width}
            height={image.height}
            src={image.url}
            alt="product-image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-accent text-2xl">$ {product.price}</h2>
          <p className="text-start text-xs text-base-content">
            SKU: {product.SKU}
          </p>
          <p className="text-start">
            Ships between {product.shipmentDaysMin}-{product.shipmentDaysMax}{' '}
            days
          </p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{product.category}</div>
          </div>
          {!!onAddToCart && user?.role === ROLE.CUSTOMER && (
            <div className="card-actions justify-end">
              <button
                className="btn btn-sm rounded-xl btn-primary"
                onClick={() => {
                  onAddToCart(product);
                }}
              >
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
