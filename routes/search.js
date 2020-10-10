const express = require('express')
const db = require("../models")
const router = express.Router()
Profile = db.profiles

router.get('/search', (req,res) => {
    const queryUser = Object.keys(req.query)
    //    console.log(queryUser)
    db.profiles.findOne({ 
        attributes: ['userId', 'username', 'image', 'location'],
        where: { username: queryUser[0] }})
    .then(friendSearch => {
        if (!friendSearch) {
            res.send(false)
        } else {
            res.send(friendSearch.dataValues) 
        }  
})
    .catch(err => console.log(err))
    
})


module.exports = router