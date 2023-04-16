var express = require("express");
var app = express();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var cors = require('cors');
//var multer = require('multer');
bodyParser = require('body-parser');
//path = require('path');
var mongoose = require("mongoose");

var user = require("../Server/models/user");

app.use(cors());
//app.use(express.static('uploads'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

app.post('/signup', (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const saltRounds = 10;
  const plaintextPassword = password;
  
  bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
    const dummyUser = {
      username: username,
      password: hash,
      email: email,
    };
    user.create(dummyUser)
    .then((u) => {
      console.log('New user created:', u);
    })
    .catch((error) => {
      console.error('Error creating user:', error);
    });  
  res.status(200).send('Sign-up successful');
  });
  
  
});

/* login api */
app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const u = await user.findOne({ email: email});
    // retrieve the hash from your database
    if (u) {
      const plaintextPassword = password;
      const hash = u.password 
      bcrypt.compare(plaintextPassword, hash, function(err, result) {
        if(result){
          // Successful login
      const token = generateToken(u);
      
      res.status(200).json({ message: 'Login successful', token: token});
        }
      }
      )}
      
    // } else {
    //   // Invalid credentials
    //   res.status(400).json({ message: 'Invalid username or password' });
    // }
   }catch (error) {
    //console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

});

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    'shhhhhh1',
    { expiresIn: '1h' } // optional: set the expiration time
  );
  return token;
};

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
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });
