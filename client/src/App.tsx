import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Product from "./Pages/Product";
import Shop from "./Pages/Shop";
import ContactUs from "./Pages/ContactUs";
import Header from "./components/Header";
import Account from "./components/Account";
import Address from "./components/Address";
import Wishlist from "./components/Wishlist";
import Orders from "./components/Orders";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/sign-in"
            element={<SignIn />}
          />
          <Route
            path="/sign-up"
            element={<SignUp />}
          />
          <Route
            path="/shop"
            element={<Shop />}
          />
          <Route
            path="/product"
            element={<Product />}
          />
          <Route
            path="/contact-us"
            element={<ContactUs />}
          />
          <Route element={<PrivateRouter />}>
            <Route
              path="/profile"
              element={<Profile />}
            >
              <Route
                path="/profile/account-details"
                element={<Account />}
              />

              <Route
                path="/profile/address"
                element={<Address />}
              />
              <Route
                path="/profile/wishlist"
                element={<Wishlist />}
              />
              <Route
                path="/profile/orders"
                element={<Orders />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
