import { useMemo, useState } from 'react';

const dummyOrder = {
  orderId: 'PK-2025-001',
  customerName: 'Ahmed Khan',
  size: 'UK 9',
  city: 'Karachi',
  shoe: 'Nike Air Max 90',
  price: 4500,
  status: 'Shipped',
  currentStep: 3,
  lastUpdated: '22 May 2025, 3:00 PM',
  estimatedDelivery: '24-25 May 2025',
};

const trackingSteps = [
  'Order Confirmed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

export default function Tracking() {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorShakeKey, setErrorShakeKey] = useState(0);

  const order = useMemo(() => {
    if (!isTracking) return null;
    return {
      ...dummyOrder,
      orderId: orderIdInput.trim() || dummyOrder.orderId,
    };
  }, [isTracking, orderIdInput]);
  const currentStep = order?.currentStep || 1;

  const handleTrack = (event) => {
    event.preventDefault();
    const normalizedOrderId = orderIdInput.trim().toUpperCase();

    if (normalizedOrderId === dummyOrder.orderId) {
      setErrorMessage('');
      setIsLoading(true);
      window.setTimeout(() => {
        setIsLoading(false);
        setIsTracking(true);
      }, 1500);
      return;
    }

    setIsLoading(false);
    setIsTracking(false);
    setErrorMessage('Order not found. Please check your Order ID and try again');
    setErrorShakeKey((current) => current + 1);
  };

  const handleInputChange = (event) => {
    setOrderIdInput(event.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleNewSearch = () => {
    setIsLoading(false);
    setIsTracking(false);
    setErrorMessage('');
  };

  return (
    <main className="tracking-page">
      <div className="tracking-wrap">
        {!isTracking && !isLoading ? (
          <section className="tracking-search">
            <h1 className="tracking-title">TRACK YOUR ORDER</h1>
            <p className="tracking-subtext">Enter your Order ID to see live status</p>

            <form className="tracking-form" onSubmit={handleTrack}>
              <input
                type="text"
                value={orderIdInput}
                onChange={handleInputChange}
                placeholder="e.g. PK-2025-001"
                className="tracking-input"
              />
              <button type="submit" className="tracking-btn">TRACK</button>
            </form>

            {errorMessage && (
              <p key={errorShakeKey} className="tracking-error">
                {errorMessage}
              </p>
            )}

            <p className="tracking-note">
              Your Order ID is sent to you on WhatsApp after your order is confirmed
            </p>
          </section>
        ) : isLoading ? (
          <section className="tracking-loading">
            <div className="tracking-spinner" />
            <p className="tracking-loading-text">FETCHING ORDER...</p>
          </section>
        ) : (
          <section className="tracking-results">
            <div className="tracking-results-head">
              <h1 className="tracking-title">TRACK YOUR ORDER</h1>
              <button type="button" className="tracking-link-btn" onClick={handleNewSearch}>
                Search Another
              </button>
            </div>

            <div className="tracking-order-card tracking-summary-enter">
              <p className="tracking-order-id">{order.orderId}</p>
              <div className="tracking-order-grid">
                <div>
                  <p className="tracking-label">Shoe</p>
                  <p className="tracking-value">{order.shoe} - {order.size}</p>
                </div>
                <div>
                  <p className="tracking-label">Price</p>
                  <p className="tracking-value">PKR {order.price.toLocaleString('en-PK')}</p>
                </div>
                <div>
                  <p className="tracking-label">Customer City</p>
                  <p className="tracking-value">{order.city}</p>
                </div>
                <div>
                  <p className="tracking-label">Estimated Delivery</p>
                  <p className="tracking-value">{order.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="tracking-label">Last Updated</p>
                  <p className="tracking-value">{order.lastUpdated}</p>
                </div>
              </div>
            </div>

            <div className="tracking-progress">
              {trackingSteps.map((stepName, index) => {
                const stepNumber = index + 1;
                const stepState =
                  stepNumber < currentStep
                    ? 'completed'
                    : stepNumber === currentStep
                      ? 'current'
                      : 'upcoming';

                return (
                  <div
                    key={stepName}
                    className={`tracking-step ${stepState}`}
                    style={{ '--step-delay': `${index * 0.2}s` }}
                  >
                    <div className="tracking-step-dot" />
                    <p className="tracking-step-title">{stepName}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
