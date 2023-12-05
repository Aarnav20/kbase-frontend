import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router";
const ForgotPass = () => {
    const [userName, setUserName] = useState('');
    const [passWord, setPassword] = useState('');
    const [confirmPassWord, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPass = async () => {
        if(passWord==confirmPassWord)
        {
          try {
            debugger;
            const response = await axios.post(`http://localhost:8080/forgotPass?username=${userName}&passWord=${passWord}`);

            if (response.status === 200) {
                setErrorMessage('');
                setSuccessMessage('Password Reset successfully!');
                
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage('Unable to Reset Password.');
                setSuccessMessage('');
            } else {
                setErrorMessage('Error occurred while Resetting the password.');
                setSuccessMessage('');
            }
        }
    }
    else
    {
        alert("Password do not match");
    }
    };

    const myStyle = {
        display: 'flex',
        justifyContent: "center",
        backgroundImage: "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)",
        backgroundSize: "cover",
        alignItems: "center",
        height: "100vh"
    }

    const boxSt = {
        backgroundColor: 'inherit', // Set the background color to transparent
        borderRadius: '0.5em',
        width: 'fit-content',
        height: 'fit-content',
        margin: 'auto',
        marginTop: '5%',
        padding: '2em',
        boxShadow: '0 0 10px rgba(255, 255, 255, 1)', // Increase opacity for more visibility
        backdropFilter: 'blur(10px)', // Increase blur for more translucent effect
        WebkitBackdropFilter: 'blur(10px)', // For Safari support
    }

    return (
        <Box
        style={myStyle}
        >
            <Paper elevation={3} style={boxSt}>
                <Typography variant="h5" align="center">Reset Password</Typography>
                <TextField
                    label="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    fullWidth
                    margin="normal"
                    style={{
                        backgroundColor : 'white',
                        borderRadius : '0.5em'
                    }}
                />
                <TextField
                    label="Password"
                    value={passWord}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    fullWidth
                    margin="normal"
                    style={{
                        backgroundColor : 'white',
                        borderRadius : '0.5em'
                    }}
                />
                 <TextField
                    label="ConfirmPassword"
                    value={confirmPassWord}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    
                    type="text"
                    fullWidth
                    margin="normal"
                    style={{
                        backgroundColor : 'white',
                        borderRadius : '0.5em'
                    }}
                />
                <Button variant="contained" color="primary" onClick={handleForgotPass} fullWidth>
                    Reset Password
                </Button>
                {errorMessage && (
                    <Box
                        bgcolor="error.main"
                        color="error.contrastText"
                        mt={2}
                        p={2}
                        borderRadius={4}
                        textAlign="center"
                    >
                        {errorMessage}
                    </Box>
                )}
                {successMessage && (
                    <Box
                        bgcolor="success.main"
                        color="success.contrastText"
                        mt={2}
                        p={2}
                        borderRadius={4}
                        textAlign="center"
                    >
                        {successMessage}
                       

                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default ForgotPass;
