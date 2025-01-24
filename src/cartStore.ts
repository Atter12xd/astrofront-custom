import { atom, computed } from "nanostores";
import Cookies from "js-cookie";

// Tipo para los elementos del carrito
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Atom para mantener el estado del carrito
export const cart = atom<CartItem[]>([]);

// Computed store para calcular la cantidad total en el carrito
export const totalQuantity = computed(cart, (c) =>
  c.reduce((total, item) => total + item.quantity, 0)
);

// Atom para gestionar el estado de la vista del carrito (tarjeta o lista)
export const layoutView = atom<"card" | "list">("card");

// Función para cambiar la vista del carrito
export function setLayoutView(view: "card" | "list") {
  layoutView.set(view);
}

// Función para obtener la vista actual
export function getLayoutView() {
  return layoutView.get();
}

// Función para agregar un producto al carrito
export function addItemToCart(item: CartItem) {
  const currentCart = cart.get();
  const existingItem = currentCart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    // Si el producto ya está en el carrito, incrementa la cantidad
    existingItem.quantity += item.quantity;
  } else {
    // Si no está, agrégalo al carrito
    currentCart.push(item);
  }

  cart.set(currentCart);
  Cookies.set("cart", JSON.stringify(currentCart)); // Guarda el carrito en cookies
}

// Función para eliminar un producto del carrito
export function removeItemFromCart(itemId: string) {
  const currentCart = cart.get();
  const updatedCart = currentCart.filter((cartItem) => cartItem.id !== itemId);

  cart.set(updatedCart);
  Cookies.set("cart", JSON.stringify(updatedCart)); // Actualiza las cookies
}

// Función para actualizar la cantidad de un producto en el carrito
export function updateCartItemQuantity(itemId: string, quantity: number) {
  const currentCart = cart.get();
  const item = currentCart.find((cartItem) => cartItem.id === itemId);

  if (item) {
    item.quantity = quantity > 0 ? quantity : 0; // Evita cantidades negativas
  }

  cart.set(currentCart);
  Cookies.set("cart", JSON.stringify(currentCart)); // Actualiza las cookies
}

// Función para refrescar el estado del carrito (se usa en otras partes del proyecto)
export function refreshCartState() {
  const storedCart = Cookies.get("cart");
  if (storedCart) {
    cart.set(JSON.parse(storedCart)); // Recarga el carrito desde las cookies
  } else {
    cart.set([]); // Si no hay datos en las cookies, deja el carrito vacío
  }
}

// Cargar el carrito desde las cookies al inicializar
export function initializeCart() {
  const storedCart = Cookies.get("cart");
  if (storedCart) {
    cart.set(JSON.parse(storedCart));
  }
}
