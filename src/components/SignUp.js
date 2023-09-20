import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { HiOutlineLockClosed } from "react-icons/hi";

import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";

// const SignUp = ({ auth, history }) => {

const SignUp = ({ auth, history }) => {
  const redirect = <Navigate to="/" />;

  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    toFrontpage: false,
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
    setState({ toFrontpage: true });
  };

  const signUp = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar>
          <HiOutlineLockClosed />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSignUp} noValidate>
          <Grid container spacing={2}>
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
          {/* <div style={{ marginTop: '10px', color: 'red', textAlign: 'center' }}>{"Error Message"}</div> */}
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link Link variant="body2" to="/signin" component={NavLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
  if (state.toFrontpage) {
    return redirect;
  } else {
    return signUp;
  }
}

function mapStateToProps(state) {
  return {
      auth: state.auth
  };
}

export default connect(mapStateToProps)(SignUp);