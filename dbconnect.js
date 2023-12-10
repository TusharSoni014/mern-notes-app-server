const mongoose = require("mongoose");

const dbconnect = async () => {
  const uri = process.env.MONGO_URI;
  const dbConfig = {
    dbname: "MERN-Notes-App",
  };
  try {
    await mongoose.connect(uri, dbConfig);
    console.log("Connected to Mongoose");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbconnect;
