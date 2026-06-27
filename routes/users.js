var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

/* GET users listing. */
router.get('/fetch_all_category', function (req, res, next) {
  try {
    pool.query('select * from  FoodCategory', function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: 'database error please contact with backend team' })
        console.log('fetch_all_category_______error_______--', error)
      } else {
        res.status(200).json({ data: result, status: true, data: result, message: 'success' })
      }
    })
  } catch (error) {
    res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
    console.log(error)
  }
});
router.post('/fetch_all_fooditem_by_category', function (req, res, next) {
  try {
    pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from FoodCategory C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.categoryid in (select categoryid from FoodCategory where categoryname=?)', [req.body.categoryname], function (error, result) {
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
router.post('/fetch_all_fooditems_by_category_id', function (req, res, next) {
  try {
    pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from FoodCategory C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.categoryid=?', [req.body.categoryid], function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: 'database error please contact with backend team' })
      } else {
        res.status(200).json({ data: result, status: true, message: 'success' })
      }
    })
  } catch (error) {
    res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
    console.log(error)
  }
});
router.get('/fetch_all_fooditem', function (req, res, next) {
  try {
    pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from FoodCategory C where C.categoryid=F.categoryid) as categoryname from fooditems F', function (error, result) {
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
router.post('/fetch_all_fooditems_by_id', function (req, res, next) {
  try {
    pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from FoodCategory C where C.categoryid=F.categoryid) as categoryname from fooditems F where fooditemid=?', [req.body.fooditemid], function (error, result) {
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
router.post('/student_sign_in', function (req, res, next) {
  try {
    pool.query('select * from student where mobileno=?', [req.body.mobileNo], function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: 'database error please contact with backend team' })
        console.log(error)
      } else {
        if (result.length == 1) {
          res.status(200).json({ status: true, data: result[0], message: 'success' })
          console.log(result)
        } else {
          res.status(200).json({ status: false, data: [], message: 'you are not Register,pls contact with Admin' })
          console.log(result)
        }
      }
    })
  } catch (error) {
    res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
    console.log(error)
  }
});

// router.post('/fetch_all_fooditem_by_food_and_Category', function (req, res, next) {
//   try {
//     pool.query('select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from FoodCategory C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.categoryid in (select categoryid from foodcategory where categoryname=?) or F.fooditemname=?', [req.body.categoryname, req.body.fooditemname], function (error, result) {
//       if (error) {
//         res.status(500).json({ status: false, message: 'database error please contact with backend team' })
//       } else {
//         res.status(200).json({ data: result, status: true, data: result, message: 'success' })
//       }
//     })
//   } catch (error) {
//     res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
//     console.log(error)
//   }
// });

router.get('/fetch_all_transaction', function (req, res, next) {
  try {
    pool.query('select * from  FoodCategory', function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: 'database error please contact with backend team' })
        console.log('fetch_all_category_______error_______--', error)
      } else {
        res.status(200).json({ data: result, status: true, data: result, message: 'success' })
      }
    })
  } catch (error) {
    res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
    console.log(error)
  }
});
// router.post('/fetch_orders_by_student', function (req, res, next) {
//   try {
//     pool.query('select O.*,(select OD.orderdate from orders OD where OD.orderid=O.orderid) as orderdate,(select OD.delivery_status from orders OD where OD.orderid=O.orderid) as delivery_status,(select OD.payment_type from orders OD where OD.orderid=O.orderid) as payment_type,(select OD.paymentid from orders OD where OD.orderid=O.orderid) as paymentid from order_detail O where O.enrollmentno=?', [req.body.enrollmentno], function (error, result) {
//       if (error) {
//         res.status(500).json({ status: false, message: 'database error please contact with backend team' })
//       } else {
//         res.status(200).json({ data: result, status: true, data: result, message: 'success' })
//       }
//     })
//   } catch (error) {
//     res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
//     console.log(error)
//   }
// });

router.post('/fetch_All_state', function (req, res, next) {
  try {
    pool.query('select * from state where state=?', [req.body.stateid], function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: 'database error please contact with backend team' })
        console.log(error)
      } else {
        res.status(200).json({ status: true, data: result, message: 'successfully' })
      }
    })
  } catch (error) {
    res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
    console.log(error)
  }
});
router.post('/fetch_All_cities', function (req, res, next) {
  try {
    pool.query('select * from cities where stateid=?', [req.body.stateid], function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: 'database error please contact with backend team' })
        console.log(error)
      } else {
        res.status(200).json({ status: true, data: result, message: 'successfully' })
      }
    })
  } catch (error) {
    res.status(500).json({ status: false, message: 'backend error please contact with backend team' })
    console.log(error)
  }
});
// router.post('/fetch_orders_by_enrollment', function (req, res, next) {
//   try {
//     pool.query(
//       `SELECT
//         OD.*,
//         O.orderdate,
//         O.delivery_status,
//         O.payment_type,
//         O.paymentid
//       FROM order_detail OD
//       LEFT JOIN orders O ON O.orderid = OD.orderid
//       WHERE OD.enrollmentno = ?`,
//       [req.body.enrollmentno],
//       function (error, result) {
//         if (error) {
//           console.log(error);
//           return res.status(500).json({
//             status: false,
//             message: 'Database error, please contact backend team'
//           });
//         }

//         res.status(200).json({
//           status: true,
//           data: result,
//           message: 'Success'
//         });
//         console.log(result)
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: false,
//       message: 'Backend error, please contact backend team'
//     });
//   }
// });

router.post('/fetch_orders_by_enrollment', function (req, res, next) {
  try {
    pool.query(
      'select OD.*,O.orderdate,O.delivery_status,O.payment_type,O.paymentid from order_detail OD left join orders O on O.orderid=OD.orderid where OD.enrollmentno=?',
      [req.body.enrollmentno],
      function (error, result) {
        if (error) {
          res.status(500).json({
            status: false,
            message: 'database error please contact with backend team'
          })
        }
        else {
          res.status(200).json({
            status: true,
            data: result,
            message: 'success'
          })
        }
      }
    )
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      message: 'backend error please contact with backend team'
    })
  }
})
router.post('/fetch_all_fooditem_by_food_and_Category', function (req, res, next) {
  try {
    pool.query(
      'select F.*,(select B.branchname from branch B where B.branchid=F.branchid) as branchname,(select C.categoryname from foodcategory C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.fooditemname LIKE CONCAT("%",?,"%") or F.categoryid in (select categoryid from foodcategory where categoryname LIKE CONCAT("%",?,"%"))',
      [req.body.fooditemname, req.body.categoryname],
      function (error, result) {
        if (error) {
          res.status(500).json({ status: false, message: 'database error' })
        } else {
          res.status(200).json({ status: true, data: result, message: 'success' })
        }
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: false, message: 'backend error' })
  }
})

module.exports = router;
