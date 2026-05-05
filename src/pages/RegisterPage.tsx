import { Link } from "react-router-dom";

function RegisterPage() {


  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-card auth-card--wide">
          <div className="auth-header">
            <h1>Creeaza un cont</h1>
            <p>Completeaza datele pentru a-ti crea contul</p>
          </div>

          <form id="register-form" noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">
                Nume Complet <span className="required">*</span>
              </label>
              <input
                className="form-input"
                id="reg-name"
                type="text"
                placeholder="ex: Ion Popescu"
                required
                autoComplete="name"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">
                  Email <span className="required">*</span>
                </label>
                <input
                  className="form-input"
                  id="reg-email"
                  type="email"
                  placeholder="email@exemplu.ro"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-phone">
                  Telefon <span className="required">*</span>
                </label>
                <input
                  className="form-input"
                  id="reg-phone"
                  type="tel"
                  placeholder="0722 123 456"
                  required
                  autoComplete="tel"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-pass">
                  Parola <span className="required">*</span>
                </label>
                <div className="password-toggle">
                  <input
                    className="form-input"
                    id="reg-pass"
                    type="password"
                    placeholder="Minim 8 caractere"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    data-toggle-password="reg-pass"
                    aria-label="Arata parola"
                  >
                    👁
                  </button>
                </div>
                <div className="password-meter">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="password-meter-label">
                  Foloseste litere mari, cifre si simboluri.
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-pass2">
                  Confirma Parola <span className="required">*</span>
                </label>
                <div className="password-toggle">
                  <input
                    className="form-input"
                    id="reg-pass2"
                    type="password"
                    placeholder="Repeta parola"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    data-toggle-password="reg-pass2"
                    aria-label="Arata parola"
                  >
                    👁
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-country">
                Tara <span className="required">*</span>
              </label>
              <select className="form-select" id="reg-country" required>
                <option value="">Selecteaza tara</option>
                <option>Romania</option>
                <option>Germania</option>
                <option>Franta</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-billing">
                Adresa Facturare <span className="required">*</span>
              </label>
              <input
                className="form-input"
                id="reg-billing"
                type="text"
                placeholder="Strada, numar, oras, cod postal"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-shipping">
                Adresa Livrare Implicita <span className="required">*</span>
              </label>
              <input
                className="form-input"
                id="reg-shipping"
                type="text"
                placeholder="Strada, numar, oras, cod postal"
                required
              />
              <span className="form-hint">
                Poate fi aceeasi cu adresa de facturare
              </span>
            </div>
            <div className="form-group">
              <label className="form-checkbox">
                <input type="checkbox" id="reg-tos" /> Sunt de acord cu{" "}
                <a href="#">Termenii si Conditiile</a>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              id="reg-submit"
            >
              Creeaza Contul
            </button>
          </form>

          <div className="auth-footer">
            Ai deja cont? <Link to={'/login'}>Autentifica-te</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
