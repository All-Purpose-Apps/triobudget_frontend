import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, inputs.email, inputs.password)
            .then((userCredential) => {
                const user = userCredential.user;
                history("/authtest")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    marginLeft="auto"
                    marginRight="auto"
                    width={300}
                    display="flex"
                    flexDirection={"column"}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h2">Login</Typography>

                    <TextField
                        name="email"
                        onChange={handleChange}
                        type={"email"}
                        value={inputs.email}
                        variant="outlined"
                        placeholder="Email"
                        margin="normal"
                        autoComplete="username"
                    />
                    <TextField
                        name="password"
                        onChange={handleChange}
                        type="password"
                        value={inputs.password}
                        variant="outlined"
                        placeholder="Password"
                        margin="normal"
                        autoComplete="current-password"
                    />
                    <Button variant="contained" type="submit">
                        Login
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Login;
