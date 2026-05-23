import { useState } from 'react';
import ProductCard from '../components/ProductCard';

const shopProducts = [
  { id: 5, brand: 'Nike', name: 'Air Max 90', price: 4500, size: 'UK 9', tag: '9/10', conditionClass: 'cond-9', color: 'White/Red' },
  { id: 6, brand: 'Jordan', name: 'AJ1 Low', price: 6800, size: 'UK 10', tag: '8/10', conditionClass: 'cond-8', color: 'Black/Red' },
  { id: 7, brand: 'Adidas', name: 'Ultraboost 22', price: 3200, size: 'UK 8', tag: '9/10', conditionClass: 'cond-9', color: 'Core Black' },
  { id: 8, brand: 'New Balance', name: '990v5', price: 7500, size: 'UK 9.5', tag: '7/10', conditionClass: 'cond-7', color: 'Grey/Silver' },
  { id: 9, brand: 'Puma', name: 'Suede Classic', price: 2800, size: 'UK 8', tag: '8/10', conditionClass: 'cond-8', color: 'Navy/White' },
  { id: 10, brand: 'Nike', name: 'Air Force 1', price: 5200, size: 'UK 9', tag: '9/10', conditionClass: 'cond-9', color: 'Triple White' },
];

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
