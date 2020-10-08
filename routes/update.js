const express = require('express')
const db = require("../models")
const router = express.Router()
Profile = db.profiles

router.put('/:id', (req,res) => {
    let errors = []
    let { id, location, headline, bio } = req.body

    if (!location || !headline || !bio) {
        error.push('Please fill out all fields.')
    }

    if (errors.length > 0) {
        res.flash('error_msg', errors)
    } else {
        console.log('update')
    }


    // Profile.updateOne(condition, id, function(err, burger) {
    //     if(err) return res.status(401).json({ message: 'unable to add burger to favorites'})
    //     return res.json({ id })
    // })

})








module.exports = router