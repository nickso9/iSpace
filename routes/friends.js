const express = require('express')
const db = require("../models")
const router = express.Router()
PendingFriend = db.pendingfriends

router.post('/pendingfriends', (req,res) => {
    console.log('initial post')
    console.log(req.body)
    let { idToAdd, userReq, newImage, newLoc, newUser } = req.body
    PendingFriend.create({
        newFriendId: userReq,
        userId: idToAdd,
        username: newUser,
        image: newImage,
        location: newLoc
    })
    .then(() => {    
        console.log('.then post')
        res.sendStatus(200)
    })
    .catch(err => res.send(false))  
      
})



module.exports = router