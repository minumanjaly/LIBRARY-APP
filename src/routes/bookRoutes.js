const express=require("express")

const booksRouter=express.Router();
const Bookdata=require('../model/Bookdata');
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

    booksRouter.get('/',function(req,res){
         Bookdata.find()
         .then(function(books){
            res.render("books",{
                nav1,nav3,
                title:'Library',
                books
            });
         });
       
    });
    

    
    booksRouter.get('/:id',function(req,res){
        const id=req.params.id;
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render('book',{
                nav1,
                title:'Library',
                book
            });
        });  
    });

 

    /* GET SINGLE User BY ID */
booksRouter.get('/updatebook/:id', function(req, res) {
    res.render('updatebook',{Authordata:req.params.id,
     nav1, nav3,
     title:'Library',
   })
     });
 
     booksRouter.post('/updatebook/:id',function(req,res){
       
         /* UPDATE User */
       
             upload(req, res, (err) => {
          var item={ 
             authorname: req.body.authorname,
             work: req.body.work,
             published: req.body.published,
             image: req.file.originalname
          }
             
             
           Bookdata.findByIdAndUpdate(req.params.id, item, function(err) {
               if (err) {
                   res.redirect('updatebook/' + req.params.id);
               } else {
                   res.redirect('/books')
               }
             });  
         });
     });    
 
 booksRouter.get('/delete/:id', function(req, res) {
 
     Bookdata.findByIdAndRemove(req.params.id, function(err, project) {
         if (err) {
             res.redirect('/books');
         } else
         {
             res.redirect('/books');
         }
     });
 });
 

    return booksRouter;
}


module.exports=router;