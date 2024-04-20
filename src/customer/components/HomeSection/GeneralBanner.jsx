import { Button } from "@mui/material";
import React from "react";

const Banner = ({ banner_data }) => {
  let text = banner_data.headline;
  let lines = text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
  return (
    <div className="block relative rounded-lg">
      <div className="inline-block w-full">
        <img src={banner_data.imageUrl} alt="placeholder" />
      </div>
      <div
        className="w-3/4"
        style={{
          position: "absolute",
          display: "flex",
          height: "100%",
          flexFlow: "column",
          justifyContent: "flex-end",
          maxWidth: "800px",
          zIndex: "50",
          top: "-10%",
          overflow: "auto",
          padding: "2rem",
        }}
      >
        <p className="text-lg text-white opacity-70 font-medium lg:pb-1">
          {banner_data.desc}
        </p>
        <h2 className="leading-tight uppercase text-white lg:text-[60px] font-bold pb-3 font-sans text-3xl">
          {lines}
        </h2>
        <Button
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

export default Banner;
