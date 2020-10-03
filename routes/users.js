const express = require('express')
const User = require('../models/Users')
const router = express.Router()
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => res.render('login', { layout: 'landing'}))
router.get('/register', (req, res) => res.render('register', { layout: 'landing'}))

router.post('/register' , (req, res) => {
   const { email, password, password2 } = req.body
   let errors = [] 

    if (!email || !password || !password2) {
        errors.push({ msg: 'Registation Failed. Fill in all fields.'})
    } else if(password !== password2) {
        errors.push({ msg: 'Registation Failed. Passwords do not match.'})
    } else if(password.length < 4) {
        errors.push({ msg: 'Registation Failed. Passwords must be at least 4 characters.'})
    }

    if(errors.length > 0) {
        res.render('register' , { layout: 'landing', errors, email, password, password2})
            
    } else {
        User.findOne({ where: { email }})
        .then(user => {
            if(user) {
                errors.push({ msg: 'Registation Failed. User email already exists.'})
                res.render('register' , { layout: 'landing', errors, email, password, password2})
            } else {
                const newUser = new User({
                    email,
                    password
                })
                bcrypt.genSalt(10, (err,salt) => bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err) throw err;
                        newUser.password = hash
                        User.create({
                            email: newUser.email,
                            password: newUser.password
                        })
                        .then(user => {
                            res.redirect('/users/login')
                        })
                        .catch(err => console.log(err))
                }))
            }
        })
    }

})


module.exports = router