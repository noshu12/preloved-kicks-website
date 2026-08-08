import { useNavigate } from 'react-router-dom';

function formatPrice(price) {
  if (price === undefined || price === null || isNaN(price)) return 'Rs. 0';
  return `Rs. ${Number(price).toLocaleString('en-PK')}`;
}

export default function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();
  const isSoldOut = product?.stock === 0;

  // Extract primary image URL safely from array or string
  const imageUrl = Array.isArray(product?.images) 
    ? product.images[0] 
    : (product?.images || product?.image);

  return (
    <div
      className={`shop-card ${isSoldOut ? 'sold-out-card' : ''}`}
      onClick={() => navigate(`/product/${product?.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="shop-img">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={product?.name || 'Shoe Image'} 
            className="product-card-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <svg className="shoe-silhouette" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 42c0 0 3-5 9-5h13c2 0 4-1 6-2l12-7c3-2 7-3 11-3h9c4 0 8 2 11 5l8 8c1 1 2 2 2 4v3H6v-3z" fill="currentColor" />
            <path d="M20 30h10m4-2h10m4-1h8m-30 8h8m5-1h7m4-1h6" stroke="#080808" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M10 45h78c0 0-2 6-8 6H18c-6 0-8-6-8-6z" fill="currentColor" />
            <path d="M60 20l8 9h8c-2-3-5-6-9-8l-7-1z" fill="currentColor" />
          </svg>
        )}
        {product?.stock === 1 && <span className="stock-badge stock-low">ONLY 1 LEFT</span>}
        {product?.stock === 0 && <span className="stock-badge stock-out">SOLD OUT</span>}
        <span className="authentic-badge">✓ AUTHENTIC</span>
        {product?.tag && <span className={`condition-badge ${product?.conditionClass || ''}`}>{product.tag}</span>}
      </div>

      <div className="shop-card-info">
        <div className="shop-card-brand">{product?.brand}</div>
        <div className="shop-card-name">{product?.name}</div>
        <div className="shop-card-details">
          {product?.colorway || product?.color || 'N/A'} - {product?.size || 'N/A'}
        </div>
        <div className="shop-card-footer">
          <div className="shop-price">{formatPrice(product?.price)}</div>
          {addToCart && (
            <button
              type="button"
              className="shop-action"
              disabled={isSoldOut}
              onClick={(e) => {
                e.stopPropagation();
                if (isSoldOut) return;
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