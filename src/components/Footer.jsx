import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { RESTAURANT } from '../data/menuData.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h4>{RESTAURANT.name}</h4>
          <p>{RESTAURANT.tagline}</p>
        </div>
        <ul>
          <li><Phone size={16} /> <a href={`tel:+${RESTAURANT.whatsappNumber}`}>{RESTAURANT.phone}</a></li>
          <li><Mail size={16} /> <a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a></li>
          <li><MapPin size={16} /> {RESTAURANT.address}</li>
          <li><Clock size={16} /> {RESTAURANT.hours}</li>
        </ul>
      </div>
      <p className="copyright">© {new Date().getFullYear()} {RESTAURANT.name}. All rights reserved.</p>
    </footer>
  );
}
