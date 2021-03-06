/* eslint-disable no-debugger */
import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Habits from './screens/Habits';
import { HOME_URL, LOGIN_URL, SIGNUP_URL, HABITS_URL, WHITE } from './config';
import { HabitProvider } from './contexts/HabitContext';
import Habit from './screens/Habit';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { loggedInUser } = useContext(AuthContext);

  let routes = (
    <Switch>
      <Redirect exact from={HOME_URL} to={LOGIN_URL} />
      <Route path={LOGIN_URL} component={Login} />
      <Route path={SIGNUP_URL} component={SignUp} />
    </Switch>
  );

  if (loggedInUser !== '') {
    routes = (
      <Switch>
        <Route path={HOME_URL} component={Home} exact />
        <Route path={HABITS_URL} component={Habits} />
        <Route path="/habit/:habitId" component={Habit} />
        <Redirect to={HOME_URL} />
      </Switch>
    );
  }

  return (
    <HabitProvider>
      <CssBaseline />
      <Typography
        component="div"
        style={{
          backgroundColor: '#fff',
          height: '10vh',
        }}
      >
        <Header />
      </Typography>

      <Typography
        component="div"
        style={{
          backgroundColor: `${WHITE}`,
          height: '90vh',
        }}
      >
        {routes}
      </Typography>
    </HabitProvider>
  );
}

export default withRouter(App);
