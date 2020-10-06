const express = require('express')
const router = express.Router()
const db = require("../models")
const { ensureAuthenticated } = require('../config/auth');


router.get('/', (req, res) => res.render('index', { layout: 'landing'}))

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // console.log(req.user.dataValues)
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
        console.log(userInfo)
        var imageid = './images/150.png'
        if (userInfo.profileimage != 1) {
            imageid = userInfo.profileimage
        }

        console.log(imageid)
        res.render('dashboard', { 
        layout: 'main', 
        user: req.user.email,
        dataid: userInfo,
        imageid: imageid
    })
    })
})

module.exports = router