import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const Enroll = (props) => {
    let { currUser, setCurrUser } = props;
    const navigate = useNavigate();
    let [searchInput, setSearchInput] = useState("");
    let [searchResult, setSearchResult] = useState(null);

    const handleTakeToLogin = () => {
        navigate("/login");
    };

    const handleChangeInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        if (searchInput) {
            CourseService.getCourseByName(searchInput)
                .then((data) => {
                    setSearchResult(data.data);
                    setSearchInput("");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            CourseService.get()
                .then((data) => {
                    setSearchResult(data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleEnroll = (e) => {
        CourseService.enroll(e.target.id, currUser.user._id)
            .then(() => {
                window.alert("Done Enrollment");
                navigate("/course");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // show all courses in search page
    useEffect(() => {
        CourseService.get()
            .then((data) => {
                setSearchResult(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div style={{ padding: "3rem" }}>
            {!currUser && (
                <div>
                    <p>You must login first before searching for courses.</p>
                    <button
                        class="btn btn-primary btn-lg"
                        onClick={handleTakeToLogin}
                    >
                        Take me to login page.
                    </button>
                </div>
            )}
            {currUser && currUser.user.role === "instructor" && (
                <div>
                    <h1>Only students can enroll in courses.</h1>
                </div>
            )}
            {currUser && currUser.user.role === "student" && (
                <div className="search input-group mb-3">
                    <input
                        onChange={handleChangeInput}
                        type="text"
                        className="form-control"
                        value={searchInput}
                    />
                    <button onClick={handleSearch} className="btn btn-primary">
                        Search
                    </button>
                </div>
            )}
            {currUser && searchResult && searchResult.length > 0 && (
                <div>
                    <p>Data we got back from API.</p>
                    {searchResult.map((course) => {
                        return (
                            <div
                                key={course._id}
                                className="card"
                                style={{ width: "18rem", margin: "1rem" }}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {course.title}
                                    </h5>
                                    <p className="card-text">
                                        {course.description}
                                    </p>
                                    <p>Price: {course.price}</p>
                                    <p>Student: {course.students.length}</p>
                                    <button
                                        onClick={handleEnroll}
                                        className="btn btn-primary"
                                        id={course._id}
                                    >
                                        Enroll
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Enroll;
