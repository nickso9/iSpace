const e = require('express')
const express = require('express')
const db = require("../models")
const router = express.Router()
PendingFriend = db.pendingfriends

router.post('/pendingfriends', (req,res) => {

    let { idToAdd, userReq, newImage, newLoc, newUser } = req.body

    PendingFriend.findOne({ where: { newFriendId: userReq, userId: idToAdd } })
    .then((alreadyCheck) => {
        if (alreadyCheck != null)  {
            console.log(alreadyCheck)
            console.log('this user already sent rq')
            res.send('alreadysent')
        } else {
            PendingFriend.findOne({ where: { newFriendId: idToAdd , userId: userReq } })
            .then((alreadyAdd) => {
                if (alreadyAdd != null) {
                    console.log(alreadyAdd)
                    res.send('useralready')
                } else {

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
                    
                }
            })
            .catch(err => console.log(err))
        }
        
        
    })
    .catch(err => console.log(err))
   
    

    


    
      
})

router.post('/friends', (req, res) => {
    let { idToAddFriend, idToFriend, pendingIdToDel } = req.body
    PendingFriend.destroy({
        where: {
            id: pendingIdToDel
        }
    }).then(() => {
        res.sendStatus(200) 
    })
    .catch(err => console.log(err))

})

module.exports = router