export default function PageIntro({ kicker, title, accent, children }) {
  return <div className="page-heading legal-heading"><span className="eyebrow"><span/> {kicker}</span><h1>{title} <span>{accent}</span></h1>{children && <p>{children}</p>}</div>;
}
