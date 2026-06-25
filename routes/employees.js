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
router.post('/submit_employee',upload.single('employee_picture'), function(req, res, next) {
  try {
    pool.query('insert into employee(branchid, employeename, dob, gender, emailid, mobileno, otherno, department, current_address, current_state, current_city, current_pincode, parmanent_address, parmanent_state, parmanent_city, parmanent_pincode, createdtime, createddate, userid, employee_picture, aadharno) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.branchid, req.body.employeename, req.body.dob, req.body.gender, req.body.emailid, req.body.mobileno, req.body.otherno, req.body.department, req.body.current_address, req.body.current_state, req.body.current_city, req.body.current_pincode, req.body.parmanent_address, req.body.parmanent_state, req.body.parmanent_city, req.body.parmanent_pincode, req.body.createdtime, req.body.createddate, req.body.userid, req.file.filename, req.body.aadharno],function(error,result){
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
router.get('/fetch_all_employee', function(req, res, next) {
  try {
    pool.query("select E.*,(select B.branchname from branch B where B.branchid=E.branchid) as branchname from employee E",function(error,result){
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
router.post('/edit_employee', function(req, res, next) {
  try {
    pool.query('update employee set branchid=?, employeename=?, dob=?, gender=?, emailid=?, mobileno=?, otherno=?, department=?, current_address=?, current_state=?, current_city=?, current_pincode=?, parmanent_address=?, parmanent_state=?, parmanent_city=?, parmanent_pincode=?, createdtime=?, createddate=?, userid=?, aadharno=? where employeeid=?',[ req.body.branchid, req.body.employeename, req.body.dob, req.body.gender, req.body.emailid, req.body.mobileno, req.body.otherno, req.body.department, req.body.current_address, req.body.current_state, req.body.current_city, req.body.current_pincode, req.body.parmanent_address, req.body.parmanent_state, req.body.parmanent_city, req.body.parmanent_pincode, req.body.createdtime, req.body.createddate, req.body.userid, req.body.aadharno, req.body.employeeid],function(error,result){
        console.log(error)
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

router.post('/delete_employee', function(req, res, next) {
  try {
    pool.query('delete from employee where employeeid=?',[req.body.employeeid],function(error,result){
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
router.post('/edit_picture_employee',upload.single('employee_picture'), function(req, res, next) {
  try {
    pool.query('update employee set employee_picture=?, createddate=?, createdtime=?, userid=?  where employeeid=?',[req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid, req.body.employeeid],function(error,result){
        if(error){ 
            res.status(500).json({status:false,message:'database error please contact with backend team'})
            console.log(error)
        }else{
            res.status(200).json({status:true,data:result,message:'submit Picture successfully'})
        }
    })
  } catch (error) {
        res.status(500).json({status:false,message:'backend error please contact with backend team'})
        console.log(error)
  }
});
module.exports = router;
