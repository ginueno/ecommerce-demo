import React from "react";
import MainCrousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSection/HomeSectionCarousel";
import { homeSectionData } from "../../components/HomeSection/Data/HomeSectionData";
import { quanDaiData } from "../../components/HomeSection/Data/QuanDaiData";
import PreviewSection from "../../components/HomeSection/PreviewSection";
import { quanDaiBanner } from "../../components/HomeSection/Data/QuanDaiBanner";
import CharityBanner from "../../components/HomeSection/CharityBanner";
import Banner from "../../components/HomeSection/GeneralBanner";
import { Banner1 } from "../../components/HomeSection/Data/Banner1";
import { Banner2 } from "../../components/HomeSection/Data/Banner2";
import OptionBanner from "../../components/HomeSection/OptionBanner";
import Footer from "../../components/Footer/Footer";
import { ChayBoBanner } from "../../components/HomeSection/Data/ChayBoBanner";
import { AoThunBanner } from "../../components/HomeSection/Data/AoThunBanner";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <MainCrousel />
      <div className="space-y-10 py-10 flex flex-col justify-center">
        <HomeSectionCarousel
          data={homeSectionData}
          sectionName={"SẢN PHẨM MỚI"}
        />
        <PreviewSection
          type={"lpage"}
          data={"Chạy bộ"}
          sectionName={"SẢN PHẨM CHẠY BỘ"}
          banner_data={ChayBoBanner}
        />
        <PreviewSection
          type={"collection"}
          data={"Quần dài"}
          sectionName={"SẢN PHẨM QUẦN DÀI NAM"}
          banner_data={quanDaiBanner}
        />
        <PreviewSection
          type={"collection"}
          data={"Áo thun"}
          sectionName={"SẢN PHẨM ÁO THUN"}
          banner_data={AoThunBanner}
        />
        <CharityBanner />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 px-10">
          <Banner banner_data={Banner1} />
          <Banner banner_data={Banner2} />
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 px-10 pt-5">
          <OptionBanner link={`/category/`} imgSrc="https://media2.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/March2024/mceclip17_50.png" />
          <OptionBanner link={`/category/Đồ%20thể%20thao`} imgSrc="https://media2.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/March2024/mceclip16_23.png" />
          <OptionBanner imgSrc="https://media2.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/March2024/mceclip14_100.png" />
          <OptionBanner link={`/collection/Quần%20lót`} imgSrc="https://media2.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/March2024/mceclip15_43.png" />
        </div>
        <div className="px-10 pt-5">
          <img
            src="https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2024/mceclip1_81.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
