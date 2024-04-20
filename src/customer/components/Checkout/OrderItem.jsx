import React from "react";

const OrderItem = ({ itemData }) => {
  if (!itemData) {
    return null
  }
  return (
    <div className="p-5">
      <div className="flex transition hover:shadow-lg">
        <div className="items-center w-[8rem] h-[8rem] mr-3">
          <img
            className="w-full h-full object-cover object-center  rounded-l-lg"
            src={itemData?.variant?.imgUrls?.[0] || ''}
            alt=""
          />
        </div>
        <div className="relative space-y-1 items-start">
          <p className="font-semibold">{itemData.variant?.productName}</p>
          <div className="flex flex-row space-x-3 items-center text-gray-900">
            <p className="font-semibold">{itemData.discountedPrice.toLocaleString("de-DE")}đ</p>
            {(itemData.discountedPrice !== itemData.price) &&
              (<p className="opacity-50 line-through">{itemData.price.toLocaleString("de-DE")}đ</p>)}
            {(itemData.discountedPrice !== itemData.price) &&
              (<p className="text-red-600">
                -{Math.round(100 - (itemData.discountedPrice / itemData.price) * 100)}%
              </p>)}
          </div>
          <div className="text-gray-400 text-sm">
            {itemData.variant?.color?.name} / {itemData.variant?.size?.name}
          </div>
          <div className="text-gray-400 text-sm">
            <span className="font-semibold ">Số lượng: </span>{itemData?.quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
