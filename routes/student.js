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
router.get("/fetch_section", function (req, res, next) {
    pool.query("select * from section", function (error, result) {
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
router.post('/submit_student',upload.single('student_picture'), function(req, res, next) {
  try {
    pool.query('insert into student(enrollmentno, branchid, batchid, sectionid, studentname, dob, gender, fathername, mothername, emailid, mobileno, fathercontactno, mothercontactno, current_address, current_state, current_city, current_pincode, permanent_address, parmanent_state, parmanent_city, parmanent_pincode, student_picture, createdtime, createddate, userid, addharno) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.enrollmentno, req.body.branchid, req.body.batchid, req.body.sectionid, req.body.studentname, req.body.dob, req.body.gender, req.body.fathername, req.body.mothername, req.body.emailid, req.body.mobileno, req.body.fathercontactno, req.body.mothercontactno, req.body.current_address, req.body.current_state, req.body.current_city, req.body.current_pincode, req.body.permanent_address, req.body.parmanent_state, req.body.parmanent_city, req.body.parmanent_pincode, req.file.filename, req.body.createdtime, req.body.createddate, req.body.userid, req.body.addharno],function(error,result){
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
router.get('/fetch_all_student', function(req, res, next) {
  try {
    pool.query("select S.*,(select B.branchname from branch B where B.branchid=S.branchid) as branchname,(select BB.batchname from batch BB where BB.batchid=S.batchid) as batchname,(select SC.sectionname from section SC where SC.sectionid=S.sectionid) as sectionname from student S",function(error,result){
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

router.post('/edit_student', function(req, res, next) {
  try {
    pool.query('update student set enrollmentno=?, branchid=?, batchid=?, sectionid=?, studentname=?, dob=?, gender=?, fathername=?, mothername=?, emailid=?, mobileno=?, fathercontactno=?, mothercontactno=?, current_address=?, current_state=?, current_city=?, current_pincode=?, permanent_address=?, parmanent_state=?, parmanent_city=?, parmanent_pincode=?, createdtime=?, createddate=?, userid=?, addharno=? where enrollmentno=?',[req.body.enrollmentno, req.body.branchid, req.body.batchid, req.body.sectionid, req.body.studentname, req.body.dob, req.body.gender, req.body.fathername, req.body.mothername, req.body.emailid, req.body.mobileno, req.body.fathercontactno, req.body.mothercontactno, req.body.current_address, req.body.current_state, req.body.current_city, req.body.current_pincode, req.body.permanent_address, req.body.parmanent_state, req.body.parmanent_city, req.body.parmanent_pincode, req.body.createdtime, req.body.createddate, req.body.userid, req.body.addharno,req.body.enrollmentno],function(error,result){
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

router.post('/delete_student', function(req, res, next) {
  try {
    pool.query('delete from student where enrollmentno=?',[req.body.enrollmentno],function(error,result){
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

router.post('/edit_picture_student',upload.single('student_picture'), function(req, res, next) {
  try {
    pool.query('update student set student_picture=?, createddate=?, createdtime=?, userid=?  where enrollmentno=?',[req.file.filename, req.body.createddate, req.body.createdtime, req.body.userid, req.body.enrollmentno],function(error,result){
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
