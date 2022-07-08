import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './index.css';

import App from './App';
import Log from './Log';
import Character  from './Character';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="log" element={<Log />} />
          <Route path="char" element={<Character />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
