var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

router.post('/submit_picture',upload.single('picture'), function(req, res, next) {
  try {
    pool.query('insert into morepicture(categoryid, fooditemid, picture, createdate, createtime, userid) values(?,?,?,?,?,?,)',[req.body.categoryid, req.body.fooditemid, req.file.filename, req.body.createdate, req.body.createtime, req.body.userid],function(error,result){
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
router.get('/fetch_all_category', function(req, res, next) {
  try {
    pool.query('select * from  FoodCategory',function(error,result){
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





module.exports = router;
