import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  AddCircleOutline,
  Delete,
  RemoveCircleOutline,
  RoomServiceOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../state/customer/cart/Action";
import { useNavigate } from "react-router-dom";

const CartItem = ({ itemData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemoveFromCart = () => {
    const data = { cartItemId: itemData?.id, jwt }
    setOpen(false)
    dispatch(removeCartItem(data))
  }

  const handleUpdateCartItem = (num) => {
    const data = { cartItemId: itemData?.id, data: { quantity: itemData.quantity + num }, jwt }
    dispatch(updateCartItem(data))
  }


  if (!itemData) {
    return null
  }

  return (
    <div className="p-5">
      <div className="flex transition hover:shadow-lg rounded-lg">
        <div className="items-center w-[8rem] h-[15rem] mr-3">
          <img
            className="w-full h-full object-cover object-top rounded-l-lg"
            src={itemData?.variant?.imgUrls?.[0] || ''}
            alt=""
          />
        </div>
        <div className="relative space-y-1 items-start">
          <p className="pt-3 font-semibold hover:underline cursor-pointer"
            onClick={() => navigate(`/product/${itemData?.variant?.productId}`)}>
            {itemData.variant?.productName}
          </p>
          <p className="opacity-70">{itemData.variant?.color?.name} / {itemData.variant?.size?.name}</p>
          <div className="flex flex-row space-x-3 items-center text-gray-900">
            <p className="font-semibold">{itemData.discountedPrice.toLocaleString("de-DE")}đ</p>
            {(itemData.discountedPrice !== itemData.price) &&
              (<p className="opacity-50 line-through">{itemData.price.toLocaleString("de-DE")}đ</p>)}
            {(itemData.discountedPrice !== itemData.price) &&
              (<p className="text-red-600">
                -{Math.round(100 - (itemData.discountedPrice / itemData.price) * 100)}%
              </p>)}
          </div>
          <div className="flex items-center space-x-2">
            <IconButton onClick={() => handleUpdateCartItem(-1)} disabled={itemData?.quantity <= 1}>
              <RemoveCircleOutline />
            </IconButton>
            <span className="py-1 px-3 border rounded-full">{itemData.quantity}</span>
            <IconButton>
              <AddCircleOutline onClick={() => handleUpdateCartItem(1)} />
            </IconButton>
          </div>
          <div className="absolute bottom-2">
            <Button onClick={handleOpen} sx={{ color: "gray", textTransform: "none" }}>
              <Delete /> Xóa
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-10 pt-4"></div>
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
            Xác nhận xóa
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2, mb: 2 }}>
            Bạn muốn xóa sản phảm này khỏi giỏ hàng chứ?
          </Typography>
          <Button variant="contained" className sx={{ marginRight: "10px" }} onClick={handleRemoveFromCart} color="primary">
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

export default CartItem;
