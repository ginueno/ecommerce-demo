import React, { useEffect, useState } from "react";
import HomeSectionCard from "./HomeSectionCard";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { IconButton } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useDispatch, useSelector } from "react-redux";
import { findProducts, findProductsForHome } from "../../../state/customer/product/Action";

const HomeSectionCarousel = ({ data, sectionName }) => {
  const dispatch = useDispatch()
  const { customerProduct } = useSelector((store) => store)
  const [newProducts, setNewProducts] = useState([])
  const [items, setItems] = useState([])
  useEffect(() => {
    const data = {
      category: "",
      lpage: "",
      collection: "",
      sort: "newest",
    }
    dispatch(findProductsForHome(data))
  }, [])

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  const nextButton = ({ isDisabled }) => {
    return (
      <IconButton
        className="z-50"
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
        className="z-50"
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

  useEffect(() => {
    let a = customerProduct?.productsHome?.['newest']?.slice(0, 6)
    setItems(a?.map((item) => <HomeSectionCard product={item} />));
    console.log("item arrays", customerProduct?.productsHome)
  }, [customerProduct])

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-800 py-2 px-4 lg:px-10">
        {sectionName}
      </h2>
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

export default HomeSectionCarousel;
