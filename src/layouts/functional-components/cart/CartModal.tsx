import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CloseCart from "./CloseCart";
import DeleteItemButton from "./DeleteItemButton";
import EditItemQuantityButton from "./EditItemQuantityButton";
import LoadingDots from "../loadings/LoadingDots";

// Estado inicial del carrito
const initialCart = {
  items: [],
  total: 0,
  tax: 0,
  shipping: 0,
};

const CartModal: React.FC = () => {
  const [cart, setCart] = useState(initialCart);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Simula la inicialización del carrito
  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "null");
        if (storedCart) {
          setCart(storedCart);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  // Handlers para abrir y cerrar el carrito
  const openCart = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Evitar el scroll al abrir el carrito
  };

  const closeCart = () => {
    setIsOpen(false);
    document.body.style.overflow = ""; // Restaurar el scroll
  };

  // Actualiza el carrito en localStorage
  const updateCart = (updatedCart: any) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Funciones para manejar el carrito
  const removeItem = (id: string) => {
    const updatedItems = cart.items.filter((item: any) => item.id !== id);
    const updatedCart = { ...cart, items: updatedItems };
    updateCart(updatedCart);
  };

  const changeQuantity = (id: string, delta: number) => {
    const updatedItems = cart.items.map((item: any) =>
      item.id === id ? { ...item, quantity: item.quantity + delta } : item
    );
    const updatedCart = { ...cart, items: updatedItems };
    updateCart(updatedCart);
  };

  if (loading) return <LoadingDots className="bg-black dark:bg-white" />;
  if (!cart.items.length) {
    return (
      <div>
        <div
          className="cursor-pointer"
          aria-label="Open cart"
          onClick={openCart}
        >
          <FaShoppingCart size={24} />
        </div>
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
            isOpen ? "block" : "hidden"
          }`}
          onClick={closeCart}
        ></div>
        <div
          className={`fixed inset-y-0 right-0 z-50 w-full md:w-[390px] transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col border-l bg-white p-6 dark:bg-darkmode-body">
            <p className="text-lg font-semibold">Oops. Your Cart Is Empty.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="cursor-pointer"
        aria-label="Open cart"
        onClick={openCart}
      >
        <FaShoppingCart size={24} />
        <span>{cart.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={closeCart}
      ></div>

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-[390px] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col border-l bg-white p-6 dark:bg-darkmode-body">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Your Cart</p>
            <button aria-label="Close cart" onClick={closeCart}>
              <CloseCart />
            </button>
          </div>

          <ul className="py-4">
            {cart.items.map((item: any) => (
              <li
                key={item.id}
                className="flex justify-between border-b py-4"
              >
                <div className="flex">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => changeQuantity(item.id, -1)}
                    className="px-2"
                  >
                    -
                  </button>
                  <button
                    onClick={() => changeQuantity(item.id, 1)}
                    className="px-2"
                  >
                    +
                  </button>
                  <DeleteItemButton
                    onClick={() => removeItem(item.id)}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <button className="w-full bg-blue-500 text-white p-3 rounded-md">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;