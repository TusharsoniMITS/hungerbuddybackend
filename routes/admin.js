var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

/* GET home page. */
router.post('/chk_admin_login', function (req, res, next) {
    try {
        pool.query('select * from admin where emailid=? and password=?',[req.body.emailid,req.body.password], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
                console.log(error)
            } else {
                if (result.length == 1) {
                    res.status(200).json({ data: result, status: true, message: 'success' })
                } else {
                    res.status(200).json({status: false, message: 'Invalid Email or Password' })

                }
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
        console.log(error)
    }
});

module.exports = router;
