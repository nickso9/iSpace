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
                attributes: ['headline', 'text', 'createdAt', 'userId', 'id', 'postId'],
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
           
            
            function findPost(userdata) {
                return userdata[0].dataValues.friends.map(j => { 
                    const userFriend = j.friendlist     
                    return db.users.findAll({ where: { id: userFriend }, include: [{model: db.profiles, attributes: ['image', 'username']}, {model: db.posts, attributes: ['headline', 'text', 'createdAt', 'id'] } ]})
                    .then(async users => {          
                        const heyhey = await users[0].posts.map(y => {
                                    return {
                                    image: users[0].profile.dataValues.image,
                                    username: users[0].profile.dataValues.username,
                                    headline: y.dataValues.headline,
                                    text: y.dataValues.text,
                                    createdAt: y.dataValues.createdAt,
                                    id: y.dataValues.id
                                    }
                                })
                                return heyhey
                    }) 
                    .catch(err => console.log(err)) 
                                
                    })  
            }
            Promise.all(findPost(userdata)).then(friendsPost => {
                let arrFeed = []
                friendsPost.forEach((t, i) => {
                    for (const [key, value] of Object.entries(t)) {
                        arrFeed[value.id] = value
                      } 

                })
                arrFeed.sort((a, b) =>  b.id - a.id)
                
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

                    function findPostData(userdata) {
                        return db.posts.findAll({ where: { postId: userdata[0].dataValues.id }, attributes: ['headline', 'text', 'createdAt', 'userId', 'id', 'postId']}).then(async postData => {
                             const promiseMap = await Promise.all(postData.map(async postSmallData => { 
                                    const promiseMapReturn = await db.profiles.findAll({ where: { userId: postSmallData.dataValues.postId }, attributes: ['image', 'username']}).then(e => {
                                        return {
                                        headline: postSmallData.dataValues.headline,
                                        text: postSmallData.dataValues.text,
                                        createdAt: postSmallData.dataValues.createdAt,
                                        id: postSmallData.dataValues.id,
                                        image: e[0].dataValues.image,
                                        username: e[0].dataValues.username
                                        }
                                    })
                                    .catch(err => console.log(err))   
                                    return promiseMapReturn
                            }))
                            return promiseMap
                        })
                        .catch(err => console.log(err))  
                    }
                    Promise.all([findPostData(userdata)])
                    .then(e => {
                        console.log(e)
                        
                    })
                    .catch(err => console.log(err))




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
                            feed: arrFeed,
                            profile: profile.dataValues,
                            pendingFriends: userPendFriend,
                            friends: userFriend
                        }
                            res.render('dashboard', { layout: 'main', user })
        
                });
                
            
                
            }) 

        }) 
        }
    })
    .catch(err => console.log(err))

})

module.exports = router