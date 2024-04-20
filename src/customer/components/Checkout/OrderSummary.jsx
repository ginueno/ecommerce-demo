import React, { useEffect, useState } from "react";
import { homeSectionData } from "../HomeSection/Data/HomeSectionData";
import { Box, Button, Modal, Typography } from "@mui/material";
import OrderItem from "./OrderItem";
import AdressCard from "./AdressCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, placeOrder } from "../../../state/customer/order/Action";
import { getCart } from "../../../state/customer/cart/Action";

const OrderSummary = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [totalPrice, setTotalPrice] = useState(0)
  const [discountedPrice, setDiscountedPrice] = useState(0)
  const [open, setOpen] = useState(false)
  const searchParams = new URLSearchParams(location.search)
  const order_id = searchParams.get("order_id")
  const jwt = localStorage.getItem("jwt")
  const { order } = useSelector((store) => store)
  const handleClose = () => {
    setOpen(false);
  }
  useEffect(() => {
    dispatch(getOrderById(order_id))
  }, [order_id])
  useEffect(() => {
    if (order?.order?.orderItems) {
      const total = order?.order?.orderItems?.reduce((acc, item) => acc + item.price, 0);
      const discount = order?.order?.orderItems?.reduce((acc, item) => acc + item.discountedPrice, 0);
      setTotalPrice(total);
      setDiscountedPrice(discount);
    }
  }, [order])
  const handlePlaceOrder = () => {
    console.log("place order id", order_id)
    dispatch(placeOrder(order_id))
    dispatch(getCart(jwt))
    navigate("/cart")
  }
  return (
    <div>
      <div className="grid grid-cols-3 px-12 gap-4">
        <div className="col-span-2 divide-y">
          {order?.order?.orderItems?.map((item) => (
            <>
              <OrderItem itemData={item} />
            </>
          ))}
        </div>
        <div className="px-5 h-[100hv] mt-0">
          <div className="sticky top-0 h-[600px]">
            <div className="border-2 rounded-xl px-3 py-5 mb-3 shadow-md">
              <p className="uppercase font-bold opacity-60 pb-4">
                {" "}
                Price Details
              </p>
              <hr />
              <div className="space-y-3 font semibold">
                <div className="flex justify-between pt-3 text-black">
                  <span>Tạm tính</span>
                  <span>{totalPrice.toLocaleString("de-DE")}đ</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Giảm giá</span>
                  <span>{(totalPrice - discountedPrice).toLocaleString("de-DE")}đ</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Phí giao hàng</span>
                  <span>Miễn phí</span>
                </div>
                <hr />
                <div className="flex justify-between pt-3 text-black">
                  <span>Tổng</span>
                  <span className="font-bold text-xl">{discountedPrice.toLocaleString("de-DE")}đ</span>
                </div>
                <Button
                  onClick={() => setOpen(true)}
                  variant="contained"
                  sx={{ width: "100%", bgcolor: "black" }}
                >
                  Đặt hàng
                </Button>
              </div>
            </div>
            <hr className="mb-3" />
            <div className="p-5 border rounded-xl space-y-3 shadow-md">
              <p className="font-bold text-xl">Thông tin giao hàng:</p>
              <AdressCard address={order.order?.shippingAddress} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Xác nhận
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2, mb: 2 }}>
            Bạn muốn đặt hàng vào địa chỉ này ?
          </Typography>
          <Button variant="contained" className sx={{ marginRight: "10px" }} onClick={handlePlaceOrder} color="primary">
            Có
          </Button>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Không
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default OrderSummary;
