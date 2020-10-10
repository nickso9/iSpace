const express = require('express')
const db = require("../models")
const router = express.Router()
Post = db.posts

router.put('/:id/posts', (req,res) => {
    let { userId, text, headline } = req.body
    if (!text || !headline) {
        console.log('fields required')    
    } else {
         Post.create({
            headline,
            text,
            userId   
         })
         .then(() => {             
             res.sendStatus(200)
         })
         .catch(err => console.log(err))
    }
    
})

router.delete('/:id/posts', (req,res) => {
    let { postId, userId } = req.body
    Post.destroy({
        where: {
            id: postId
        }
    }).then(() => {
        res.sendStatus(200) 
    })
    .catch(err => console.log(err))

})


module.exports = router