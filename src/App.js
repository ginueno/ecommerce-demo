import logo from "./logo.svg";
import "./App.css";
import Navagation from "./customer/components/navigations/Navagation";
import Homepage from "./customer/pages/HomePage/Homepage";
import ProductListPage from "./customer/pages/ProductListPage/ProductListPage";
import Footer from "./customer/components/Footer/Footer";
import ProductDetails from "./customer/components/ProductDetails/ProductDetaials";
import Cart from "./customer/components/Cart/Cart";
import Checkout from "./customer/components/Checkout/Checkout";
import OrderList from "./customer/components/OrderList/OrderList";
import OrderDetails from "./customer/components/OrderList/OrderDetails";
import { Route, Routes } from "react-router-dom";
import CustomerRouters from "./customer/components/Routers/CustomerRouters";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRouters />}></Route>
      </Routes>
    </div>
  );
}

export default App;
