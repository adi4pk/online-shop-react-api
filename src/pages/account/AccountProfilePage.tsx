import { Link } from "react-router-dom";
import MockupBar from "@/components/layout/Mockup";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/layout/AccountSidebar";

function AccountProfilePage() {
  return (
    <>
      <button>
        <Link to={"/ProductsPage"}> Go BACK</Link>
      </button>
      <MockupBar></MockupBar>
      <Navbar></Navbar>
      <div className="account-layout">
      <AccountSidebar></AccountSidebar>

      <div className="account-card">
        <div className="account-card-header">
          <h2>Profilul meu</h2>
          <button className="btn btn-sm btn-primary" id="save-profile">Salveaza</button>
        </div>
        <div className="account-card-body">
          <form id="profile-form" noValidate>
            <div className="profile-grid">
              <div className="form-group"><label className="form-label" htmlFor="pf-name">Nume Complet</label><input id="pf-name" className="form-input" type="text" value="Andrei Popescu" required /></div>
              <div className="form-group"><label className="form-label" htmlFor="pf-email">Email</label><input id="pf-email" className="form-input" type="email" value="andrei.popescu@email.ro" required /></div>
              <div className="form-group"><label className="form-label" htmlFor="pf-phone">Telefon</label><input id="pf-phone" className="form-input" type="tel" value="0722 111 222" required /></div>
              <div className="form-group"><label className="form-label" htmlFor="pf-country">Tara</label><select id="pf-country" className="form-select"><option selected>Romania</option><option>Germania</option><option>Franta</option></select></div>
              <div className="full-width" style={{marginTop: "20px", paddingTop: "20px", borderTop: "1px solid var(--border)"}}>
                <h3 style={{fontSize: "15px", marginBottom: "16px;"}}>Schimba parola</h3>
                <div className="profile-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="pf-pass-old">Parola actuala</label>
                    <div className="password-toggle">
                      <input id="pf-pass-old" className="form-input" type="password" placeholder="Parola curenta" autoComplete="current-password" />
                      <button type="button" data-toggle-password="pf-pass-old" aria-label="Arata parola">👁</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="pf-pass-new">Parola noua</label>
                    <div className="password-toggle">
                      <input id="pf-pass-new" className="form-input" type="password" placeholder="Parola noua" autoComplete="new-password" />
                      <button type="button" data-toggle-password="pf-pass-new" aria-label="Arata parola">👁</button>
                    </div>
                    <div className="password-meter"><span></span><span></span><span></span><span></span></div>
                    <div className="password-meter-label"></div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}

export default AccountProfilePage;
