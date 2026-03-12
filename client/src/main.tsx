import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import App from './App';
import './index.css';
import { NextUIProvider } from '@nextui-org/system';

const Root = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <HeroUIProvider>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </HeroUIProvider>
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