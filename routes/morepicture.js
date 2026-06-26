var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')
const uploadToCloudinary = require("../utils/uploadToCloudinary");

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
router.post('/fetch_all_fooditem', function (req, res, next) {
    try {
        pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from FoodCategory C where C.categoryid=F.categoryid) as categoryname from fooditems F where categoryid=?', [req.body.categoryid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
            } else {
                res.status(200).json({ data: result, status: true, data: result, message: 'success' })
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
        console.log(error)
    }
});
router.post('/submit_morepicture', upload.any(), async function(req, res, next) {
  try {

    const files = [];

    for (const file of req.files) {
      const image = await uploadToCloudinary(file.path);
      files.push(image);
    }

    pool.query(
      'insert into morepictures(categoryid, fooditemid, picture, createdate, createtime, userid) values(?,?,?,?,?,?)',
      [
        req.body.categoryid,
        req.body.fooditemid,
        files + "",
        req.body.createdate,
        req.body.createtime,
        req.body.userid
      ],
      function(error,result){

        if(error){
          console.log(error);

          return res.status(500).json({
            status:false,
            message:'database error please contact with backend team'
          });
        }

        res.status(200).json({
          status:true,
          data:result,
          message:'submit data successfully'
        });

      });

  } catch(error){

    console.log(error);

    res.status(500).json({
      status:false,
      message:'backend error please contact with backend team'
    });

  }
});
router.get('/fetch_all_picture', function (req, res, next) {
    try {
        pool.query('select M.*,(select C.categoryname from FoodCategory C where C.categoryid=M.categoryid) as categoryname,(select F.fooditemname from fooditems F where F.fooditemid=M.fooditemid) as fooditemname from morepictures M', function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
            } else {
                res.status(200).json({ data: result, status: true, data: result, message: 'success' })
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
        console.log(error)
    }
});
router.post('/fetch_more_picture', function (req, res, next) {
    try {
        pool.query('select * from morepictures where fooditemid=?', [req.body.fooditemid], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
            } else {
                res.status(200).json({ status: true, data: result[0], message: 'success' })
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
        console.log(error)
    }
});


module.exports = router;