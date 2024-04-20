/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box, Button, Collapse, Grid, Modal, Rating, Typography } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import HomeSectionCarousel from "../HomeSection/HomeSectionCarousel";
import { homeSectionData } from "../HomeSection/Data/HomeSectionData";
import { detailData } from "./DetailsData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { findProducts, findProductsById } from "../../../state/customer/product/Action";
import { getAllReview } from "../../../state/customer/review/Action";
import { addItemToCart } from "../../../state/customer/cart/Action";
import RecommendCarousel from "./RecommendCarousel";

const product = {
  name: "Áo Thun Nam Chạy Bộ Graphic Special",
  price: "199.000đ",
  href: "#",
  breadcrumbs: [{ id: 1, name: "Áo Thể Thao Nam", href: "#" }],
  images: [
    {
      src: "https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2023/GRAPHICS.AGANIN.10.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2023/23CMAW.AT001.vaimoi.1_87.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2023/GRAPHICS.AGANIN.13.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2023/GRAPHICS.AGANIN.11.png",
      alt: "Model wearing plain white basic tee.",
    },
    {
      src: "https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2023/GRAPHICS.AGANIN.12.jpg",
      alt: "",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const loadingImg = ''

export default function ProductDetails() {
  let variantMap = new Map();
  let colorkey = [];
  const [selectedColor, setSelectedColor] = useState(colorkey[0] || '');
  const [averageScore, setAverageScore] = useState(-1)
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSizeStock, setSelectedSizeStock] = useState(0)
  const [selectedImage, setSelectedImage] = useState(variantMap.get(colorkey[0])?.images[0] || '');
  const [variants, setVariants] = useState(new Map())
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerProduct, review, auth } = useSelector((store) => store)
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!auth.user) {
      setOpenModal(true)
    } else {
      const data = {
        variantId: selectedSize, quantity: 1,
        price: customerProduct.product?.price, discountedPrice: customerProduct.product?.discountedPrice
      }
      console.log('add item request ', data)
      dispatch(addItemToCart({ data, jwt }))
      localStorage.setItem("openSnack", true)
      navigate("/cart")
    }
  }


  useEffect(() => {
    const data = { productId: Number(productId), jwt };
    dispatch(findProductsById(data));
    dispatch(getAllReview(productId));
  }, [productId])

  useEffect(() => {
    let variantList = customerProduct?.product?.variants;
    if (variantList != undefined) {
      const data = {
        name: "",
        color: "",
        size: "",
        pageNumber: 1,
        category: "",
        lpage: "",
        collection: "",
        sort: "newest",
      }
      dispatch(findProducts(data))
      variantList.forEach((variant) => {
        if (!colorkey.includes(variant.color.name)) {
          colorkey.push(variant.color.name)
          variantMap.set(variant.color.name, { images: variant.imgUrls, code: variant.color.code, sizes: [] })
        }
        if (colorkey.includes(variant.color.name)) {
          variantMap.get(variant.color.name).sizes.push({ id: variant.id, size: variant.size.name, stock: variant.stock })
        }
      })

      setSelectedColor(colorkey[0])
      setSelectedImage(variantMap.get(colorkey[0]).images[0])
      setVariants(variantMap)
      console.log("color list ", variantMap)
      console.log("selected color", selectedColor)
    }

  }, [customerProduct.product])

  useEffect(() => {
    let found = true
    variants.get(selectedColor)?.sizes.forEach((size) => {
      if (found && size.stock > 0) {
        setSelectedSize(size.id)
        setSelectedSizeStock(size.stock)
        found = false
      }
    })
  }, [selectedColor])

  useEffect(() => {
    if (review.reviews?.length > 0) {
      let totalScore = 0
      review?.reviews?.map((review) => {
        totalScore = totalScore + review.score
      })
      setAverageScore(totalScore / review?.reviews?.length)
    }
  }, [review?.reviews])

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <a
                  href={`/collection/${customerProduct?.product?.collections[0]?.name}`}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  {customerProduct?.product?.collections[0]?.name}
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a
                href=""
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {customerProduct?.product?.name}
              </a>
            </li>
          </ol>
        </nav>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 px-[10rem] pt-10">
          {/* Image gallery */}
          <div className="grid grid-cols-6">
            <div className="flex flex-col justify-center sticky top-2 max-w-[3rem] max-h-[35rem]">
              {variants.get(selectedColor)?.images.map((image) => (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg w-[3rem] h-[5rem] mt-4"
                  style={{ imageRendering: "auto" }}>
                  <img
                    onClick={() => setSelectedImage(image)}
                    src={image}
                    alt=""
                    className="cursor-pointer h-full w-full object-cover object-center"
                    style={
                      selectedImage === image
                        ? { opacity: 1 }
                        : { opacity: 0.7 }
                    }
                  />
                </div>
              )) ?? null}
            </div>
            <div className="col-span-5 overflow-hidden rounded-lg max-w-[30rem] max-h-[40rem] sticky top-2">
              <img
                src={selectedImage}
                alt=""
                className="h-full w-full object-cover object-center"
                style={{ imageRendering: 'high-quality' }}
              />
            </div>
          </div>
          {/* Product info */}
          <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:pl-6 lg:pb-24 lg:pr-14">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {customerProduct?.product?.name}
              </h1>
              <h1 className="text-lg lg:text-xl tracking-tight text-gray-600">
                {customerProduct?.product?.subTitle}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only"> </h2>

              <p className="text-lg text-gray-600"> </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                {(review.reviews?.length > 0) && (
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {(averageScore >= 0) && (
                        <Rating name="read-only" value={averageScore} readOnly />
                      )}
                    </div>
                    <a
                      className="ml-3 text-sm text-indigo-600 hover:text-indigo-500 italic"
                    >
                      {review.reviews?.length} đánh giá
                    </a>
                  </div>
                )}
              </div>
              <p className="flex space-x-5 items-center text-3xl pt-5 tracking-tight text-gray-900">
                <div>{customerProduct?.product?.discountedPrice.toLocaleString("de-DE")}đ</div>
                {(customerProduct?.product?.discountedPrice !== customerProduct?.product?.price) && (
                  <div className="line-through text-gray-300">
                    {customerProduct?.product?.price.toLocaleString("de-DE")}đ
                  </div>
                )}
                {(customerProduct?.product?.discountedPrice !== customerProduct?.product?.price) && (
                  <div className="text-red-600">
                    -{Math.round(100 - (customerProduct?.product?.discountedPrice / customerProduct?.product?.price) * 100)}%
                  </div>
                )}
              </p>
              <form className="mt-10" onSubmit={handleSubmit}>
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Màu sắc: {selectedColor}
                  </h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {Array.from(variants).map(([key, value]) => (
                        <RadioGroup.Option
                          onClick={() => setSelectedImage(value.images[0])}
                          key={key}
                          value={key}
                          className={({ active, checked }) =>
                            classNames(
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                          style={{ "--tw-ring-color": value.code }}
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {key}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              `h-8 w-8 rounded-full border border-black border-opacity-10`
                            )}
                            style={{ backgroundColor: value.code }}
                          />
                        </RadioGroup.Option>
                      )) ?? null}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      Kích thước: <span className="italic text-gray-400 font-light">(Trong kho còn: {selectedSizeStock})</span>
                    </h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Hướng dẫn chọn size
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {variants.get(selectedColor)?.sizes.map((size) => (
                        <RadioGroup.Option
                          onClick={() => {
                            setSelectedSize(size.id);
                            setSelectedSizeStock(size.stock);
                          }}
                          key={size.size}
                          value={size.id}
                          disabled={!size.stock}
                          className={({ active }) =>
                            classNames(
                              size.stock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-black" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.size}
                              </RadioGroup.Label>
                              {size.stock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    (checked || size.id === selectedSize)
                                      ? "border-black"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Thêm vào giỏ hàng
                </button>
              </form>
              <hr className="my-4" />
              <div className="bg-gray-200 px-4 py-6 ">
                <p className="text-sm font-bold">
                  Miễn phí giao hàng nhanh toàn quốc cho đơn hàng trên 200.000đ
                </p>
                <div className="flex items-center">
                  <AccessTimeIcon className="h-6 w-6" color="primary" />
                  <p className="px-2 text-sm font-[400]">
                    Nội thành Hà Nội và HCM nhận hàng trong 1 ngày
                  </p>
                </div>
                <div className="flex items-center">
                  <LocalShippingIcon className="h-6 w-6" color="primary" />
                  <p className="px-2 text-sm font-[400]">
                    Ở tỉnh thành khác nhận hàng từ 2-5 ngày
                  </p>
                </div>
              </div>
              <hr className="my-4" />
              <div className="grid grid-cols-2">
                <div>
                  <div className="grid grid-cols-6 items-center pb-5">
                    <img
                      src="https://static.coolmate.me/images/icons/icon3.svg"
                      alt=""
                    />
                    <p className="col-span-5 pl-3 text-xs font-[450]">
                      Đổi trả cực dễ chỉ cần số <br /> điện thoại
                    </p>
                  </div>
                  <div className="grid grid-cols-6 items-center">
                    <img
                      src="https://static.coolmate.me/images/icons/icon2.svg"
                      alt=""
                    />
                    <p className="col-span-5 pl-3 text-xs font-[450]">
                      Hotline 1900.27.27.37 hỗ trợ <br /> từ 8h30 - 22h mỗi ngày
                    </p>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-6 items-center pb-5">
                    <img
                      src="https://static.coolmate.me/images/icons/icon5.svg"
                      alt=""
                    />
                    <p className="col-span-5 pl-3 text-xs font-[450]">
                      60 ngày đổi trả vì bất kỳ lý do gì
                    </p>
                  </div>
                  <div className="grid grid-cols-6 items-center">
                    <img
                      src="https://static.coolmate.me/images/icons/icon1.svg"
                      alt=""
                    />
                    <p className="col-span-5 pl-3 text-xs font-[450]">
                      Đến tận nơi nhận hàng trả, <br /> hoàn tiền trong 24h
                    </p>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}

              <div className="">
                <h3 className="text-sm font-bold text-gray-900">
                  Đặc điểm nổi bật
                </h3>

                <div>
                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {customerProduct?.product?.description.map((highlight) => (
                        <li key={highlight} className="">
                          <span className="text-sm ">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Detail */}
        <section className="px-[12rem] py-20">
          <h1 className="font-bold text-xl px-16 pb-4">Chi tiết sản phẩm</h1>
          {open && (
            <div>
              {customerProduct?.product?.descImgUrl.map((image) => (
                <img className="w-full h-auto pb-4 px-16" src={image} alt="" />
              ))}
            </div>
          )}
          {!open && (
            <div>
              <img
                className="w-full h-auto pb-4 px-16"
                src={customerProduct?.product?.descImgUrl[0]}
                alt=""
              />
              <div className="relative h-[30rem] overflow-hidden">
                <img
                  className="absolute w-full h-auto object-cover object-top pb-4 px-16"
                  src={customerProduct?.product?.descImgUrl[1]}
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outlined"
                  onClick={handleClick}
                  sx={{
                    borderRadius: "9999px",
                    paddingX: "60px",
                    textTransform: "none",
                  }}
                >
                  Xem thêm
                </Button>
              </div>
            </div>
          )}
        </section>
        <h1 className="font-semibold text-center text-2xl px-16 pb-4">
          SẢN PHẨM BẠN CÓ THỂ THÍCH
        </h1>
        <RecommendCarousel data={customerProduct?.products?.content?.slice(0-7)} sectionName={""} />
        {/*rating & review */}
        {(review.reviews?.length > 0) && (
          <section>
            <h1 className="font-semibold text-lg px-16 pb-4">
              Reviews từ khách đã mua hàng
            </h1>

            <div className="border p-5">
              <div className="grid grid-cols-4 space-x-2 px-16">
                <div className="col-span-3">
                  <div className="grid grid-cols-2 items-center ">
                    {review.reviews?.map((item) => (
                      <div className="border-b border-gray-200">
                        <ProductReviewCard itemData={item} />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="sticky top-2 pt-5 rounded-lg w-full bg-gray-200 items-center h-[13rem]">
                    <p className="text-center font-bold">ĐÁNH GIÁ SẢN PHẨM</p>
                    <p className="text-center text-7xl font-bold">{averageScore?.toFixed(1)}</p>
                    <div className="flex justify-center pt-3">
                      <Rating
                        value={averageScore}
                        name="half-rating"
                        precision={0.5}
                        readOnly
                        size="large"
                      />
                    </div>
                    <p className="text-sm italic text-gray-400 text-center">
                      {review.reviews.length} đánh giá
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography id="modal-title" variant="h6" component="h2">
              Xin hãy đăng nhập
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Đăng nhập hoặc đăng kí thành viên để thực hiện mua hàng
            </Typography>
            <Button onClick={() => setOpenModal(false)}>
              Đóng
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
