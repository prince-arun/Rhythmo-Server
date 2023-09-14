const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongodb database connected");
});
connection.on("error", (err) => {
  console.log(err.message);
});

module.exports = connection;
