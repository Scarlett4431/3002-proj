import NavbarMenu from "./component/MenuBar/NavbarMenu";
import BoardCollection from "./component/BoardCollection/BoardCollection";
import Board from "./component/Board/Board";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <NavbarMenu />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={BoardCollection}
          isAuthenticated={true}
          isLoading={true}
        />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route
          path="/board/:id"
          component={Board}
          //  isAuthenticated={isAuthenticated} isLoading={isLoading}
        />
      </Switch>
    </Router>
  );
}
