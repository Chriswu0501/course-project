# [Course App](https://course-demo-project.netlify.app/)

---

## Description

This system is using **React.js** as front-end framework, and **Node.js**, **Express** and **MongoDB** as backend server.  
In this website, you can become an instructor by registering as one, and start making online courses.
Or, you can be a student to enroll any courses.

## Structure

```text
.
├── client
│   ├── public                      # Static files
│   │  ├── images
│   │  ├── favicon.ico
│   │  └── index.html
│   ├── src                         # Dynamic files
│   │  ├── components
│   │  │   ├── Course.jsx           # Show courses that you enrolled or posted
│   │  │   ├── EditCourse.jsx       # Edit course info
│   │  │   ├── Enroll.jsx           # Handle course enroll & search
│   │  │   ├── Home.jsx             # Home page
│   │  │   ├── Login.jsx            # User login
│   │  │   ├── Nav.jsx              # Navigation bar
│   │  │   ├── PostCourse.jsx       # Post course
│   │  │   ├── Profile.jsx          # User profile page
│   │  │   └── Register.jsx         # User register
│   │  ├── services                 # Use axios to handle user data & course data
│   │  │   ├── auth.service.js
│   │  │   └── course.service.js
│   │  ├── App.jsx
│   │  └── index.jsx
│   └── ...                         # etc.
├── server
│   ├── config
│   │  └── passport.js              # Passport strategy setting
│   ├── models                      # Mongoose model setting
│   │  ├── course-model.js
│   │  ├── user-model.js
│   │  └── index.js
│   ├── routes                      # API connections
│   │  ├── auth.js                  # For user login & register
│   │  ├── course.js                # For course CRUD
│   │  └── index.js
│   ├── index.js
│   ├── validation.js               # Data validation for login, register and post courses
│   └── ...                         # etc.
└── README.md
```

## Usage example

### As a student

![image](https://github.com/Chriswu0501/course-project/blob/main/client/public/images/regist_student.gif?raw=true)

### Enroll courses

![image](https://github.com/Chriswu0501/course-project/blob/main/client/public/images/enroll_student.gif?raw=true)

### As a instructor

![image](https://github.com/Chriswu0501/course-project/blob/main/client/public/images/regist_instructor.gif?raw=true)

### Post courses

![image](https://github.com/Chriswu0501/course-project/blob/main/client/public/images/postcourse_instructor.gif?raw=true)

## Notice

This website is for practice purpose only, so please do not provide any personal information, such as credit card numbers.
