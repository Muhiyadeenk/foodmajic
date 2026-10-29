import { useState } from 'react';
import { ArrowLeft, MessageCircle, Info, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '../utils/currency.js';
import {
  buildOrderMessage,
  buildWhatsAppUrl,
  generateOrderReference,
  validateCheckout,
} from '../utils/whatsapp.js';

const EMPTY_FORM = {
  name: '',
  phone: '',
  address: '',
  city: '',
  landmark: '',
  instructions: '',
  notes: '',
};

function Field({ label, id, error, required, children }) {
  return (
    <div className={`field ${error ? 'field-error' : ''}`}>
      <label htmlFor={id}>
        {label} {required ? <span className="req" aria-hidden="true">*</span> : <span className="muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutForm({ cart, totalQuantity, totalAmount, onBackToCart, onBackToMenu, onClearCart }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [whatsappUrl, setWhatsappUrl] = useState(null);
  const [reference, setReference] = useState(null);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const openWhatsApp = (url) => {
    // Called directly from a click handler so browsers don't block it.
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) window.location.href = url; // popup blocked / some mobile browsers
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateCheckout(cart, form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstField = ['name', 'phone', 'address', 'city', 'landmark'].find((k) => found[k]);
      if (firstField) document.getElementById(firstField)?.focus();
      return;
    }
    const ref = reference || generateOrderReference();
    const message = buildOrderMessage({ cart, customer: form, reference: ref });
    const url = buildWhatsAppUrl(message);
    setReference(ref);
    setWhatsappUrl(url);
    openWhatsApp(url); // cart is intentionally NOT cleared here
  };

  if (cart.length === 0 && !whatsappUrl) {
    return (
      <section className="panel empty">
        <h2>Your cart is empty</h2>
        <p>Add items before checking out.</p>
        <button className="btn btn-primary" onClick={onBackToMenu}>
          Back to Menu
        </button>
      </section>
    );
  }

  return (
    <section className="panel" aria-label="Checkout">
      <button className="link-back" onClick={onBackToCart}>
        <ArrowLeft size={18} /> Back to Cart
      </button>
      <h2 className="panel-title">Checkout</h2>

      {whatsappUrl && (
        <div className="notice notice-success" role="status">
          <CheckCircle2 size={22} />
          <div>
            <strong>Order ready · Ref {reference}</strong>
            <p>WhatsApp should have opened with your order. Please press <b>Send</b> there to submit it.</p>
            <div className="notice-actions">
              <button className="btn btn-primary btn-sm" onClick={() => openWhatsApp(whatsappUrl)}>
                <MessageCircle size={16} /> Open WhatsApp again
              </button>
              <button className="btn btn-outline btn-sm" onClick={onBackToMenu}>
                Back to Menu / Edit Order
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => { onClearCart(); onBackToMenu(); }}>
                I've sent it – clear cart
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} noValidate className="form">
          <h3>Delivery details</h3>

          <Field label="Full name" id="name" error={errors.name} required>
            <input id="name" name="name" value={form.name} onChange={update} autoComplete="name" placeholder="Your full name" />
          </Field>

          <Field label="Mobile number" id="phone" error={errors.phone} required>
            <input id="phone" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={update} autoComplete="tel" placeholder="e.g. 98765 43210" />
          </Field>

          <Field label="Delivery address" id="address" error={errors.address} required>
            <textarea id="address" name="address" rows={5} value={form.address} onChange={update} autoComplete="street-address" placeholder="House / flat no., building, street, area" />
          </Field>

          <div className="two-col">
            <Field label="City or town" id="city" error={errors.city} required>
              <input id="city" name="city" value={form.city} onChange={update} autoComplete="address-level2" placeholder="City or town" />
            </Field>
            <Field label="Landmark" id="landmark" error={errors.landmark} required>
              <input id="landmark" name="landmark" value={form.landmark} onChange={update} placeholder="Near..." />
            </Field>
          </div>

          <Field label="Additional delivery instructions" id="instructions">
            <textarea id="instructions" name="instructions" rows={2} value={form.instructions} onChange={update} placeholder="e.g. Call on arrival" />
          </Field>

          <Field label="Order notes" id="notes">
            <textarea id="notes" name="notes" rows={2} value={form.notes} onChange={update} placeholder="e.g. Less spicy, no onions" />
          </Field>

          {errors.cart && <p className="error-text" role="alert">{errors.cart}</p>}

          <p className="hint">
            <Info size={16} /> Your order will open in WhatsApp. Please press Send to submit it.
          </p>

          <button type="submit" className="btn btn-whatsapp btn-block">
            <MessageCircle size={20} /> Order on WhatsApp
          </button>
        </form>

        <aside className="summary" aria-label="Order summary">
          <h3>Order summary</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <span className="muted">
                    {item.quantity} × {formatPrice(item.price)}
                  </span>
                </div>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="totals">
            <div className="row">
              <span>Total items</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="row row-total">
              <span>Total</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
          </div>
          <p className="muted small">Payment is arranged directly with the restaurant. No online payment.</p>
        </aside>
      </div>
    </section>
  );
}
