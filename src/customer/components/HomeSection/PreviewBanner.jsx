import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PreviewBanner = ({ link, banner_data }) => {
  const navigate = useNavigate()
  return (
    <div className="block relative">
      <div className="inline-block w-full">
        <img
          src={banner_data.imageUrl}
          alt="placeholder"
        />
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          height: "100%",
          flexFlow: "column",
          justifyContent: "flex-end",
          maxWidth: "800px",
          zIndex: "50",
          top: "-30%",
          overflow: "auto",
          padding: "2rem",
        }}
      >
        <h2 className="uppercase text-white lg:text-7xl font-bold pb-3 font-sans text-4xl">
          {banner_data.headline}
        </h2>
        <p className="text-base text-white font-medium lg:pb-8">{banner_data.desc}</p>
        <Button
          onClick={() => { window.scrollTo(0, 0); navigate(link) }}
          variant="contained"
          disableElevation
          className="uppercase w-[12rem] "
          sx={{
            borderRadius: "9999px",
            paddingY: "14px",
            bgcolor: "white",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          <p className="text-black">Khám phá ngay</p>
        </Button>
      </div>
    </div>
  );
};

export default PreviewBanner;
