const express = require('express')
const db = require("../models")
const router = express.Router()

const Profile = db.profiles


router.post('/dashboard', (req,res,) => {
    let userId = req.session.passport.user
    Profile.create({
        image: 'thisisanmage',
        username: req.body.username,
        birthday: "10/15/10",
        // req.body.birthday,    
        location: req.body.location,
        bio: "this is a bio",
        // req.body.bio,
        headline: "this is a headline",
        // req.body.headline,
        userId: userId
    })
})





module.exports = router