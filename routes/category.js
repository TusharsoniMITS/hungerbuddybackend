var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')
const uploadToCloudinary = require("../utils/uploadToCloudinary");
/* GET home page. */
router.post('/submit_category', upload.single('categoryicon'), async function (req, res, next) {
    try {
        const imageUrl = await uploadToCloudinary(req.file.path);
        pool.query('insert into FoodCategory(branchid, categoryname, categoryicon, createddate, createdtime, userid) values(?,?,?,?,?,?)', [req.body.branchid, req.body.categoryname, imageUrl, req.body.createddate, req.body.createdtime, req.body.userid], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
                console.log(error)
                console.log(req.file.filename);
            } else {
                res.status(200).json({ status: true, data: result, message: 'submit data successfully' })
                console.log(req.file.fieldname);

            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
        console.log(error)
    }
});
router.get('/fetch_all_category', function (req, res, next) {
    try {
        pool.query('select * from  FoodCategory', function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
                console.log(error)
            } else {
                res.status(200).json({ data: result, status: true, data: result, message: 'success' })
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
        console.log(error)
    }
});
router.post('/edit_category', function (req, res, next) {
    try {
        pool.query('update FoodCategory set categoryname=?, createddate=?, createdtime=?, userid=? where categoryid=?', [req.body.categoryname, req.body.createddate, req.body.createdtime, req.body.userid, req.body.categoryid], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
                console.log(error)
            } else {
                res.status(200).json({ status: true, data: result, message: 'Updated data successfully' })
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
        console.log(error)
    }
});
router.post('/delete_category', function (req, res, next) {
    try {
        pool.query('delete from FoodCategory where categoryid=?', [req.body.categoryid], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
                console.log(error)
            } else {
                res.status(200).json({ status: true, data: result, message: 'Delete data successfully' })
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
        console.log(error)
    }
});
router.post('/edit_picture_category', upload.single('categoryicon'),async function (req, res, next) {
    try {
        const imageUrl = await uploadToCloudinary(req.file.path);
        pool.query('update FoodCategory set categoryicon=?, createddate=?, createdtime=?, userid=?  where categoryid=?', [imageUrl, req.body.createddate, req.body.createdtime, req.body.userid, req.body.categoryid], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
                console.log(error)
            } else {
                res.status(200).json({ status: true, data: result, message: 'submit Picture successfully' })
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
        console.log(error)
    }
});
router.get("/fetch_branch", function (req, res, next) {
    pool.query("select * from branch", function (error, result) {
        if (error) {
            res.status(500).json({
                status: false, message: "Database Error Please Contact Bankend Team....",
            });
        } else {
            res.status(200).json({ status: true, message: "Success", data: result });
        }
    });
});

module.exports = router;
