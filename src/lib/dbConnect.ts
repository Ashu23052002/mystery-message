import mongoose from "mongoose";

type ConnectedObject = {
  isConnected?: number;
};

const connection: ConnectedObject = {};

async function dbConnect(): Promise<void> {
  // if already connected
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    // first time connection
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}
export default dbConnect;

// re_gx2phezr_KfK34RmJLDJh7LZseDvAxFRE