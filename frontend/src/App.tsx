import { Switch, Route } from 'react-router-dom';
import './App.css';
import ActivateUser from './components/ActivateUser';
import RegisterReaderForm from './components/RegisterReaderForm';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={RegisterReaderForm} />
      <Route path='/login' component={() => <div>LOGIN</div>} />
      <Route path='/activate-reader/:id?' component={ActivateUser} />
    </Switch>
  );
}

export default App;
