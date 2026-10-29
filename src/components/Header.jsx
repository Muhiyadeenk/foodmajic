import { ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT } from '../data/menuData.js';

export default function Header({ cartCount, onCartClick, onLogoClick }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <button className="brand" onClick={onLogoClick} aria-label={`${RESTAURANT.name} - back to menu`}>
          <span className="brand-icon">
            <UtensilsCrossed size={20} />
          </span>
          <span className="brand-text">
            <span className="brand-name">{RESTAURANT.name}</span>
            <span className="brand-tag">{RESTAURANT.tagline}</span>
          </span>
        </button>

        <button className="cart-btn" onClick={onCartClick} aria-label={`Open cart, ${cartCount} items`}>
          <ShoppingBag size={22} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
