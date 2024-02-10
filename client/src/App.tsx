import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Product from "./Pages/Product";
import Shop from "./Pages/Shop";
import ContactUs from "./Pages/ContactUs";
import Header from "./components/Header";
import Account from "./Pages/Account";
import Address from "./Pages/Address";
import Wishlist from "./Pages/Wishlist";
import Orders from "./Pages/Orders";
import PrivateRouter from "./components/PrivateRouter";
import CreateBillingAddress from "./Pages/CreateBillingAddress";
import Dashboard from "./Pages/Dashboard";
import ProductItem from "./Pages/ProductItem";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route element={<PrivateRouter />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />}>
              <Route
                path="/profile/account-details"
                element={<Account profilePic={""} />}
              />

              <Route path="/profile/address" element={<Address />}>
                <Route
                  path="/profile/address/create"
                  element={<CreateBillingAddress />}
                />
              </Route>
              <Route path="/profile/wishlist" element={<Wishlist />} />
              <Route path="/profile/orders" element={<Orders />} />
            </Route>
          </Route>
          <Route path="/product/:id" element={<ProductItem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
