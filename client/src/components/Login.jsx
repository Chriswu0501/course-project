import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/auth.service";

const Login = (props) => {
    let { currUser, setCurrUser } = props;
    let navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        const response = await AuthService.login(email, password);
        try {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            window.alert("Login successfully, now redirected to the profile.");
            setCurrUser(AuthService.getCurrUser());
            navigate("/profile");
        } catch (error) {
            setMessage(error.response.data);
        }
    };

    return (
        <div style={{ padding: "3rem" }} className="col-md-12">
            <div>
                {message && (
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input
                        onChange={handleChangeEmail}
                        type="text"
                        className="form-control"
                        name="email"
                        autoComplete="off"
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChangePassword}
                        type="password"
                        className="form-control"
                        name="password"
                    />
                </div>
                <br />
                <div className="form-group">
                    <button
                        onClick={handleLogin}
                        className="btn btn-primary btn-block"
                    >
                        <span>Login</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
