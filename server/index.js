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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);
app.use(
    "/api/courses",
    passport.authenticate("jwt", { session: false }),
    courseRoute
);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server is running on port 8080.");
});
