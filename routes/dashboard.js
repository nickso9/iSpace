const express = require('express')
const db = require("../models")
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    
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
        

        }).then(userdata => {

             
        if (userdata[0].dataValues.regDone == 0) {
            res.redirect('../registration')
        } else {
            let { id, email, regDone, profile, posts } = userdata[0].dataValues
            const user = {
                id,
                email,
                regDone,
                posts,
                profile: profile.dataValues,
            }
            user.posts.forEach(e => console.log(e.dataValues))

            res.render('dashboard', { layout: 'main', user })
        }

    })
   
})



module.exports = router