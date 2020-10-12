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
                attributes: ['id','newFriendId']
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

           Promise.all(findData(userdata))   
            .then(userFriend => {  
                function findDataPending(userdata) {        
                    return userdata[0].dataValues.pendingfriends.map(j => {    
                    return Profile.findOne({ where: { userId: j.newFriendId}, attributes: ['userId','image', 'username', 'location']})
                        .then(userR => userR.dataValues)
                        .catch(err => console.log(err))                     
                    })     
                }

                Promise.all(findDataPending(userdata)) 
                .then(userPendFriend => {

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
                            pendingFriends: userPendFriend,
                            friends: userFriend
                        }
                            res.render('dashboard', { layout: 'main', user })
        
                });
                
            
                
            }) 
        }
    })
    .catch(err => console.log(err))

})

module.exports = router