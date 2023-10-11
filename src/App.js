import NavbarMenu from "./components/MenuBar/NavbarMenu";
import BoardCollection from "./components/BoardCollection/BoardCollection";
import GuidedTour from "./components/BoardCollection/BoardTour";
import ProtectedBoard from "./components/Board/Board";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import configureStore from "./configureStore";

// create redux store
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <div
        className="absolute top-0 left-0 w-full h-96 
          bg-gradient-to-br from-pink-400 to-[#0055D1] 
          rounded-md filter blur-3xl opacity-50 -z-50"
      />
        <GuidedTour /> {/* Include the GuidedTour component */}
        <NavbarMenu/>
        <Routes>
          <Route exact path="/" element={<BoardCollection />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/board/:id" element={<ProtectedBoard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}