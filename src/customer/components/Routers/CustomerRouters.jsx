import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../../pages/HomePage/Homepage";
import Cart from "../Cart/Cart";
import ProductListPage from "../../pages/ProductListPage/ProductListPage";
import Navagation from "../navigations/Navagation";
import Footer from "../Footer/Footer";
import ProductDetails from "../ProductDetails/ProductDetaials";
import Checkout from "../Checkout/Checkout";
import OrderList from "../OrderList/OrderList";
import OrderDetails from "../OrderList/OrderDetails";
import RateProduct from "../review & rating/RateProduct";
import CareShare from "../navigations/CareShare";

const CustomerRouters = () => {
  return (
    <div>
      <div></div>
      <div className="mb-5">
        <Navagation />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Homepage />}></Route>
        <Route path="/register" element={<Homepage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/category/:level2" element={<ProductListPage />}></Route>
        <Route path="/collection/:level2" element={<ProductListPage />}></Route>
        <Route path="/lpage/:level2" element={<ProductListPage />}></Route>
        <Route path="/category/" element={<ProductListPage />}></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/account/order" element={<OrderList />}></Route>
        <Route path="/account/order/:orderId" element={<OrderDetails />}></Route>
        <Route path="/account/rate/:productId" element={<RateProduct />}></Route>
        <Route path="/careshare" element={<CareShare />}></Route>

      </Routes>

      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRouters;
