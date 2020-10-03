const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth');


router.get('/', (req, res) => res.render('index', { layout: 'landing'}))

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { 
        layout: 'main', 
        user: req.user.email
    })
    console.log(req.user)
})

module.exports = router