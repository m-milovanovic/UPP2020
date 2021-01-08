import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import ActivateUser from "./components/ActivateUser";
import RegisterReaderForm from "./components/RegisterReaderForm";
import RegisterWriterForm from "./components/RegisterWriterForm";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";
import ActivationSent from "./components/ActivationSent";
import UserHome from "./components/UserHome";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import LocalStorageService from "./services/LocalStorageService";
import jwt_decode from "jwt-decode";
import PrivateRoute from "./components/PrivateRoute";
import Payment from "./components/Payment";
import AuthService from "./services/AuthService";

function App() {
  const history = useHistory();

  const [user, setUser] = useState(
    LocalStorageService.getJwt()
      ? jwt_decode(LocalStorageService.getJwt())
      : null
  );

  const handleLogout = () => {
    LocalStorageService.removeJwt();
    setUser(null);
    history.push("/login");
  };

  const getUserData = async () => {
    try {
      const userData = await AuthService.getUserData();
      setUser(userData);
    } catch (error) {}
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <Switch>
        <Route path="/login" component={() => <Login setUser={setUser} />} />
        <Route path="/register" exact component={RegisterReaderForm} />
        <Route path="/register/writer" component={RegisterWriterForm} />
        <Route path="/activate/:id?" component={ActivateUser} />
        <Route path="/activationSent" component={ActivationSent} />
        <PrivateRoute exact path="(|/user)" user={user}>
          <UserHome />
        </PrivateRoute>
        <PrivateRoute path="/user/tasks/:id" user={user}>
          <TaskForm />
        </PrivateRoute>
        <PrivateRoute path="/payment" user={user}>
          <Payment getUserData={getUserData} />
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default App;
