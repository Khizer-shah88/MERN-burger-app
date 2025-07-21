import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './pages/LandingPage'; // Adjusted to match your import
import Checkout from './pages/Checkout';
import DealsPage from './pages/Deals'; // Already included as per your code
import AdminPanel from './pages/AdminPanel'; // Added for admin functionality
import OrderConfirmation from './pages/OrderConfirmation'; // Added for order confirmation
import { CartProvider } from '@/context/Context';
import SmoothScroll from './components/SmoothScroll'; // Assuming you have a SmoothScroll component

function App() {
  return (

    <>
     <SmoothScroll /> {/* Assuming SmoothScroll is a component for smooth scrolling */}
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/admin" element={<AdminPanel />} /> {/* Added admin route */}
          <Route path="/order-confirmation" element={<OrderConfirmation />} /> {/* Added confirmation route */}
          <Route path="*" element={<Navigate to="/" replace />} /> {/* Catch-all redirect */}
        </Routes>
      </Router>
    </CartProvider>
    
    </>
  );
}

export default App;

