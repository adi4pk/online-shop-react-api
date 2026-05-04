/**
 * Password input cu toggle de vizibilitate — versiune React a `data-toggle-password` din shared.js.
 *
 * Folosire:
 *   <PasswordInput
 *     id="login-password"
 *     value={password}
 *     onChange={(e) => setPassword(e.target.value)}
 *     placeholder="Introdu parola"
 *     required
 *   />
 *
 * Foloseste clasele .password-toggle si .form-input din shared.css.
 */
import { useState } from "react";
import type { InputHTMLAttributes } from "react";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-toggle">
      <input {...props} type={visible ? "text" : "password"} className={props.className ?? "form-input"} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ascunde parola" : "Arata parola"}
      >
        {visible ? "🙈" : "👁"}
      </button>
    </div>
  );
}
