require("dotenv").config();
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5500;

// Import the database connection
const dbConection = require("./db/dbConfig");

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRouter = require("./routes/userRoute");

// Use routes
app.use("/api/users", userRouter);

// Start the server
async function startServer() {
  try {
    // Test the database connection
    await dbConection.query("SELECT 1");
    console.log("Database connection established successfully!");

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the application if the database connection fails
  }
}

startServer();
