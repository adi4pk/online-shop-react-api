import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";


function AccountAddresses() {
  return (
    <>
      <div className="container">
        <div className="section" style={{ paddingBottom: "0" }}>
          <div className="section-title">Contul meu</div>
          <div className="section-subtitle">
            Gestioneaza contul si comenzile tale
          </div>
        </div>

        <div className="account-layout">
          <div className="account-sidebar">
            <Link to={"/account/orders"}>&#128230; Comenzile mele</Link>
            <Link to={"/account/profile"}>&#9786; Profil</Link>
            <Link to={"/account/addresses"}>&#127968; Adrese</Link>
            <Link to={"/login"} id="logout-link">&#10140; Deconectare
            </Link>
          </div>

          <div className="account-card">
            <div className="account-card-header">
              <h2>Adresele mele</h2>
              <button className="btn btn-sm btn-primary" id="save-addr">
                Salveaza
              </button>
            </div>
            <div className="account-card-body">
              <form id="addr-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="addr-billing">
                    Adresa Facturare
                  </label>
                  <input
                    id="addr-billing"
                    className="form-input"
                    type="text"
                    value="Str. Victoriei 45, Sector 1, Bucuresti, 010062"
                  />
                  <span className="form-hint">
                    billingAddress — adresa folosita pe facturi
                  </span>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="addr-shipping">
                    Adresa Livrare Implicita
                  </label>
                  <input
                    id="addr-shipping"
                    className="form-input"
                    type="text"
                    value="Str. Victoriei 45, Sector 1, Bucuresti, 010062"
                  />
                  <span className="form-hint">
                    defaultShippingAddress — adresa precompletata la checkout
                  </span>
                </div>
                <div className="form-group">
                  <label className="form-checkbox" id="copy-billing-wrap">
                    <input type="checkbox" id="copy-billing" />
                    Foloseste aceeasi adresa pentru livrare
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}


export default AccountAddresses;