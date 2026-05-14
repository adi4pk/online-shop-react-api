import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/products");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Bine ai revenit</h1>
          <p>Introdu datele tale pentru a te autentifica</p>
        </div>

        <form id="login-form" onSubmit={handleLogin}>
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
            <input
              className="form-input"
              id="login-password"
              type="password"
              placeholder="Introdu parola"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label className="form-checkbox">
                <input type="checkbox" /> Tine-ma minte
              </label>
              <a href="#" style={{ fontSize: "13px" }}>
                Ai uitat parola?
              </a>
            </div>
          </div>

          <button
            type="submit"
            id="login-submit"
            className="btn btn-primary btn-block btn-lg"
          >
            Autentificare
          </button>
        </form>

        <div className="auth-divider">sau</div>
        <button className="btn btn-outline btn-block">Continua cu Google</button>

        <div className="auth-footer">
          Nu ai cont?{" "}
          <Link to="/register" className="btn btn-sm btn-outline">
            Creeaza unul acum
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
