import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    // Replace 'your-database-uri' with your MongoDB database URL

    await mongoose.connect(process.env.MONGO_URI!);

    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Exit process if connection fails
    process.exit(1);
  }
}

export default connectToDatabase;
