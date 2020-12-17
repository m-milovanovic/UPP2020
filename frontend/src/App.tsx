import { Switch, Route } from 'react-router-dom';
import './App.css';
import ActivateUser from './components/ActivateUser';
import RegisterReaderForm from './components/RegisterReaderForm';
import RegisterWriterForm from './components/RegisterWriterForm';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={RegisterReaderForm} />
      <Route path='/login' component={() => <div>LOGIN</div>} />
      <Route path='/activate/:id?' component={ActivateUser} />
      <Route path='/register/writer' component={RegisterWriterForm} />
    </Switch>
  );
}

export default App;
