import React from "react";
import { useNavigate } from "react-router-dom";

const HomePreviewCard = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => { window.scrollTo(0, 0); navigate(`/product/${product.id}`) }}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg 
    overflow-hidden mx-3"
    >
      <div className="h-[30rem]">
        <img
          className="object-cover object-top w-full h-full rounded-lg"
          src={product.imgUrl}
          alt=""
        />
      </div>
      <div className="w-full pt-4">
        <p className="text-sm text-gray-900">
          {product.name}
        </p>
        <p className="mt-2 text-sm text-gray-500">{product.subTitle}</p>
        <div className="flex pb-2 space-x-2 text-sm pt-2">
          <p className="text-black font-bold pr-2">{product.discountedPrice.toLocaleString("de-DE")}đ</p>
          {(product.discountedPrice !== product.price) && (
            <div className="line-through font-bold text-gray-300">
              {product.price.toLocaleString("de-DE")}đ
            </div>
          )}
          {(product.discountedPrice !== product.price) && (
            <div className="text-red-600 font-bold">
              -{Math.round(100 - (product.discountedPrice / product.price) * 100)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePreviewCard;
