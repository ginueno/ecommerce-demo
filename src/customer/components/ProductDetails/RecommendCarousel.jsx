import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { IconButton } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import HomeSectionCard from "../HomeSection/HomeSectionCard";

const RecommendCarousel = ({ data }) => {

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

    const items = data?.map((item) => <HomeSectionCard product={item} />);

    return (
        <div>
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

export default RecommendCarousel;
