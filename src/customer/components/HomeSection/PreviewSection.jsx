import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { IconButton } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import HomePreviewCard from "./HomePreviewCard";
import PreviewBanner from "./PreviewBanner";
import { useDispatch, useSelector } from "react-redux";
import { findProducts, findProductsForHome } from "../../../state/customer/product/Action";
import { useNavigate } from "react-router-dom";

const PreviewSection = ({ type, data, sectionName, banner_data }) => {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
  };

  const nextButton = ({ isDisabled }) => {
    return (
      <IconButton
        className="z-50 visible lg:invisible"
        sx={{
          position: "absolute",
          top: "10rem",
          right: "-2rem",
          width: "40px",
          height: "40px",
        }}
        aria-label="next"
      >
        <ArrowCircleRightIcon sx={{ fontSize: "40px" }} />
      </IconButton>
    );
  };

  const prevButton = ({ isDisabled }) => {
    return (
      <IconButton
        className="z-50 visible lg:invisible"
        sx={{
          position: "absolute",
          top: "10rem",
          left: "-2rem",
          width: "40px",
          height: "40px",
        }}
        aria-label="prev"
      >
        <ArrowCircleLeftIcon sx={{ fontSize: "40px" }} />
      </IconButton>
    );
  };
  const dispatch = useDispatch()
  const { customerProduct } = useSelector((store) => store)
  const [newProducts, setNewProducts] = useState([])
  const [items, setItems] = useState([])
  useEffect(() => {
    const reqData = {
      category: (type == "category") ? `${data}` : "",
      lpage: (type == "lpage") ? `${data}` : "",
      collection: (type == "collection") ? `${data}` : "",
      sort: "",
    }
    dispatch(findProductsForHome(reqData))
  }, [])

  const link = (type == "category") ? `category/` + data
    : (type == "lapge") ? `lapge/` + data
      : `collection/` + data

  const navigate = useNavigate()

  useEffect(() => {
    let a = customerProduct?.productsHome?.[`${data}`]?.slice(0, 4)
    setItems(a?.map((item) => <HomePreviewCard product={item} />));
    console.log("item arrays", customerProduct?.productsHome)
  }, [customerProduct])
  return (
    <div>
      <PreviewBanner banner_data={banner_data} link={link} />
      <div className="block"></div>
      <div className="flex flex-row">
        <h2 className="text-2xl font-extrabold text-gray-800 py-2 px-4 lg:px-10">
          {sectionName}
        </h2>
        <p onClick={() => { window.scrollTo(0, 0); navigate(link) }}
          className="invisible lg:visible text-lg ml-auto underline pt-[16px] pr-[70px] cursor-pointer">Xem Thêm</p>
      </div>
      <div className="relative px-4 lg:px-8">
        <div className="relative p-5">
          <AliceCarousel
            items={items}
            responsive={responsive}
            disableDotsControls
            renderNextButton={nextButton}
            renderPrevButton={prevButton}
            infinite
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
