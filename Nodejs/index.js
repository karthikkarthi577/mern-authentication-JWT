let express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
let app = express();
let userRoutes = require("./userRoute");
const cors = require("cors");

//******middlewares******/
app.use(morgan("dev"));
app.use(express.json()); // body parser
mongoose.set("strictQuery", true);
app.use(cors({ origin: "*" }));

//******setting route path****/
app.use("/api", userRoutes);

//****connecting to mongodb*****/
mongoose.connect("mongodb://127.0.0.1:27017/authenication", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("db is connected");
});

// **********listening*********//
app.get("/", (req, res) => {
  res.send("hiiiiiii");
});

app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("it is running in 5000");
});
