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
        </Routes>
        </>
    )
}

export default AppRoutes;