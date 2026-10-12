import { useNavigate, Link } from "react-router-dom";
import { login } from "@/api/auth";
import type { LoginRequest } from "@/types/api";
import { useState } from "react";
import { useField, validateAll } from "@/lib/validation";

import { PasswordInput } from "@/lib/PasswordInput";
import { LoginErrorResponse } from "@/models/LoginErrorResponse";
import { useToast } from "@/lib/toast";
import { saveTokens } from "@/api/tokenStorage";

// import { CircularProgress } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { AuthContext, useAuthContext } from "@/components/contexts/AuthContext";
import { ApiError } from "@/api/client";


function Login() {

  const navigate = useNavigate(); 
  
  let {loginnn} = useAuthContext(); 
  let toast = useToast();


  const email = useField("", {required: true, type:"email"})
  const pass = useField("", {required: true, type:"password", minLength:8});
  const [isLoading, setIsLoading] = useState<Boolean>(false);

    // this returns a bool -- 'err is LoginErrorResponse' basically implies we'll get a boolean in return;
    // A function with a type predicate return type must return a boolean expression
  function isLoginError(err: unknown): err is LoginErrorResponse{

    return(
      typeof err === "object" &&
      err!== null &&
      "message" in err &&
      "status" in err
    )
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let loginBody: LoginRequest={
      email: String(email.value),
      password: String(pass.value),
    }

    const validateCredentials = validateAll([email, pass])
    if (!validateCredentials) {
      console.log("invalid cred")
      return;
    }
    
    

    try {
            setIsLoading(true);
            await loginnn(loginBody);

      //[response] - “Give me the first item from the resulting array” - DESTRUCTURING
      // navigate("/products");
      console.log("test success");

    } catch(err: unknown){    //--> eroarea este prinsa in Component, dar ea provine din //client.ts;
      if(err instanceof ApiError){  // -> aici doar stabilim ce fel de tip este.
        
        toast.show({type: "error", title: "Login error", message: err.message});
      }

    else {    //IMPORTANT - trebuie folosit si ELSE in cazul in care eroarea e de alt tip.

      console.log(err);
      toast.show({type: "error", title:"uknown error", message: "unknown body is unknown"})
    }

    } finally{      //-- reseteaza sesiunea de loading
      setIsLoading(false);  //nu mă interesează dacă login-ul a mers sau nu; la final spinner-ul trebuie oprit.
    }
      
  
    
  }


  

  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");

  



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
              value={String(email.value)}
              onChange={email.onChange}
              onBlur={email.onBlur}
            />

            {email.error && <div className="error">{email.error}</div>}
          </div>

          <div className="form-group">
            {/* <label className="form-label" htmlFor="login-password">
              Parola <span className="required">*</span>
            </label>
            <input
              className="form-input"
              id="login-password"
              type="password"
              placeholder="Introdu parola"
              required
              autoComplete="current-password"
              value={String(pass.value)}
              onChange={pass.onChange}
              onBlur={pass.onBlur}
            />
            {pass.error && <div className="error">{pass.error}</div>} */}

            <PasswordInput
              id="login-password"
              placeholder="Introdu parola"
              required
              value={String(pass.value)}
              onChange={pass.onChange}
              onBlur={pass.onBlur}
              className="form-input"
            >

            </PasswordInput>
            {pass.error && <div className="error">{pass.error}</div>}


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
            
            {isLoading ? <ClipLoader size={20}/> : "Autentificare"}
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
      {isLoading && <div className="loading-effect">Loading</div>}
    </div>
  );
}

export default Login;
