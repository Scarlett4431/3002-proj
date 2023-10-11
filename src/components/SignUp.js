
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";

import { HiLockClosed } from "react-icons/hi";

import { registerUser } from "../actions/";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignUp(){

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  // get the content of the textbox
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  // save for future page redirections
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(registerUser(state.email, state.password, state.displayName, navigate, "/signin"));
  };

  const signUp = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div class="w-full justify-center max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <HiLockClosed className="h-10 w-10 flex" />
      <h3 class="text-2xl font-medium text-gray-900 dark:text-white my-3">
          Sign up
        </h3>
        <form onSubmit={handleSignUp} noValidate>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display Name"
                name="displayName"
                autoComplete="nickname"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
          {/* Display error message, saved for future */}
          <div style={{ margin: "10px" }} />
          <div style={{ marginTop: '10px', marginBottom: '5px',color: 'red', textAlign: 'center' }}>{auth.registerErrorMessage}</div>
          <Button type="submit" class="my-3 w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link Link  to="/signin" component={NavLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

  return signUp;
}