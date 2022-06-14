import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AuthService from "./services/auth.service";
import Course from "./components/Course";
import PostCourse from "./components/PostCourse";
import Enroll from "./components/Enroll";

function App() {
    let [currUser, setCurrUser] = useState(AuthService.getCurrUser());

    return (
        <div>
            <Nav currUser={currUser} setCurrUser={setCurrUser} />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/login"
                    element={
                        <Login currUser={currUser} setCurrUser={setCurrUser} />
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <Profile
                            currUser={currUser}
                            setCurrUser={setCurrUser}
                        />
                    }
                />

                <Route
                    path="/course"
                    element={
                        <Course currUser={currUser} setCurrUser={setCurrUser} />
                    }
                />

                <Route
                    path="/postcourse"
                    element={
                        <PostCourse
                            currUser={currUser}
                            setCurrUser={setCurrUser}
                        />
                    }
                />

                <Route
                    path="/enroll"
                    element={
                        <Enroll currUser={currUser} setCurrUser={setCurrUser} />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
