import React from 'react';

import './App.css';

import Router from './Router';
import { Provider } from 'react-redux';
import store from './store';



function App() {
  return (
    
    <Provider store={store}>
    <main className="container">
      <Router/>

    </main>
  </Provider>
  );
}

export default App;
