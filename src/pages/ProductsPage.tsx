import { useNavigate } from "react-router-dom";
import ProductDetailPage from "./ProductDetailPage";
import { Link } from "react-router-dom";
import AccountProfilePage from "./account/AccountProfilePage";

function ProductsPage(){

        let productsArr = [{id: 1, productImg: "&#128187", dataName: "Laptop ProMax 15", categ: "Electronics", inStoc: true, SKU: "SKU-EL-001", descriere: "Laptop performant cu procesor ultima generatie, 16GB RAM, 512GB SSD.", price: 4.599, currency: "RON", greutate: 2.100},
            {id: 2, productImg: "&#128424", dataName: "Monitor UltraWide 34", categ:"Electronics", inStoc: true, SKU: "SKU-EL-002", descriere: "Monitor curbat IPS, rezolutie WQHD, timp raspuns 1ms.", price: 2.199, currency: "RON", greutate: 6.800},
            {id: 3, productImg: "&#9000", dataName: "Tastatura Mecanica RGB", categ: "Electronics", inStoc: true, SKU: "SKU-EL-003", descriere: "Tastatura mecanica cu switch-uri Cherry MX, iluminare RGB.", price: 349, currency: "RON", greutate: 820},
            {id: 4, productImg: "&#128085", dataName: "Tricou Sport Dry-Fit", categ: "Clothing", inStoc: true, SKU:"SKU-CL-010", descriere: "Material respirabil, uscare rapida, ideal pentru antrenament.", price: 89, currency: "RON", greutate: 180},
            {id: 5, productImg: "&#128161", dataName: "Lampa LED Birou", categ: "Home", inStoc: false, SKU: "SKU-HM-020", descriere: "Lampa LED cu 3 moduri de iluminare, brat flexibil, port USB", price: 149, currency: "RON", greutate: 950},
            {id: 6, productImg: "&#9917", dataName: "Minge Fotbal Pro", categ: "Sports", inStoc: true, SKU:"SKU-SP-015", descriere: "Minge profesionala FIFA Quality Pro, marime 5.", price: 120, currency: "RON", greutate: 430},
            {id: 7, productImg: "&#129507", dataName: "Geaca Iarna Puf", categ: "Clothing", inStoc: true, SKU: "SKU-CL-011", descriere: "Geaca puf natural, rezistenta la apa, captuseala termica.", price: 599, currency: "RON", greutate: 750},
            {id: 8, productImg: "&#127968", dataName: "Set Prosoape Bumbac", categ: "Home", inStoc: true, SKU: "SKU-HM-021", descriere: "Set 4 prosoape 100% bumbac egipt, 600gsm.", price: 79, currency: "RON", greutate: 600}
        ];

    const navigate = useNavigate();

    let goToCart = () =>{
      navigate('/cart');
    }

    let goToMyOrders = () =>{
      navigate('/account/orders');
    }

    
    return (
      <>
        <div className="mockup-bar">
          <div>
            <a href="index.html">&larr; Toate paginile</a>
          </div>
          <div className="mockup-route">/products</div>
          <div>
            Click pe produs &rarr;{" "}
            <a href="product-detail.html">ProductDetailPage</a>
          </div>
        </div>

        <nav className="navbar">
          <div className="navbar-inner">
            <Link to={"/ProductsPage"} className="navbar-brand">
              <div className="brand-icon">S</div> OnlineShop
            </Link>
            <ul className="navbar-links">
              <li>
                <Link to={'/ProductsPage'} className="active">
                  Produse
                </Link>
              </li>
              <li>
                <Link to={'/cart'}
                >Cos</Link>
              </li>
              <li>
                <Link to={'/account/orders'}
                // onClick={() => goToMyOrders()}
                >Comenzile mele</Link>
              </li>
            </ul>
            <div className="navbar-actions">
              <Link to={'/cart'} className="cart-btn"
              // onClick={() => goToCart()}
              >
                &#128722; Cos <span className="cart-badge">3</span>
              </Link>
              <Link to={'/account/profile'} className="user-menu">
                <div className="user-avatar">AP</div> Andrei P.
              </Link>
            </div>
          </div>
        </nav>

        <div className="container section">
          <div className="section-title">Produse</div>
          <div className="section-subtitle">
            Exploreaza catalogul nostru de produse
          </div>

          <div className="products-toolbar">
            <div className="search-box">
              <span>&#128269;</span>
              <input
                type="text"
                id="product-search"
                placeholder="Cauta produse..."
              />
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

          {/* <!-- Results count + clear filters bar (visible when searching) --> */}
          <div
            id="results-info"
            style={{
              display: "none",
              fontSize: "13px",
              color: "var(--text-secondary)",
              marginBottom: "16px",
            }}
          >
            <span id="results-count"></span>
            <button
              id="clear-filters"
              className="btn btn-ghost btn-sm"
              style={{ marginLeft: "8px" }}
            >
              Sterge filtrele
            </button>
          </div>

          {/* <!-- Empty / no-results state --> */}
          <div
            id="no-results"
            className="empty-state"
            style={{ display: "none" }}
          >
            <div className="empty-state-icon">&#128269;</div>
            <h2>Niciun produs gasit</h2>
            <p>
              Nu am gasit produse care sa corespunda cautarii tale. Incearca sa
              schimbi termenii sau sterge filtrele.
            </p>
            <button className="btn btn-primary" id="reset-filters-btn">
              Sterge filtrele
            </button>
          </div>

          {/* <div className="products-grid" id="products-grid">
      <a href="product-detail.html" className="product-card" data-name="Laptop ProMax 15" data-cat="Electronics">
        <div className="product-img">&#128187;<span className="category-tag">Electronics</span><span className="stock-tag in-stock">In stoc</span></div>
        <div className="product-info"><div className="product-name">Laptop ProMax 15</div><div className="product-sku">SKU-EL-001</div><div className="product-desc">Laptop performant cu procesor ultima generatie, 16GB RAM, 512GB SSD.</div></div>
        <div className="product-footer"><div className="product-price">4,599 <span className="currency">RON</span></div><div className="product-weight">2,100 g</div></div>
      </a>
      <a href="product-detail.html" className="product-card" data-name="Monitor UltraWide 34" data-cat="Electronics">
        <div className="product-img">&#128424;<span className="category-tag">Electronics</span><span className="stock-tag in-stock">In stoc</span></div>
        <div className="product-info"><div className="product-name">Monitor UltraWide 34"</div><div className="product-sku">SKU-EL-002</div><div className="product-desc">Monitor curbat IPS, rezolutie WQHD, timp de raspuns 1ms.</div></div>
        <div className="product-footer"><div className="product-price">2,199 <span className="currency">RON</span></div><div className="product-weight">6,800 g</div></div>
      </a>
      <a href="product-detail.html" className="product-card" data-name="Tastatura Mecanica RGB" data-cat="Electronics">
        <div className="product-img">&#9000;<span className="category-tag">Electronics</span><span className="stock-tag in-stock">In stoc</span></div>
        <div className="product-info"><div className="product-name">Tastatura Mecanica RGB</div><div className="product-sku">SKU-EL-003</div><div className="product-desc">Tastatura mecanica cu switch-uri Cherry MX, iluminare RGB.</div></div>
        <div className="product-footer"><div className="product-price">349 <span className="currency">RON</span></div><div className="product-weight">820 g</div></div>
      </a>
      <a href="product-detail.html" className="product-card" data-name="Tricou Sport Dry-Fit" data-cat="Clothing">
        <div className="product-img">&#128085;<span className="category-tag">Clothing</span><span className="stock-tag low-stock">Stoc scazut</span></div>
        <div className="product-info"><div className="product-name">Tricou Sport Dry-Fit</div><div className="product-sku">SKU-CL-010</div><div className="product-desc">Material respirabil, uscare rapida, ideal pentru antrenament.</div></div>
        <div className="product-footer"><div className="product-price">89 <span className="currency">RON</span></div><div className="product-weight">180 g</div></div>
      </a>
      <a href="product-detail.html" className="product-card" data-name="Lampa LED Birou" data-cat="Home">
        <div className="product-img">&#128161;<span className="category-tag">Home</span><span className="stock-tag out-of-stock">Indisponibil</span></div>
        <div className="product-info"><div className="product-name">Lampa LED Birou</div><div className="product-sku">SKU-HM-020</div><div className="product-desc">Lampa LED cu 3 moduri de iluminare, brat flexibil, port USB.</div></div>
        <div className="product-footer"><div className="product-price">149 <span className="currency">RON</span></div><div className="product-weight">950 g</div></div>
      </a>
      <a href="product-detail.html" className="product-card" data-name="Minge Fotbal Pro" data-cat="Sports">
        <div className="product-img">&#9917;<span className="category-tag">Sports</span><span className="stock-tag in-stock">In stoc</span></div>
        <div className="product-info"><div className="product-name">Minge Fotbal Pro</div><div className="product-sku">SKU-SP-015</div><div className="product-desc">Minge profesionala FIFA Quality Pro, marime 5.</div></div>
        <div className="product-footer"><div className="product-price">120 <span className="currency">RON</span></div><div className="product-weight">430 g</div></div>
      </a>
      <a href="product-detail.html" className="product-card" data-name="Geaca Iarna Puf" data-cat="Clothing">
        <div className="product-img">&#129507;<span className="category-tag">Clothing</span><span className="stock-tag in-stock">In stoc</span></div>
        <div className="product-info"><div className="product-name">Geaca Iarna Puf</div><div className="product-sku">SKU-CL-011</div><div className="product-desc">Geaca cu puf natural, rezistenta la apa, captuseala termica.</div></div>
        <div className="product-footer"><div className="product-price">599 <span className="currency">RON</span></div><div className="product-weight">750 g</div></div>
      </a>
      <a href="product-detail.html" className="product-card" data-name="Set Prosoape Bumbac" data-cat="Home">
        <div className="product-img">&#127968;<span className="category-tag">Home</span><span className="stock-tag low-stock">Stoc scazut</span></div>
        <div className="product-info"><div className="product-name">Set Prosoape Bumbac</div><div className="product-sku">SKU-HM-021</div><div className="product-desc">Set 4 prosoape 100% bumbac egipt, 600gsm.</div></div>
        <div className="product-footer"><div className="product-price">79 <span className="currency">RON</span></div><div className="product-weight">600 g</div></div>
      </a>
    </div> */}

          <div className="products-grid" id="products-grid">
            {productsArr.map((produs) => (
              <ProductDetailPage key={produs.id}/>
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

        <footer className="footer">
          <div className="footer-inner">
            <span>2026 OnlineShop</span>
            <ul className="footer-links">
              <li>
                <a href="#">Termeni</a>
              </li>
              <li>
                <a href="#">Confidentialitate</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </footer>
      </>
    );
}

export default ProductsPage;
