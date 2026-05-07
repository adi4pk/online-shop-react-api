import { Routes, Route, Router } from "react-router-dom";
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
import NotFoundPage from "@/pages/NotFoundPage";
import AccountAddresses from "@/pages/account/AccountAddresses";

function AppRoutes(){
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/ProductsPage" element={<ProductsPage/>}/>
            <Route path="/products/:id" element={<ProductDetailPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/checkout" element={<CheckoutPage/>}/>
            <Route path="/confirmation/:orderId" element={<ConfirmationPage/>}/>
            <Route path="/account/orders" element={<AccountOrdersPage/>}/>
            <Route path="/account/profile" element={<AccountProfilePage/>}/>
            <Route path="/account/addresses" element={<AccountAddresses/>}/>
            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
        </>
    )
}

export default AppRoutes;