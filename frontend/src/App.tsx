import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import RegisterReaderForm from './components/RegisterReaderForm';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={RegisterReaderForm} />
      <Route path="/login" component={() => <div>LOGIN</div>} />
    </Switch>
  );
}

export default App;
