const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const uri = process.env.MONGO_URI; // Get the MongoDB URI from environment variables
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); 
  }
};

module.exports = dbConnect;
