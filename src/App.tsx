/**
 * Punct de start.
 *
 * Aceasta pagina e doar un placeholder. Tu o inlocuiesti cu propriul tau routing.
 * Mockup-ul vizual exista in `public/mockup/` — deschide-l in paralel.
 */

import Login from "./pages/Login";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
    <AppRoutes>

    </AppRoutes>
    </BrowserRouter>
    </>
  );
}

export default App;
