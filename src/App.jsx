import { useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductDetail from './pages/ProductDetail';
import Tracking from './pages/Tracking';
import PageTransition from './components/PageTransition';

function formatPrice(price) {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.quantity * item.price, 0), [cart]);

  // Cursor tracking
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

  // Page title management
  useEffect(() => {
    const pageNames = {
      '/': 'Preloved Kicks',
      '/shop': 'Shop — Preloved Kicks',
      '/about': 'About — Preloved Kicks',
      '/tracking': 'Track Order — Preloved Kicks',
      '/contact': 'Contact — Preloved Kicks',
    };
    document.title = pageNames[location.pathname] || 'Preloved Kicks';
  }, [location.pathname]);

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

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleWhatsAppCheckout = () => {
    if (!cart.length) return;

    const itemsText = cart
      .map((item) => `- ${item.brand} ${item.name} (${item.size}) x${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString('en-PK')}`)
      .join('\n');

    const message = `New Order - Preloved Kicks\nItems:\n${itemsText}\nTotal: Rs. ${cartTotal.toLocaleString('en-PK')}\nShipping: Rs. 200`;
    const whatsappUrl = `https://wa.me/923XXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div className="cursor" id="cursor" ref={cursorRef} />
      <div className="cursor-ring" id="cursorRing" ref={ringRef} />

      <nav>
        <a href="#" className="nav-logo" onClick={(event) => { event.preventDefault(); navigateTo('/'); }}>
          <img className="brand-logo" src={logo} alt="Preloved Kicks" />
          <span className="brand-wordmark">PRELOVED <span>KICKS</span></span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#" className={location.pathname === '/' ? 'active' : ''} onClick={(event) => { event.preventDefault(); navigateTo('/'); }}>Home</a>
          </li>
          <li>
            <a href="#" className={location.pathname === '/shop' ? 'active' : ''} onClick={(event) => { event.preventDefault(); navigateTo('/shop'); }}>Shop</a>
          </li>
          <li>
            <a href="#" className={location.pathname === '/about' ? 'active' : ''} onClick={(event) => { event.preventDefault(); navigateTo('/about'); }}>About</a>
          </li>
          <li>
            <a href="#" className={location.pathname === '/tracking' ? 'active' : ''} onClick={(event) => { event.preventDefault(); navigateTo('/tracking'); }}>TRACK ORDER</a>
          </li>
          <li>
            <a href="#" className={location.pathname === '/contact' ? 'nav-cta' : ''} onClick={(event) => { event.preventDefault(); navigateTo('/contact'); }}>Contact</a>
          </li>
          <li>
            <button type="button" className="nav-cart" onClick={() => setCartOpen(!cartOpen)}>
              Cart
              {cartCount > 0 && <span>{cartCount}</span>}
            </button>
          </li>
        </ul>
      </nav>

      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="cart-header-content">
            <p>Cart</p>
            <h3>Your picks</h3>
          </div>
          <button type="button" className="cart-close" onClick={() => setCartOpen(false)}>×</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p>No items yet. Add a pair to start building the order.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <div className="cart-item-brand">{item.brand}</div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{formatPrice(item.price)}</div>
                </div>
                <div className="cart-item-controls">
                  <button type="button" onClick={() => updateCartItem(item.id, -1)}>−</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateCartItem(item.id, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <button
            type="button"
            className="cart-checkout cart-whatsapp-checkout"
            disabled={!cart.length}
            onClick={handleWhatsAppCheckout}
          >
            ORDER ON WHATSAPP
          </button>
          <button type="button" className="cart-checkout cart-online-disabled" disabled>
            PAY ONLINE -- COMING SOON
          </button>
        </div>
      </div>

      <PageTransition>
        <main>
          <Routes>
            <Route path="/" element={<HomePage addToCart={addToCart} />} />
            <Route path="/shop" element={<ShopPage addToCart={addToCart} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          </Routes>
        </main>
      </PageTransition>
    </>
  );
}

export default App;
