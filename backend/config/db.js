const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}/thinkboard?retryWrites=true&w=majority&appName=Cluster1`);
    console.log("✅ Connected to the MongoDB Atlas database");
  } catch (err) {
    console.log("❌ Error connecting to database:", err.message);
  }
};

module.exports = connectDb;
