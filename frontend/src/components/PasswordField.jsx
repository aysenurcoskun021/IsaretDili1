import { useId, useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function PasswordField({ label, value, onChange, placeholder = "En az 8 karakter", error, autoComplete = "new-password", name = "password" }) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>{label}</label>
      <div className={`input-shell ${error ? "input-shell--error" : ""}`}>
        <LockKeyhole className="input-shell__icon" size={18} aria-hidden="true" />
        <input id={id} name={name} type={visible ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
        <button className="input-action" type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? "Şifreyi gizle" : "Şifreyi göster"}>
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="field-error" id={errorId} role="alert">{error}</p>}
    </div>
  );
}