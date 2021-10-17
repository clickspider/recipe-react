import { Route, Switch } from 'react-router-dom';

import HeaderLayout from './components/layout/HeaderLayout';
import MainLayout from './components/layout/MainLayout';
import MainNavigation from './components/layout/MainNavigation';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

import './App.css';

function App() {

  return <>
    <HeaderLayout>
      <MainNavigation />
    </HeaderLayout>
    <MainLayout>
      <Switch>
        <Route exact path='/' component={Home} />

        <Route path='/login' component={Login} />

        <Route path='/register' component={Register} />
      </Switch>
    </MainLayout>
  </>
}

export default App;
