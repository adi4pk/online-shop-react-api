/**
 * Tiny vanilla helpers for the static online-shop mockup.
 * No framework, no build step — drop the script tag in any page.
 */
(function () {
  "use strict";

  // ── Toast ──────────────────────────────────────────────────────
  function getToastContainer() {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    return container;
  }

  const ICONS = { success: "✓", error: "✕", warning: "!", info: "i" };

  /**
   * Show a toast.
   *   showToast({ type: 'success', title: 'Adaugat in cos', message: '...', duration: 3500 })
   */
  window.showToast = function showToast(opts) {
    const { type = "info", title = "", message = "", duration = 3500 } = opts || {};
    const container = getToastContainer();

    const toast = document.createElement("div");
    toast.className = "toast " + type;
    toast.innerHTML =
      '<div class="toast-icon">' + (ICONS[type] || "i") + "</div>" +
      '<div class="toast-body">' +
        (title ? '<div class="toast-title">' + escapeHtml(title) + "</div>" : "") +
        (message ? '<div class="toast-message">' + escapeHtml(message) + "</div>" : "") +
      "</div>" +
      '<button class="toast-close" aria-label="Close">×</button>';

    const close = () => {
      toast.classList.add("is-leaving");
      setTimeout(() => toast.remove(), 200);
    };
    toast.querySelector(".toast-close").addEventListener("click", close);
    container.appendChild(toast);
    if (duration > 0) setTimeout(close, duration);
    return close;
  };

  // ── Confirm Modal ──────────────────────────────────────────────
  /**
   * Promise-style confirm dialog.
   *   const ok = await confirmDialog({ title, message, confirmText, danger: true });
   */
  window.confirmDialog = function confirmDialog(opts) {
    const { title = "Confirmare", message = "Esti sigur?", confirmText = "Confirma", cancelText = "Anuleaza", danger = false } = opts || {};
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.className = "modal-overlay is-open";
      overlay.innerHTML =
        '<div class="confirm-modal" role="dialog" aria-modal="true">' +
          "<h3>" + escapeHtml(title) + "</h3>" +
          "<p>" + escapeHtml(message) + "</p>" +
          '<div class="confirm-modal-actions">' +
            '<button class="btn btn-outline btn-cancel">' + escapeHtml(cancelText) + "</button>" +
            '<button class="btn ' + (danger ? "btn-danger" : "btn-primary") + ' btn-ok">' + escapeHtml(confirmText) + "</button>" +
          "</div>" +
        "</div>";

      const cleanup = (result) => {
        overlay.remove();
        document.removeEventListener("keydown", onKey);
        resolve(result);
      };
      const onKey = (e) => {
        if (e.key === "Escape") cleanup(false);
        if (e.key === "Enter") cleanup(true);
      };

      overlay.querySelector(".btn-ok").addEventListener("click", () => cleanup(true));
      overlay.querySelector(".btn-cancel").addEventListener("click", () => cleanup(false));
      overlay.addEventListener("click", (e) => { if (e.target === overlay) cleanup(false); });
      document.addEventListener("keydown", onKey);
      document.body.appendChild(overlay);
      overlay.querySelector(".btn-ok").focus();
    });
  };

  // ── Password Strength Meter ───────────────────────────────────
  /**
   * Wire up a password input to a meter element.
   *   wirePasswordMeter('#password', '#meter');
   */
  window.wirePasswordMeter = function wirePasswordMeter(inputSelector, meterSelector) {
    const input = document.querySelector(inputSelector);
    const meter = document.querySelector(meterSelector);
    if (!input || !meter) return;

    const labels = { weak: "Slaba", medium: "Acceptabila", strong: "Buna", "very-strong": "Excelenta" };
    const labelEl = meter.nextElementSibling && meter.nextElementSibling.classList.contains("password-meter-label")
      ? meter.nextElementSibling
      : null;

    input.addEventListener("input", () => {
      const value = input.value;
      let score = 0;
      if (value.length >= 8) score++;
      if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
      if (/\d/.test(value)) score++;
      if (/[^A-Za-z0-9]/.test(value) || value.length >= 12) score++;

      const strength = ["", "weak", "medium", "strong", "very-strong"][score] || "";
      if (strength) meter.dataset.strength = strength;
      else meter.removeAttribute("data-strength");
      if (labelEl) labelEl.textContent = strength ? "Putere parola: " + labels[strength] : "";
    });
  };

  // ── Password visibility toggle ────────────────────────────────
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-toggle-password]");
    if (!btn) return;
    e.preventDefault();
    const id = btn.getAttribute("data-toggle-password");
    const input = document.getElementById(id);
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
    btn.textContent = input.type === "password" ? "👁" : "🙈";
  });

  // ── Inline form validation (data-attribute driven) ────────────
  document.addEventListener("blur", (e) => {
    const input = e.target;
    if (!(input.matches && input.matches(".form-input, .form-select, .form-textarea"))) return;
    if (input.required && !input.value.trim()) {
      input.classList.add("is-invalid");
    } else if (input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
    }
  }, true);

  // ── Cart badge updater ────────────────────────────────────────
  /** updateCartBadge(5) — updates every .cart-badge on the page */
  window.updateCartBadge = function updateCartBadge(count) {
    document.querySelectorAll(".cart-badge").forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? "" : "none";
    });
  };

  // ── Utils ─────────────────────────────────────────────────────
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
})();
