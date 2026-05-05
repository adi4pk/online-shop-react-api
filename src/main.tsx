import React from "react";
import ReactDOM from "react-dom/client";

// Design system gata de folosit. Foloseste class-urile in JSX:
//   <button className="btn btn-primary">Click</button>
//   <input className="form-input" />
// Mockup-ul vizual din public/mockup/ foloseste exact aceste stiluri.
// Daca vrei alt look, sterge import-ul si scrie-ti CSS-ul tau.
import "./styles/shared.css";

import App from "./App";
import { ToastProvider } from "./lib/toast";
import { ConfirmProvider } from "./lib/confirm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <ToastProvider>
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </ToastProvider>
  </React.StrictMode>,
);
