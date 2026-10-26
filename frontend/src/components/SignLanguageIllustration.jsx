import { Hand, Sparkles } from "lucide-react";

export default function SignLanguageIllustration() {
  return (
      <div className="hero-art" role="img" aria-label="İşaret diliyle iletişim kuran iki kişi">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />

        <div className="person person-left">
          <div className="person-hair" />
          <div className="person-face"><span /></div>
          <div className="person-neck" />
          <div className="person-body"><span className="shirt-fold" /></div>
          <div className="sign-hand hand-up"><span /></div>
          <div className="sign-hand hand-forward"><span /></div>
        </div>

        <div className="person person-right">
          <div className="person-hair" />
          <div className="person-face"><span /></div>
          <div className="person-neck" />
          <div className="person-body"><span className="shirt-fold" /></div>
        </div>

        <div className="speech-bubble bubble-hand"><Hand size={31} strokeWidth={1.8} /></div>
        <div className="speech-bubble bubble-text"><span /><span /><span /></div>
        <div className="motion-arrow arrow-a">↶</div>
        <div className="motion-arrow arrow-b">↗</div>
        <Sparkles className="sparkle sparkle-a" size={22} />
        <Sparkles className="sparkle sparkle-b" size={16} />
      </div>
  );
}
