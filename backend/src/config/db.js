const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    // Try primary connection first
    if (mongoUri && mongoUri !== 'your_mongodb_connection_string') {
      try {
        const conn = await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 5000,
        });
        console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
        return conn;
      } catch (err) {
        console.warn(`[Database] Primary MongoDB connection failed (${err.message}). Falling back to MongoMemoryServer for development...`);
      }
    }

    // In-memory MongoDB fallback
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`[Database] In-Memory MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
