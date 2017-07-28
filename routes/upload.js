var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
	let filename = file.originalname
	cb(null, filename)
    }
});

var upload = multer({ storage: storage });

router.post('/', upload.single('file'), function (req, res) {
    if(req.file !==  undefined){
	res.json({
        success: true,
	    message: 'Image uploaded!',
        "responseObject": {
            "count": 1,
                 "data": [
                 {
                "kind": "filename",
                "filename": req.file.filename
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
