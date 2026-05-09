import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import MockupBar from "@/components/layout/Mockup";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/layout/AccountSidebar";

function AccountOrdersPage(){

    return(
        <>
        <MockupBar></MockupBar>
        <Navbar></Navbar>        
        <button> 
                    <Link to={'/ProductsPage'}> Go BACK</Link>
                </button>

        <div className="section" style={{paddingBottom: "0"}}>
      <div className="section-title">Contul meu</div>
      <div className="section-subtitle">Gestioneaza contul si comenzile tale</div>
    </div>

    <div className="account-layout">
      <AccountSidebar></AccountSidebar>

      <div className="account-card">
        <div className="account-card-header">
          <h2>Comenzile mele</h2>
          <select id="status-filter" className="form-select" style={{width: "auto", padding: "6px 12px", fontSize: "13px"}}>
            <option value="">Toate</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="account-card-body">

          {/* <!-- Empty state for new customer (toggle to preview) --> */}
          <div id="orders-empty" className="empty-state" style={{display: "none", padding: "40px 24px"}}>
            <div className="empty-state-icon">&#128230;</div>
            <h2>Nu ai comenzi inca</h2>
            <p>Cand vei plasa o comanda, o vei vedea aici. Incepe prin a explora catalogul nostru de produse.</p>
            <a href="products.html" className="btn btn-primary">Vezi produsele</a>
          </div>

          {/* <!-- No results for filter --> */}
          <div id="orders-no-match" className="empty-state" style={{display: "none", padding: "40px 24px"}}>
            <div className="empty-state-icon">&#128269;</div>
            <h2>Nicio comanda gasita</h2>
            <p>Nu ai comenzi cu acest status. Schimba filtrul pentru a vedea alte comenzi.</p>
            {/* <button className="btn btn-outline" onclolick="document.getElementById('status-filter').value=''; document.getElementById('status-filter').dispatchEvent(new Event('change'));">Vezi toate</button> */}
          </div>

          <div id="orders-list">
            <div className="order-row" data-status="Processing"><span className="order-id">#1007</span><span className="order-date">23.04.2026</span><span className="badge badge-warning">Processing</span><span className="order-items-count">4 produse</span><span className="order-amount">5,827 RON</span><button className="btn btn-sm btn-outline">Detalii</button></div>
            <div className="order-row" data-status="Processing"><span className="order-id">#1005</span><span className="order-date">07.04.2024</span><span className="badge badge-warning">Processing</span><span className="order-items-count">4 produse</span><span className="order-amount">947 RON</span><button className="btn btn-sm btn-outline">Detalii</button></div>
            <div className="order-row" data-status="Delivered"><span className="order-id">#1001</span><span className="order-date">01.04.2024</span><span className="badge badge-success">Delivered</span><span className="order-items-count">3 produse</span><span className="order-amount">4,748 RON</span><button className="btn btn-sm btn-outline">Detalii</button></div>
            <div className="order-row" data-status="Delivered"><span className="order-id">#985</span><span className="order-date">15.03.2024</span><span className="badge badge-success">Delivered</span><span className="order-items-count">1 produs</span><span className="order-amount">349 RON</span><button className="btn btn-sm btn-outline">Detalii</button></div>
            <div className="order-row" data-status="Delivered"><span className="order-id">#962</span><span className="order-date">28.02.2024</span><span className="badge badge-success">Delivered</span><span className="order-items-count">2 produse</span><span className="order-amount">688 RON</span><button className="btn btn-sm btn-outline">Detalii</button></div>
            <div className="order-row" data-status="Cancelled"><span className="order-id">#940</span><span className="order-date">10.02.2024</span><span className="badge badge-danger">Cancelled</span><span className="order-items-count">1 produs</span><span className="order-amount">149 RON</span><button className="btn btn-sm btn-outline">Detalii</button></div>
            <div className="order-row" data-status="Delivered"><span className="order-id">#918</span><span className="order-date">22.01.2024</span><span className="badge badge-success">Delivered</span><span className="order-items-count">3 produse</span><span className="order-amount">1,267 RON</span><button className="btn btn-sm btn-outline">Detalii</button></div>
          </div>
        </div>
      </div>
    </div>
        <Footer></Footer>
        </>
    )


}



export default AccountOrdersPage;