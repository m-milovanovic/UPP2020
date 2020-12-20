import { Switch, Route } from 'react-router-dom';
import './App.css';
import ActivateUser from './components/ActivateUser';
import RegisterReaderForm from './components/RegisterReaderForm';
import RegisterWriterForm from './components/RegisterWriterForm';
import TaskForm from './components/TaskForm';
import UserTasks from './components/UserTasks';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={RegisterReaderForm} />
      <Route path='/login' component={() => <div>LOGIN</div>} />
      <Route path='/activate/:id?' component={ActivateUser} />
      <Route path='/register/writer' component={RegisterWriterForm} />
      <Route path='/user/tasks/:id' component={TaskForm} />
      <Route path='/user/tasks' component={UserTasks} />
    </Switch>
  );
}

export default App;
