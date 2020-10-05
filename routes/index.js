const express = require('express')
const router = express.Router()
const db = require("../models")
const { ensureAuthenticated } = require('../config/auth');


router.get('/', (req, res) => res.render('index', { layout: 'landing'}))

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    db.users.findOne({ where: { id: req.user.id }, include: 'profile'}).then(userdata => {
        const data = userdata.profile.dataValues
        console.log(data)
        res.render('dashboard', { 
        layout: 'main', 
        user: req.user.email,
        data: data
    })
    })
})

module.exports = router