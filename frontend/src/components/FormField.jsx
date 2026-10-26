import { useId } from "react";

export default function FormField({ label, icon: Icon, error, hint, className = "", children, ...props }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={`form-field ${className}`}>
      {label && <label className="form-label" htmlFor={props.id || id}>{label}</label>}
      <div className={`input-shell ${error ? "input-shell--error" : ""}`}>
        {Icon && <Icon className="input-shell__icon" size={18} aria-hidden="true" />}
        {children || <input id={props.id || id} {...props} aria-invalid={Boolean(error)} aria-describedby={[error ? errorId : "", hint ? hintId : ""].filter(Boolean).join(" ") || undefined} />}
      </div>
      {hint && <p className="field-hint" id={hintId}>{hint}</p>}
      {error && <p className="field-error" id={errorId} role="alert">{error}</p>}
    </div>
  );
}