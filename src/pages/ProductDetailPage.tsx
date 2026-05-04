import type { ProductItem } from "./ProductItem";
import { Link } from "react-router-dom";

type ProductProps={
    produs: ProductItem;
}
function ProductDetailPage({produs}: ProductProps){

    return (
      <>
        <a
        // href="product-detail.html"
        className="product-card"
        // data-name={produs.dataName}
        // data-cat={produs.categ}
        > <Link to={`/products/${produs.id}`}>
        

          <div className="product-img">
            {produs.productImg}<span className="category-tag">{produs.categ}</span>
            <span className="stock-tag in-stock"
            >{produs.inStoc ? "In stoc" : "Indisponibil"}</span>
          </div>
          <div className="product-info">
            <div className="product-name">{produs.dataName}</div>
            <div className="product-sku">{produs.SKU}</div>
            <div className="product-desc">
              {produs.descriere}
            </div>
          </div>
          <div className="product-footer">
            <div className="product-price">
              {produs.price} <span className="currency">{produs.currency}</span>
            </div>
            <div className="product-weight">{produs.greutate} g</div>
          </div>
          </Link>
        </a>
      </>
    );
}

export default ProductDetailPage;