const express = require('express')
const db = require("../models")
const router = express.Router()
Profile = db.profiles

router.put('/:id', (req,res) => {
    let { id, location, headline, bio } = req.body
    
    if (!location || !headline || !bio) {
        console.log('fields required')    
    } else {
         Profile.update({
            location,
            headline,
            bio
         }, { where: { userId: id}    
         })
         .then(() => {             
             res.sendStatus(200)
         })
         .catch(err => console.log(err))
    }
})








module.exports = router