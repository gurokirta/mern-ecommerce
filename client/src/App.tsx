import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Product from "./Pages/Product";
import Shop from "./Pages/Shop";
import ContactUs from "./Pages/ContactUs";
import Header from "./components/Header";

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
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
