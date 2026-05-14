import Product from "./Product";
import type { ProductItem } from "./ProductItem";

const productsArr: ProductItem[] = [
  { id: 1, productImg: "💻", dataName: "Laptop ProMax 15",      categ: "Electronics", inStoc: true,  SKU: "SKU-EL-001", descriere: "Laptop performant cu procesor ultima generatie, 16GB RAM, 512GB SSD.", price: 4599, currency: "RON", greutate: 2100 },
  { id: 2, productImg: "🖥",  dataName: "Monitor UltraWide 34",  categ: "Electronics", inStoc: true,  SKU: "SKU-EL-002", descriere: "Monitor curbat IPS, rezolutie WQHD, timp raspuns 1ms.",                price: 2199, currency: "RON", greutate: 6800 },
  { id: 3, productImg: "⌨️",  dataName: "Tastatura Mecanica RGB", categ: "Electronics", inStoc: true,  SKU: "SKU-EL-003", descriere: "Tastatura mecanica cu switch-uri Cherry MX, iluminare RGB.",           price:  349, currency: "RON", greutate:  820 },
  { id: 4, productImg: "👕",  dataName: "Tricou Sport Dry-Fit",   categ: "Clothing",    inStoc: true,  SKU: "SKU-CL-010", descriere: "Material respirabil, uscare rapida, ideal pentru antrenament.",        price:   89, currency: "RON", greutate:  180 },
  { id: 5, productImg: "💡",  dataName: "Lampa LED Birou",        categ: "Home",        inStoc: false, SKU: "SKU-HM-020", descriere: "Lampa LED cu 3 moduri de iluminare, brat flexibil, port USB.",         price:  149, currency: "RON", greutate:  950 },
  { id: 6, productImg: "⚽",  dataName: "Minge Fotbal Pro",       categ: "Sports",      inStoc: true,  SKU: "SKU-SP-015", descriere: "Minge profesionala FIFA Quality Pro, marime 5.",                       price:  120, currency: "RON", greutate:  430 },
  { id: 7, productImg: "🧥",  dataName: "Geaca Iarna Puf",        categ: "Clothing",    inStoc: true,  SKU: "SKU-CL-011", descriere: "Geaca puf natural, rezistenta la apa, captuseala termica.",            price:  599, currency: "RON", greutate:  750 },
  { id: 8, productImg: "🏠",  dataName: "Set Prosoape Bumbac",    categ: "Home",        inStoc: true,  SKU: "SKU-HM-021", descriere: "Set 4 prosoape 100% bumbac egipt, 600gsm.",                            price:   79, currency: "RON", greutate:  600 },
];

function ProductsPage() {
  return (
    <div className="container section">
      <div className="section-title">Produse</div>
      <div className="section-subtitle">
        Exploreaza catalogul nostru de produse
      </div>

      <div className="products-toolbar">
        <div className="search-box">
          <span>🔍</span>
          <input type="text" id="product-search" placeholder="Cauta produse..." />
        </div>
        <div className="filter-group">
          <select id="filter-category">
            <option>Toate categoriile</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home</option>
            <option>Sports</option>
          </select>
          <select>
            <option>Sorteaza: Recomandate</option>
            <option>Pret: mic la mare</option>
            <option>Pret: mare la mic</option>
            <option>Cele mai noi</option>
          </select>
        </div>
      </div>

      <div className="products-grid" id="products-grid">
        {productsArr.map((produs) => (
          <Product key={produs.id} produs={produs} />
        ))}
      </div>

      <div className="pagination">
        <button disabled>&laquo;</button>
        <button disabled>&lsaquo;</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>...</button>
        <button>13</button>
        <button>&rsaquo;</button>
        <button>&raquo;</button>
      </div>
    </div>
  );
}

export default ProductsPage;
