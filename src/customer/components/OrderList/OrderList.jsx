import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { homeSectionData } from "../HomeSection/Data/HomeSectionData";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../state/customer/order/Action";

const orderStatus = [
  { label: "Đã đặt", value: "PLACED" },
  { label: "Đã xác nhận", value: "CONFIRMED" },
  { label: "Đang giao", value: "SHIPPED" },
  { label: "Đã giao", value: "DELIVERED" },
];

const OrderList = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const { order } = useSelector((store) => store)

  useEffect(() => {
    dispatch(getOrderHistory({ jwt }))
  }, [jwt])

  return (
    <Grid container sx={{ justifyContent: "space-between", paddingX: 6 }}>
      <Grid item xs={2.5}>
        <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
          <h1 className="font-bold text-lg">Bộ lọc</h1>
          <div className="space-y-4 mt-5">
            <h1 className="font-semibold">Trạng thái đơn hàng</h1>

            {orderStatus.map((option) => (
              <div className="flex items-center">
                <input
                  defaultValue={option.value}
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 text-center text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  className="ml-3 text-sm text-gray-600"
                  htmlFor={option.value}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </Grid>
      <Grid item xs={9}>
        {order.orders?.length > 0 && order.orders?.map((order) => (
          <OrderCard itemData={order} />
        ))}
      </Grid>
    </Grid>
  );
};

export default OrderList;
