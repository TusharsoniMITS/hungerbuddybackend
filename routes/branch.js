var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

/* GET home page. */
router.post('/chk_branch_login', function (req, res, next) {
    try {
        pool.query('select * from branch where emailid=? and password=?',[req.body.emailid,req.body.password], function (error, result) {
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
router.post('/submit_branch', function(req, res, next) {
  try {
    pool.query('insert into branch(branchname, address, latlong, stateid, cityid, emailid, contactnumber, contactperson, createddate, createdtime, userid, password) values(?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.branchname, req.body.address, req.body.latlong, req.body.stateid, req.body.cityid, req.body.emailid, req.body.contactnumber, req.body.contactperson, req.body.createddate, req.body.createdtime, req.body.userid, req.body.password],function(error,result){
        if(error){ 
            res.status(500).json({status:false,message:'database error please contact with backend team'})
            console.log(error)
        }else{
            res.status(200).json({status:true,data:result,message:'submit data successfully'})
        }
    })
  } catch (error) {
        res.status(500).json({status:false,message:'backend error please contact with backend team'})
        console.log(error)
  }
});
router.get('/fetch_all_branch', function(req, res, next) {
  try {
    pool.query('select B.*,(select S.statename from state S where S.stateid=B.stateid) as statename, (select C.cityname from cities C where C.cityid=B.cityid) as cityname  from  branch B',function(error,result){
        if(error){ 
            res.status(500).json({status:false,message:'database error please contact with backend team'})
            console.log(error)
        }else{
            res.status(200).json({data:result,status:true,data:result,message:'success'})
        }
    })
  } catch (error) {
        res.status(500).json({status:false,message:'backend error please contact with backend team'})
        console.log(error)
  }
});
router.post('/edit_branch', function(req, res, next) {
  try {
    pool.query('update branch set branchname=?, address=?, latlong=?, stateid=?, cityid=?, emailid=?, contactnumber=?, contactperson=?, createddate=?, createdtime=?, userid=? where branchid=?',[ req.body.branchname, req.body.address, req.body.latlong, req.body.stateid, req.body.cityid, req.body.emailid, req.body.contactnumber, req.body.contactperson, req.body.createddate, req.body.createdtime, req.body.userid, req.body.branchid],function(error,result){
        if(error){ 
            res.status(500).json({status:false,message:'database error please contact with backend team'})
            console.log(error)
        }else{
            res.status(200).json({status:true,data:result,message:'Updated data successfully'})
        }
    })
  } catch (error) {
        res.status(500).json({status:false,message:'backend error please contact with backend team'})
        console.log(error)
  }
});
router.post('/delete_branch', function(req, res, next) {
  try {
    pool.query('delete from branch where branchid=?',[req.body.branchid],function(error,result){
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
