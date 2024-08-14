const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/chatDb")
  .then(() => {
    console.log("Db Connected !!");
  })
  .catch(() => {
    console.log("Error in connecting to DB");
  });

module.exports = mongoose;
