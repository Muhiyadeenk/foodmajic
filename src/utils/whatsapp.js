import { RESTAURANT } from '../data/menuData.js';
import { formatPrice } from './currency.js';

export const MAX_QTY = 20;

export function getTotalQuantity(cart) {
  return cart.reduce((sum, i) => sum + i.quantity, 0);
}

export function getTotalAmount(cart) {
  return cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function isValidQuantity(q) {
  return Number.isInteger(q) && q >= 1 && q <= MAX_QTY;
}

// Short unique reference, e.g. FM-K3J9X2
export function generateOrderReference() {
  const stamp = Date.now().toString(36).slice(-4).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 4).toUpperCase();
  return `FM-${stamp}${rand}`;
}

export function buildOrderMessage({ cart, customer, reference }) {
  const clean = (v) => (v && String(v).trim()) || '';
  const instructions = [clean(customer.instructions), clean(customer.notes) && `Notes: ${clean(customer.notes)}`]
    .filter(Boolean)
    .join(' | ');

  const items = cart
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} x ${item.quantity}\n` +
        `   Unit Price: ${formatPrice(item.price)}\n` +
        `   Subtotal: ${formatPrice(item.price * item.quantity)}`
    )
    .join('\n\n');

  return [
    'NEW FOOD ORDER',
    '',
    `Order Reference: ${reference}`,
    '',
    'CUSTOMER DETAILS',
    `Name: ${clean(customer.name)}`,
    `Phone: ${clean(customer.phone)}`,
    '',
    'DELIVERY ADDRESS',
    `Address: ${clean(customer.address)}`,
    `City/Town: ${clean(customer.city)}`,
    `Landmark: ${clean(customer.landmark)}`,
    `Instructions: ${instructions || 'None'}`,
    '',
    'ORDER ITEMS',
    '',
    items,
    '',
    'ORDER TOTAL',
    `Total Items: ${getTotalQuantity(cart)}`,
    `Total Amount: ${formatPrice(getTotalAmount(cart))}`,
    '',
    'Please confirm the order and delivery availability.',
  ].join('\n');
}

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${RESTAURANT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function validateCheckout(cart, form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your full name.';
  const digits = form.phone.replace(/\D/g, '');
  if (!form.phone.trim()) errors.phone = 'Please enter your mobile number.';
  else if (digits.length < 7 || digits.length > 15) errors.phone = 'Enter a valid mobile number.';
  if (!form.address.trim()) errors.address = 'Please enter your delivery address.';
  if (!form.city.trim()) errors.city = 'Please enter your city or town.';
  if (!form.landmark.trim()) errors.landmark = 'Please enter a landmark.';
  if (cart.length === 0) errors.cart = 'Your cart is empty.';
  else if (cart.some((i) => !isValidQuantity(i.quantity))) errors.cart = 'One or more quantities are invalid.';
  return errors;
}
