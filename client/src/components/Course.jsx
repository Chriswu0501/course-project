import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const Course = (props) => {
    let { currUser, setCurrUser } = props;
    let navigate = useNavigate();

    const handleTakeToLogin = () => {
        navigate("/login");
    };

    const handleUpdate = (e) => {
        navigate("/" + e.target.id);
    };

    const handleDelete = (e) => {
        CourseService.delete(e.target.id)
            .then(() => {
                window.alert("Delete Done");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCancel = (e) => {
        CourseService.cancel(e.target.id, currUser.user._id)
            .then(() => {
                window.alert("Cancel Done");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    let [courseData, setCourseData] = useState(null);

    useEffect(() => {
        console.log("Using effect.");
        let _id;
        if (currUser) {
            _id = currUser.user._id;
        } else {
            _id = "";
        }

        if (currUser.user.role === "instructor") {
            CourseService.get(_id)
                .then((data) => {
                    setCourseData(data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (currUser.user.role === "student") {
            CourseService.getEnrolledCourses(_id)
                .then((data) => {
                    setCourseData(data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    return (
        <div style={{ padding: "3rem" }}>
            {!currUser && (
                <div>
                    <p className="alert alert-warning">
                        You must login before seeing your courses
                    </p>
                    <button
                        onClick={handleTakeToLogin}
                        className="btn btn-primary btn-lg"
                    >
                        To Login Page
                    </button>
                </div>
            )}
            {currUser && (
                <div>
                    <h1>Welcome to {currUser.user.role}'s Course page.</h1>
                </div>
            )}
            {currUser && courseData && courseData.length > 0 && (
                <div>
                    <p>Here's the data we got back from server.</p>
                    {courseData.map((course) => {
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
                                    <p className="card-text">
                                        Price: ${course.price}
                                    </p>
                                    <p>
                                        Student Count: {course.students.length}
                                    </p>
                                    {currUser.user.role === "instructor" ? (
                                        <div className="btn-group">
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={handleUpdate}
                                                id={course._id}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-outline-primary"
                                                id={course._id}
                                                onClick={handleDelete}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleCancel}
                                            id={course._id}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Course;
