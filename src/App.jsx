import { useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductDetail from './pages/ProductDetail';
import Tracking from './pages/Tracking';
import FAQ from './pages/FAQ';
import PageTransition from './components/PageTransition';

function formatPrice(price) {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const navSearchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.quantity * item.price, 0), [cart]);
  const searchableProducts = useMemo(
    () => [
      { id: 1, brand: 'Nike', name: 'Air Max 90', price: 4500 },
      { id: 2, brand: 'Jordan', name: 'AJ1 Low', price: 6800 },
      { id: 3, brand: 'Adidas', name: 'Ultraboost 22', price: 3200 },
      { id: 4, brand: 'New Balance', name: '990v5', price: 7500 },
      { id: 5, brand: 'Nike', name: 'Air Max 90', price: 4500 },
      { id: 6, brand: 'Jordan', name: 'AJ1 Low', price: 6800 },
      { id: 7, brand: 'Adidas', name: 'Ultraboost 22', price: 3200 },
      { id: 8, brand: 'New Balance', name: '990v5', price: 7500 },
      { id: 9, brand: 'Puma', name: 'Suede Classic', price: 2800 },
      { id: 10, brand: 'Nike', name: 'Air Force 1', price: 5200 },
    ],
    [],
  );
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return searchableProducts
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query),
      )
      .slice(0, 8);
  }, [searchQuery, searchableProducts]);

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

  useEffect(() => {
    if (!searchOpen) return undefined;

    const onMouseDown = (event) => {
      if (navSearchRef.current && !navSearchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [searchOpen]);

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
    const whatsappUrl = `https://wa.me/923148005977?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSearchResultClick = (productId) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <div className="cursor" id="cursor" ref={cursorRef} />
      <div className="cursor-ring" id="cursorRing" ref={ringRef} />

      <div ref={navSearchRef}>
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
              <button
                type="button"
                className="nav-search-toggle"
                aria-label="Search sneakers"
                onClick={() => setSearchOpen((open) => !open)}
              >
                🔍
              </button>
            </li>
            <li>
              <a href="#" className={location.pathname === '/tracking' ? 'active' : ''} onClick={(event) => { event.preventDefault(); navigateTo('/tracking'); }}>TRACK ORDER</a>
            </li>
            <li>
              <a href="#" className={location.pathname === '/contact' ? 'nav-cta' : ''} onClick={(event) => { event.preventDefault(); navigateTo('/contact'); }}>Contact</a>
            </li>
            <li>
              <a
                href="https://wa.me/923148005977"
                className="nav-whatsapp-btn"
                target="_blank"
                rel="noreferrer"
              >
                <span className="nav-whatsapp-icon">📱</span>
                <span>WHATSAPP</span>
              </a>
            </li>
            <li>
              <button type="button" className="nav-cart" onClick={() => setCartOpen(!cartOpen)}>
                Cart
                {cartCount > 0 && <span>{cartCount}</span>}
              </button>
            </li>
          </ul>
        </nav>

        <div className={`nav-search-panel ${searchOpen ? 'open' : ''}`}>
          <div className="nav-search-inner">
            <input
              type="text"
              className="nav-search-input"
              placeholder="Search sneakers, brands..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="nav-search-results">
                {searchResults.map((result) => (
                  <button
                    key={`${result.id}-${result.brand}-${result.name}`}
                    type="button"
                    className="nav-search-result-item"
                    onClick={() => handleSearchResultClick(result.id)}
                  >
                    <span className="nav-search-result-name">{result.name}</span>
                    <span className="nav-search-result-brand">{result.brand}</span>
                    <span className="nav-search-result-price">Rs. {result.price.toLocaleString('en-PK')}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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
                  <button type="button" onClick={() => updateCartItem(item.id, -1)}>-</button>
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
            <Route path="/faq" element={<FAQ />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          </Routes>
        </main>
      </PageTransition>
    </>
  );
}

export default App;
