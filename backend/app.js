const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set CORS options
const corsOptions = {
  origin: [
    "http://localhost:5174",
    "http://localhost:5173",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Use Helmet with CSP middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      fontSrc: ["'self'", "data:"],
    },
  })
);

// Morgan middleware
app.use(morgan("tiny"));

// Cookie and file middlewares
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join("/tmp"),
  })
);

// Importing all the routes
const food = require("./routes/project");
const user = require("./routes/user");

app.use("/api/food", food);
app.use("/api/user", user);

app.get("/", (req, res) => {
  res.send("Hello Server");
});

module.exports = app;
