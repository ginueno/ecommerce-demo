import { Button, Grid } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div>
      <Grid
        className="bg-black text-white text center mt-10 border-b border-0 border-gray-500"
        container
        sx={{
          bgcolor: "black",
          color: "white",
          py: 3,
        }}
      >
        <Grid className="pl-10" item xs={4}>
          <h2 className="text-xl pb-2 font-bold">COOLMATE lắng nghe bạn!</h2>
          <p className="text-xs font-medium pb-6">
            Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp
            từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt
            hơn nữa.
          </p>
          <Button
            className="py-5 px-10"
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "16px",
              "&:hover": { bgcolor: "white", color: "black" },
            }}
          >
            Đóng góp ý kiến
          </Button>
        </Grid>
        <Grid className="pl-[5rem]" item xs={4}>
          <div className="flex flex-row justify-left justify-items-center pb-5">
            <img
              src="https://www.coolmate.me/images/footer/icon-hotline.svg"
              alt=""
            />
            <div className="pl-4">
              <p className="text-xs font-medium">Hotline</p>
              <p className="font-bold">1900.272737 - 028.7777.2737</p>
              <p className="font-bold">(8:30 - 22:00)</p>
            </div>
          </div>
          <div className="flex flex-row justify-left justify-items-center">
            <img
              src="https://www.coolmate.me/images/footer/icon-email.svg"
              alt=""
            />
            <div className="pl-4">
              <p className="text-xs font-medium">Email</p>
              <p className="font-bold">Cool@coolmate.me</p>
            </div>
          </div>
        </Grid>
        <Grid className="pr-[5rem]" item xs={4}>
          <div className="h-full flex flex-row justify-between items-center">
            <img
              className="h-[40px] w-auto"
              src="https://mcdn.coolmate.me/image/June2023/mceclip1_43.png"
              alt=""
            />
            <img
              className="h-[40px] w-auto"
              src="https://mcdn.coolmate.me/image/June2023/mceclip2_68.png"
              alt=""
            />
            <img
              className="h-[40px] w-auto"
              src="https://mcdn.coolmate.me/image/June2023/mceclip0_62.png"
              alt=""
            />
            <img
              className="h-[40px] w-auto"
              src="https://www.coolmate.me/images/footer/icon-instar.svg"
              alt=""
            />
            <img
              className="h-[40px] w-auto"
              src="https://www.coolmate.me/images/footer/icon-youtube.svg"
              alt=""
            />
          </div>
        </Grid>
      </Grid>
      <Grid
        className="bg-black text-white text center px-10"
        container
        sx={{
          bgcolor: "black",
          color: "white",
          py: 3,
        }}
      >
        <Grid item xs>
          <p className="my-4 font-bold">COOLCLUB</p>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Đăng kí thành viên
            </p>
          </a>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Ưu đãi & Đặc quyền
            </p>
          </a>
        </Grid>
        <Grid item xs>
          <p className="my-4 font-bold">CHÍNH SÁCH</p>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Chính sách đổi trả 60 ngày
            </p>
          </a>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Chính sách khuyến mãi
            </p>
          </a>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Chính sách giao hàng
            </p>
          </a>
          <p className="mt-6 mb-4 font-bold">COOLMATE.ME</p>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Lịch sử thay đổi website
            </p>
          </a>
        </Grid>
        <Grid item xs>
          <p className="my-4 font-bold">CHĂM SÓC KHÁCH HÀNG</p>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Trải nghiệm mua sắm 100% hài lòng
            </p>
          </a>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Hỏi đáp - FAQs
            </p>
          </a>
          <p className="mt-6 mb-4 font-bold">KIẾN THỨC MẶC ĐẸP</p>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Hướng dẫn chọn size
            </p>
          </a>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Blog
            </p>
          </a>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Group mặc đẹp sống chất
            </p>
          </a>
        </Grid>
        <Grid item xs>
          <p className="my-4 font-bold">TÀI LIỆU - TUYỂN DỤNG</p>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Tuyển dụng
            </p>
          </a>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Đăng ký bản quyền
            </p>
          </a>
          <p className="mt-6 mb-4 font-bold">VỀ COOLMATE</p>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Coolmate 101
            </p>
          </a>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              DVKH xuất sắc
            </p>
          </a>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Câu chuyện về Coolmate
            </p>
          </a>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Nhà máy
            </p>
          </a>
          <a>
            <p className="text-xs mb-2 font-medium hover:cursor-pointer hover:text-yellow-300">
              Care & Share
            </p>
          </a>
        </Grid>
        <Grid item xs>
          <p className="my-4 font-bold">ĐỊA CHỈ LIÊN HỆ</p>
          <p className="text-xs mb-6 font-medium">
          <span className="underline">Văn phòng Hà Nội:</span> Tầng 3-4, Tòa nhà BMM, KM2, Đường Phùng Hưng,
            Phường Phúc La, Quận Hà Đông, TP Hà Nội
          </p>
          <p className="text-xs mb-4 font-medium">
            <span className="underline">Văn phòng Tp HCM:</span>Văn phòng Tp
            HCM: Lầu 1, Số 163 Trần Trọng Cung, Phường Tân Thuận Đông, Quận 7,
            Tp. Hồ Chí Minh
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
