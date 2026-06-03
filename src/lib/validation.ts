/**
 * Form validation utilities — port al validarii inline din shared.js.
 *
 * Doua nivele de folosire:
 *
 * 1. Functii pure (cele mai flexibile):
 *      const error = validateField({ value: email, type: "email", required: true });
 *      if (error) setEmailError(error);
 *
 * 2. Hook pentru un singur field:
 *      const email = useField("", { type: "email", required: true });
 *      <input className={`form-input ${email.error ? "is-invalid" : ""}`}
 *             value={email.value} onChange={email.onChange} onBlur={email.onBlur} />
 *      {email.error && <div className="form-error">{email.error}</div>}
 */
import { useState } from "react";

export type FieldType = "text" | "name" | "email" | "tel" | "password" | "number" | "country" | "address" | "termeni";

export interface ValidationRules {
  required?: boolean;
  type?: FieldType;
  /** Min length (inclusive). */
  minLength?: number;
  /** Custom validator: return an error message string, or null when valid. */
  custom?: (value: string) => string | null;
}

const NAME_RE = /^[A-Za-z]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADDRESS_RE = /^(?=.*\d)[A-Za-z0-9 ]+$/;

/**
 * Validate a single field value. Returns an error message, or null if valid.
 * Mirrors the rules used by the vanilla `shared.js` blur listener.
 */
export function validateField(opts: { value: string | boolean } & ValidationRules): string | null | boolean {
  const { value, required, type, minLength, custom } = opts;
  console.log(typeof(value)==="boolean");
  // console.log(value);

  if (typeof value === "string"){
    const trimmed = value?.trim() ?? "";
    if (required && !trimmed) return "Acest camp este obligatoriu.";
    if (!trimmed) return null; // optional field, empty -> ok

    if (type === "name" && !NAME_RE.test(trimmed))
      return "Numele trebuie sa contina numai litere";
    if (type === "email" && !EMAIL_RE.test(trimmed))
      return "Adresa de email este invalida.";
    if (type === "country" && trimmed === "none")
      return "Alege o tara din lista.";
    if (type === "address" && !ADDRESS_RE.test(trimmed))
      return "Adresa invalida";
    if (typeof minLength === "number" && trimmed.length < minLength) {
      return `Minim ${minLength} caractere.`;
    }
    if (custom) return custom(trimmed);
    
  } if (typeof value === "boolean"){

    if (type  === "termeni" && required && value !== true) return "Termenii trebuiesc acceptati.";

    const checked = value;
    // console.log("test");
    console.log(checked);

  }
  // console.log(!NAME_RE.test(trimmed));
  // console.log(!ADDRESS_RE.test(trimmed));
  return null;
}

//NOTA: validateField() poate returna ca string EROAREA -- e.g. "Numele trebuie sa contina numai litere"


interface FieldHookResult {
  value: string | boolean;
  /** True after the user has interacted (blur fired) — useful to gate showing the error. */
  touched: boolean;
  /** Error message after first interaction; null otherwise. */
  error: string | null | boolean;
  setValue: (next: string | boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
  /** Force-validate (use before submit to surface errors on untouched fields). */
  validate: () => string | null | boolean;
  reset: (to?: string) => void;
}

/**
 * Manage a single form field — value, touched state, validation.
 */
export function useField(initial: string | boolean, rules: ValidationRules = {}): FieldHookResult {
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);

  const computeError = (v: string | boolean) => validateField({ value: v, ...rules }); // value from opts becomes -> v
  const error = touched ? computeError(value) : null;
  // e.g. user types "123" --> computeError("123") => validateField{value: "123", ...rules})

  // computeError returns the string (error message) or null;

  return {
    value,
    touched,
    error,
    setValue,
    onChange: (e) => {
      const target = e.target as HTMLInputElement;
      setValue(target.type === "checkbox" ? target.checked : target.value);
    },
    onBlur: () => setTouched(true),
    validate: () => {
      setTouched(true);
      return computeError(value);
    },
    reset: (to = "") => {
      setValue(to);
      setTouched(false);
    },
  };
}

/**
 * Helper: pass an array of field hooks to `validateAll` before submit.
 * Returns true if all are valid.
 */

export function validateAll(fields: Array<{ validate: () => string | null | boolean}>): boolean {
  return fields.map((f) => f.validate()).every((err) => err === null);
}
    //provide an array of objects type FieldHookResult for the validateAll() -> so that it is clear each element has the function validate() and the other ones, computeError etc.
