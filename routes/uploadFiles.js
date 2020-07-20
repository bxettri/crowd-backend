const express = require('express');
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});


const upload = multer({
    storage: storage,
 
})

const fileuploadRouter = express.Router();

fileuploadRouter.route('/')
    .post(upload.single('Files'), (req, res) => {
        res.json(req.file);
    });

module.exports = fileuploadRouter;