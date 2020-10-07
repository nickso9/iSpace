const express = require('express')
const db = require("../models")
const router = express.Router()
const Profile = db.profiles
const User = db.users

router.post('/registration', (req,res) => {
    let userId = req.session.passport.user
    console.log(req.body.checkpicture)


    if (req.body.checkpicture && req.user.dataValues.regDone == 0) {
       User.update({ regDone: 1},{ where: {id: userId} })
       .then(() => {
            res.redirect('/users/dashboard')
        })
        .catch(err => console.log(err))

    } else {
    
        if (req.body.username.length < 3 || req.body.birthday.length < 7 
            || req.body.location.length < 3 || req.body.headline.length < 2
            || req.body.bio.length < 4) {
                    req.flash('error_msg', 'Please fill out all fields.')
                    res.redirect('../registration')

        } else {

            Profile.findOne({ where: { username: req.body.username }}).then(userdata => {

                if (userdata) {

                    req.flash('error_msg', 'User name already exists.')
                    res.redirect('../registration')

                } else {

                Profile.create({
                    image: 0,
                    username: req.body.username,
                    birthday: req.body.birthday,
                    location: req.body.location,
                    bio: req.body.bio,
                    headline: req.body.headline,
                    userId: userId
                })
                .then(e => {
                    console.log('sucessful creation')
                    res.redirect('../registration')
                })
                .catch(err => console.log('this is error =' +err))

                }
            })      
        
        }
    }
})





module.exports = router