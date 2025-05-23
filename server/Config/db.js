import mongoose from "mongoose";

const connectDB = async () => {

  
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Mongo Connection Error ${error}`);
  }
};

export default connectDB;
