export default function AboutPage() {
  return (
    <>
      <div className="about-hero">
        <div>
          <h1 className="about-title">HOW<br /><span>WE WORK</span></h1>
        </div>
        <div className="about-text">
          <p>Preloved Kicks is built around one job: finding pre-owned sneakers that still deserve another run. We source pairs with real value, inspect the condition, clean them, and only list the shoes we would confidently sell to a customer.</p>
          <p>Our process stays simple on purpose. We hunt, verify, photograph, price fairly, and ship across Pakistan. That keeps the store honest and keeps the buying process easy.</p>
          <p>From everyday beaters to harder-to-find grails, the shop is meant to make good sneakers easier to buy, easier to trust, and easier to wear.</p>
        </div>
      </div>
      <div className="about-values">
        <div className="value-card">
          <div className="value-num">01</div>
          <div className="value-title">SOURCE</div>
          <div className="value-text">We track down pairs from trusted local finds, keeping the selection focused on real sneakers with real character.</div>
        </div>
        <div className="value-card">
          <div className="value-num">02</div>
          <div className="value-title">CHECK</div>
          <div className="value-text">Every pair is reviewed for condition and authenticity before it enters the store, so what you see is what you get.</div>
        </div>
        <div className="value-card">
          <div className="value-num">03</div>
          <div className="value-title">SHIP</div>
          <div className="value-text">Once a pair is listed, we pack it carefully and send it across Pakistan with a clean buying flow from start to finish.</div>
        </div>
      </div>
      <footer>
        <div className="footer-bottom footer-bottom-compact">
          <span>© 2025 Preloved Kicks · Karachi</span>
          <span>Handpicked. Authenticated. Delivered.</span>
        </div>
      </footer>
    </>
  );
}
