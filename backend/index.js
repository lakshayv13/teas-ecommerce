const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user");
const { errorMiddleware } = require("./middlewares/error");

require("dotenv").config({ path: "./config/config.env" });
require("./config/db");

process.on("uncaughtException", (err) => {
  console.log(`Shutting down the server due to error [${err.message}]`);
  process.exit(1);
});

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`Connected to server on port [${port}]`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server due to error [${err.message}]`);
  server.close(() => {
    process.exit(1);
  });
});
