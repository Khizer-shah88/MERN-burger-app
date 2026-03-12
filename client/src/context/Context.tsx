import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";

interface Burger {
  _id: string;
  name: string;
  description: string;
  price: number; // In cents (e.g., 670 cents = $6.70)
  image: string;
  popular?: boolean;
  drink?: string;
  extraCheese?: boolean;
  quantity?: number;
  isDeal?: boolean;
}

interface CartContextType {
  cart: Burger[];
  addToCart: (item: Burger) => void;
  removeFromCart: (id: string, drink?: string, extraCheese?: boolean) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number, drink?: string, extraCheese?: boolean) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Burger[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((item: Burger) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (i) =>
          i._id === item._id &&
          i.drink === item.drink &&
          i.extraCheese === item.extraCheese
      );
      if (existingItem) {
        return prev.map((i) =>
          i._id === item._id &&
          i.drink === item.drink &&
          i.extraCheese === item.extraCheese
            ? { ...i, quantity: (i.quantity || 0) + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string, drink?: string, extraCheese?: boolean) => {
    setCart((prev) => {
      const itemToRemove = prev.find(
        (i) => i._id === id && i.drink === drink && i.extraCheese === extraCheese
      );
      if (itemToRemove) {
        if (itemToRemove.quantity && itemToRemove.quantity > 1) {
          return prev.map((i) =>
            i._id === id && i.drink === drink && i.extraCheese === extraCheese
              ? { ...i, quantity: (i.quantity ?? 1) - 1 }
              : i
          );
        }
        return prev.filter(
          (i) => !(i._id === id && i.drink === drink && i.extraCheese === extraCheese)
        );
      }
      return prev; // No change if item not found
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number, drink?: string, extraCheese?: boolean) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (i) => i._id === id && i.drink === drink && i.extraCheese === extraCheese
      );
      if (existingItem) {
        return prev.map((i) =>
          i._id === id && i.drink === drink && i.extraCheese === extraCheese
            ? { ...i, quantity: Math.max(1, quantity) }
            : i
        );
      }
      // If item doesn't exist, add it with the specified quantity
      if (quantity > 0) {
        const newItem = prev.find((i) => i._id === id);
        if (newItem) {
          return [
            ...prev,
            { ...newItem, quantity: Math.max(1, quantity), drink, extraCheese },
          ];
        }
      }
      return prev;
    });
  }, []);

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, clearCart, updateQuantity }),
    [cart, addToCart, removeFromCart, clearCart, updateQuantity]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};