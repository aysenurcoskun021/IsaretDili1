import { Hand } from "lucide-react";
import SignLanguageIllustration from "./SignLanguageIllustration.jsx";

function IllustrationBrand() {
  return (
    <div className="brand-mark" aria-label="SignBridge" role="img">
      <span className="brand-symbol" aria-hidden="true">
        <Hand className="brand-hand brand-hand-left" strokeWidth={1.7} />
        <Hand className="brand-hand brand-hand-right" strokeWidth={1.7} />
        <span className="brand-arc" />
      </span>
      <span className="brand-name">Sign<span>Bridge</span></span>
    </div>
  );
}

export default function AuthIllustrationPanel() {
  return (
    <section className="intro-panel" aria-labelledby="intro-title">
      <IllustrationBrand />
      <SignLanguageIllustration />

      <div className="intro-copy">
        <p className="eyebrow"><span /> BİRLİKTE DAHA KAPSAYICI</p>
        <h1 id="intro-title">İletişim<br /><span>engel tanımaz</span></h1>
        <p className="intro-description">
          İşaret dili ve metni birleştiren SignBridge’e sen de katıl,
          daha kapsayıcı bir dünya için ilk adımı at.
        </p>
      </div>

      <div className="intro-footer">
        <div className="avatar-stack" aria-hidden="true">
          <span>A</span><span>M</span><span>E</span><span>+</span>
        </div>
        <p><strong>Herkes için iletişim.</strong><br />Anlaşılmanın gücüne katıl.</p>
      </div>
    </section>
  );
}
