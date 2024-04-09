import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Import useHistory if you're using React Router

const LoginForm = ({ switchToSignupForm }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState({ msg: "" });
    const history = useHistory(); // Initialize useHistory hook

    const updateInput = (e) => {
        const { name, value } = e.target;
        if (name === "username") setUsername(value);
        else if (name === "password") setPassword(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setMessage({ msg: "" });

        if (!username || !password) {
            setMessage({ msg: "All fields are required!" });
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:5000/login", {
                username,
                password,
            });
            console.log(response.data);
            if (response.status === 200) {
                setMessage({ msg: "User logged in successfully!" });
                history.push('/products'); // Redirect to products page
            }
        } catch (error) {
            let msg = "An error occurred during login. Please try again.";
            if (error.response && error.response.data.error) {
                msg = error.response.data.error;
            }
            setMessage({ msg });
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <p style={{ color: "red" }}>{message.msg}</p>
            <form onSubmit={onSubmit}>
                <label>Username:</label>
                <input
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={updateInput}
                />
                <br />
                <label>Password:</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={updateInput}
                />
                <br />
                <button type="submit">Login</button>
                <button type="button" onClick={switchToSignupForm}>Switch to Signup</button>
            </form>
        </div>
    );
};

export default LoginForm;
