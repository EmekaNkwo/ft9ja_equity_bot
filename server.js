const express = require("express");
const cors = require("cors");
const dbConnect = require("./utils/dbConnect");
const { errorLog } = require("./utils/logger");
const Account = require("./models/models");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

dbConnect();

app.use(express.json());

app.get("/trades/:limit", async (req, res) => {
  try {
    const trades = await Account.find().limit(req.params.limit);
    return res.status(200).json(trades);
  } catch (err) {
    errorLog.error(err);
    return res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
