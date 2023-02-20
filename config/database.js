const mongoose = require('mongoose');

mongoose.connect(
  process.env.mongo_url ,
  {
    dbName: process.env.dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err ? console.log(err) : console.log(
      "Connected to   social")
);