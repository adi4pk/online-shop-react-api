import { Link } from "react-router-dom";
import AccountSidebar from "@/components/layout/AccountSidebar";

function AccountProfilePage() {
  return (
    <div className="container">
      <Link to="/products" className="btn btn-outline btn-sm">
        &larr; Inapoi la produse
      </Link>

      <div className="account-layout">
        <AccountSidebar />

        <div className="account-card">
          <div className="account-card-header">
            <h2>Profilul meu</h2>
            <button className="btn btn-sm btn-primary" id="save-profile">Salveaza</button>
          </div>
          <div className="account-card-body">
            <form id="profile-form">
              <div className="profile-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="pf-name">Nume Complet</label>
                  <input id="pf-name" className="form-input" type="text" defaultValue="Andrei Popescu" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="pf-email">Email</label>
                  <input id="pf-email" className="form-input" type="email" defaultValue="andrei.popescu@email.ro" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="pf-phone">Telefon</label>
                  <input id="pf-phone" className="form-input" type="tel" defaultValue="0722 111 222" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="pf-country">Tara</label>
                  <select id="pf-country" className="form-select" defaultValue="Romania">
                    <option>Romania</option>
                    <option>Germania</option>
                    <option>Franta</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountProfilePage;
