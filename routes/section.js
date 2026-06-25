var express = require('express');
var router = express.Router();
const upload = require('./multer');
var pool = require('./pool')

/* GET home page. */
router.get("/fetch_branch", function (req, res, next) {
    pool.query("select * from branch", function (error, result) {
         console.log(error)
        if (error) {
            console.log(error)
            res.status(500).json({status: false,message: "Database Error Please Contact Bankend Team....",
            });
        } else {
            res.status(200).json({ status: true, message: "Success", data: result });
        }
    });
});
router.get("/fetch_batch", function (req, res, next) {
    pool.query("select * from batch", function (error, result) {
         console.log(error)
        if (error) {
            console.log(error)
            res.status(500).json({status: false,message: "Database Error Please Contact Bankend Team....",
            });
        } else {
            res.status(200).json({ status: true, message: "Success", data: result });
        }
    });
});
router.post('/submit_section', function (req, res, next) {
    try {
        pool.query('insert into section(branchid, batchid, sectionname, createdtime, createddate, userid) values(?,?,?,?,?,?)', [req.body.branchid, req.body.batchid, req.body.sectionname, req.body.createdtime, req.body.createddate, req.body.userid], function (error, result) {
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
router.get("/fetch_all_section", function (req, res, next) {
  try {
    pool.query(
      "select S.*,(select B.branchname from branch B where B.branchid=S.branchid) as branchname,(select BB.batchname from batch BB where BB.batchid=S.batchid) as batchname from section S",
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
router.post("/edit_section", function (req, res, next) {
  try {
    pool.query("update section set branchid=?, batchid=?, sectionname=?, createdtime=?, createddate=?, userid=? where sectionid=?",[req.body.branchid, req.body.batchid, req.body.sectionname, req.body.createdtime, req.body.createddate, req.body.userid, req.body.sectionid],
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
router.post('/delete_section', function(req, res, next) {
  try {
    pool.query('delete from section where sectionid=?',[req.body.sectionid],function(error,result){
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
