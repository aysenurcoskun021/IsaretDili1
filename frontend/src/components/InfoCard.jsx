export default function InfoCard({ icon: Icon, title, children, className = "" }) {
  return <article className={`info-card magnetic-card ${className}`}>{Icon && <span className="info-card__icon"><Icon size={22}/></span>}<div><h2>{title}</h2><div className="info-card__body">{children}</div></div></article>;
}
