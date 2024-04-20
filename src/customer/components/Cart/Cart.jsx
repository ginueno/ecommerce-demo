import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Button, Snackbar } from "@mui/material";
import { homeSectionData } from "../HomeSection/Data/HomeSectionData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../state/customer/cart/Action";

const Cart = () => {
  const { auth, cart, } = useSelector((store) => store)
  const jwt = localStorage.getItem("jwt")
  const openSnack = localStorage.getItem("openSnack")
  const [totalPrev, setTotalPrev] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("openSnack", localStorage.getItem("openSnack"))
  const handleClose = () => {
    localStorage.setItem("openSnack", false);
    setOpen(false)
  }

  useEffect(() => {
    if (!jwt) {
      navigate('/')
    } else {
      dispatch(getCart(jwt))
    }
  }, [jwt])

  useEffect(() => {
    if (openSnack === "true") setOpen(true)
  }, [openSnack])

  useEffect(() => {
    let total = 0
    let discount = 0
    cart.cartItems?.forEach((item) => {
      if (item) {
        total = total + item.price
        discount = discount + (item.price - item.discountedPrice)
      }
    })
    setDiscount(discount)
    setTotalPrev(total)
  }, [cart.cartItems])


  return (
    <div>
      <div className="px-8 space-y-6 mb-10">
        <p className="text-4xl font-bold">Giỏ hàng</p>
        <hr />
      </div>

      <div className="grid grid-cols-3 px-12 gap-4">
        <div className="col-span-2 divide-y">
          {cart?.cartItems?.map((item) => (
            <>
              <CartItem itemData={item} />
            </>
          ))}

          {(cart?.cartItems?.length === 0) && (
            <p className="text-green-600 text-xl">Giỏ hàng trống. Xin mời quý khách bắt đầu mua hàng!</p>
          )}
        </div>
        <div className="px-5 h-[100hv] mt-0">
          <div className="sticky top-0 h-[22rem] border-2 rounded-xl px-3 pt-8 shadow-md">
            <p className="uppercase font-bold opacity-60 pb-4">
              {" "}
              Thông tin chi tiết
            </p>
            <hr />
            <div className="space-y-3 font semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Tạm tính</span>
                <span>{totalPrev.toLocaleString("de-DE")}đ</span>
              </div>
              <div className="flex justify-between pt-3 text-black">
                <span>Giảm giá</span>
                <span>{discount.toLocaleString("de-DE")}đ</span>
              </div>
              <div className="flex justify-between pt-3 text-black">
                <span>Phí giao hàng</span>
                <span>Miễn phí</span>
              </div>
              <hr />
              <div className="flex justify-between pt-3 text-black">
                <span>Tổng</span>
                <span className="font-bold text-xl">{(totalPrev - discount).toLocaleString("de-DE")}đ</span>
              </div>
              <Button
                onClick={() => navigate("/checkout?step=2")}
                variant="contained"
                sx={{ width: "100%", bgcolor: "black" }}
              >
                Thanh toán
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="Xóa thành công"
        autoHideDuration={1200}
      />
    </div>
  );
};

export default Cart;
