import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { HiOutlineLockClosed } from "react-icons/hi";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import { loginUser } from "../actions";


export default function SignIn(){
  
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
      <div>
        <Avatar>
          <HiOutlineLockClosed />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSignIn} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
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
          <Button type="submit" fullWidths variant="contained" color="primary">
            Sign In
          </Button>
          <Grid container>
            {/* Forget Password function, save for future development */}
            {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
            <Grid item>
              <Link variant="body2" to="/signup" component={NavLink}>
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
