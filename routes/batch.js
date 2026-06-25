var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

/* GET home page. */
router.post('/submit_batch', function (req, res, next) {
    try {
        pool.query('insert into batch(branchid, batchname, session, createdtime, createddate, userid) values(?,?,?,?,?,?)', [req.body.branchid, req.body.batchname, req.body.session, req.body.createdtime, req.body.createddate, req.body.userid], function (error, result) {
            if (error) {
                res.status(500).json({ status: false, message: 'database error please contact with backend team' })
                console.log(error)
            } else {
                res.status(200).json({ status: true, data: result, message: 'submit data successfully' })
            }
        })
    } catch (error) {
        res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
    }
});
router.get("/fetch_branch", function (req, res, next) {
    pool.query("select * from branch", function (error, result) {
        if (error) {
            res.status(500).json({status: false,message: "Database Error Please Contact Bankend Team....",
            });
        } else {
            res.status(200).json({ status: true, message: "Success", data: result });
        }
    });
});
router.get("/fetch_all_batch", function (req, res, next) {
  try {
    pool.query(
      "select B.*,(select BB.branchname from branch BB where BB.branchid=B.branchid) as branchname from batch B",
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "error in database contach to the admin",
          });
        } else {
          res.status(200).json({
            data: result,
            status: true,
            message: "Batch fetched Successfully",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({status: false,message: "error in database contach to the admin",
    });
  }
});
router.post("/edit_batch", function (req, res, next) {
  try {
    console.log(req.body);
    pool.query("update batch set branchid=?, batchname=?, session=?, createdtime=?, createddate=?, userid=? where batchid=?",[req.body.branchid,req.body.batchname,req.body.session,req.body.createdtime,req.body.createddate,req.body.userid,req.body.batchid,],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "error in database contach to the admin",
          });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Batch Updated Successfully" });
        }
      }
    );
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "error in database contach to the admin",
    });
  }
});
router.post('/delete_batch', function(req, res, next) {
  try {
    pool.query('delete from batch where batchid=?',[req.body.batchid],function(error,result){
        if(error){ 
            res.status(500).json({status:false,message:'database error please contact with backend team'})
            console.log(error)
        }else{
            res.status(200).json({status:true,data:result,message:'Delete data successfully'})
        }
    })
  } catch (error) {
        res.status(500).json({status:false,message:'backend error please contact with backend team'})
        console.log(error)
  }
});

module.exports = router;
