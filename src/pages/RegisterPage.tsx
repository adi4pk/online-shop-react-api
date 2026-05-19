import { Link } from "react-router-dom";
import type { FieldType } from "@/lib/validation";
import type { ValidationRules } from "@/lib/validation";

// import { validateField } from "@/lib/validation";
import { validateAll } from "@/lib/validation";
import { useField } from "@/lib/validation";

function RegisterPage() {


  interface FieldHookResult {
  value: string;
  /** True after the user has interacted (blur fired) — useful to gate showing the error. */
  touched: boolean;
  /** Error message after first interaction; null otherwise. */
  error: string | null;
  setValue: (next: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
  /** Force-validate (use before submit to surface errors on untouched fields). */
  validate: () => string | null;
  reset: (to?: string) => void;
}


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
}

const name = useField("", { required: true});
const email = useField("", {required: true, type: "email"});
const phone = useField("", {required: true, type:"tel"})


const password = useField("", {required: true, minLength: 8});
const confirmPass = useField("", {
  required: true,
  custom: (pass) => (pass !== password.value ? "Parolele nu coincid" : null),
});

const tara = useField("", { required: true, type: "text"});

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-card auth-card--wide">
          <div className="auth-header">
            <h1>Creeaza un cont</h1>
            <p>Completeaza datele pentru a-ti crea contul</p>
          </div>

          <form id="register-form" noValidate>
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
                value={name.value}
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
                  value={email.value}
                  onChange={email.onChange}
                  onBlur={email.onBlur}
                />
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
                  value={phone.value}
                  onChange={phone.onChange}
                  onBlur={phone.onBlur}
                />
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
                    value={password.value}
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
                    value={confirmPass.value}
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
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-country">
                Tara <span className="required">*</span>
              </label>
              <select className="form-select" id="reg-country" required
              value={tara.value} onChange={tara.onChange} onBlur={tara.onBlur}>
                <option value="">Selecteaza tara</option>
                <option>Romania</option>
                <option>Germania</option>
                <option>Franta</option>
              </select>
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
              />
              <span className="form-hint">
                Poate fi aceeasi cu adresa de facturare
              </span>
            </div>
            <div className="form-group">
              <label className="form-checkbox">
                <input type="checkbox" id="reg-tos" /> Sunt de acord cu{" "}
                <a href="#">Termenii si Conditiile</a>
              </label>
            </div>
            <button
              type="submit"
              // type="button"
              className="btn btn-primary btn-block btn-lg"
              id="reg-submit"
              // onClick={() => handleSubmit}/
            >
              Creeaza Contul
            </button>
          </form>

          <div className="auth-footer">
            Ai deja cont? <Link to={'/login'}>Autentifica-te</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
