import { Navigate } from "react-router-dom";

function Home() {
  return <Navigate to="/products" replace />;
}

export default Home;
