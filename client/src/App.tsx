import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CartProvider } from '@/context/Context';
import SmoothScroll from './components/SmoothScroll';
import Loader from './components/Loader';

const Landing = lazy(() => import('./pages/LandingPage'));
const Checkout = lazy(() => import('./pages/Checkout'));
const DealsPage = lazy(() => import('./pages/Deals'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));

function App() {
  return (
    <>
      <SmoothScroll />
      <CartProvider>
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;

