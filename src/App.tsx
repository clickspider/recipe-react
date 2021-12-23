import { Route, Switch } from "react-router-dom";

import HeaderLayout from "./components/layout/HeaderLayout";
import MainLayout from "./components/layout/MainLayout";
import MainNavigation from "./components/layout/MainNavigation";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateRecipe from "./pages/CreateRecipe";
import { AuthProvider } from "./contexts/AuthContext";

import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <HeaderLayout>
          <MainNavigation />
        </HeaderLayout>
        <MainLayout>
          <Switch>
            <Route exact path="/" component={Home} />

            <Route path="/login" component={Login} />

            <Route path="/register" component={Register} />

            <Route path="/create" component={CreateRecipe} />
          </Switch>
        </MainLayout>
      </AuthProvider>
    </>
  );
}

export default App;
