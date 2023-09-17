import NavbarMenu from "./components/MenuBar/NavbarMenu";
import BoardCollection from "./components/BoardCollection/BoardCollection";
import Board from "./components/Board/Board";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    // <Router>
    //   <NavbarMenu />
    //   <Switch>
    //     <ProtectedRoute
    //       exact
    //       path="/"
    //       component={BoardCollection}
    //       isAuthenticated={true}
    //       isLoading={true}
    //     />
    //     <Route path="/signin" component={SignIn} />
    //     <Route path="/signup" component={SignUp} />
    //     <Route
    //       path="/board/:id"
    //       component={Board}
    //       //  isAuthenticated={isAuthenticated} isLoading={isLoading}
    //     />
    //   </Switch>
    // </Router>
    <Board></Board>
  );
}
