import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import App from './App';
import './index.css';
import { NextUIProvider } from '@nextui-org/system';
import Loader from './components/Loader';

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load (adjust time or replace with API call)
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <HeroUIProvider>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </HeroUIProvider>
    </>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}