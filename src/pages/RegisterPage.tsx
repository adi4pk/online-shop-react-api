import { Link } from "react-router-dom";
import type { FieldType } from "@/lib/validation";
import type { ValidationRules } from "@/lib/validation";

// import { validateField } from "@/lib/validation";
import { validateAll } from "@/lib/validation";
import { useField } from "@/lib/validation";
import { useState } from "react";

import type { RegisterRequest } from "@/types/api";
import { register } from "@/api/auth";
import type { AuthResponse } from "@/types/api";

function RegisterPage() {



const name = useField("", { required: true, type: "name"});
  //name = un obiect cu proprietatile lui FieldHookResult, i.e. value, touched, error etc...

const email = useField("", {required: true, type: "email"});
const phone = useField("", {required: true, type:"tel", minLength: 10})


const password = useField("", {required: true, minLength: 8});
const confirmPass = useField("", {
  required: true,
  custom: (pass) => {
//(pass !== password.value ? "Parolele nu coincid" : null)

  if(pass!==password.value){

     return "parolele nu coincid";
  }   
    return null;
  },
});

const country = useField("", { required: true, type: "country"});
const adresa_livrare = useField("", { required: true, type: "address"});
const adresa_facturare = useField("", { required: true, type: "address"});
const isCheckedTermeni = useField(false, {required: true, type: "termeni"});


const [checkedField, setCheckedField] = useState(true);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const fieldsArr = validateAll([name, email, phone, password, confirmPass, country, adresa_livrare, adresa_facturare]);

    // if (!fieldsArr) return;

    let body: RegisterRequest ={
      email: String(email.value),
      password: String(password.value),
      fullName: String(name.value),
      billingAddress: String(adresa_facturare.value),
      defaultShippingAddress: String(adresa_livrare.value),
      country: String(country.value),
      phone: String(phone.value),
    }

    register(body);
  }



  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-card auth-card--wide">
          <div className="auth-header">
            <h1>Creeaza un cont</h1>
            <p>Completeaza datele pentru a-ti crea contul</p>
          </div>

          <form id="register-form" noValidate onSubmit={handleSubmit}>
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
                value={String(name.value)}
                onChange={name.onChange}
                onBlur={name.onBlur}
              />
              {name.error && <div className="error">{name.error}</div>}
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
                  value={String(email.value)}
                  onChange={email.onChange}
                  onBlur={email.onBlur}
                />
                {email.error && <div className="error">{email.error}</div>}
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
                  value={String(phone.value)}
                  onChange={phone.onChange}
                  onBlur={phone.onBlur}
                />
                {phone.error && <div className="error">{phone.error}</div>}
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
                    value={String(password.value)}
                    onChange={password.onChange}
                    onBlur={password.onBlur}
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
                {password.error && <div>{password.error}</div>}
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
                    value={String(confirmPass.value)}
                    onChange={confirmPass.onChange}
                    onBlur={confirmPass.onBlur}
                  />

                  <button
                    type="button"
                    data-toggle-password="reg-pass2"
                    aria-label="Arata parola"
                  >
                    👁
                  </button>
                </div>
                {confirmPass.error && <div>{confirmPass.error}</div>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-country">
                Tara <span className="required">*</span>
              </label>
              <select
                className="form-select"
                id="reg-country"
                required
                value={String(country.value)}
                onChange={country.onChange}
                onBlur={country.onBlur}
              >
                <option value="none">Selecteaza tara</option>
                <option value="RO">Romania</option>
                <option value="GER">Germania</option>
                <option value="FR">Franta</option>
              </select>

              {country.error && <div className="error">{country.error}</div>}
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
                value={String(adresa_livrare.value)}
                onChange={adresa_livrare.onChange}
                onBlur={adresa_livrare.onBlur}
              />
              {adresa_livrare.error && (
                <div className="error">{adresa_livrare.error}</div>
              )}

              <span className="form-hint">
                Poate fi aceeasi cu adresa de facturare
              </span>
              {/* {adresa_facturare.error && <div className="error">{adresa_facturare.error}</div>} */}
            </div>
            <div className="form-group">
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  id="reg-tos"
                  // onChange={(e) => setCheckedField(e.target.checked)}

                  // onChange={(e) => isCheckedTermeni.value === (e.target.checked)}

                  onChange={(e) => {
                    isCheckedTermeni.setValue(e.target.checked);
                    isCheckedTermeni.validate();
                  }}
                  checked={Boolean(isCheckedTermeni.value)}
                  onBlur={isCheckedTermeni.onBlur}
                />{" "}
                Sunt de acord cu <a href="#">Termenii si Conditiile</a>
              </label>
              {/* {!checkedField&&("Termenii trebuiesc acceptati.")}  //!&& negatia e adevarata => true  */}
              {isCheckedTermeni.error && <div className="error">{isCheckedTermeni.error}</div>}
            </div>
            <button
              type="submit"
              // type="button"
              className="btn btn-primary btn-block btn-lg"
              id="reg-submit"
            >
              Creeaza Contul
            </button>
          </form>

          <div className="auth-footer">
            Ai deja cont? <Link to={"/login"}>Autentifica-te</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
