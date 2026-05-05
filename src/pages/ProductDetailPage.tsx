import type { ProductItem } from "./ProductItem";
import { Link } from "react-router-dom";

type ProductProps={
    produs: ProductItem;
}
function ProductDetailPage(){

    return (
      <>
        <Link to={"/products/:id"}>
          <p>&#128187;</p>
          <p>sunt in produs</p>
        </Link>
      </>
    );
}

export default ProductDetailPage;