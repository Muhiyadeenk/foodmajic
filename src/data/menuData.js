// ============================================================
// SAMPLE DATA - edit freely. Replace image URLs with your own.
// ============================================================

export const RESTAURANT = {
  name: 'FOOD MAGIC',
  tagline: 'Fresh. Hot. Delivered.',
  whatsappNumber: '97479947772', // digits only, with country code
  phone: '+974 7994 7772',
  email: 'hello@foodmagic.example',
  address: '12 Market Street, Your City',
  hours: 'Open daily 8:00 AM - 11:00 PM',
};

// Top banner - replace the image URL and texts as you like.
export const BANNER = {
  image: '/images/banner.jpg',
  offer: 'Free delivery on orders above ₹499',
  title: 'Hungry? Order in minutes.',
  subtitle: 'Burgers, pizza, biriyani and more, freshly made and delivered hot.',
  perk1: 'Ready in 30-40 min',
  perk2: 'Home delivery',
};

export const CATEGORIES = ['Burgers', 'Pizza', 'Biriyani', 'Snacks', 'Drinks'];

// Photos live in /public/images. To change one, replace the file
// or point `image` to any other URL.
const img = (file) => `/images/${file}`;

export const MENU_ITEMS = [
  // Burgers
  { id: 'b1', name: 'Classic Chicken Burger', description: 'Crispy chicken patty, lettuce, tomato and house mayo.', price: 149, image: img('b1.jpg'), category: 'Burgers', available: true },
  { id: 'b2', name: 'Double Cheese Burger', description: 'Two juicy patties with melted cheddar and pickles.', price: 219, image: img('b2.jpg'), category: 'Burgers', available: true },
  { id: 'b3', name: 'Spicy Paneer Burger', description: 'Masala-coated paneer, onions and peri-peri sauce.', price: 169, image: img('b3.jpg'), category: 'Burgers', available: true },

  // Pizza
  { id: 'p1', name: 'Margherita Pizza', description: 'Tomato sauce, mozzarella and fresh basil.', price: 249, image: img('p1.jpg'), category: 'Pizza', available: true },
  { id: 'p2', name: 'Pepperoni Feast', description: 'Loaded with pepperoni and extra mozzarella.', price: 349, image: img('p2.jpg'), category: 'Pizza', available: true },
  { id: 'p3', name: 'Veggie Supreme', description: 'Capsicum, olives, mushrooms, corn and onions.', price: 299, image: img('p3.jpg'), category: 'Pizza', available: true },

  // Biriyani
  { id: 'r1', name: 'Chicken Dum Biriyani', description: 'Slow-cooked basmati rice with tender spiced chicken.', price: 220, image: img('r1.jpg'), category: 'Biriyani', available: true },
  { id: 'r2', name: 'Mutton Biriyani', description: 'Aromatic rice layered with juicy mutton pieces.', price: 320, image: img('r2.jpg'), category: 'Biriyani', available: true },
  { id: 'r3', name: 'Veg Biriyani', description: 'Fragrant rice with seasonal vegetables and raita.', price: 160, image: img('r3.jpg'), category: 'Biriyani', available: true },

  // Snacks
  { id: 's1', name: 'Crispy French Fries', description: 'Golden fries with a pinch of peri-peri seasoning.', price: 99, image: img('s1.jpg'), category: 'Snacks', available: true },
  { id: 's2', name: 'Chicken Nuggets (8 pcs)', description: 'Crunchy nuggets served with garlic dip.', price: 149, image: img('s2.jpg'), category: 'Snacks', available: true },
  { id: 's3', name: 'Veg Samosa (4 pcs)', description: 'Flaky pastry stuffed with spiced potato and peas.', price: 60, image: img('s3.jpg'), category: 'Snacks', available: true },

  // Drinks
  { id: 'd1', name: 'Fresh Lime Soda', description: 'Chilled lime soda, sweet or salted.', price: 49, image: img('d1.jpg'), category: 'Drinks', available: true },
  { id: 'd2', name: 'Mango Lassi', description: 'Thick and creamy yogurt drink with ripe mango.', price: 89, image: img('d2.jpg'), category: 'Drinks', available: true },
  { id: 'd3', name: 'Cold Coffee', description: 'Iced coffee blended with milk and ice cream.', price: 119, image: img('d3.jpg'), category: 'Drinks', available: true },
];
