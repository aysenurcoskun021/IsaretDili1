import { useEffect } from "react"; 
import { Link, useLocation } from "react-router-dom"; 
import TopBar from "./TopBar.jsx"; 
import { hapticFeedback, translationCompleteFeedback } from "../utils/feedback.js";
export default function SiteLayout({children,className=""}){const location=useLocation();
    useEffect(()=>{const onClick=e=>{if(e.target.closest("button, a, [role='button'], input[type='checkbox'], summary"))hapticFeedback(16)};
    const onPointerMove=e=>{if(e.pointerType!=="mouse")return;
    const target=e.target.closest?.(".magnetic, .magnetic-card, .translation-action, .primary-button, .secondary-button, .header-link, .header-login, .sos-card");
    document.querySelectorAll(".magnetic-attract").forEach(i=>{if(i!==target)i.classList.remove("magnetic-attract")});
if(!target||target.matches(":disabled"))return;
const r=target.getBoundingClientRect(),dx=(e.clientX-(r.left+r.width/2))/Math.max(r.width,1),dy=(e.clientY-(r.top+r.height/2))/Math.max(r.height,1);
target.style.setProperty("--mag-x",`${dx*7}px`);
target.style.setProperty("--mag-y",`${dy*6}px`);
target.classList.add("magnetic-attract")};
const clear=()=>document.querySelectorAll(".magnetic-attract").forEach(i=>{i.classList.remove("magnetic-attract");i.style.removeProperty("--mag-x");i.style.removeProperty("--mag-y")});
const complete=()=>translationCompleteFeedback();
document.addEventListener("click",onClick,{passive:true});
document.addEventListener("pointermove",onPointerMove,{passive:true});
document.addEventListener("pointerleave",clear,{passive:true});
window.addEventListener("signbridge:translation-complete",complete);
return()=>{document.removeEventListener("click",onClick);
    document.removeEventListener("pointermove",onPointerMove);
    document.removeEventListener("pointerleave",clear);
    window.removeEventListener("signbridge:translation-complete",complete)}},[]);
    return <div className={`app-shell site-shell ${className}`}>
        <div className="ambient ambient--one"/>
        <div className="ambient ambient--two"/>
        <div className="site-container" id="top">
            <TopBar/>
            <div className="route-liquid" key={location.pathname}>{children}</div>
            <footer className="site-footer site-footer--full">
                <span>© 2026 SignBridge. Tüm hakları saklıdır.</span>
                <span className="footer-links">
                    <Link to="/gizlilik">Gizlilik</Link>
                    <Link to="/kullanim">Kullanım</Link>
                    <Link to="/destek">Destek</Link>
                </span>
                <strong>Herkes için erişilebilir iletişim.</strong>
            </footer>
        </div>
    </div>
}
