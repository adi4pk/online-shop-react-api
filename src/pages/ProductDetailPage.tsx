import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container section">
      <div className="section-title">Detalii produs</div>
      <p>ID produs: #{id}</p>
      <p style={{ color: "var(--text-light)" }}>
        Aici va veni descrierea completa a produsului, galeria de imagini, recenzii etc.
      </p>
    </div>
  );
}

export default ProductDetailPage;
