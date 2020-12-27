import { Switch, Route } from 'react-router-dom';
import './App.css';
import ActivateUser from './components/ActivateUser';
import RegisterReaderForm from './components/RegisterReaderForm';
import RegisterWriterForm from './components/RegisterWriterForm';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import ActivationSent from './components/ActivationSent';
import UserHome from './components/UserHome';
import Header from './components/Header';
import { useState } from 'react';
import LocalStorageService from './services/LocalStorageService';
import jwt_decode from 'jwt-decode';
import PrivateRoute from './components/PrivateRoute';
import Payment from './components/Payment';

function App() {
  const [user, setUser] = useState(
    LocalStorageService.getJwt() ? jwt_decode(LocalStorageService.getJwt()) : null
  );

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route path='/login' component={() => <Login setUser={setUser} />} />
        <Route path='/register' exact component={RegisterReaderForm} />
        <Route path='/register/writer' component={RegisterWriterForm} />
        <Route path='/activate/:id?' component={ActivateUser} />
        <Route path='/activationSent' component={ActivationSent} />
        <PrivateRoute exact path='(|/user)' user={user}>
          <UserHome />
        </PrivateRoute>
        <PrivateRoute path='/user/tasks/:id' user={user}>
          <TaskForm user={user}/>
        </PrivateRoute>
        <PrivateRoute path='/payment' user={user}>
          <Payment />
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default App;
