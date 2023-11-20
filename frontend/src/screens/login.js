import React, { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginAPICall } from "../connections";
// import { store } from "../app/store";
import { login } from "../app/store";
import { useDispatch } from "react-redux";

function LoginScreen(props) {
  const navigate = useNavigate();
  const [loginBoolean, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [heading, setHeading] = useState("Log In");
  const dispatch = useDispatch();
  const onClick = async (e) => {
    if (loginBoolean) {
      // call loginBoolean api
      const [res, jwt] = await loginAPICall(email, passwd);
      // console.log("RES in loginBoolean:",res);
      if (res) {
        // set jwt token
        dispatch(login(jwt));
        // set password
        setPasswd("");
        // reset email
        setEmail("");
        navigate("/dashboard");
      }
    } else {
      // call forgot password api
      // reset password
      setHeading("Log In");
    }
  };
  return (
    <>
      <Stack direction="row" height="100vh">
        <Box width="50%" bgcolor="#B0D9E7" height="100%">
          {/* Add Login Image */}
        </Box>
        <Box
          width="50%"
          height="40vh"
          alignContent="center"
          padding="30vh 0px 30vh 0px"
        >
          {loginBoolean ? (
            <Stack direction="column" padding="0px 5vw 0px 5vw" spacing="2vh">
              <h2>{heading}</h2>
              <TextField
                required
                label="IIITB Domain Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // console.log(email);
                }}
              />
              <TextField
                required
                type="password"
                label="Password"
                value={passwd}
                onChange={(e) => {
                  setPasswd(e.target.value);
                  // console.log(passwd);
                }}
              />
              <Button
                onClick={(e) => {
                  setLogin(false);
                }}
                size="small"
                variant="text"
              >
                Forgot Password?
              </Button>
              <Button onClick={onClick} variant="contained">
                LOGIN
              </Button>
            </Stack>
          ) : (
            <Stack direction="column" padding="0px 5vw 0px 5vw" spacing="2vh">
              <h2>{heading}</h2>
              <p>
                Enter the email address, to which the link to reset password
                will be sent
              </p>
              <TextField
                required
                label="IIITB Domain Email Address"
                value={email}
              />
              <Button onClick={onClick} variant="contained">
                RESET LINK
              </Button>
            </Stack>
          )}
        </Box>
      </Stack>
    </>
  );
}

export default LoginScreen;
