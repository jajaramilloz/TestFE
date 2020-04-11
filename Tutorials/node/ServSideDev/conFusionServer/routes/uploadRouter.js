const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

let imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpen|png|gif)$/)) {
        return cb(new Error('You can upload only image files (jpg|jpen|png|gif)'), false);
    } else {
        cb(null, true);
    }
};

let upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.options(cors.corsWithOptions, 
    (req, res) => { res.sendStatus(200) }
)
.post(
    cors.corsWithOptions,
    authenticate.verifyAdmin,
    upload.single('imageFile'),
    (req, res) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(req.file);
})
.get(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end(`GET operation not supported on /imageUpload`);
})
.put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /imageUpload`);
})
.delete(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end(`delete operation not supported on /imageUpload`);
});

module.exports = uploadRouter;
