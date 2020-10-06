const express = require('express')
const db = require("../models")
const router = express.Router()
const Profile = db.profiles


router.post('/dashboard', (req,res,) => {
    if (req.body.username.length < 3 || req.body.birthday.length < 7 
        || req.body.location.length < 3 || req.body.headline.length < 2
        || req.body.bio.length < 4) {
                req.flash('error_msg', 'Please fill out all fields.')
                res.redirect('../dashboard')

            } else {

    let userId = req.session.passport.user
    Profile.create({
        image: true,
        username: req.body.username,
        birthday: req.body.birthday,
        location: req.body.location,
        bio: req.body.bio,
        headline: req.body.headline,
        userId: userId
    })
    .then(e => {
        console.log('sucessful creation')
        res.redirect('../dashboard')
    })
    .catch(err => console.log('this is error =' +err))
        }
    
})





module.exports = router