export default function ContactPage() {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const buttonLabel = event.currentTarget.querySelector('.form-submit span');
    if (buttonLabel) {
      buttonLabel.textContent = "SENT! WE'LL HIT YOU BACK ✓";
      window.setTimeout(() => {
        buttonLabel.textContent = 'SEND INQUIRY →';
      }, 3000);
    }
  };

  return (
    <>
      <div className="contact-wrap">
        <div>
          <h1 className="contact-title">HIT<br /><span>US UP</span></h1>
          <div className="contact-methods">
            <a href="https://wa.me/923148005977" className="contact-method">
              <div className="contact-icon">📱</div>
              <div>
                <div className="contact-method-title">WHATSAPP</div>
                <div className="contact-method-sub">Fastest reply · DM to order</div>
              </div>
              <div className="contact-arrow">→</div>
            </a>
            <a href="https://instagram.com/prelovedkicks" className="contact-method">
              <div className="contact-icon">📸</div>
              <div>
                <div className="contact-method-title">INSTAGRAM</div>
                <div className="contact-method-sub">@prelovedkicks · DM us</div>
              </div>
              <div className="contact-arrow">→</div>
            </a>
            <a href="https://facebook.com/prelovedkicks" className="contact-method">
              <div className="contact-icon">💬</div>
              <div>
                <div className="contact-method-title">FACEBOOK</div>
                <div className="contact-method-sub">Preloved Kicks · Message us</div>
              </div>
              <div className="contact-arrow">→</div>
            </a>
          </div>
        </div>
        <div>
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input type="text" className="form-input" placeholder="Ahmed Khan" required />
            </div>
            <div className="form-group">
              <label className="form-label">WhatsApp Number</label>
              <input type="text" className="form-input" placeholder="+92 300 0000000" required />
            </div>
            <div className="form-group">
              <label className="form-label">What are you looking for?</label>
              <textarea className="form-input" placeholder="e.g. Nike Air Max UK 9, budget Rs. 5000..." required />
            </div>
            <button type="submit" className="form-submit"><span>SEND INQUIRY →</span></button>
          </form>
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
