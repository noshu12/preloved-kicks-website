import { useNavigate } from 'react-router-dom';

function formatPrice(price) {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

export default function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  return (
    <div
      className="shop-card"
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="shop-img">
        <svg className="shoe-silhouette" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6 42c0 0 3-5 9-5h13c2 0 4-1 6-2l12-7c3-2 7-3 11-3h9c4 0 8 2 11 5l8 8c1 1 2 2 2 4v3H6v-3z" fill="currentColor" />
          <path d="M20 30h10m4-2h10m4-1h8m-30 8h8m5-1h7m4-1h6" stroke="#080808" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M10 45h78c0 0-2 6-8 6H18c-6 0-8-6-8-6z" fill="currentColor" />
          <path d="M60 20l8 9h8c-2-3-5-6-9-8l-7-1z" fill="currentColor" />
        </svg>
        <span className={`condition-badge ${product.conditionClass}`}>{product.tag}</span>
      </div>
      <div className="shop-card-info">
        <div className="shop-card-brand">{product.brand}</div>
        <div className="shop-card-name">{product.name}</div>
        <div className="shop-card-details">{product.color} - {product.size}</div>
        <div className="shop-card-footer">
          <div className="shop-price">{formatPrice(product.price)}</div>
          {addToCart && (
            <button
              type="button"
              className="shop-action"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
