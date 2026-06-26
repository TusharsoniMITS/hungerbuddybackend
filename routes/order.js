var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

router.post('/submit_order', function (req, res, next) {
    try {
        pool.query('insert into orders(paymentid, orderdate, delivery_status, payment_type) values(?,?,?,?)', [req.body.paymentid, req.body.orderdate, req.body.delivery_status, req.body.payment_type], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
                console.log(error)
            } else {
                res.status(200).json({ status: true, data: result, message: 'submit Order successfully', orderid: result.insertId })
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
    }
});
router.post('/submit_order_detail', function (req, res, next) {
    try {
        pool.query('insert into order_detail(orderid, fooditemid, fooditemname, enrollmentno, emailid, mobileno, qty, rate, offerrate, amount) values ?',[req.body.data?.map((item) => { return [req.body.orderid, item.fooditemid, item.fooditemname, req.body.enrollmentno, req.body.emailid, req.body.mobileno, item.qty, item.fullprice, item.offerprice,item.offerprice>0?item.offerprice*item.qty:item.fullprice*item.qty]})], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
                console.log(error)
            } else {
                res.status(200).json({ status: true, data: result, message: 'submit Order successfully' })
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
    }
});


module.exports = router;