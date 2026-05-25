import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const faqData = [
  {
    id: 1,
    question: 'Are the sneakers authentic?',
    answer: 'Yes. Every pair is personally inspected and verified before listing. We do not sell fakes.',
  },
  {
    id: 2,
    question: 'How do I place an order?',
    answer: 'Click "Order on WhatsApp" on any product page or DM us on Instagram. We confirm your order and send payment details.',
  },
  {
    id: 3,
    question: 'Do you ship across Pakistan?',
    answer: 'Yes we ship PK-wide. Shipping fee is Rs. 200 flat for all cities.',
  },
  {
    id: 4,
    question: 'How long does delivery take?',
    answer: '2-4 working days for major cities Karachi, Lahore, Islamabad. 4-7 days for other cities.',
  },
  {
    id: 5,
    question: 'What do the condition ratings mean?',
    answer: '9/10 Like New — worn once or twice, no visible damage. 8/10 Great — light wear, no major flaws. 7/10 Good — visible wear but structurally sound.',
  },
  {
    id: 6,
    question: 'Can I return a pair?',
    answer: 'All sales are final. Every pair is honestly graded and photographed. If your item arrives significantly different from description contact us on WhatsApp within 24 hours.',
  },
  {
    id: 7,
    question: 'How do I track my order?',
    answer: 'We give you an Order ID on WhatsApp after confirming your order. Enter it on the Track Order page.',
  },
  {
    id: 8,
    question: 'What payment methods do you accept?',
    answer: 'Currently WhatsApp orders with bank transfer or cash on delivery in Karachi. Online payment coming soon.',
  },
];

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>FAQ | Preloved Kicks</title>
        <meta
          name="description"
          content="Frequently asked questions about Preloved Kicks. Learn about authenticity, shipping, payment methods and more."
        />
      </Helmet>

      <div className="faq-page">
        <div className="faq-header">
          <h1 className="faq-title">FREQUENTLY<br />ASKED QUESTIONS</h1>
          <p className="faq-subtitle">Got questions? We got answers.</p>
        </div>

        <div className="faq-container">
          {faqData.map((item) => (
            <div
              key={item.id}
              className={`faq-item ${activeId === item.id ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleAccordion(item.id)}
              >
                <span>{item.question}</span>
                <span className="faq-icon">
                  {activeId === item.id ? '−' : '+'}
                </span>
              </button>
              <div className="faq-answer-wrapper">
                <div className="faq-answer">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <p>Still have questions?</p>
          <a href="https://wa.me/923148005977" target="_blank" rel="noopener noreferrer" className="faq-whatsapp-btn">
            Message us on WhatsApp
          </a>
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
