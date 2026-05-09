import Footer from "@/components/layout/Footer";
import MockupBar from "@/components/layout/Mockup";
import Navbar from "@/components/layout/Navbar";

import { Link } from "react-router-dom";

function ConfirmationPage(){


    return(
        <>
        <MockupBar></MockupBar>
        <Navbar></Navbar>
        <div className="confirmation-wrapper">
    <div className="confirmation-icon">&#10003;</div>
    <h1>Comanda plasata cu succes!</h1>
    <p>Multumim pentru comanda ta. Vei primi un email de confirmare la <strong>andrei.popescu@email.ro</strong></p>

    {/* <!-- Order timeline --> */}
    <div className="order-summary-card" style={{textAlign: "left"}}>
      <h3 style={{marginBottom: "4px"}}>Status comanda</h3>
      <p style={{fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px"}}>Estimat livrare: <strong>27 - 29 Aprilie 2026</strong></p>
      <div className="order-timeline">
        <div className="timeline-step is-done">
          <div className="timeline-dot">✓</div>
          <div className="timeline-label">Plasata</div>
        </div>
        <div className="timeline-step is-current">
          <div className="timeline-dot">2</div>
          <div className="timeline-label">In pregatire</div>
        </div>
        <div className="timeline-step">
          <div className="timeline-dot">3</div>
          <div className="timeline-label">Expediata</div>
        </div>
        <div className="timeline-step">
          <div className="timeline-dot">4</div>
          <div className="timeline-label">Livrata</div>
        </div>
      </div>
    </div>

    <div className="order-summary-card">
      <h3>Detalii comanda #1007</h3>
      <div className="order-summary-item"><span>Data comanda</span><span>23 Aprilie 2026, 14:32</span></div>
      <div className="order-summary-item"><span>Status</span><span className="badge badge-warning">Processing</span></div>
      <div className="order-summary-item"><span>Adresa livrare</span><span>Str. Victoriei 45, Bucuresti</span></div>
      <div className="order-summary-item"><span>Metoda plata</span><span>Card bancar •••• 3456</span></div>
      <div className="order-summary-item" style={{fontWeight: "600"}}><span>Total</span><span>5,827 RON</span></div>
    </div>

    <div style={{display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap"}}>
      <Link to={'/account/orders'} className="btn btn-primary">Vezi comenzile mele</Link>
      <Link to={'/ProductsPage'} className="btn btn-outline">Continua cumparaturile</Link>
    </div>

    <p style={{fontSize: "13px", color: "var(--text-light)", marginTop: "24px"}}>
      Ai intrebari? <a href="#">Contacteaza suportul</a>
    </p>
  </div>
        <Footer></Footer>
        </>
    )
}

export default ConfirmationPage;