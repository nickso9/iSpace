const express = require('express')
const db = require("../models")
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    db.users.findOne({ where: { id: req.user.id }, raw: true}).then(userdata => {
        console.log('get dashboard = '+userdata.regDone)
        if (userdata.regDone == 0) {
            res.redirect('../registration')
        } else {
            console.log('in get dashboard')
            res.render('dashboard', { layout: 'main'})
        }

    })

})



module.exports = router