require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const recipeRouter = require("./routes/recipes");

const app = express();
// CORS
app.use(cors());
// Init Database
connectDB();
app.use(express.json());
app.use(registerRouter);
app.use(loginRouter);
app.use(recipeRouter);

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("recipe-front/dist/recipe-front"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "recipe-front", "dist","recipe-front", "index.html")
    );
  });
}

app.listen(process.env.port, () =>
  console.log(`Server started on port ${process.env.port}`)
);
