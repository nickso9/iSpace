const express = require('express')
const db = require("../models")
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    db.users.findOne({ where: { id: req.user.id }, include: 'profile', raw: true}).then(userdata => {

        if (userdata.regDone == 0) {
            res.redirect('../registration')
        } else {
            const user = {

            }
            for (const [key, value] of Object.entries(userdata))  {
                if (key == 'id' || key == 'email') {
                    user[key] = value
                }
                if (key.match(/profile/g)) {
                    newKey = key.replace(".","")
                    user[newKey] = value
                }
            }
            console.log(user)

            res.render('dashboard', { layout: 'main'})
        }

    })
   
})



module.exports = router