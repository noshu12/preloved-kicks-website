import { useEffect, useMemo, useRef, useState } from 'react';
import logo from '../assets/logo.jpeg';

const featuredProducts = [
  { id: 1, brand: 'Nike', name: 'Air Max 90', price: 4500, size: 'UK 9', tag: 'NEW DROP', condition: '9/10', color: 'White/Red' },
  { id: 2, brand: 'Jordan', name: 'AJ1 Low', price: 6800, size: 'UK 10', tag: 'HOT', condition: '8/10', color: 'Black/Red' },
  { id: 3, brand: 'Adidas', name: 'Ultraboost 22', price: 3200, size: 'UK 8', tag: '', condition: '9/10', color: 'Core Black' },
  { id: 4, brand: 'New Balance', name: '990v5', price: 7500, size: 'UK 9.5', tag: 'GRAIL', condition: '7/10', color: 'Grey/Silver' },
];

const shopProducts = [
  { id: 5, brand: 'Nike', name: 'Air Max 90', price: 4500, size: 'UK 9', tag: '9/10', conditionClass: 'cond-9', color: 'White/Red' },
  { id: 6, brand: 'Jordan', name: 'AJ1 Low', price: 6800, size: 'UK 10', tag: '8/10', conditionClass: 'cond-8', color: 'Black/Red' },
  { id: 7, brand: 'Adidas', name: 'Ultraboost 22', price: 3200, size: 'UK 8', tag: '9/10', conditionClass: 'cond-9', color: 'Core Black' },
  { id: 8, brand: 'New Balance', name: '990v5', price: 7500, size: 'UK 9.5', tag: '7/10', conditionClass: 'cond-7', color: 'Grey/Silver' },
  { id: 9, brand: 'Puma', name: 'Suede Classic', price: 2800, size: 'UK 8', tag: '8/10', conditionClass: 'cond-8', color: 'Navy/White' },
  { id: 10, brand: 'Nike', name: 'Air Force 1', price: 5200, size: 'UK 9', tag: '9/10', conditionClass: 'cond-9', color: 'Triple White' },
];

const pages = ['home', 'shop', 'about', 'contact'];

const filterGroups = {
  brand: [
    { label: 'Nike', count: 8, active: true },
    { label: 'Jordan', count: 5, active: false },
    { label: 'Adidas', count: 6, active: false },
    { label: 'New Balance', count: 3, active: false },
    { label: 'Puma', count: 2, active: false },
  ],
  condition: [
    { label: '9/10 — Like New', active: true },
    { label: '8/10 — Great', active: false },
    { label: '7/10 — Good', active: false },
  ],
  size: [
    { label: '7 — 7.5', active: false },
    { label: '8 — 8.5', active: false },
    { label: '9 — 9.5', active: true },
    { label: '10 — 11', active: false },
  ],
};

function formatPrice(price) {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

function App() {
  const [activePage, setActivePage] = useState('home');
  const [transitionState, setTransitionState] = useState('');
  const [loadingPageName, setLoadingPageName] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState(filterGroups);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const heroRef = useRef(null);

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.quantity * item.price, 0), [cart]);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const moveCursor = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX}px`;
        cursorRef.current.style.top = `${mouseY}px`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }

      requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', moveCursor);
    animateRing();

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  useEffect(() => {
    const pageNames = {
      home: 'Preloved Kicks',
      shop: 'Shop — Preloved Kicks',
      about: 'About — Preloved Kicks',
      contact: 'Contact — Preloved Kicks',
    };
    document.title = pageNames[activePage] || 'Preloved Kicks';
  }, [activePage]);

  useEffect(() => {
    const currentPage = document.getElementById(activePage);
    if (!currentPage) {
      return undefined;
    }

    const revealItems = currentPage.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => entry.target.classList.add('visible'), index * 100);
          }
        });
      },
      { threshold: 0.1 },
    );

    revealItems.forEach((element) => {
      element.classList.remove('visible');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activePage]);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ block: 'start' });
    }
    window.scrollTo(0, 0);
  }, [activePage]);

  const navigateTo = (pageId) => {
    const pageNames = {
      home: 'HOME',
      shop: 'SHOP',
      about: 'ABOUT',
      contact: 'CONTACT',
    };
    setLoadingPageName(pageNames[pageId] || pageId.toUpperCase());
    setTransitionState('enter');
    window.setTimeout(() => {
      setActivePage(pageId);
      setTransitionState('exit');
      window.setTimeout(() => setTransitionState(''), 500);
    }, 500);
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateCartItem = (productId, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const toggleFilter = (groupName, index) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [groupName]: currentFilters[groupName].map((item, itemIndex) =>
        itemIndex === index ? { ...item, active: !item.active } : item,
      ),
    }));
  };

  const applyPageButtonClass = (pageId) => (pageId === 'contact' ? 'nav-cta' : pageId === activePage ? 'active' : '');

  return (
    <>
      <div className="cursor" id="cursor" ref={cursorRef} />
      <div className="cursor-ring" id="cursorRing" ref={ringRef} />
      <div className={`page-transition ${transitionState}`} id="pageTransition">
        <div className="transition-text">{loadingPageName}</div>
      </div>

      <nav>
        <a href="#" className="nav-logo" onClick={(event) => { event.preventDefault(); navigateTo('home'); }}>
          <img className="brand-logo" src={logo} alt="Preloved Kicks" />
          <span className="brand-wordmark">PRELOVED <span>KICKS</span></span>
        </a>
        <ul className="nav-links">
          {pages.map((pageId) => (
            <li key={pageId}>
              <a
                href="#"
                id={`nav-${pageId}`}
                className={applyPageButtonClass(pageId)}
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(pageId);
                }}
              >
                {pageId.charAt(0).toUpperCase() + pageId.slice(1)}
              </a>
            </li>
          ))}
          <li>
            <button type="button" className="nav-cart" onClick={() => setCartOpen((value) => !value)}>
              Cart <span>{cartCount}</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div>
            <p className="cart-eyebrow">Cart</p>
            <h3>Your picks</h3>
          </div>
          <button type="button" className="cart-close" onClick={() => setCartOpen(false)}>
            ×
          </button>
        </div>
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <p className="cart-empty">No items yet. Add a pair to start building the order.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <div className="cart-item-brand">{item.brand}</div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">{item.color} · {item.size}</div>
                </div>
                <div className="cart-item-controls">
                  <button type="button" onClick={() => updateCartItem(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateCartItem(item.id, 1)}>+</button>
                </div>
                <div className="cart-item-price">{formatPrice(item.price * item.quantity)}</div>
              </div>
            ))
          )}
        </div>
        <div className="cart-drawer-footer">
          <div className="cart-total-row">
            <span>Total</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <button type="button" className="cart-checkout" disabled={!cart.length}>
            Checkout
          </button>
        </div>
      </div>

      <main>
        <div className={`page ${activePage === 'home' ? 'active' : ''}`} id="home" ref={heroRef}>
          <section className="hero">
            <div className="hero-bg" />
            <div className="hero-ticker">PRELOVED KICKS · PRELOVED KICKS · PRELOVED KICKS · PRELOVED KICKS · </div>
            <p className="hero-eyebrow">EVERY PAIR HAS A PAST</p>
            <h1 className="hero-title">
              WE FIND E&apos;M
              <span className="line2">YOU WEAR E&apos;M.</span>
            </h1>
            <p className="hero-sub">Pre-owned sneakers handpicked from the streets. Every pair authenticated. Every price fair.</p>
            <div className="hero-actions">
              <a href="#" className="btn-primary" onClick={(event) => { event.preventDefault(); navigateTo('shop'); }}><span>SHOP NOW</span></a>
              <a href="#" className="btn-ghost" onClick={(event) => { event.preventDefault(); navigateTo('about'); }}>HOW WE WORK</a>
            </div>
            <div className="hero-scroll">
              <div className="scroll-line" />
              SCROLL TO EXPLORE
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-num">100+</div>
                <div className="stat-label">Pairs Sold</div>
              </div>
              <div>
                <div className="stat-num">PK</div>
                <div className="stat-label">Wide Shipping</div>
              </div>
            </div>
          </section>

          <div className="marquee-strip">
            <div className="marquee-inner">
              <span>NIKE</span><span className="marquee-dot">·</span>
              <span>ADIDAS</span><span className="marquee-dot">·</span>
              <span>JORDAN</span><span className="marquee-dot">·</span>
              <span>NEW BALANCE</span><span className="marquee-dot">·</span>
              <span>PUMA</span><span className="marquee-dot">·</span>
              <span>REEBOK</span><span className="marquee-dot">·</span>
              <span>VANS</span><span className="marquee-dot">·</span>
              <span>CONVERSE</span><span className="marquee-dot">·</span>
              <span>NIKE</span><span className="marquee-dot">·</span>
              <span>ADIDAS</span><span className="marquee-dot">·</span>
              <span>JORDAN</span><span className="marquee-dot">·</span>
              <span>NEW BALANCE</span><span className="marquee-dot">·</span>
              <span>PUMA</span><span className="marquee-dot">·</span>
              <span>REEBOK</span><span className="marquee-dot">·</span>
              <span>VANS</span><span className="marquee-dot">·</span>
              <span>CONVERSE</span><span className="marquee-dot">·</span>
            </div>
          </div>

          <section className="section">
            <div className="section-header reveal">
              <h2 className="section-title">FRESH<br /><span>DROPS</span></h2>
              <a href="#" className="section-link" onClick={(event) => { event.preventDefault(); navigateTo('shop'); }}>View All →</a>
            </div>
            <div className="product-grid reveal">
              {featuredProducts.map((product, index) => (
                <div className={`product-card ${index === 0 ? 'featured' : ''}`} key={product.id}>
                  <div className="product-img">
                    <span className="product-placeholder" style={index > 0 ? { fontSize: '60px' } : undefined}>👟</span>
                    {product.tag ? <span className="product-tag">{product.tag}</span> : null}
                  </div>
                  <div className="product-info">
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-name">{product.name}</div>
                    <div className="product-price-row">
                      <div className="product-price">{formatPrice(product.price)}</div>
                      <div className="product-size">{product.size}</div>
                    </div>
                    <button type="button" className="product-btn" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer>
            <div className="footer-top">
              <div>
                <div className="footer-logo">PRELOVED<span>KICKS</span></div>
                <div className="footer-tagline">Someone&apos;s old grails. Your new ones.</div>
              </div>
              <div className="footer-links">
                <div className="footer-col">
                  <h4>Pages</h4>
                  <a href="#" onClick={(event) => { event.preventDefault(); navigateTo('home'); }}>Home</a>
                  <a href="#" onClick={(event) => { event.preventDefault(); navigateTo('shop'); }}>Shop</a>
                  <a href="#" onClick={(event) => { event.preventDefault(); navigateTo('about'); }}>About</a>
                  <a href="#" onClick={(event) => { event.preventDefault(); navigateTo('contact'); }}>Contact</a>
                </div>
                <div className="footer-col">
                  <h4>Follow</h4>
                  <a href="#">Instagram</a>
                  <a href="#">Facebook</a>
                  <a href="#">WhatsApp</a>
                </div>
                <div className="footer-col">
                  <h4>Location</h4>
                  <a href="#">Karachi, PK</a>
                  <a href="#">Ships PK-wide</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2025 Preloved Kicks · Karachi</span>
              <span>Handpicked. Authenticated. Delivered.</span>
            </div>
          </footer>
        </div>

        <div className={`page ${activePage === 'shop' ? 'active' : ''}`} id="shop">
          <div className="shop-header">
            <h1 className="shop-title">THE<br /><span>DROP</span></h1>
            <div className="shop-meta">
              <span>24</span> PAIRS AVAILABLE &nbsp;·&nbsp; UPDATED WEEKLY &nbsp;·&nbsp; ALL AUTHENTICATED
            </div>
          </div>
          <div className="shop-layout">
            <aside className="filters">
              <div className="filter-group">
                <div className="filter-title">Brand</div>
                {filters.brand.map((item, index) => (
                  <div
                    className={`filter-option ${item.active ? 'active' : ''}`}
                    key={item.label}
                    onClick={() => toggleFilter('brand', index)}
                  >
                    <div className="filter-check" />
                    <span className="filter-label">{item.label}</span>
                    <span className="filter-count">{item.count}</span>
                  </div>
                ))}
              </div>
              <div className="filter-group">
                <div className="filter-title">Condition</div>
                {filters.condition.map((item, index) => (
                  <div
                    className={`filter-option ${item.active ? 'active' : ''}`}
                    key={item.label}
                    onClick={() => toggleFilter('condition', index)}
                  >
                    <div className="filter-check" />
                    <span className="filter-label">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="filter-group">
                <div className="filter-title">UK Size</div>
                {filters.size.map((item, index) => (
                  <div
                    className={`filter-option ${item.active ? 'active' : ''}`}
                    key={item.label}
                    onClick={() => toggleFilter('size', index)}
                  >
                    <div className="filter-check" />
                    <span className="filter-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </aside>
            <div className="shop-grid">
              {shopProducts.map((product) => (
                <div className="shop-card" key={product.id}>
                  <div className="shop-img">
                    <span className="shoe-emoji">👟</span>
                    <span className={`condition-badge ${product.conditionClass}`}>{product.tag}</span>
                  </div>
                  <div className="shop-card-info">
                    <div className="shop-card-brand">{product.brand}</div>
                    <div className="shop-card-name">{product.name}</div>
                    <div className="shop-card-details">{product.color} · {product.size}</div>
                    <div className="shop-card-footer">
                      <div className="shop-price">{formatPrice(product.price)}</div>
                      <button type="button" className="shop-action" onClick={() => addToCart(product)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <footer>
            <div className="footer-bottom footer-bottom-compact">
              <span>© 2025 Preloved Kicks · Karachi</span>
              <span>Handpicked. Authenticated. Delivered.</span>
            </div>
          </footer>
        </div>

        <div className={`page ${activePage === 'about' ? 'active' : ''}`} id="about">
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
        </div>

        <div className={`page ${activePage === 'contact' ? 'active' : ''}`} id="contact">
          <div className="contact-wrap">
            <div>
              <h1 className="contact-title">HIT<br /><span>US UP</span></h1>
              <div className="contact-methods">
                <a href="https://wa.me/923001234567" className="contact-method">
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
              <form className="contact-form" onSubmit={(event) => {
                event.preventDefault();
                const buttonLabel = event.currentTarget.querySelector('.form-submit span');
                if (buttonLabel) {
                  buttonLabel.textContent = "SENT! WE'LL HIT YOU BACK ✓";
                  window.setTimeout(() => {
                    buttonLabel.textContent = 'SEND INQUIRY →';
                  }, 3000);
                }
              }}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input type="text" className="form-input" placeholder="Ahmed Khan" />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp Number</label>
                  <input type="text" className="form-input" placeholder="+92 300 0000000" />
                </div>
                <div className="form-group">
                  <label className="form-label">What are you looking for?</label>
                  <textarea className="form-input" placeholder="e.g. Nike Air Max UK 9, budget Rs. 5000..." />
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
        </div>
      </main>
    </>
  );
}

export default App;