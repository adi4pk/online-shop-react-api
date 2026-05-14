import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container section" style={{ textAlign: "center" }}>
      <h1>404 — Pagina nu a fost gasita</h1>
      <p>Pagina cautata nu exista sau a fost mutata.</p>
      <Link to="/products" className="btn btn-primary">
        &larr; Inapoi la produse
      </Link>
    </div>
  );
}

export default NotFoundPage;
