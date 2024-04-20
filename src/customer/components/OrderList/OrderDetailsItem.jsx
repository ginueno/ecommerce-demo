import { StarBorder } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderDetailsItem = ({ itemData, orderStatus }) => {
  const navigate = useNavigate()
  const handleRatenavigate = () => {
    localStorage.setItem("variantData", JSON.stringify(itemData.variant))
    navigate(`/account/rate/${itemData.variant?.productId}`)
  }
  return (
    <div className="p-5">
      <div className="flex justify-between transition hover:shadow-lg">
        <div className="flex">
          <div className="items-center w-[8rem] h-[8rem] mr-3">
            <img
              className="w-full h-full object-cover object-center  rounded-l-lg"
              src={itemData.variant?.imgUrls?.[0]}
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
            <p className="opacity-70">{itemData.variant?.color?.name} / {itemData.variant?.size?.name}</p>
            <div className="text-gray-400 text-sm">
              <span className="font-semibold ">Số lượng: </span>{itemData?.quantity}
            </div>
          </div>
        </div>
        <div className="pr-3">
          {(orderStatus === "DELIVERED") && (
            <div className="flex items-center cursor-pointer" onClick={() => handleRatenavigate()}>
              <StarBorder style={{ fontSize: "1rem", color: indigo[600] }} />
              <a href="">
                <p className="italic text-indigo-600 ml-2">
                  Đánh giá sản phẩm này
                </p>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsItem;
