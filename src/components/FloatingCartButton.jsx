import { ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/currency.js';

export default function FloatingCartButton({ count, total, onClick }) {
  return (
    <button className="fab" onClick={onClick} aria-label={`View cart, ${count} items, ${formatPrice(total)}`}>
      <span className="fab-left">
        <ShoppingBag size={20} />
        <span className="fab-count">{count}</span>
        <span className="fab-label">{count === 1 ? 'item' : 'items'}</span>
      </span>
      <span className="fab-right">View Cart · {formatPrice(total)}</span>
    </button>
  );
}
