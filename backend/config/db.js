const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    console.log(`Connected to database [${res.connection.name}]`);
  })
  .catch((err) => {
    console.log(`Error connecting to datbase [${err.message}]`);
  });
