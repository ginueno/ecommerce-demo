import React from "react";
import AdressCard from "./AdressCard";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../state/customer/order/Action";

const DeliveryAdress = ({ handleNext }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [ward, setWard] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const jwt = localStorage.getItem("jwt")
  const { auth } = useSelector((store) => store)
  const handleSubmit = (e) => {
    e.preventDefault();
    const userAddress = {
      name: name,
      phoneNumber: phoneNumber,
      detailAddress: address,
      region: region,
      city: city,
      ward: ward,
      notice: notice
    }
    dispatch(createOrder({ address: userAddress, jwt, navigate }))
  };

  const handleCreateOrder = (address) => {
    dispatch(createOrder({ address: address, jwt, navigate }))
  }

  return (
    <div>
      <div className="grid grid-cols-3 space-x-4">
        <div className="border rounded-e-md shdow-md h-[30.5rem] overflow-y-scroll">
          <div className="p-5 py-7 border-b cursor-pointer">
            {auth?.user?.addresses?.map((address) => (
              <div onClick={() => setSelectedAddress(address)}
                className="p-5 py-7 border-b cursor-pointer">
                <AdressCard address={address} />
                {selectedAddress?.id === address.id && (
                  <Button
                    onClick={() => handleCreateOrder(address)}
                    sx={{
                      bgcolor: "black",
                      border: "1px solid black",
                      "&:hover": {
                        bgcolor: "white",
                        color: "black",
                      },
                    }}
                    variant="contained"
                  >
                    Chọn
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Họ tên"
                    fullWidth
                    autoComplete="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Số điện thoại"
                    fullWidth
                    autoComplete="tel"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Địa chỉ"
                    fullWidth
                    autoComplete="address"
                    multiline
                    rows={4}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="region"
                    name="region"
                    label="Tỉnh/Thành Phố"
                    fullWidth
                    onChange={(e) => setRegion(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="Quận/Huyện"
                    fullWidth
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="ward"
                    name="ward"
                    label="Phường/Xã"
                    fullWidth
                    onChange={(e) => setWard(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="notice"
                    name="notice"
                    label="Ghi chú thêm"
                    fullWidth
                    onChange={(e) => setNotice(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    sx={{
                      bgcolor: "black",
                      border: "1px solid black",
                      "&:hover": {
                        bgcolor: "white",
                        color: "black",
                      },
                    }}
                    variant="contained"
                  >
                    Thêm địa chỉ
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAdress;
