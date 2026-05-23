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
        <span className="shoe-emoji">SHOE</span>
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
