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
var song = require('../Server/models/song')

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

  bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
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
    const u = await user.findOne({ email: email });
    // retrieve the hash from your database
    if (u) {
      const plaintextPassword = password;
      const hash = u.password
      bcrypt.compare(plaintextPassword, hash, function (err, result) {
        if (result) {
          // Successful login
          const token = generateToken(u);

          res.status(200).json({ message: 'Login successful', token: token });
        }
      }
      )
    }

    else {
      // Invalid credentials
      //res.status(400).json({ message: 'Invalid username or password' });
      throw new Error('Invalid credentials.');
    }
  } catch (error) {
    //console.error(error);
    res.status(400).json({ message: 'Invalid username or password' });
    return;
  }

});


app.get('/songs', (req, res) => {

  // Fetch all documents in the "Person" collection
  song.find({})
    .then((songs) => {
      console.log(songs);
      res.status(200).json(songs);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error fetching songs" });
    });

});


app.post('/playlist', async (req, res) => {
  try {
    const token = req.body.token;
    // Verify JWT token and extract user id
    const decodedToken = jwt.verify(token, 'shhhhhh1');
    const userId = decodedToken.id;

    user.findOne({ _id: userId })
    .populate('playlist', '-__v')
    .select('-password -__v')
    .then((user) => {
      const songs = user.playlist;
      console.log(songs);
      res.status(200).json(songs);
    })
    .catch((error) => {
      console.error(error);
    });

    
  } catch (error) {
    console.error('Error fetching user playlisted songs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }




});

// Add song to user's playlist
app.post('/addToPlaylist', async (req, res) => {
  try {
    const token = req.body.token;
    const songId = req.body.songId;

    // Verify JWT token and extract user id
    const decodedToken = jwt.verify(token, 'shhhhhh1');
    const userId = decodedToken.id;

    // // Check if user exists
    // const uuser = await user.findById(userId).exec();
    // if (!uuser) {
    //   res.status(404).json({ error: 'User not found' });
    //   return;
    // }

    // // Check if song exists
    // const ssong = await song.findById(songId).exec();
    // if (!ssong) {
    //   res.status(404).json({ error: 'Song not found' });
    //   return;
    // }

    // // Add song to user's playlist
    // uuser.playlist.push(ssong._id);

    // user.findOneAndUpdate({ _id: userId }, { $addToSet: { playlist: songId } }, function(err, result) {
    //   if (err) throw err;
    //   console.log(result);
    // });


    user.findOneAndUpdate({ _id: userId }, { $addToSet: { playlist: songId } })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });



    // await user.save();

    res.status(200).json({ message: 'Song added to playlist' });
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    'shhhhhh1',
    { expiresIn: '6h' } // optional: set the expiration time
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
