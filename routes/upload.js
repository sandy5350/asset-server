var express = require('express');
var router = express.Router();
var multer = require('multer');
var randomstring = require('randomstring');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        let ext = file.mimetype.split('/')[1]
	let filename = `${randomstring.generate()}.${ext}`
	cb(null, filename)
    }
});

var upload = multer({ storage: storage });

router.post('/', upload.single('file'), function (req, res) {
    if(req.file !==  undefined){
	res.json({
        success: true,
	    message: 'Image uploaded!',
        responseObject: {
            "count": 1,
                 "data": [
                 {
                "kind": "filename",
                "filename": req.file.filename,
                "access-path": `http://localhost:4000/uploads/${req.file.filename}`
                }
                ]
        }
    });
	} else {
	    res.json({
            success: false,
            message: 'Unable to upload file',
	
        });
    }
})
module.exports = router;
