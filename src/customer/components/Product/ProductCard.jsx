import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/product/${item.id}`)}>
      <div className="productCard w-[16rem] m-3 transition-all cursor-pointer hover:shadow-xl">
        <div className="h-[21rem] relative">
          <img
            className="rounded-md absolute inset-0 h-full w-full object-cover object-left-top"
            src={item.imgUrl}
            alt=""
          />
          <img
            className="rounded-md absolute inset-0 h-full w-full object-cover object-left-top opacity-0 hover:opacity-100"
            src={(item?.variants?.[0]?.imgUrls?.[1]) || (item?.variants?.[0]?.imgUrls?.[0])}
            alt=""
          />
        </div>
        <div className="textPart text-sm bg-white p-3">
          <p className="text-black font-medium">{item.name}</p>
          <p className="text-gray-500 pb-2 font-med">{item.subTitle}</p>
          <div className="flex pb-2 space-x-2">
            <p className="text-black font-bold pr-2">{item.discountedPrice.toLocaleString("de-DE")}đ</p>
            {(item.discountedPrice !== item.price) && (
              <div className="line-through font-bold text-gray-300">
                {item.price.toLocaleString("de-DE")}đ
              </div>
            )}
            {(item.discountedPrice !== item.price) && (
              <div className="text-red-600 font-bold">
                -{Math.round(100 - (item.discountedPrice / item.price) * 100)}%
              </div>
            )}
          </div>
          <p className="hidden text-blue-700 italic font-[450]">
            Mua 2 bất kỳ giảm thêm 10%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
