import { useRef, useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function formatPrice(price) {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

export default function HomePage({ addToCart }) {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          limit(4)
        );
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal');
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

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Preloved Kicks | Thrifted Sneakers in Karachi</title>
        <meta
          name="description"
          content="Buy authentic pre-owned sneakers in Karachi. Nike, Jordan, Adidas and more. Every pair verified. Ships PK-wide."
        />
        <meta
          name="keywords"
          content="thrift sneakers karachi, preloved shoes pakistan, buy used sneakers, nike adidas jordan karachi"
        />
      </Helmet>
      <section className="hero" ref={heroRef}>
        <div className="hero-bg" />
        <div className="hero-ticker">PRELOVED KICKS · PRELOVED KICKS · PRELOVED KICKS · PRELOVED KICKS · </div>
        <p className="hero-eyebrow">EVERY PAIR HAS A PAST</p>
        <h1 className="hero-title">
          WE FIND &apos;EM
          <span className="line2">YOU WEAR &apos;EM.</span>
        </h1>
        <p className="hero-sub">Pre-owned sneakers handpicked from the streets. Every pair authenticated. Every price fair.</p>
        <div className="hero-actions">
          <a href="#" className="btn-primary" onClick={(event) => { event.preventDefault(); navigate('/shop'); }}><span>SHOP NOW</span></a>
          <a href="#" className="btn-ghost" onClick={(event) => { event.preventDefault(); navigate('/about'); }}>HOW WE WORK</a>
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
          <a href="#" className="section-link" onClick={(event) => { event.preventDefault(); navigate('/shop'); }}>View All →</a>
        </div>
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p className="loading-text">LOADING DROPS...</p>
          </div>
        ) : (
          <div className="product-grid reveal">
            {featuredProducts.map((product, index) => (
            <div
              className={`product-card ${index === 0 ? 'featured' : ''} ${product.stock === 0 ? 'sold-out-card' : ''}`}
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="product-img">
                <svg className="shoe-silhouette" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M6 42c0 0 3-5 9-5h13c2 0 4-1 6-2l12-7c3-2 7-3 11-3h9c4 0 8 2 11 5l8 8c1 1 2 2 2 4v3H6v-3z" fill="currentColor" />
                  <path d="M20 30h10m4-2h10m4-1h8m-30 8h8m5-1h7m4-1h6" stroke="#080808" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  <path d="M10 45h78c0 0-2 6-8 6H18c-6 0-8-6-8-6z" fill="currentColor" />
                  <path d="M60 20l8 9h8c-2-3-5-6-9-8l-7-1z" fill="currentColor" />
                </svg>
                {product.stock === 1 && <span className="stock-badge stock-low">ONLY 1 LEFT</span>}
                {product.stock === 0 && <span className="stock-badge stock-out">SOLD OUT</span>}
                <span className="authentic-badge">✓ AUTHENTIC</span>
                {product.tag ? <span className="product-tag">{product.tag}</span> : null}
              </div>
              <div className="product-info">
                <div className="product-brand">{product.brand}</div>
                <div className="product-name">{product.name}</div>
                <div className="product-price-row">
                  <div className="product-price">{formatPrice(product.price)}</div>
                  <div className="product-size">{product.size}</div>
                </div>
                <button
                  type="button"
                  className="product-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
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
              <a href="#" onClick={(event) => { event.preventDefault(); navigate('/'); }}>Home</a>
              <a href="#" onClick={(event) => { event.preventDefault(); navigate('/shop'); }}>Shop</a>
              <a href="#" onClick={(event) => { event.preventDefault(); navigate('/about'); }}>About</a>
              <a href="#" onClick={(event) => { event.preventDefault(); navigate('/contact'); }}>Contact</a>
              <a href="#" onClick={(event) => { event.preventDefault(); navigate('/faq'); }}>FAQ</a>
            </div>
            <div className="footer-col">
              <h4>Follow</h4>
              <a href="https://www.instagram.com/prelovedkick.pk?igsh=MTc4MGdiZXlpZjBzcg==" target="_blank" rel="noreferrer"><i>Instagram</i></a>
              <a href="https://www.facebook.com/share/1NBZrGmNfB/" target="_blank" rel="noreferrer"><i>Facebook</i></a>
              <a href="https://wa.me/923148005977" target="_blank" rel="noreferrer"><i>WhatsApp</i></a>
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
    </>
  );
}
