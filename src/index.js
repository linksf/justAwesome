import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FirebaseProvider from "./context/FirebaseContext"
import UtilityProvider from "./context/FirebaseContext"
import BoardgameProvider from './context/BoardgameContext';
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UtilityProvider>
    <FirebaseProvider>
      <BoardgameProvider>
    <App />
    </BoardgameProvider>  
    </FirebaseProvider>
    </UtilityProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
