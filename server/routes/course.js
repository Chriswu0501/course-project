const router = require("express").Router();
const Course = require("../models").courseModel;
const courseValidation = require("../validation").courseValidation;

router.use((req, res, next) => {
    console.log("A request is coming into API.");
    next();
});

router.get("/", (req, res) => {
    Course.find({})
        .populate("instructor", ["username", "email"])
        .then((course) => {
            res.send(course);
        })
        .catch(() => {
            res.status(500).send("Error! Cannot get course!");
        });
});

router.get("/instructor/:_instructor_id", (req, res) => {
    let { _instructor_id } = req.params;
    Course.find({ instructor: _instructor_id })
        .populate("instructor", ["username", "email"])
        .then((data) => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send("Cannot get course data.");
        });
});

router.get("/student/:_student_id", (req, res) => {
    let { _student_id } = req.params;
    Course.find({ students: _student_id })
        .populate("instructor", ["username", "email"])
        .then((courses) => {
            res.send(courses);
        })
        .catch(() => {
            res.status(500).send("Cannot get data.");
        });
});

router.get("/findbyname/:name", (req, res) => {
    let { name } = req.params;
    if (name == "all") {
        Course.find({})
            .populate("instructor", ["username", "email"])
            .then((courses) => {
                res.status(200).send(courses);
            })
            .catch(() => {
                res.status(500).send("Cannot find course.");
            });
    } else {
        Course.find({ title: { $regex: name, $options: "i" } })
            .populate("instructor", ["username", "email"])
            .then((courses) => {
                res.status(200).send(courses);
            })
            .catch(() => {
                res.status(500).send("Cannot find course.");
            });
    }
});

router.get("/:_id", (req, res) => {
    let { _id } = req.params;
    Course.findOne({ _id })
        .populate("instructor", ["email"])
        .then((course) => {
            res.send(course);
        })
        .catch((e) => {
            res.send(e);
        });
});

router.post("/enroll/:_id", async (req, res) => {
    let { _id } = req.params;
    let { user_id } = req.body;
    try {
        let course = await Course.findOne({ _id });
        course.students.push(user_id);
        await course.save();
        res.status(200).send("Done Enrollment.");
    } catch (error) {
        res.status(404).send(error);
    }
});

router.post("/", async (req, res) => {
    // validate the inputs before making a new course
    const { error } = courseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let { title, description, price } = req.body;
    if (!req.user.isInstructor()) {
        return res.status(400).send("Only instructor can post a new course.");
    }

    let newCourse = new Course({
        title,
        description,
        price,
        instructor: req.user._id,
    });

    try {
        await newCourse.save();
        res.status(200).send("New course has been saved.");
    } catch (error) {
        res.status(400).send("Cannot save course.");
    }
});

router.patch("/:_id", async (req, res) => {
    // validate the inputs before making a new course
    const { error } = courseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let { _id } = req.params;
    let course = await Course.findOne({ _id });
    if (!course) {
        return res.status(404).json({
            success: false,
            message: "Course not found.",
        });
    }

    if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
        try {
            await Course.findOneAndUpdate({ _id }, req.body, {
                new: true,
                runValidators: true,
            });
            res.send("Course updated.");
        } catch (error) {
            res.send({
                success: false,
                message: error,
            });
        }
    } else {
        return res.status(403).json({
            success: false,
            message:
                "Only the instructor of this course or web admin can edit this course.",
        });
    }
});

router.delete("/:_id", async (req, res) => {
    let { _id } = req.params;
    let course = await Course.findOne({ _id });
    if (!course) {
        return res.status(404).json({
            success: false,
            message: "Course not found.",
        });
    }

    if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
        try {
            await Course.deleteOne({ _id });
            res.send("Course deleted.");
        } catch (error) {
            res.send({
                success: false,
                message: error,
            });
        }
    } else {
        return res.status(403).json({
            success: false,
            message:
                "Only the instructor of this course or web admin can delete this course.",
        });
    }
});

module.exports = router;
