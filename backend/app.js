const express = require("express");
const app = express();
const path = require("path");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");

// DB_URI = "mongodb://localhost:27017/PartCode"
// DB_URI = "mongodb+srv://latakhillare:LtmZBL4ZiJiZ3hs0@cluster0.impfvlk.mongodb.net/?retryWrites=true&w=majority"
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

//Route Imports
// const product = require("./routes/productRoute");
const venue = require("./routes/venueRoute");
const user = require("./routes/userRoute");
const screw = require("./routes/screwRoute");
const bolt = require("./routes/boltRoute");
const plate = require("./routes/plateRoute");
const bataRoute = require("./routes/bataRoute");
const aniRoute = require("./routes/aniRoute");
const brewRoute = require("./routes/brewRoute");
const sRoute = require("./routes/sRoute");
const pRoute = require("./routes/pRoute");

// app.use("/api/z1",product);
app.use("/aak/l1", venue);
app.use("/aak/l1", user);
app.use("/aak/l1", screw);
app.use("/aak/l1", bolt);
app.use("/aak/l1", plate);
app.use("/bata", bataRoute);
app.use("/api", aniRoute);
app.use("/api", brewRoute);
app.use("/api", sRoute);
app.use("/api", pRoute); 


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
