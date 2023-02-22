const dotenv = require("dotenv");
const express = require('express');
const app = express();
const morgan = require("morgan");
dotenv.config();
require("./config/database");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

app.use(express.json());
app.use(morgan("common"));



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);


const port =process.env.port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});