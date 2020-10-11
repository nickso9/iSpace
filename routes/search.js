const express = require('express')
const db = require("../models")
const router = express.Router()
Profile = db.profiles
Friend = db.friends

router.get('/search', (req,res) => {
let { idOfUser, searchTerm } = req.query

    Profile.findOne({ 
        attributes: ['userId', 'username', 'image', 'location'],
        where: { username: searchTerm }})
    .then(friendSearch => { 
        if (!friendSearch) {
            res.send(false)
        } else {
            const friendCheck = friendSearch.dataValues.userId
            const check = []
            Friend.findOne({ where: { friendlist: friendCheck , userId: idOfUser }})
            .then(user => {
                if (user == null) {
                    res.send(friendSearch.dataValues) 
                } else {
                    res.send('alreadyfriend')
                }            
        })
        .catch(err => console.log(err))
           
        }
    }) 
    .catch(err => console.log(err))
    
})


module.exports = router