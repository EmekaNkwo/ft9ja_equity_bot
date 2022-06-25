const mongoose = require("mongoose");
require("dotenv").config();
const { infoLog, errorLog } = require("../utils/logger");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      infoLog.info("Database connected 🚀");
    })
    .catch((err) => {
      errorLog.error(err.message);
    });
};

module.exports = connectDB;
