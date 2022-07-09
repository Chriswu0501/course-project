import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CourseService from "../services/course.service";

const EditCourse = (props) => {
    let { currUser, setCurrUser } = props;
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [price, setPrice] = useState(0);
    let [message, setMessage] = useState("");
    let navigate = useNavigate();
    let location = useLocation();
    let _id = location.pathname.slice(1);

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

    const handleUpdate = () => {
        CourseService.update(_id, title, description, price)
            .then(() => {
                window.alert("Course has been updated.");
                navigate("/course");
            })
            .catch((error) => {
                setMessage(error.response.data);
            });
    };

    // show course's original data
    useEffect(() => {
        CourseService.getCourseByID(_id)
            .then((data) => {
                setTitle(data.data.title);
                setDescription(data.data.description);
                setPrice(data.data.price);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                    <p>Only instrcutors can update courses.</p>
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
                        value={title}
                        onChange={handleChangeTitle}
                    />
                    <br />
                    <label htmlFor="exampleforContent">Content</label>
                    <textarea
                        className="form-control"
                        id="exampleforContent"
                        aria-describedby="emailHelp"
                        name="content"
                        value={description}
                        onChange={handleChangeDesciption}
                    />
                    <br />
                    <label htmlFor="exampleforPrice">Price</label>
                    <input
                        name="price"
                        type="number"
                        className="form-control"
                        id="exampleforPrice"
                        value={price}
                        onChange={handleChangePrice}
                    />
                    <br />
                    <button className="btn btn-primary" onClick={handleUpdate}>
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

export default EditCourse;
