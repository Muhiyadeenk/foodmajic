import { useState } from 'react';
import { Plus } from 'lucide-react';
import { formatPrice } from '../utils/currency.js';

const CATEGORY_EMOJI = { Burgers: '🍔', Pizza: '🍕', Biriyani: '🍛', Snacks: '🍟', Drinks: '🥤' };

export default function MenuCard({ item, inCartQty, onAdd }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className={`card ${item.available ? '' : 'card-unavailable'}`}>
      <div className="card-img">
        {imgFailed ? (
          <div className="img-fallback" aria-hidden="true">{CATEGORY_EMOJI[item.category] || '🍽️'}</div>
        ) : (
          <img src={item.image} alt={item.name} loading="lazy" onError={() => setImgFailed(true)} />
        )}
        {!item.available && <span className="tag-soldout">Sold out</span>}
        {inCartQty > 0 && <span className="tag-incart">{inCartQty} in cart</span>}
      </div>

      <div className="card-body">
        <h3>{item.name}</h3>
        <p className="card-desc">{item.description}</p>
        <div className="card-foot">
          <span className="price">{formatPrice(item.price)}</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onAdd(item)}
            disabled={!item.available}
            aria-label={`Add ${item.name} to cart`}
          >
            {item.available ? (
              <>
                <Plus size={16} /> Add to Cart
              </>
            ) : (
              'Unavailable'
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
