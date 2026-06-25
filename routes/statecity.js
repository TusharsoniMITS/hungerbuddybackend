var pool = require('./pool')

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/fetch_state', function (req, res, next) {
    try {
        pool.query('select * from state', function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
                console.log(error)
            } else {
                res.status(200).json({ status: true, data: result, message: 'successfully' })
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
        console.log(error)
    }
});

router.post('/fetch_cities', function (req, res, next) {
    try {
        pool.query('select * from cities where stateid=?',[req.body.stateid], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
                console.log(error)
            } else {
                res.status(200).json({ status: true, data: result, message: 'successfully' })
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
        console.log(error)
    }
});

module.exports = router;
