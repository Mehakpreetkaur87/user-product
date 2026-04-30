
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/express-2");
    console.log("Database is connected successfully 🎉🎉");
  } catch (error) {
    console.log("Something went wrong while connecting to Database ❌❌");
    process.exit(1);
  }
};

