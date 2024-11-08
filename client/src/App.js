import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './config/routes';
import AuthProvider from './providers/AuthProvider';

import './App.scss';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <route.layout>
                  <route.component />
                </route.layout>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
