import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Synchronously detect extension or demo context before render
// so that Chrome accurately dimensions the popup viewport at 380x560px immediately
const isExtensionEnv = typeof window !== 'undefined' && 
  (!!(window.chrome && window.chrome.runtime && window.chrome.runtime.id) || 
   !!((window as any).browser && (window as any).browser.runtime && (window as any).browser.runtime.id) ||
   new URLSearchParams(window.location.search).get('demo') === '1' ||
   new URLSearchParams(window.location.search).get('url') !== null);

if (isExtensionEnv) {
  document.documentElement.classList.add('is-extension');
  document.body.classList.add('is-extension');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
