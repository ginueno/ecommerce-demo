/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModel from "../../Auth/AuthModel";
import { Avatar, Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, ListItemIcon, Menu, MenuItem, Modal, Tooltip, Typography } from "@mui/material";
import { getUser, logout } from "../../../state/Auth/Action";
import { useDispatch, useSelector } from "react-redux";
import { deepPurple } from "@mui/material/colors";
import { Logout, Reorder, Settings } from "@mui/icons-material";
import { getCart } from "../../../state/customer/cart/Action";

const navigation = {
  categories: [
    {
      id: "products",
      name: "SẢN PHẨM",
      featured: [
        {
          name: "Quần dài chạy bộ Fast & Free",
          href: "/product/516",
          imageSrc:
            "https://mcdn.coolmate.me/image/December2023/mceclip2_44.png",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "",
          href: "#",
          imageSrc:
            "https://mcdn.coolmate.me/image/January2024/mceclip1_29.png",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "all-products",
          name: "THEO SẢN PHẨM",
          items: [
            { name: "Tất cả sản phẩm", href: "/category/" },
            { name: "Sản phẩm mới", href: "/category/new" },
          ],
        },
        {
          id: "ao-nam",
          name: "Áo nam",
          items: [
            { name: "Tất cả áo nam", href: "/category/Áo nam" },
            { name: "Áo thun", href: "/collection/Áo thun" },
            { name: "Áo sơ mi", href: "/collection/Áo sơ mi" },
            { name: "Áo polo", href: "/collection/Áo polo" },
            { name: "Áo dài tay", href: "/collection/Áo dài tay" },
            { name: "Áo khoác", href: "/collection/Áo khoác" },
            { name: "Áo tanktop", href: "/collection/Áo tanktop" },
            { name: "Áo thể thao", href: "/collection/Áo thể thao" },
          ],
        },
        {
          id: "quan-nam",
          name: "Quần nam",
          items: [
            { name: "Tất cả quần nam", href: "/category/Quần nam" },
            { name: "Quần shorts", href: "/collection/Quần shorts" },
            { name: "Quần jeans", href: "/collection/Quần jeans" },
            { name: "Quần dài", href: "/collection/Quần dài" },
            { name: "Quần thể thao", href: "/collection/Quần thể thao" },
            { name: "Quần lót", href: "/collection/Quần lót" },
          ],
        },
        {
          id: "phu-kien-nam",
          name: "Phụ kiện nam",
          items: [
            { name: "Tất cả phụ kiện", href: "/category/Phụ kiện nam" },
            { name: "Tất/vớ", href: "/collection/Tất%2Fvớ" },
            { name: "Mũ/nón", href: "/collection/Mũ%2Fnón" },
          ],
        },
      ],
    },
    {
      id: "do-lot",
      name: "ĐỒ LÓT",
      featured: [
        {
          name: "Trunk cool pouch",
          href: "#",
          imageSrc:
            "https://mcdn.coolmate.me/image/December2023/mceclip1_25.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "",
          href: "#",
          imageSrc:
            "https://mcdn.coolmate.me/image/January2024/mceclip3_44.png",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "theo-do-lot",
          name: "Theo sản phẩm",
          items: [
            { name: "Tất cả", href: "/collection/Quần lót" },
            { name: "Brief", href: "/collection/Brief" },
            { name: "Trunk", href: "/collection/Trunk" },
            { name: "Boxer brief", href: "/collection/Boxer brief" },
            { name: "Long leg", href: "/collection/Long leg" },
            { name: "Boxer shorts", href: "/collection/Boxer shorts" },
            { name: "Long tights", href: "/collection/Long tights" },
          ],
        },
        {
          id: "blank",
          name: "",
          items: [],
        },
        {
          id: "do-lot-nhu-cau",
          name: "Theo nhu cầu",
          items: [
            { name: "Mặc hằng ngày", href: "/lpage/Mặc hằng ngày" },
            { name: "Chơi thể thao", href: "/lpage/Chơi thể thao" },
          ],
        },
      ],
    },
    {
      id: "do-the-thao",
      name: "ĐỒ THỂ THAO",
      featured: [
        {
          name: "Áo Polo Thể Thao Pro Active 1595",
          href: "/product/353",
          imageSrc:
            "https://mcdn.coolmate.me/image/March2024/mceclip13_31.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://mcdn.coolmate.me/image/March2024/mceclip5_9.png",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "all-the-thao",
          name: "THEO SẢN PHẨM",
          items: [
            { name: "Tất cả sản phẩm", href: "/category/Đồ thể thao" },
            { name: "Sản phẩm mới", href: "/category/Đồ thể thao" },
            { name: "Áo T-shirt", href: "/collection/Áo T-shirt" },
            { name: "Áo tank top", href: "/collection/Áo tank top thể thao" },
            { name: "Áo polo", href: "/collection/Áo polo thể thao" },
            { name: "Áo dài tay", href: "/collection/Áo dài tay thể thao" },
            { name: "Áo khoác", href: "/collection/Áo khoác thể thao" },
          ],
        },
        {
          id: "blank",
          name: " ",
          items: [
            { name: "Quần shorts", href: "/collection/Quần shorts thể thao" },
            { name: "Quần joggers", href: "/collection/Quần joggers" },
            { name: "Phụ kiện", href: "/collection/Phụ kiện thể thao" },
          ],
        },
        {
          id: "the-thao-nhu-cau",
          name: "Theo nhu cầu",
          items: [
            { name: "Chạy bộ", href: "/lpage/Chạy bộ" },
            { name: "Gym", href: "/lpage/Gym" },
            { name: "Thu đông", href: "/lpage/Thu đông" },
          ],
        },
        {
          id: "blank",
          name: " ",
          items: [
            { name: "Thể thao chung", href: "/lpage/Thể thao chung" },
            { name: "Bóng rổ", href: "/lpage/Bóng rổ" },
          ],
        },
      ],
    },
    {
      id: "mac-hang-ngay",
      name: "MẶC HẰNG NGÀY",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://mcdn.coolmate.me/image/March2024/mceclip16_98.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://mcdn.coolmate.me/image/March2024/mceclip9_4.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "all-hang-ngay",
          name: "THEO SẢN PHẨM",
          items: [
            { name: "Tất cả sản phẩm", href: "/category/Mặc hằng ngày" },
            { name: "Sản phẩm mới", href: "/category/Mặc hằng ngày" },
            { name: "Áo T-shirt", href: "/collection/Áo T-shirt hằng ngày" },
            { name: "Áo tank top", href: "/collection/Áo tank top hằng ngày" },
            { name: "Áo polo", href: "/collection/Áo polo hằng ngày" },
            { name: "Áo sơ mi", href: "/collection/Áo sơ mi" },
            { name: "Áo dài tay", href: "/collection/Áo dài tay hằng ngày" },
            { name: "Áo khoác", href: "/collection/Áo khoác hằng ngày" },
          ],
        },
        {
          id: "blank",
          name: " ",
          items: [
            { name: "Quần shorts", href: "/collection/Quần shorts hằng ngày" },
            { name: "Quần joggers", href: "/collection/Quần joggers hằng ngày" },
            { name: "Quần dài", href: "/collection/Quần dài" },
            { name: "Quần jeans", href: "/collection/Quần jeans" },
            { name: "Phụ kiện", href: "/collection/Phụ kiện hằng ngày" },
          ],
        },
        {
          id: "bst-hang-ngay",
          name: "Bộ sưu tập",
          items: [
            { name: "Ready to wear", href: "/lpage/Ready to wear" },
            { name: "Coolmate Basics", href: "/lpage/Coolmate Basics" },
            { name: "Công nghệ excool", href: "/lpage/Công nghệ excool" },
          ],
        },
        {
          id: "blank",
          name: " ",
          items: [
            { name: "Đồ thu đông", href: "/lpage/Thể thao chung" },
            { name: "Copper Denim", href: "/lpage/Copper Denim" },
            { name: "Disney & Friends", href: "/lpage/Disney & Friends" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "SẢN XUẤT RIÊNG", href: "#" },
    { name: "CARE & SHARE", href: "/careshare" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navagation() {
  const [open, setOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openuserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, cart } = useSelector((store) => store);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const handleCartClick = () => {
    if (!auth.user) {
      setOpenModal(true)
    } else {
      navigate('/cart')
    }
  }

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  }

  const handleOpen = () => {
    setOpenAuthModal(true);
  }

  const handleClose = () => {
    setOpenAuthModal(false);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(jwt)
    if (jwt) {
      dispatch(getUser(jwt))
      dispatch(getCart(jwt))
    }
  }, [jwt])

  useEffect(() => {
    if (auth.user) {
      handleClose();
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/")
      }
    } else if (location.pathname === "/login" || location.pathname === "/register") {
      handleOpen();
    }
  }, [auth.user]);

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-sky-500 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Ra mắt Coolmate Basics!
        </p>

        <nav
          aria-label="Top"
          className="bg-gray-900 mx-auto w-full px-4 sm:px-6 lg:px-8"
        >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://www.coolmate.me/images/logo-coolmate-new.svg?v=1"
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex font-bold text-white">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "bg-sky-500	 border-red-700"
                                  : "border-transparent hover:bg-gray-800",
                                "relative z-10 -mb-px px-2 flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-4 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900 uppercase"
                                          >
                                            {(section.name === " ") ? <span>&nbsp;</span> : section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <a
                                                  href={item.href}
                                                  className="hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-white hover:bg-gray-800 px-2"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {(auth.user) ? (
                  <div>
                    <Tooltip title="Accout Settings">
                      <IconButton
                        onClick={handleUserClick}
                        aria-controls={openuserMenu ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openuserMenu ? 'true' : undefined}
                      >
                        <Avatar
                          sx={{
                            bgcolor: deepPurple[500],
                            color: "white",
                            cursor: "pointer",
                          }}>
                          {auth.user?.name[0].toUpperCase()}
                        </Avatar>
                      </IconButton>
                    </Tooltip>

                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={openuserMenu}
                      onClose={handleCloseUserMenu}
                      onClick={handleCloseUserMenu}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        Thông tin tài khoản
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Tùy chỉnh
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/account/order")}>
                        <ListItemIcon>
                          <Reorder fontSize="small" />
                        </ListItemIcon>
                        Hoá đơn của tôi
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Đăng xuất
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <a
                      onClick={() => {
                        navigate("/login");
                        handleOpen();
                      }}
                      className="text-sm font-medium text-gray-100 group-hover:text-gray-200 cursor-pointer"
                    >
                      Đăng nhập
                    </a>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <a
                      onClick={() => {
                        navigate("/register");
                        handleOpen();
                      }}
                      className="text-sm font-medium text-gray-100 group-hover:text-gray-200"
                    >
                      Đăng kí
                    </a>
                  </div>
                )}

                {/* Search */}
                <div className="flex lg:ml-6">
                  <input className="rounded-full px-3" type="text" placeholder="Tìm kiếm..." onChange={(e) => setSearch(e.target.value)} />
                  <a onClick={() => navigate(`/category/?name=${search}`)} className="p-2 text-gray-100 group-hover:text-gray-200 cursor-pointer">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a onClick={handleCartClick} className="group -m-2 flex items-center p-2 cursor-pointer">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-100 group-hover:text-gray-200"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-100 group-hover:text-gray-200">
                      {(auth.user) ? (cart?.cartItems?.length) : 0}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
                {/* modal */}
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
          </div>
        </nav>
      </header>
      <AuthModel handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}
