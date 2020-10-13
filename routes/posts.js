const express = require('express')
const db = require("../models")
const router = express.Router()
Post = db.posts

router.put('/:id/posts', (req,res) => {
    let { userId, text, headline, postId, wallPost } = req.body
    if (!text || !headline) {
        console.log('fields required')    
    } else {
         Post.create({
            headline,
            text,
            userId,
            postId,
            wallPost   
         })
         .then(() => {             
             res.sendStatus(200)
         })
         .catch(err => console.log(err))
    }
    
})

router.delete('/posts', (req,res) => {
    let { postId } = req.body
    Post.destroy({
        where: {
            id: postId,
        }
    }).then(() => {
        res.sendStatus(200) 
    })
    .catch(err => console.log(err))

})


module.exports = router