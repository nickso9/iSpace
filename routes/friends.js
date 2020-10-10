const express = require('express')
const db = require("../models")
const router = express.Router()
const PendingFriend = db.pendingfriends
const Friends = db.friends

router.post('/pendingfriends', (req,res) => {

    let { idToAdd, userReq, newImage, newLoc, newUser } = req.body

    PendingFriend.findOne({ where: { newFriendId: userReq, userId: idToAdd } })
    .then((alreadyCheck) => {
        if (alreadyCheck != null)  {
            console.log('this user already sent rq')
            res.send('alreadysent')
        } else {
            PendingFriend.findOne({ where: { newFriendId: idToAdd , userId: userReq } })
            .then((alreadyAdd) => {
                if (alreadyAdd != null) {
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
    let { idOfMe, idToFriend, pendingIdToDel } = req.body
    PendingFriend.destroy({
        where: {
            id: pendingIdToDel
        }
    }).then( async () => {
        await Friends.create({ friendlist: idOfMe, userId: idToFriend  }).then((user) => {
            return user
        })
        .catch(err => console.log(err))

        await Friends.create({ friendlist: idToFriend, userId: idOfMe }).then((user) => {
            return user
        })
        .catch(err => console.log(err))

        res.send('added to friends')
    })
    .catch(err => console.log(err))

})

module.exports = router