import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const firstRenderRef = useRef(true);
  const [overlayActive, setOverlayActive] = useState(false);
  const [contentIncoming, setContentIncoming] = useState(false);
  const pageNames = {
    '/': 'HOME',
    '/shop': 'SHOP',
    '/about': 'ABOUT',
    '/contact': 'CONTACT',
    '/faq': 'FAQ',
    '/tracking': 'TRACK ORDER',
  };
  const destinationLabel = location.pathname.startsWith('/product/')
    ? 'PRODUCT'
    : (pageNames[location.pathname] || 'PAGE');

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    setOverlayActive(true);
    setContentIncoming(true);

    const timer = window.setTimeout(() => {
      setOverlayActive(false);
      setContentIncoming(false);
    }, 800);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <div key={location.pathname} className={`page-transition-content ${contentIncoming ? 'incoming' : ''}`}>
        {children}
      </div>
      <div className={`shoe-transition-overlay ${overlayActive ? 'active' : ''}`} aria-hidden="true">
        <div className="transition-destination-text">{destinationLabel}</div>
        <svg className="transition-shoe-icon" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,45 C10,45 5,45 5,40 L5,35 C5,35 8,30 15,28 L35,20 C35,20 45,15 55,15 L75,15 C75,15 85,15 90,20 L95,28 C95,28 95,32 90,35 L85,40 C85,40 80,45 70,45 Z M15,28 L15,35 M25,22 L25,35 M35,18 L35,35 M45,16 L45,35 M55,15 L55,35" fill="currentColor" stroke="none" />
        </svg>
      </div>
    </>
  );
}
