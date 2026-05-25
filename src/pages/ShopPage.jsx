import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from '../components/ProductCard';
import { Helmet } from 'react-helmet-async';

const initialFilters = {
  brand: [
    { label: 'Nike', count: 8, active: true },
    { label: 'Jordan', count: 5, active: false },
    { label: 'Adidas', count: 6, active: false },
    { label: 'New Balance', count: 3, active: false },
    { label: 'Puma', count: 2, active: false },
  ],
  condition: [
    { label: '9/10 - Like New', active: true },
    { label: '8/10 - Great', active: false },
    { label: '7/10 - Good', active: false },
  ],
  size: [
    { label: '7 - 7.5', active: false },
    { label: '8 - 8.5', active: false },
    { label: '9 - 9.5', active: true },
    { label: '10 - 11', active: false },
  ],
};

export default function ShopPage({ addToCart }) {
  const [filters, setFilters] = useState(initialFilters);
  const [shopProducts, setShopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setShopProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <p className="loading-text">LOADING DROPS...</p>
      </div>
    );
  }

  const toggleFilter = (groupName, index) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [groupName]: currentFilters[groupName].map((item, itemIndex) =>
        itemIndex === index ? { ...item, active: !item.active } : item,
      ),
    }));
  };

  return (
    <>
      <Helmet>
        <title>Shop | Preloved Kicks</title>
        <meta
          name="description"
          content="Browse our collection of authenticated pre-owned sneakers. Filter by brand, size and condition. Ships across Pakistan."
        />
      </Helmet>
      <div className="shop-header">
        <h1 className="shop-title">THE<br /><span>DROP</span></h1>
        <div className="shop-meta">
          <span>24</span> PAIRS AVAILABLE · UPDATED WEEKLY · ALL AUTHENTICATED
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
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
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
