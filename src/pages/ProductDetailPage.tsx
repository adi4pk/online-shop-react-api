import type { ProductItem } from "./ProductItem";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

type ProductProps={
    produs: ProductItem;
}
function ProductDetailPage(){

    return (
      <>
      
        
          <p>&#128187;</p>
          <p>sunt in produs</p>
      </>
    );
}

export default ProductDetailPage;