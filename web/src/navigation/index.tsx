import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Auth from 'src/screens/Auth';
import Main from 'src/screens/Main';

/**
 *
 * @returns {React.FC}
 */
export const Navigation: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/home" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};
