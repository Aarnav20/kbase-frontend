import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { setAuth } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { updateToken } = useContext(AuthContext);

    const API = axios.create({
        baseURL: "http://localhost:8080",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", {
                username,
                password,
                
            }, {
                headers: {
                    "Content-Type": 'application/json',
                    withCredentials: true
                },
            });


            if (res?.data.username) {
                const jwtToken = res?.data.jwtToken;
                setAuth({ username, password });
                updateToken(jwtToken);
                setUsername("");
                setPassword("");
                console.log(jwtToken);
                navigate(from, { replace: true });
            } else {
                console.log("incorrect submission");
                setError("Incorrect username or password");
            }
        } catch (err) {
            if (!err?.response) {
                setError("No server response");
            } else {
                setError("Login failed");
            }
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
            }}
        >
            {/* Left Part - Landscape */}
            <Box
                sx={{
                    flex: 1,
                    backgroundImage:
                        "url('https://www.nucleussoftware.com/public/gallery/who-we-are/nucleus-front.JPG')",
                        backgroundSize: "cover",
                }}
            />

            {/* Right Part - Login Box */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "2rem",
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    style={{
                        color: "black",
                        fontFamily: "'Quicksand', sans-serif", // Use the Quicksand font
                        fontWeight: 700, // You can adjust the font weight (300, 400, 500, 600, 700)
                        fontSize: "2.5rem",
                        opacity: 0.8,
                    }}
                >
                    Login into Nucleopedia
                </Typography>

                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                        padding: "2rem",
                        borderRadius: "1.5rem",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        width: "50%", // Adjust the width as needed
                    }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        value={username.toUpperCase()}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" align="center">
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" size="large">
                        Login
                    </Button>
                    <Typography variant="body1" color="textSecondary">
                        Not currently a user?{" "}
                        <Link to="/signup" style={{ textDecoration: "underline", cursor: "pointer" }}>
                            SignUp
                        </Link>
                    </Typography>
                    <Link to="/forgotPass" style={{ textDecoration: "underline", cursor: "pointer" }}>
                            Forgot Password?
                        </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;