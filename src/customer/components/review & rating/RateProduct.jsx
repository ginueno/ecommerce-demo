import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createReview } from "../../../state/customer/review/Action";
import { findProductsById } from "../../../state/customer/product/Action";
import { Button, Grid, Rating, TextField, Typography } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';


const RateProduct = () => {
    const [formData, setFormData] = useState({ title: "", description: "" })
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch()
    const { customerProduct, review } = useSelector((store) => store)
    const { productId } = useParams()
    const navigate = useNavigate()
    const variantData = JSON.parse(localStorage.getItem("variantData"))
    console.log(variantData)

    const handleRateProduct = (e, value) => {
        console.log("rating--- ", value)
        setRating(value)
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log(formData)

        dispatch(createReview({ review: formData.description, score: rating, productId }))
        setFormData({ title: "", description: "" })
        navigate(`/product/${productId}`)
    }

    useEffect(() => {
        dispatch(findProductsById({ productId }))
    }, [])

    return (
        <div className="px-5 lg:px-20">
            <h1 className="text-xl p-5 shadow-lg mb-8 font-bold">
                Đánh giá và nhận xét sản phẩm
            </h1>
            <Grid sx={{ justifyContent: "space-between" }} container>
                <Grid
                    className="flex  lg:items-center shadow-lg border rounded-md p-5"
                    item
                    xs={12}
                    lg={5.8}
                >
                    <div>
                        <img
                            className="w-[5rem] lg:w-[15rem]"
                            src={variantData.imgUrls?.[0]}
                            alt=""
                        />
                    </div>
                    <div className="ml-3 lg:ml-5 space-y-2 lg:space-y-4">
                        <p className="lg:text-lg font-semibold">{customerProduct.product?.name}</p>
                        <p className="opacity-50 font-semibold">
                            {customerProduct.product?.brand}
                        </p>
                        <p>{customerProduct.product?.discountedPrice?.toLocaleString("de-DE")}đ</p>
                        <p>Size: {variantData.size?.name}</p>
                        <p>Màu sắc: {variantData.color?.name}</p>
                    </div>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <div className={`py-10 space-y-5`}>
                        <div className="shadow-md border rounded-md p-5">
                            <Typography className="font-semibold" component="legend">
                                Đánh giá sản phẩm
                            </Typography>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => {
                                    handleRateProduct(event, newValue);
                                }}
                            />
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-5 shadow-md border rounded-md"
                        >
                            <TextField
                                label="Đánh giá chi tiết"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                name="description"
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Gửi đánh giá
                            </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default RateProduct
