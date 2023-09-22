import NavbarMenu from "./components/MenuBar/NavbarMenu";
import BoardCollection from "./components/BoardCollection/BoardCollection";
import Board from "./components/Board/Board";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Provider } from "react-redux";
import configureStore from "./configureStore";

// create redux store
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Board/>
      {/* <BrowserRouter>
        <NavbarMenu />
        <Routes>
          <Route exact path="/" element={<BoardCollection />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/board/:id"
            component={Board}
            isAuthenticated={store.getState().auth.isAuthenticated}
            isLoading={store.getState().auth.isLoading}
          />
        </Routes>
      </BrowserRouter> */}
    </Provider>
  );
}
