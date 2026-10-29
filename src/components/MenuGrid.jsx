import MenuCard from './MenuCard.jsx';
import { SearchX } from 'lucide-react';

export default function MenuGrid({ items, quantityById, onAdd, onReset }) {
  if (items.length === 0) {
    return (
      <div className="empty">
        <SearchX size={40} />
        <h2>No items found</h2>
        <p>Try a different search or category.</p>
        <button className="btn btn-outline" onClick={onReset}>
          Show full menu
        </button>
      </div>
    );
  }

  return (
    <section className="grid" aria-label="Menu items">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} inCartQty={quantityById[item.id] || 0} onAdd={onAdd} />
      ))}
    </section>
  );
}
