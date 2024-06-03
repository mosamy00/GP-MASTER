import React, { useEffect, useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import  { Toaster } from 'react-hot-toast';

import Layout from "./component/layout/Layout.jsx";
import Home from "./component/home/Home.jsx";
import About from "./component/About/About.jsx";
import Contact from "./component/Contact/Contact.jsx";
import Cart from "./component/cart/Cart.jsx";
import SignIn from "./component/signIn/SignIn.jsx";
import SignUp from "./component/signUp/SignUp.jsx";
import WishList from "./component/wishList/WishList.jsx";
import ForgitPassword from "./component/forgetPassword/ForgitPassword.jsx";
import VeryfyResetCode from "./component/veryfyResetCode/VeryfyResetCode.jsx";
import ResetPassword from "./component/resetPassword/ResetPassword.jsx";
import Product from "./component/product/Product.jsx";
import Brand from "./component/brand/Brand.jsx";
import Subcatigory from "./component/cubCatigory/Subcatigory.jsx";
import { jwtDecode } from "jwt-decode";
import ProtectedRouter from "./protectedData.jsx";
import BrandDetels from "./component/brandDetels/BrandDetels.jsx";
import ProductDetailes from "./component/productDetailes/ProductDetailes.jsx";
import NotFound from "./component/NotFound/NotFound.jsx";
import Products from "./component/Products/Products.jsx";
import CartContextProvider from "./Context/cartContext.js";
import ForYou from './component/ForYou/ForYou';
import WishListProvider from "./Context/wishListContext.js";


export default function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");

      let userData = jwtDecode(token);
      saveUserData(userData);
    }
  }, []);

  function Logout() {
    saveUserData(null);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  let [userData, setUserData] = useState(null);

  function saveUserData(data) {
    setUserData(data);
  }

  let Routes = createBrowserRouter([
    {
      path: "",
      element: <Layout Logout={Logout} userData={userData} />,
      children: [
        { index:true, element:<ProtectedRouter><Home /></ProtectedRouter>  },
        { path: "about", element:<ProtectedRouter><About /></ProtectedRouter>  },
        { path: "contact", element:<ProtectedRouter><Contact /></ProtectedRouter>  },
        {
          path: "cart",
          element: (
            <ProtectedRouter>
              <Cart userData={userData} />
            </ProtectedRouter>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRouter>
              <WishList userData={userData} />
            </ProtectedRouter>
          ),
        },
        {
          path: "product",
          element: (
            <ProtectedRouter>
              <Product />
            </ProtectedRouter>
          ),
        },
        {
          path: "forYou",
          element: (
            <ProtectedRouter>
              <ForYou />
            </ProtectedRouter>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRouter>
              <Products />
            </ProtectedRouter>
          ),
        },
        {
          path: "brand",
          element: (
            <ProtectedRouter>
              <Brand />
            </ProtectedRouter>
          ),
        },
        {
          path: "productDetailes/:id",
          element: (
            <ProtectedRouter>
              <ProductDetailes />
            </ProtectedRouter>
          ),
        },
        {
          path: "subCatigory",
          element: (
            <ProtectedRouter>
              <Subcatigory />
            </ProtectedRouter>
          ),
        },
        // get all product in Brand
        {
          path: "brandDetels/:id",
          element: (
            <ProtectedRouter>
              <BrandDetels />
            </ProtectedRouter>
          ),
        },

        { path: "signin", element: <SignIn saveUserData={saveUserData} /> },
        { path: "signup", element: <SignUp /> },
        { path: "forgetPassword", element: <ForgitPassword /> },
        { path: "veryfyResetCode", element: <VeryfyResetCode /> },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>  
    <WishListProvider>
    <CartContextProvider>
      <Toaster/>
      <RouterProvider router={Routes} />
      </CartContextProvider>
      </WishListProvider>
    </>
  );
}
