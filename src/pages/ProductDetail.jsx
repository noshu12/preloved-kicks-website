import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ProductCard from '../components/ProductCard';

// Comprehensive product database
const productDatabase = {
  1: {
    id: 1,
    brand: 'Nike',
    name: 'Air Max 90',
    colorway: 'White/Red',
    size: 'UK 9',
    price: 4500,
    condition: '9/10',
    conditionLabel: 'Like New',
    description: 'Barely worn pair in excellent condition. No yellowing on sole, original laces included.',
    tag: 'NEW DROP',
    images: ['/placeholder.jpg'],
  },
  2: {
    id: 2,
    brand: 'Jordan',
    name: 'AJ1 Low',
    colorway: 'Black/Red',
    size: 'UK 10',
    price: 6800,
    condition: '8/10',
    conditionLabel: 'Great',
    description: 'Very good condition with minimal wear. Slight creasing on toe box, original box included.',
    tag: 'HOT',
    images: ['/placeholder.jpg'],
  },
  3: {
    id: 3,
    brand: 'Adidas',
    name: 'Ultraboost 22',
    colorway: 'Core Black',
    size: 'UK 8',
    price: 3200,
    condition: '9/10',
    conditionLabel: 'Like New',
    description: 'Nearly unworn condition. Boost cushioning pristine, never stepped outside.',
    tag: '',
    images: ['/placeholder.jpg'],
  },
  4: {
    id: 4,
    brand: 'New Balance',
    name: '990v5',
    colorway: 'Grey/Silver',
    size: 'UK 9.5',
    price: 7500,
    condition: '7/10',
    conditionLabel: 'Good',
    description: 'Good condition with visible signs of wear. Sole shows age, but structurally sound.',
    tag: 'GRAIL',
    images: ['/placeholder.jpg'],
  },
  5: {
    id: 5,
    brand: 'Nike',
    name: 'Air Max 90',
    colorway: 'White/Red',
    size: 'UK 9',
    price: 4500,
    condition: '9/10',
    conditionLabel: 'Like New',
    description: 'Barely worn pair in excellent condition. No yellowing on sole, original laces included.',
    tag: '',
    images: ['/placeholder.jpg'],
  },
  6: {
    id: 6,
    brand: 'Jordan',
    name: 'AJ1 Low',
    colorway: 'Black/Red',
    size: 'UK 10',
    price: 6800,
    condition: '8/10',
    conditionLabel: 'Great',
    description: 'Very good condition with minimal wear. Slight creasing on toe box, original box included.',
    tag: '',
    images: ['/placeholder.jpg'],
  },
  7: {
    id: 7,
    brand: 'Adidas',
    name: 'Ultraboost 22',
    colorway: 'Core Black',
    size: 'UK 8',
    price: 3200,
    condition: '9/10',
    conditionLabel: 'Like New',
    description: 'Nearly unworn condition. Boost cushioning pristine, never stepped outside.',
    tag: '',
    images: ['/placeholder.jpg'],
  },
  8: {
    id: 8,
    brand: 'New Balance',
    name: '990v5',
    colorway: 'Grey/Silver',
    size: 'UK 9.5',
    price: 7500,
    condition: '7/10',
    conditionLabel: 'Good',
    description: 'Good condition with visible signs of wear. Sole shows age, but structurally sound.',
    tag: '',
    images: ['/placeholder.jpg'],
  },
  9: {
    id: 9,
    brand: 'Puma',
    name: 'Suede Classic',
    colorway: 'Navy/White',
    size: 'UK 8',
    price: 2800,
    condition: '8/10',
    conditionLabel: 'Great',
    description: 'Well-maintained vintage style sneaker. Minor scuffing on suede, overall excellent.',
    tag: '',
    images: ['/placeholder.jpg'],
  },
  10: {
    id: 10,
    brand: 'Nike',
    name: 'Air Force 1',
    colorway: 'Triple White',
    size: 'UK 9',
    price: 5200,
    condition: '9/10',
    conditionLabel: 'Like New',
    description: 'Clean classic white Air Force 1. Barely used, kept in great condition.',
    tag: '',
    images: ['/placeholder.jpg'],
  },
};

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const product = productDatabase[id] || productDatabase[1];
  const galleryImages =
    product.images.length >= 3
      ? product.images.slice(0, 3)
      : Array(3).fill(product.images[0] || '/placeholder.jpg');

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageFading, setIsImageFading] = useState(false);
  const fadeTimeoutRef = useRef(null);
  const relatedRef = useRef(null);

  // Get condition rating bar details
  const getConditionDetails = (condition) => {
    const conditionNum = parseInt(condition);
    const percentage = conditionNum * 10;
    let color = '#22c55e'; // green for 9/10
    let meaning = 'Excellent condition, barely worn';

    if (conditionNum === 8) {
      color = '#eab308'; // yellow for 8/10
      meaning = 'Very good condition with minimal wear';
    } else if (conditionNum === 7) {
      color = '#f97316'; // orange for 7/10
      meaning = 'Good condition with visible signs of wear';
    }

    return { percentage, color, meaning };
  };

  const conditionDetails = getConditionDetails(product.condition);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [product.id]);

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const target = relatedRef.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [product.id]);

  const handleThumbnailClick = (index) => {
    if (index === selectedImageIndex) return;
    setIsImageFading(true);

    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
    }

    fadeTimeoutRef.current = setTimeout(() => {
      setSelectedImageIndex(index);
      setIsImageFading(false);
    }, 180);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi I want to order ${product.brand} ${product.name} Size ${product.size} Price Rs.${product.price}`;
    const whatsappUrl = `https://wa.me/923148005977?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const relatedProducts = [
    { id: 5, brand: 'Nike', name: 'Air Max 90', price: 4500, size: 'UK 9', tag: '9/10', conditionClass: 'cond-9', color: 'White/Red' },
    { id: 6, brand: 'Jordan', name: 'AJ1 Low', price: 6800, size: 'UK 10', tag: '8/10', conditionClass: 'cond-8', color: 'Black/Red' },
    { id: 7, brand: 'Adidas', name: 'Ultraboost 22', price: 3200, size: 'UK 8', tag: '9/10', conditionClass: 'cond-9', color: 'Core Black' },
  ];

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Left: Image Section */}
        <div className="product-detail-images product-detail-image-entrance">
          <div className="product-detail-main">
            <img
              src={galleryImages[selectedImageIndex]}
              alt={product.name}
              style={{
                opacity: isImageFading ? 0 : 1,
                transition: 'opacity 180ms ease-in-out',
              }}
            />
            {product.tag && <span className="product-detail-tag">{product.tag}</span>}
          </div>
          <div className="product-detail-thumbnails">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="product-detail-info">
          <div className="product-detail-brand product-detail-stagger" style={{ '--stagger-index': 0 }}>{product.brand}</div>
          
          <div className="product-detail-header product-detail-stagger" style={{ '--stagger-index': 1 }}>
            <h1 className="product-detail-title">{product.name}</h1>
            <div className="product-detail-condition">
              <span className="condition-badge">{product.condition}</span>
              <span className="condition-label">{product.conditionLabel}</span>
            </div>
          </div>

          <div className="condition-rating-bar product-detail-stagger" style={{ '--stagger-index': 2 }}>
            <div className="condition-bar-track">
              <div
                className="condition-bar-fill"
                style={{
                  width: `${conditionDetails.percentage}%`,
                  backgroundColor: conditionDetails.color,
                }}
              />
            </div>
            <p className="condition-bar-meaning">{conditionDetails.meaning}</p>
          </div>

          <div className="product-detail-price product-detail-stagger" style={{ '--stagger-index': 3 }}>Rs. {product.price.toLocaleString('en-PK')}</div>

          <div className="product-detail-specs product-detail-stagger" style={{ '--stagger-index': 4 }}>
            <div className="spec-item">
              <span className="spec-label">Colorway</span>
              <span className="spec-value">{product.colorway}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Size</span>
              <span className="spec-value">{product.size}</span>
            </div>
          </div>

          <p className="product-detail-description product-detail-stagger" style={{ '--stagger-index': 5 }}>{product.description}</p>

          <div className="product-detail-actions product-detail-stagger" style={{ '--stagger-index': 6 }}>
            {addToCart && (
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                ADD TO CART
              </button>
            )}
            <button className="whatsapp-order-btn" onClick={handleWhatsAppOrder}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.515.901-2.727 2.236-3.514 3.853a9.987 9.987 0 001.523-5.062c0-5.517 4.552-9.986 10.107-9.986s10.108 4.469 10.108 9.986c0 5.517-4.552 9.987-10.108 9.987h-.002a9.998 9.998 0 01-4.083-.956z" />
              </svg>
              ORDER ON WHATSAPP
            </button>
          </div>

          <div className="product-detail-shipping product-detail-stagger" style={{ '--stagger-index': 7 }}>
            <p>✓ Authentication guaranteed</p>
            <p>✓ PK-wide shipping available</p>
            <p>✓ 7-day return policy</p>
          </div>
        </div>
      </div>

      <section className="related-products-section reveal" ref={relatedRef}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '3rem',
            marginBottom: '1.5rem',
          }}
        >
          <h2
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '2.25rem',
              letterSpacing: '0.06em',
              margin: 0,
            }}
          >
            YOU MIGHT ALSO LIKE
          </h2>
          <Link
            to="/shop"
            style={{
              color: '#ffcc00',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            VIEW ALL
          </Link>
        </div>
        <div className="shop-grid">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
