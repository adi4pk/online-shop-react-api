import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import RegisterPage from "@/pages/RegisterPage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ConfirmationPage from "@/pages/ConfirmationPage";
import AccountOrdersPage from "@/pages/account/AccountOrdersPage";
import AccountProfilePage from "@/pages/account/AccountProfilePage";
import AccountAddresses from "@/pages/account/AccountAddresses";
import NotFoundPage from "@/pages/NotFoundPage";
import { ReactElement } from "react";

import { ProtectedRoute } from "./ProtectedRoutes";
import { PublicRoute } from "./ProtectedRoutes";



function AppRoutes() {

  
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><ProductsPage/></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/confirmation/:orderId" element={<ProtectedRoute><ConfirmationPage /></ProtectedRoute>} />
        <Route path="/account/orders" element={<ProtectedRoute><AccountOrdersPage /></ProtectedRoute>} />
        <Route path="/account/profile" element={<ProtectedRoute><AccountProfilePage /></ProtectedRoute>} />
        <Route path="/account/addresses" element={<ProtectedRoute><AccountAddresses /></ProtectedRoute>} />
      </Route>

      <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage/></PublicRoute>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
