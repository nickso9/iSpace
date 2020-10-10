const express = require('express')
const db = require("../models")
const router = express.Router()
PendingFriend = db.pendingfriends

router.post('/pendingfriends', (req,res) => {
    let { idToAdd, userReq } = req.body
    PendingFriend.create({
        pendinglist: userReq,
        userId: idToAdd
    })
    .then(() => {    
         
        res.sendStatus(200)
    })
    .catch(err => res.send(false))  
      
})



module.exports = router