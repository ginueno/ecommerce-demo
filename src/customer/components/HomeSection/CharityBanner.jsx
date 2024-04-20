import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CharityBanner = () => {
  const navigate = useNavigate()
  return (
    <div className="block relative px-10">
      <div className="inline-block w-full">
        <img
          src="https://mcdn.coolmate.me/image/March2023/mceclip0_137.jpg"
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
          top: "-10%",
          overflow: "auto",
          padding: "2rem",
        }}
      >
        <div className="w-1/2">
          <img
            loading="lazy"
            src="https://mcdn.coolmate.me/image/March2023/mceclip8.png"
            alt="placeholder"
          />
        </div>
        <h2 className="text-white lg:text-6xl pb-5 font-sans text-2xl">
          Góp phần mang lại cuộc <br />
          sống tươi đẹp <br />
          hơn cho tụi nhỏ
        </h2>
        <Button
          onClick={() => { window.scrollTo(0, 0); navigate(`/careshare`) }}
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
          <p className="text-black">VỀ CARE & SHARE</p>
        </Button>
      </div>
    </div>
  );
};

export default CharityBanner;
