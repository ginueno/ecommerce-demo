import React from "react";
import { useNavigate } from "react-router-dom";

const OptionBanner = ({ link, imgSrc }) => {
  const navigate = useNavigate()
  return (
    <div className="relative w-full h-full hover:cursor-pointer" onClick={() => { window.scrollTo(0, 0); navigate(link) }}>
      <img src={imgSrc} alt="" />
      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30"></div>
    </div>
  );
};

export default OptionBanner;
