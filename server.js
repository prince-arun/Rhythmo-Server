const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const dbConfig = require("./config/dbConfig");

//-------------------------------------------
const corsOptions = {
  origin: "https://rhythmo-mern-frontend-lg30cxnac-prince-arun.vercel.app",
};
app.use(cors(corsOptions));

//------------------------------------------
app.use(express.json({ limit: "10MB" }));
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
