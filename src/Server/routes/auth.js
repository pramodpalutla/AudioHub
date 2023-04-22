const express = require('express');
const { body } = require('express-validator');
const User = require('../models/user');
const Song = require('../models/song')
const authController = require('../controller/auth');
const router = express.Router();

router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter your email address')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-mail address already exists');
                }
            });
        })
        .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty()
]
    , authController.signup);


router.post('/login', authController.login);

router.get('/songs', (req, res) => {

    // Fetch all documents in the "Person" collection
    Song.find({}, (err, songs) => {
        if (err) {
            console.error(err);
            res.status(500).json({error: "Error fetching songs"});
            return;
        }
        console.log(songs);
        res.status(200).json(songs);
    });
    
});

module.exports = router;