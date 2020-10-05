const express = require('express')
const router = express.Router()
const db = require("../models")
const { ensureAuthenticated } = require('../config/auth');


router.get('/', (req, res) => res.render('index', { layout: 'landing'}))

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    db.users.findOne({ where: { id: req.user.id }, include: 'profile', raw: true}).then(userdata => {
        let data = ""
        if (userdata.profile !== null) {
            for (const [key, value] of Object.entries(userdata))  {
                key == 'profile.id' ? data = value : ""
            }
        }
        console.log('this is data'+data)
        res.render('dashboard', { 
        layout: 'main', 
        user: req.user.email,
        dataid: data
    })
    })
})

module.exports = router