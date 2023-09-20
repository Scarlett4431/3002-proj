import NavbarMenu from "./components/MenuBar/NavbarMenu";
import BoardCollection from "./components/BoardCollection/BoardCollection";
import Board from "./components/Board/Board";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import { Provider } from "react-redux";
import configureStore from "./configureStore";

// create redux store
const store = configureStore();

export default function App() {

  return (
    <Provider store={store}>
      <h1 align='center'>{"isAuth: " + store.getState().auth.isAuthenticated}</h1>
      <h1 align='center'>{"isLoad: " + store.getState().auth.isLoading}</h1>
      <BrowserRouter>
        <NavbarMenu
            isAuthenticated={store.getState().auth.isAuthenticated}
            isLoading={store.getState().auth.isLoading}
          />
        <Routes>
          <Route
              exact path="/"
              element={
                <ProtectedRoute 
                  isAuthenticated={store.getState().auth.isAuthenticated}
                  isLoading={store.getState().auth.isLoading}
                  element={BoardCollection}
                />
              }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/board/:id"
            component={Board}
            isAuthenticated={store.getState().auth.isAuthenticated}
            isLoading={store.getState().auth.isLoading}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
