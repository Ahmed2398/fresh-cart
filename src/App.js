import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductsDetails/ProductDetails";
import NotFound from "./Components/NotFound/NotFound";
import Address from "./Components/Address/Address";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import Wishlist from "./Components/Wishlist/Wishlist";
import Orders from "./Components/Orders/Orders";

function CategoriesDetails() {
    return null;
}

let routes = createBrowserRouter([
  {
      path: '', element: <Layout />, children: [
          { path: '', element: <Navigate to={'home'} /> },

          { path: 'home', element: <ProtectedRoute><Home /> </ProtectedRoute> },
          { path: 'categories', element: <ProtectedRoute><Categories /> </ProtectedRoute> },
          { path: 'categoriesDetails/:id', element: <ProtectedRoute><CategoriesDetails /> </ProtectedRoute> },
          { path: 'cart', element: <ProtectedRoute><Cart /> </ProtectedRoute> },
          { path: 'brands', element: <ProtectedRoute><Brands /> </ProtectedRoute> },
          { path: 'products', element: <ProtectedRoute><Products /> </ProtectedRoute> },
          { path: 'allorders', element: <ProtectedRoute><Orders /> </ProtectedRoute> },
          { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /> </ProtectedRoute> },
          { path: 'address/:cartId', element: <ProtectedRoute><Address /> </ProtectedRoute> },

          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: "forgetpassword", element: <ForgetPassword /> },
          { path: "verifycode", element: <VerifyCode /> },
          { path: "resetpassword", element: <ResetPassword /> },
          {path: "wishlist", element: <Wishlist /> },

          { path: '*', element: <NotFound /> }
      ]}
])
function App() {
      return <RouterProvider router={routes}></RouterProvider>
}

export default App;
