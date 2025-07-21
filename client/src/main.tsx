// main.tsx or main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {HeroUIProvider} from '@heroui/react'
import App from './App'
import './index.css'
import { NextUIProvider } from '@nextui-org/system'

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    
    <HeroUIProvider>

   <NextUIProvider>   
      <App />
   </NextUIProvider>
    </HeroUIProvider>
  </React.StrictMode>,
  );
}