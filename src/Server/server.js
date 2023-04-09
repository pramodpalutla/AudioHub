const express = require('express');
const authRoutes = require('./routes/auth');
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE'),
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization'),
    next();
});

app.use('/auth', authRoutes);

app.use((error, req,res,next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})

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

    app.listen(8000, () => {
        console.log("Server is running at port 8000");
      });

    // const dummyUser = {
    //   email: 'john.doe@example.com',
    //   password: 'password123',
    // };
    
    // User.create(dummyUser)
    //   .then((user) => {
    //     console.log('New user created:', user);
    //   })
    //   .catch((error) => {
    //     console.error('Error creating user:', error);
    //   });
  

  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });