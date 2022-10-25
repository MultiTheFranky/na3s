import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import {Navigation} from './navigation';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Navigation />
  </React.StrictMode>,
);
