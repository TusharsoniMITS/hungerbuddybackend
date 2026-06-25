var express = require('express');
const upload = require('./multer');
var pool = require('./pool')
var router = express.Router();

/* GET home page. */
router.post('/submit_fooditem',upload.single('picture'), function(req, res, next) {
  try {
    pool.query('insert into fooditems(categoryid, branchid, fooditemname, fooditemtype, fooditemtaste, ingridients, fullprice, halfprice, offerprice, picture, rating, status, createddate, updatedtime, userid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.categoryid, req.body.branchid, req.body.fooditemname, req.body.fooditemtype, req.body.fooditemtaste, req.body.ingridients, req.body.fullprice, req.body.halfprice, req.body.offerprice, req.file.filename, req.body.rating, req.body.status, req.body.createddate, req.body.updatedtime, req.body.userid],function(error,result){
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
router.get('/fetch_all_fooditem', function(req, res, next) {
  try {
    pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from FoodCategory C where C.categoryid=F.categoryid) as categoryname from fooditems F',function(error,result){
        if(error){ 
            res.status(500).json({status:false,message:'database error please contact with backend team'})
        }else{
            res.status(200).json({data:result,status:true,data:result,message:'success'})
        }
    })
  } catch (error) {
        res.status(500).json({status:false,message:'backend error please contact with backend team'})
        console.log(error)
  }
});
router.get('/fetch_category',function(req,res){
  pool.query('select * from FoodCategory',function(error,result){
    if(error)
    {
      res.status(500).json({status:false,message:'Database Error Please Contact Backend Team....'})
    }
    else
    {
      res.status(200).json({status:true,message:'success',data:result})
    }
  })
})
router.get('/fetch_branch',function(req,res){
  pool.query('select * from branch',function(error,result){
    if(error)
    {
      res.status(500).json({status:false,message:'Database Error Please Contact Backend Team....'})
    }
    else
    {
      res.status(200).json({status:true,message:'success',data:result})
    }
  })
})
router.post('/edit_fooditem', function(req, res, next) {
  try {
    pool.query('update fooditems set categoryid=?, branchid=?, fooditemname=?, fooditemtype=?, fooditemtaste=?, ingridients=?, fullprice=?, halfprice=?, offerprice=?, rating=?, status=?, updatedtime=?, userid=? where fooditemid=?',[req.body.categoryid, req.body.branchid, req.body.fooditemname, req.body.fooditemtype, req.body.fooditemtaste, req.body.ingridients, req.body.fullprice, req.body.halfprice, req.body.offerprice, req.body.rating, req.body.status, req.body.updatedtime, req.body.userid, req.body.fooditemid],function(error,result){
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
router.post('/delete_fooditem', function(req, res, next) {
  try {
    pool.query('delete from fooditems where fooditemid=?',[req.body.fooditemid],function(error,result){
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
router.post('/edit_fooditem_picture',upload.single('picture'), function(req, res, next) {
  try {
    pool.query('update fooditems set picture=?, createddate=?, updatedtime=?, userid=?  where fooditemid=?',[req.file.filename, req.body.createddate, req.body.updatedtime, req.body.userid, req.body.fooditemid],function(error,result){
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
