import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import MenuGrid from './components/MenuGrid.jsx';
import Cart from './components/Cart.jsx';
import CheckoutForm from './components/CheckoutForm.jsx';
import Banner from './components/Banner.jsx';
import Footer from './components/Footer.jsx';
import FloatingCartButton from './components/FloatingCartButton.jsx';
import { CATEGORIES, MENU_ITEMS } from './data/menuData.js';
import { MAX_QTY, getTotalQuantity, getTotalAmount } from './utils/whatsapp.js';

const CART_KEY = 'food-magic-cart-v1';

// Read the saved cart and re-validate it against the current menu,
// so removed / unavailable items or bad quantities never survive a refresh.
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(saved)) return [];
    return saved
      .map((s) => {
        const menuItem = MENU_ITEMS.find((m) => m.id === s.id);
        const quantity = Math.min(MAX_QTY, Math.floor(Number(s.quantity)));
        if (!menuItem || !menuItem.available || !(quantity >= 1)) return null;
        return { id: menuItem.id, name: menuItem.name, price: menuItem.price, image: menuItem.image, quantity };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

export default function App() {
  const [cart, setCart] = useState(loadCart);
  const [view, setView] = useState('menu'); // 'menu' | 'cart' | 'checkout'
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable - cart still works in memory */
    }
  }, [cart]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  const totalQuantity = getTotalQuantity(cart);
  const totalAmount = getTotalAmount(cart);

  const addToCart = (item) => {
    if (!item.available) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: Math.min(MAX_QTY, c.quantity + 1) } : c));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 }];
    });
  };

  const changeQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: Math.min(MAX_QTY, c.quantity + delta) } : c))
        .filter((c) => c.quantity >= 1)
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));
  const clearCart = () => setCart([]);

  const visibleItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MENU_ITEMS.filter(
      (i) => (category === 'All' || i.category === category) && (!q || i.name.toLowerCase().includes(q))
    );
  }, [search, category]);

  const quantityById = useMemo(() => Object.fromEntries(cart.map((c) => [c.id, c.quantity])), [cart]);

  return (
    <div className="app">
      <Header cartCount={totalQuantity} onCartClick={() => setView('cart')} onLogoClick={() => setView('menu')} />

      <main className="container main">
        {view === 'menu' && (
          <>
            <Banner onOrderClick={() => document.getElementById('menu-start')?.scrollIntoView({ behavior: 'smooth' })} />
            <div id="menu-start" className="menu-anchor" />
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter categories={['All', ...CATEGORIES]} active={category} onChange={setCategory} />
            <MenuGrid
              items={visibleItems}
              quantityById={quantityById}
              onAdd={addToCart}
              onReset={() => {
                setSearch('');
                setCategory('All');
              }}
            />
          </>
        )}

        {view === 'cart' && (
          <Cart
            cart={cart}
            totalQuantity={totalQuantity}
            totalAmount={totalAmount}
            onIncrease={(id) => changeQuantity(id, 1)}
            onDecrease={(id) => changeQuantity(id, -1)}
            onRemove={removeFromCart}
            onContinue={() => setView('menu')}
            onCheckout={() => setView('checkout')}
          />
        )}

        {view === 'checkout' && (
          <CheckoutForm
            cart={cart}
            totalQuantity={totalQuantity}
            totalAmount={totalAmount}
            onBackToCart={() => setView('cart')}
            onBackToMenu={() => setView('menu')}
            onClearCart={clearCart}
          />
        )}
      </main>

      {view === 'menu' && totalQuantity > 0 && (
        <FloatingCartButton count={totalQuantity} total={totalAmount} onClick={() => setView('cart')} />
      )}

      <Footer />
    </div>
  );
}
