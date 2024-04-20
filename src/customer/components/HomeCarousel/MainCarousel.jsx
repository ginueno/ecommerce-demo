import React from "react";
import AliceCarousel from "react-alice-carousel";
import { homeCarouselData } from "./HomeCarouselData";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";

const MainCarousel = () => {
  const navigate = useNavigate()
  const items = homeCarouselData.map((item) => (
    <img
      onClick={() => navigate(`${item.path}`)}
      className="cursor-pointer"
      role="presentation"
      src={item.image}
      alt=""
    />
  ));

  return (
    <div className="">
      <AliceCarousel
        items={items}
        disableButtonsControls
        disableDotsControls
        autoPlay
        autoPlayInterval={2000}
        infinite
      />
    </div>
  );
};

export default MainCarousel;
