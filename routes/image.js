const express = require('express')
const db = require("../models")
const router = express.Router()
const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dv1oijudu',
    api_key: '426137622485249',
    api_secret: 'CZYs5IBDATR_wNM2OgjcU87bS9U'
    });
    const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "images",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 150, height: 150, crop: "limit" }]
    });
    const parser = multer({ storage: storage });


router.post('/images', (req, res) => {
    console.log('hihii')

    res.status(204).send();

})


module.exports = router