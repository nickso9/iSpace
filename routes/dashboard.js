const express = require('express')
const db = require("../models")
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    
    // db.users.findAll({ where: { id: req.user.id}, include: 'posts'}).then(u => console.log(u))


    db.users.findAll({ 
        attributes: ['id', 'email', 'regDone'],
        where: { id: req.user.id }, 
        include: [
            {  
                model: db.profiles,
                attributes: ['image', 'username', 'birthday', 'location', 'bio', 'headline']  
            },{
                model: db.posts,
                attributes: ['headline', 'text', 'createdAt']
            }
        ],
        // include: 'profile', include: 'posts', 
        }).then(userdata => {
             
        if (userdata[0].dataValues.regDone == 0) {
            res.redirect('../registration')
        } else {
            const user = {
                id: userdata[0].dataValues.id,
                email: userdata[0].dataValues.email,
                regDone: userdata[0].dataValues.regDone,
                profile: userdata[0].dataValues.profile.dataValues,
                posts: userdata[0].dataValues.posts
            }
           
            
            res.render('dashboard', { layout: 'main', user })
        }

    })
   
})



module.exports = router