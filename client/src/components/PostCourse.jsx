import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const PostCourse = (props) => {
    let { currUser, setCurrUser } = props;
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [price, setPrice] = useState(0);
    let [message, setMessage] = useState("");
    let navigate = useNavigate();

    const handleTakeToLogin = () => {
        navigate("/login");
    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeDesciption = (e) => {
        setDescription(e.target.value);
    };

    const handleChangePrice = (e) => {
        setPrice(e.target.value);
    };

    const handlePostCourse = () => {
        CourseService.post(title, description, price)
            .then(() => {
                window.alert("New course has been created.");
                navigate("/course");
            })
            .catch((error) => {
                setMessage(error.response.data);
            });
    };

    return (
        <div style={{ padding: "3rem" }}>
            {!currUser && (
                <div>
                    <p>You must login first before posting a new course.</p>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={handleTakeToLogin}
                    >
                        Take me to login page.
                    </button>
                </div>
            )}
            {currUser && currUser.user.role !== "instructor" && (
                <div>
                    <p>Only instrcutors can post new courses.</p>
                </div>
            )}
            {currUser && currUser.user.role === "instructor" && (
                <div className="form-group">
                    <label htmlFor="exampleforTitle">Title</label>
                    <input
                        name="title"
                        type="text"
                        className="form-control"
                        id="exampleforTitle"
                        onChange={handleChangeTitle}
                    />
                    <br />
                    <label htmlFor="exampleforContent">Content</label>
                    <textarea
                        className="form-control"
                        id="exampleforContent"
                        aria-describedby="emailHelp"
                        name="content"
                        onChange={handleChangeDesciption}
                    />
                    <br />
                    <label htmlFor="exampleforPrice">Price</label>
                    <input
                        name="price"
                        type="number"
                        className="form-control"
                        id="exampleforPrice"
                        onChange={handleChangePrice}
                    />
                    <br />
                    <button
                        className="btn btn-primary"
                        onClick={handlePostCourse}
                    >
                        Submit
                    </button>
                    <br />
                    <br />
                    {message && (
                        <div className="alert alert-warning" role="alert">
                            {message}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostCourse;
