import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { HiLockClosed } from "react-icons/hi";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import { loginUser } from "../actions";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [state, setState] = useState({
    email: "",
    password: "",
    doRememberMe: false,
  });

  // get the content of the textbox
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  async function handleSignIn(e) {
    e.preventDefault();
    // for debugging, need to delete after test
    console.log("Email: ", state.email);
    console.log("Password: ", state.password);
    dispatch(loginUser(state.email, state.password, navigate, "/"));
    console.log("Wait happily");
  }

  // get the status of the remember-me chechbox
  const setRememberMe = (e) => {
    setState({
      ...state,
      doRememberMe: e.target.checked,
    });
  };

  const signIn = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div class="w-full justify-center max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <HiLockClosed className="h-10 w-10 flex" />
        <h3 class="text-2xl font-medium text-gray-900 dark:text-white my-3">
          Sign In
        </h3>
        <form onSubmit={handleSignIn} noValidate>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={setRememberMe}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            class="my-3 w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign In
          </Button>
          <div
            style={{
              marginTop: "5x",
              marginBottom: "5px",
              color: "red",
              textAlign: "center",
            }}
          >
            {auth.loginErrorMessage}
          </div>
          <Grid container justify="flex-end">
            {/* Forget Password function, save for future development */}
            {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
            <Grid item>
              <Link to="/signup" component={NavLink}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  return signIn;
}
