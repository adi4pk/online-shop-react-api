/**
 * Promise-style confirm dialog — versiune React a `public/mockup/shared.js#confirmDialog`.
 *
 * Folosire:
 *   1. Wrap App in ConfirmProvider (impreuna cu ToastProvider, daca vrei):
 *        <ConfirmProvider><App /></ConfirmProvider>
 *   2. In orice component:
 *        const confirm = useConfirm();
 *        const ok = await confirm({ title: "Sterge?", message: "Esti sigur?", danger: true });
 *        if (ok) { ... }
 *
 * Stilurile (.modal-overlay, .confirm-modal) vin din src/styles/shared.css.
 */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  /** Use the danger button style for destructive actions. */
  danger?: boolean;
}

type ConfirmFn = (opts: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

interface DialogState {
  opts: ConfirmOptions;
  resolve: (result: boolean) => void;
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogState | null>(null);

  const confirm = useCallback<ConfirmFn>((opts) => {
    return new Promise<boolean>((resolve) => setDialog({ opts, resolve }));
  }, []);

  const close = useCallback(
    (result: boolean) => {
      if (!dialog) return;
      dialog.resolve(result);
      setDialog(null);
    },
    [dialog],
  );

  // Esc closes (cancel), Enter confirms.
  useEffect(() => {
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(false);
      else if (e.key === "Enter") close(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dialog, close]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {dialog && (
        <div
          className="modal-overlay is-open"
          onClick={(e) => {
            if (e.target === e.currentTarget) close(false);
          }}
        >
          <div className="confirm-modal" role="dialog" aria-modal="true">
            <h3>{dialog.opts.title ?? "Confirmare"}</h3>
            <p>{dialog.opts.message ?? "Esti sigur?"}</p>
            <div className="confirm-modal-actions">
              <button type="button" className="btn btn-outline" onClick={() => close(false)}>
                {dialog.opts.cancelText ?? "Anuleaza"}
              </button>
              <button
                type="button"
                className={`btn ${dialog.opts.danger ? "btn-danger" : "btn-primary"}`}
                onClick={() => close(true)}
                autoFocus
              >
                {dialog.opts.confirmText ?? "Confirma"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used inside <ConfirmProvider>");
  return ctx;
}
