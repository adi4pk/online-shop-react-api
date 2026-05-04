/**
 * Toast notifications — versiune React a `public/mockup/shared.js#showToast`.
 *
 * Folosire:
 *   1. Wrap App in ToastProvider:
 *        <ToastProvider><App /></ToastProvider>
 *   2. In orice component:
 *        const toast = useToast();
 *        toast.show({ type: "success", title: "Salvat", message: "Modificarile au fost salvate." });
 *
 * Stilurile (.toast, .toast-container, etc.) vin din src/styles/shared.css.
 */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message?: string;
  /** Milliseconds before auto-dismiss. Pass 0 to keep it until the user closes it. */
  duration?: number;
}

interface ToastItem extends Required<Omit<ToastOptions, "title" | "message">> {
  id: number;
  title?: string;
  message?: string;
}

interface ToastContextValue {
  show: (opts: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "!",
  info: "i",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((opts: ToastOptions) => {
    const id = Date.now() + Math.random();
    const item: ToastItem = {
      id,
      type: opts.type ?? "info",
      duration: opts.duration ?? 3500,
      title: opts.title,
      message: opts.message,
    };
    setToasts((prev) => [...prev, item]);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <Toast key={t.id} item={t} onDismiss={() => setToasts((p) => p.filter((x) => x.id !== t.id))} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  useEffect(() => {
    if (item.duration <= 0) return;
    const timer = setTimeout(onDismiss, item.duration);
    return () => clearTimeout(timer);
  }, [item.duration, onDismiss]);

  return (
    <div className={`toast ${item.type}`}>
      <div className="toast-icon">{ICONS[item.type]}</div>
      <div className="toast-body">
        {item.title && <div className="toast-title">{item.title}</div>}
        {item.message && <div className="toast-message">{item.message}</div>}
      </div>
      <button className="toast-close" type="button" onClick={onDismiss} aria-label="Close">
        ×
      </button>
    </div>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
