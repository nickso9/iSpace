const express = require('express')
const router = express.Router()
const db = require("../models")
const { ensureAuthenticated } = require('../config/auth');


router.get('/', (req, res) => res.render('index', { layout: 'landing'}))

router.get('/registration', ensureAuthenticated, (req, res) => {

    if (req.user.dataValues.regDone == null) {

            db.users.findOne({ where: { id: req.user.id }, include: 'profile', raw: true}).then(userdata => {
                let userInfo = {}
                if (userdata.profile !== null) {
                    for (const [key, value] of Object.entries(userdata))  {
                        if (key.match(/profile/g)) {
                            newKey = key.replace(".","")
                            userInfo[newKey] = value
                        }
                    }
                }
                var imageCheck = false
                var imageid = './images/150.png'
                if (userInfo.profileimage != 1) {
                    imageid = userInfo.profileimage
                    setTimeout(() => imageCheck = true , 2000)      
                }

                res.render('registration', { 
                layout: 'main', 
                user: req.user.email,
                dataid: userInfo,
                imageid: imageid,
                imageCheck: imageCheck
            })
            })

    } else {
        res.redirect('/users/dashboard')
    }

})

module.exports = router