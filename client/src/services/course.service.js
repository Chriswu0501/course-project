import axios from "axios";
const API_URL = "https://project-07.herokuapp.com/api/courses";
// const API_URL = "http://localhost:8080/api/courses";

class CourseService {
    post(title, description, price) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }

        return axios.post(
            API_URL,
            { title, description, price },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }

    getEnrolledCourses(_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }

        return axios.get(API_URL + "/student/" + _id, {
            headers: {
                Authorization: token,
            },
        });
    }

    getCourseByName(name) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }

        return axios.get(API_URL + "/findbyname/" + name, {
            headers: {
                Authorization: token,
            },
        });
    }

    get(_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }

        return axios.get(API_URL + "/instructor/" + _id, {
            headers: {
                Authorization: token,
            },
        });
    }

    update(_id, title, description, price) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }

        return axios.patch(
            API_URL + "/" + _id,
            { title, description, price },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }

    delete(_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }

        return axios.delete(API_URL + "/" + _id, {
            headers: {
                Authorization: token,
            },
        });
    }

    getCourseByID(_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }

        return axios.get(API_URL + "/" + _id, {
            headers: {
                Authorization: token,
            },
        });
    }

    enroll(_id, user_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }

        return axios.post(
            API_URL + "/enroll/" + _id,
            { user_id },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }

    cancel(_id, user_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }

        return axios.post(
            API_URL + "/cancel/" + _id,
            { user_id },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }
}

export default new CourseService();
