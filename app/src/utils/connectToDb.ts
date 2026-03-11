import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing database connection");
      return;
    }

    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if (connection.isConnected === 1) {
        console.log("Using existing database connection");
        return;
      }
      await mongoose.disconnect();
    }

    const mongoURL = process.env.MONGO_URL;
    if (!mongoURL) {
      throw new Error("MONGO_URL not set");
    }

    const db = await mongoose.connect(mongoURL);
    console.log("Database connected");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw new Error("Failed to connect to database");
  }
};

export default connectToDB;
