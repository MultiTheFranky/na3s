import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Navigation } from './navigation';
import { WSProvider } from './context/webSocket';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <WSProvider>
    <Navigation />
  </WSProvider>
);
