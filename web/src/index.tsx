import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import {WSProvider} from './context/webSocket';
import {Navigation} from './navigation';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <WSProvider>
    <Navigation />
  </WSProvider>,
);
