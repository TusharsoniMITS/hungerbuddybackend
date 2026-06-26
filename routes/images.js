var express = require("express");
var router = express.Router();

// router.get("/*", function(req, res) {

//     const publicId = req.params[0];

//     const url =
// `https://res.cloudinary.com/djbnrq83q/image/upload/${publicId}.png`;

//     res.redirect(url);

// });
router.get("/:image", function(req, res) {

    const image = req.params.image;

    res.redirect(
        `https://res.cloudinary.com/djbnrq83q/image/upload/HungerBuddy/${image}`
    );

});

module.exports = router;