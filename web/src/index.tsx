import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {ProSidebarProvider} from 'react-pro-sidebar';

import {WSProvider} from './context/webSocket';
import {Navigation} from './navigation';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <WSProvider>
    <ProSidebarProvider>
      <Navigation />
    </ProSidebarProvider>
  </WSProvider>,
);
