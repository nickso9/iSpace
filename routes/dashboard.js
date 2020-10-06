const express = require('express')
const db = require("../models")
const router = express.Router()

const Profile = db.profiles


router.post('/dashboard', (req,res,) => {
    console.log(req.body)

    let userId = req.session.passport.user

    Profile.create({
        image: 'thisisanmage',
        username: req.body.username,
        birthday: req.body.birthday,
        location: req.body.location,
        bio: req.body.bio,
        headline: req.body.headline,
        userId: userId
    })
    .then(u => {
        console.log('sucessful creation')
        res.redirect('../dashboard')
    })
    .catch(err => console.log('this is error =' +err))
})





module.exports = router