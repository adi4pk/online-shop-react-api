/**
 * Indicator de putere parola — versiune React a `wirePasswordMeter` din shared.js.
 *
 * Folosire:
 *   <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
 *   <PasswordMeter value={password} />
 *
 * Foloseste clasele .password-meter si .password-meter-label din shared.css.
 */

export type PasswordStrength = "weak" | "medium" | "strong" | "very-strong" | null;

const LABELS: Record<NonNullable<PasswordStrength>, string> = {
  weak: "Slaba",
  medium: "Acceptabila",
  strong: "Buna",
  "very-strong": "Excelenta",
};

/**
 * Pure function — same scoring as the vanilla `wirePasswordMeter` in shared.js.
 * Score 0 → null, 1 → weak, 2 → medium, 3 → strong, 4 → very-strong.
 */
export function computePasswordStrength(value: string): PasswordStrength {
  if (!value) return null;
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value) || value.length >= 12) score++;

  return ([null, "weak", "medium", "strong", "very-strong"] as const)[score] ?? null;
}

interface PasswordMeterProps {
  value: string;
  /** Hide the textual "Putere parola: ..." label below the bars. */
  hideLabel?: boolean;
}

export function PasswordMeter({ value, hideLabel = false }: PasswordMeterProps) {
  const strength = computePasswordStrength(value);
  return (
    <>
      <div className="password-meter" data-strength={strength ?? undefined}>
        <span />
        <span />
        <span />
        <span />
      </div>
      {!hideLabel && (
        <div className="password-meter-label">
          {strength
            ? `Putere parola: ${LABELS[strength]}`
            : "Foloseste litere mari, cifre si simboluri."}
        </div>
      )}
    </>
  );
}
