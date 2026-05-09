import type { ProductItem } from "./ProductItem";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

function Product(){

    return(
        <>
        <p> <Link to={"/products/:id"}>#test product</Link></p>
        </>
    )


}

export default Product;