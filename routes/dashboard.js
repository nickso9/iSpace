const express = require('express')
const db = require("../models")
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    db.users.findOne({ where: { id: req.user.id }, raw: true}).then(userdata => {
        if (userdata.regDone == 0) {
            res.redirect('../registration')
        } else {
            res.render('dashboard', { layout: 'main'})
        }

    })

})



module.exports = router