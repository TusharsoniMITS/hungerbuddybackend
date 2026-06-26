var multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const storage = multer.diskStorage({
    destination:(req,file,path)=>{
        path(null,'public/images')
    },
    filename:(req,file,path)=>{
        // path(null,file.originalname)
        var ext=file.originalname.substring(file.originalname.lastIndexOf('.'))
        var fn = `${uuidv4()}${ext}`
        path(null,fn)
    }
})

var upload=multer({storage:storage})
module.exports = upload

/*************CLoudnary code start here***************/


// const multer = require("multer");
// // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const { v4: uuidv4 } = require("uuid");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const ext = file.originalname.substring(file.originalname.lastIndexOf("."));

//     return {
//       folder: "HungerBuddy",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       public_id: `${uuidv4()}${ext}`,
//     };
//   },
// });

// const upload = multer({ storage });

// // Wrapper middleware (makes Cloudinary behave like old multer)
// const uploadSingle = (fieldName) => {
//   return (req, res, next) => {
//     upload.single(fieldName)(req, res, (err) => {
//       if (err) return next(err);

//       if (req.file) {
//         // Keep old APIs working
//         req.file.filename = req.file.path;
//       }

//       next();
//     });
//   };
// };

// module.exports = {
//   single: uploadSingle,
// };