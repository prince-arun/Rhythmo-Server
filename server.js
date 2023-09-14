const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
app.use(cors());
const userRoute = require("./routes/userRoute");
const songsRoute = require("./routes/songsRoute");
const adminRoute = require("./routes/adminRoute");

const PORT = process.env.PORT || 5000;
//----------------------------------------------------------------------------------------------------
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
//---------------------------------------------------------------------------------------------------

app.use("/api/users", userRoute);
app.use("/api/songs", songsRoute);
app.use("/api/admin", adminRoute);

//---------------------------------------------------------------------------------------------------------
//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
//--------------------------------------------------------------------------------------------------
