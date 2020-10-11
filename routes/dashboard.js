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
                attributes: ['id','newFriendId', 'username', 'image', 'location']
            }, 
            {
                model: db.friends,
                attributes: ['friendlist']
            }
        ],   
    }).then(userdata => {
        if (userdata[0].dataValues.regDone == 0) {
            res.redirect('../registration')
        } else {
           






           function findData(userdata) { 
                return userdata[0].dataValues.friends.map(j => { 
                const userFriend = j.friendlist
                return Profile.findOne({ where: { userId: userFriend}, attributes: ['userId','image', 'username', 'location', 'bio', 'headline', 'birthday']})
                    .then(user => ( user.dataValues ))  
                    .catch(err => console.log(err))  

                })
                    
           }
           const sand = Promise.all(findData(userdata))   
            .then(userFriend => {
          

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
                    pendingFriends: pendingFriends,
                    friends: userFriend
                }
                    res.render('dashboard', { layout: 'main', user })





            
            });

            

                }
                   
    })
    .catch(err => console.log(err))












})



module.exports = router