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
                attributes: ['headline', 'text', 'createdAt', 'userId', 'id'],
            }, {
                model: db.pendingfriends,
                attributes: ['newFriendId', 'username', 'image', 'location']
            }
        ],
       
        }).then(userdata => {
        if (userdata[0].dataValues.regDone == 0) {
            res.redirect('../registration')
        } else {
           
            let pendingFriends = []
            userdata[0].dataValues.pendingfriends.forEach(j => {
                pendingFriends.push(j.dataValues)
            })
               

            let { id, email, regDone, profile } = userdata[0].dataValues
            
            let arr = []
                userdata[0].dataValues.posts.forEach(e => {
                e.dataValues['image'] = profile.dataValues.image
                e.dataValues['username'] = profile.dataValues.username
                arr.unshift(e.dataValues)   
                })
                const user = {
                    id,
                    email,
                    regDone,
                    posts: arr,
                    profile: profile.dataValues,
                    pendingFriends: pendingFriends
                }
                    res.render('dashboard', { layout: 'main', user })
                }
                   
    })
    .catch(err => console.log(err))
})



module.exports = router