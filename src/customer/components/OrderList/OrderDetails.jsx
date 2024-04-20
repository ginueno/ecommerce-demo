import React, { useEffect, useState } from "react";
import OrderTracker from "./OrderTracker";
import { Box, Button, Modal, Typography } from "@mui/material";
import { homeSectionData } from "../HomeSection/Data/HomeSectionData";
import AdressCard from "../Checkout/AdressCard";
import OrderDetailsItem from "./OrderDetailsItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cancelOrder, getOrderById } from "../../../state/customer/order/Action";

const OrderDetails = () => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const { orderId } = useParams()
  const { order } = useSelector((store) => store)
  useEffect(() => {
    dispatch(getOrderById(orderId))
  }, [])

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()

  const handleCancelOrder = () => {
    dispatch(cancelOrder(orderId))
    navigate("/account/order")
  }
  return (
    <div>
      <div className="px-16 py-3">
        <div className="grid grid-cols-5 space-x-3 py-3">
          <div className="col-span-4">
            <OrderTracker activeStep={
              order.order?.orderStatus === "PLACED" ? 1
                : order.order?.orderStatus === "CONFIRMED" ? 2
                  : order.order?.orderStatus === "SHIPPED" ? 3
                    : 5
            } />
          </div>
          <div className="flex justify-center">
            {(order.order?.orderStatus !== "DELIVERED") &&
              (<Button onClick={() => handleOpen()} variant="contained" style={{ color: "white", backgroundColor: "red" }}>Hủy Đơn</Button>)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 px-12 gap-4">
        <div className="col-span-2 divide-y">
          {order?.order?.orderItems && order.order?.orderItems?.map((item) => (
            <OrderDetailsItem itemData={item} orderStatus={order.order?.orderStatus} />
          ))}
        </div>
        <div className="px-5 h-[100hv] mt-0">
          <div className="sticky top-0 h-[520px]">
            <div className="border-2 rounded-xl px-3 py-5 mb-3 shadow-md">
              <p className="uppercase font-bold opacity-60 pb-4">
                {" "}
                Chi tiết
              </p>
              <hr />
              <div className="space-y-3 font semibold">
                <div className="flex justify-between pt-3 text-black">
                  <span>Tạm tính</span>
                  <span>{order?.order?.totalPrice.toLocaleString("de-DE")}đ</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Giảm giá</span>
                  <span>{(order?.order?.totalPrice - order?.order?.discountedPrice).toLocaleString("de-DE")}đ</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Phí giao hàng</span>
                  <span>Miễn phí</span>
                </div>
                <hr />
                <div className="flex justify-between pt-3 text-black">
                  <span>Tổng</span>
                  <span className="font-bold text-xl">{order?.order?.discountedPrice.toLocaleString("de-DE")}đ</span>
                </div>
              </div>
            </div>
            <hr className="mb-3" />
            <div className="p-5 border-2 rounded-xl space-y-3 shadow-md">
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
            Xác nhận hủy đơn
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2, mb: 2 }}>
            Bạn muốn hủy đơn này đúng không?
          </Typography>
          <Button variant="contained" className sx={{ marginRight: "10px" }} onClick={handleCancelOrder} color="primary">
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

export default OrderDetails;
