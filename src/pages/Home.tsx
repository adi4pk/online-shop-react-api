import { Navigate } from "react-router-dom";

function Home() {
  
  console.log("HOME PAGE");

  return <Navigate to="/products" replace />;
}

export default Home;
