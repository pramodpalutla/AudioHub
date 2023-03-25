const express = require('express');
const User = require('../models/user');

const app = express();
const mongoose = require("mongoose");


mongoose
  .connect(
    'mongodb+srv://qureshiu:qbnE3o7Re6Les5ZY@cluster0.jps7vxr.mongodb.net/audiohub', 
  {
    dbName: "user-data",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");

    const dummyUser = {
      email: 'john.doe@example.com',
      password: 'password123',
    };
    
    User.create(dummyUser)
      .then((user) => {
        console.log('New user created:', user);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  

  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(3000, () => {
    console.log("Server is running at port 3000");
  });