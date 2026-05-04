import { BrowserRouter, Routes, Route  } from "react-router-dom"
import { useNavigate } from "react-router-dom";


function Login(){

    const navigate = useNavigate();
    
    const goToMainPage = () =>{
        navigate("/ProductsPage");
    }


    return (
      <>
          <div className="mockup-bar">
            <div>
              <a href="index.html">&larr; Toate paginile</a>
            </div>
            <div className="mockup-route">/login</div>
            <div>
              LoginPage &rarr; <a href="register.html">RegisterPage</a>
            </div>
          </div>

          <nav className="navbar">
            <div className="navbar-inner">
              <a href="products.html" className="navbar-brand">
                <div className="brand-icon">S</div> OnlineShop
              </a>
              <ul className="navbar-links">
                <li>
                  <a href="products.html">Produse</a>
                </li>
              </ul>
              <div className="navbar-actions">
                <a href="register.html" className="btn btn-sm btn-outline">
                  Inregistrare
                </a>
              </div>
            </div>
          </nav>

          <div className="auth-wrapper">
            <div className="auth-card">
              <div className="auth-header">
                <h1>Bine ai revenit</h1>
                <p>Introdu datele tale pentru a te autentifica</p>
              </div>

              <form id="login-form" noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    className="form-input"
                    id="login-email"
                    type="email"
                    placeholder="email@exemplu.ro"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-password">
                    Parola <span className="required">*</span>
                  </label>
                  <div className="password-toggle">
                    <input
                      className="form-input"
                      id="login-password"
                      type="password"
                      placeholder="Introdu parola"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      data-toggle-password="login-password"
                      aria-label="Arata parola"
                    >
                      👁
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <label className="form-checkbox">
                      <input type="checkbox" /> Tine-ma minte
                    </label>
                    {/* <a href="#" style={{"font-size" "13px"}}> */}
                    <a href="#" style={{fontSize: "13px"}}>
                      Ai uitat parola?
                    </a>
                  </div>
                </div>
                <button
                  type="submit"
                // type="button"
                  className="btn btn-primary btn-block btn-lg"
                  id="login-submit"
                  onClick={() => goToMainPage()}
                >
                  Autentificare
                </button>
              </form>

              <div className="auth-divider">sau</div>
              <button className="btn btn-outline btn-block">
                Continua cu Google
              </button>

              <div className="auth-footer">
                Nu ai cont? <a href="register.html">Creeaza unul acum</a>
              </div>
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
              </ul>
            </div>
          </footer>
      </>
    );
}

export default Login;