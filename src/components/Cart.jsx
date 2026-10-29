import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { formatPrice } from '../utils/currency.js';
import { MAX_QTY } from '../utils/whatsapp.js';

export default function Cart({
  cart,
  totalQuantity,
  totalAmount,
  onIncrease,
  onDecrease,
  onRemove,
  onContinue,
  onCheckout,
}) {
  if (cart.length === 0) {
    return (
      <section className="panel empty">
        <ShoppingBag size={44} />
        <h2>Your cart is empty</h2>
        <p>Add some delicious food from the menu.</p>
        <button className="btn btn-primary" onClick={onContinue}>
          Continue Shopping
        </button>
      </section>
    );
  }

  return (
    <section className="panel" aria-label="Shopping cart">
      <button className="link-back" onClick={onContinue}>
        <ArrowLeft size={18} /> Continue Shopping
      </button>
      <h2 className="panel-title">Your Cart</h2>

      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt="" className="cart-thumb" onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p className="muted">{formatPrice(item.price)} each</p>
              <div className="qty">
                <button onClick={() => onDecrease(item.id)} aria-label={`Decrease quantity of ${item.name}`}>
                  <Minus size={16} />
                </button>
                <span aria-live="polite" aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span>
                <button
                  onClick={() => onIncrease(item.id)}
                  disabled={item.quantity >= MAX_QTY}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="cart-right">
              <strong>{formatPrice(item.price * item.quantity)}</strong>
              <button className="icon-btn danger" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="totals">
        <div className="row">
          <span>Total items</span>
          <span>{totalQuantity}</span>
        </div>
        <div className="row row-total">
          <span>Order total</span>
          <span>{formatPrice(totalAmount)}</span>
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-outline" onClick={onContinue}>
          Continue Shopping
        </button>
        <button className="btn btn-primary" onClick={onCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
}
