import { Adjust, CheckCircleOutline, LocalShipping } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ itemData }) => {
  const navigate = useNavigate();
  const date = new Date(itemData?.orderDate)
  const deliveryDate = new Date(itemData?.deliveryDate)
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
  }
  return (
    <div onClick={() => navigate(`/account/order/${itemData.id}`)} className="cursor-pointer m-5">
      <div className="grid grid-cols-6 transition hover:shadow-lg">
        <div className="col-span-3 flex">
          <div className="items-center w-[8rem] h-[8rem] mr-3">
            <img
              className="w-full h-full object-cover object-center  rounded-l-lg"
              src={itemData.orderItems?.[0]?.variant?.imgUrls?.[0]}
              alt=""
            />
          </div>
          <div className="relative space-y-1 items-start pt-3">
            <p className="font-semibold">Hóa đơn ngày {formatDate(date)}</p>
          </div>
        </div>
        <div>
          <p className="font-semibold">{itemData.discountedPrice?.toLocaleString("de-DE")}đ</p>
          {(itemData.discountedPrice !== itemData.totalPrice) &&
            (<p className="opacity-50 line-through">{itemData.totalPrice?.toLocaleString("de-DE")}đ</p>)}
          {(itemData.discountedPrice !== itemData.totalPrice) &&
            (<p className="text-red-600">
              -{Math.round(100 - (itemData.discountedPrice / itemData.totalPrice) * 100)}%
            </p>)}
        </div>
        <div className="flex flex-col col-span-2 pt-3 px-3">
          {(itemData.orderStatus === 'PLACED') ? (
            <div className="flex items-center justify-end">
              <Adjust color="success" sx={{ width: "15px", height: "15px" }} />
              <p className="font-semibold ml-1">Đơn hàng đã được đặt, chờ xác nhận</p>
            </div>
          ) : (itemData.orderStatus === 'CONFIRMED') ? (
            <div className="flex items-center justify-end">
              <Adjust color="success" sx={{ width: "15px", height: "15px" }} />
              <p className="font-semibold ml-1">Đơn hàng đã được đặt, chờ xác nhận</p>
            </div>
          ) : (itemData.orderStatus === 'SHIPPED' && deliveryDate) ? (
            <div>
              <div className="flex items-center justify-end">
                <LocalShipping color="success" sx={{ width: "15px", height: "15px" }} />
                <p className="font-semibold ml-1">Đơn hàng đang được giao</p>
              </div>
              <div className="flex items-center justify-end">
                <p className="text-sm ml-1 italic">Dự kiến giao vào {formatDate(deliveryDate)}</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-end">
                <LocalShipping color="success" sx={{ width: "15px", height: "15px" }} />
                <p className="font-semibold ml-1">Đơn hàng đã giao thành công</p>
              </div>
              <div className="flex items-center justify-end">
                <p className="text-sm ml-1 italic">Đã giao hàng vào {formatDate(deliveryDate)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-10 pt-4"></div>
    </div>
  );
};

export default OrderCard;
