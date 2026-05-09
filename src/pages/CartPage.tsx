import { useNavigate } from "react-router-dom";
import { Link} from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import MockupBar from "@/components/layout/Mockup";
import Footer from "@/components/layout/Footer";

function CartPage(){


    return(
        <>
        <MockupBar></MockupBar>
        <Navbar></Navbar>
        <button> 
            <Link to={'/ProductsPage'}> Go BACK</Link>
        </button>
        <div className="container">
    <div className="section" style={{paddingBottom: "0"}}>
      <div className="section-title">Cosul meu</div>
      <div className="section-subtitle"><span id="cart-count-label">3 produse</span> in cos</div>
    </div>

    {/* <!-- Toggle: empty cart vs filled cart -->
    <!-- Tip: change #cart-with-items to display:none and #cart-empty to display:block to preview empty state --> */}

    <div id="cart-empty" className="empty-state" style={{display: "none", margin: "24px 0 40px"}}>
      <div className="empty-state-icon">&#128722;</div>
      <h2>Cosul tau este gol</h2>
      <p>Nu ai nimic in cos inca. Exploreaza catalogul nostru si gaseste produse care iti plac.</p>
      <a href="products.html" className="btn btn-primary">Vezi produsele</a>
    </div>

    <div id="cart-with-items">
      <div className="shipping-bar" id="shipping-bar">
        <div className="shipping-bar-icon">&#128666;</div>
        <div className="shipping-bar-text">
          <strong>Livrare gratuita</strong> pentru comenzi peste <strong>200 RON</strong> — comanda ta este eligibila!
        </div>
        <div className="shipping-bar-progress"><span style={{width: "100%"}}></span></div>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-item" data-name="Laptop ProMax 15">
            <div className="cart-item-img">&#128187;</div>
            <div className="cart-item-info"><div className="cart-item-name">Laptop ProMax 15</div><div className="cart-item-sku">SKU-EL-001</div></div>
            <div className="cart-item-qty"><button>-</button><input type="number" value="1" min="1" /><button>+</button></div>
            <div className="cart-item-price">4,599 RON</div>
            <button className="cart-item-remove" aria-label="Sterge produsul">&#10005;</button>
          </div>
          <div className="cart-item" data-name="Tricou Sport Dry-Fit">
            <div className="cart-item-img">&#128085;</div>
            <div className="cart-item-info"><div className="cart-item-name">Tricou Sport Dry-Fit</div><div className="cart-item-sku">SKU-CL-010</div></div>
            <div className="cart-item-qty"><button>-</button><input type="number" value="2" min="1" /><button>+</button></div>
            <div className="cart-item-price">178 RON</div>
            <button className="cart-item-remove" aria-label="Sterge produsul">&#10005;</button>
          </div>
          <div className="cart-item" data-name="Minge Fotbal Pro">
            <div className="cart-item-img">&#9917;</div>
            <div className="cart-item-info"><div className="cart-item-name">Minge Fotbal Pro</div><div className="cart-item-sku">SKU-SP-015</div></div>
            <div className="cart-item-qty"><button>-</button><input type="number" value="1" min="1" /><button>+</button></div>
            <div className="cart-item-price">120 RON</div>
            <button className="cart-item-remove" aria-label="Sterge produsul">&#10005;</button>
          </div>
        </div>

        <div className="cart-summary">
          <h3>Sumar comanda</h3>
          <div className="summary-row"><span className="label">Subtotal (4 produse)</span><span>4,897 RON</span></div>
          <div className="summary-row"><span className="label">Livrare</span><span style={{color: "var(--success)", fontWeight: "500"}}>Gratuita</span></div>
          <div className="summary-row"><span className="label">TVA (19%)</span><span>930 RON</span></div>
          <div className="summary-row total"><span>Total</span><span>5,827 RON</span></div>
          <Link to={'/checkout'} className="btn btn-primary btn-block btn-lg" style={{marginTop: "20px"}}>Finalizeaza comanda</Link>
          <Link to={'/ProductsPage'} className="btn btn-ghost btn-block" style={{marginTop: "8px"}}>Continua cumparaturile</Link>
          <p style={{fontSize: "12px", color: "var(--text-light)", textAlign: "center", marginTop: "14px"}}>
            🔒 Plata securizata. Datele cardului nu sunt stocate.
          </p>
        </div>
      </div>
    </div>
  </div>

  <Footer></Footer>
        </>
    )
}

export default CartPage;