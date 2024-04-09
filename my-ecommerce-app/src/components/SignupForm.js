import React, { useState } from "react";
import axios from "axios";

const SignupForm = ({ switchToLoginForm }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({ msg: "" });

    const updateInput = (e) => {
        const { name, value } = e.target;
        if (name === "username") setUsername(value);
        else if (name === "password") setPassword(value);
        else if (name === "confirmPassword") setConfirmPassword(value);
        else if (name === "email") setEmail(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setMessage({ msg: "" });

        if (!username || !password || !confirmPassword || !email) {
            setMessage({
                msg: "All fields are required!",
            });
            return;
        }

        if (password !== confirmPassword) {
            setMessage({
                msg: "Passwords do not match!",
            });
            return;
        }

        try {
            await axios.post("http://127.0.0.1:5000/register", {
                username,
                password,
                email,
            });
            setMessage({
                msg: "User signed up successfully!",
            });
        } catch (error) {
            let msg = "An error occurred during sign up. Please try again.";
            if (error.response && error.response.data.error) {
                msg = error.response.data.error; // Adjusted to match the Flask response
            }
            setMessage({ msg });
        }
    };

    return (
        <div>
            <h2>Signup</h2>
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
                <label>Confirm Password:</label>
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={updateInput}
                />
                <br />
                <label>Email:</label>
                <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={updateInput}
                />
                <br />
                <button type="submit">Signup</button>
                <br />
                <button onClick={switchToLoginForm}>Switch to Login</button>
            </form>
        </div>
    );
};

export default SignupForm;
