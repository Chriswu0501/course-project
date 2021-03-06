const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

// connect to DB
mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("Connect to Mongo Atlas.");
    })
    .catch((e) => {
        console.log(e);
    });

// middlewares
// bodyParser for JSON
app.use(express.json());

// bodyParser for urlencoded
app.use(express.urlencoded({ extended: true }));

// Enable all cors requests
app.use(cors());

app.use("/api/user", authRoute);
app.use(
    "/api/courses",
    passport.authenticate("jwt", { session: false }),
    courseRoute
);

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server is running on port 8080.");
});
