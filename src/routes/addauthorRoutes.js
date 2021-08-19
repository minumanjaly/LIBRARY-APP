
const express=require("express")

const addauthorRouter=express.Router();

const Authordata=require('../model/Authordata');

const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/images/',
  filename: function(req, file, cb){
    cb(null,file.originalname);
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

function router(nav1,nav3){

    addauthorRouter.get('/',function(req,res){
   
        res.render("addAuthors",{
            nav3,nav1,
            title:'Library'
            
        })
    })

    addauthorRouter.post('/add',function(req,res){
      
        upload(req, res, (err) => {
     var item={ 
        authorname: req.body.authorname,
        work: req.body.work,
        published: req.body.published,
        image: req.file.originalname
     }

    var author=Authordata(item);
    author.save();//save to database
    res.redirect('/authors');
    
    });
});




return addauthorRouter;
}
module.exports=router;

