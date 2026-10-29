import { MessageCircle, Clock, Bike } from 'lucide-react';
import { BANNER } from '../data/menuData.js';

export default function Banner({ onOrderClick }) {
  return (
    <section
      className="banner"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(20,12,6,0.82) 0%, rgba(20,12,6,0.45) 60%, rgba(20,12,6,0.15) 100%), url("${BANNER.image}")` }}
      aria-label="Welcome"
    >
      <div className="banner-content">
        <span className="banner-pill">{BANNER.offer}</span>
        <h1>{BANNER.title}</h1>
        <p>{BANNER.subtitle}</p>
        <ul className="banner-perks">
          <li><Clock size={16} /> {BANNER.perk1}</li>
          <li><Bike size={16} /> {BANNER.perk2}</li>
          <li><MessageCircle size={16} /> Order on WhatsApp</li>
        </ul>
        <button className="btn btn-primary" onClick={onOrderClick}>
          Order Now
        </button>
      </div>
    </section>
  );
}
