const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => res.render('login', { layout: 'landing'}))
router.get('/register', (req, res) => res.render('register', { layout: 'landing'}))

module.exports = router