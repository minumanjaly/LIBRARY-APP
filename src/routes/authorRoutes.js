const express=require("express")

const authorsRouter=express.Router();
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

    authorsRouter.get('/',function(req,res){
         Authordata.find()
         .then(function(authors){
            res.render("authors",{
                nav1,nav3,
                title:'Library',
                authors
            });
         });
       
    });
    

    
    authorsRouter.get('/:id',function(req,res){
        const id=req.params.id;
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render('author',{
                nav1,
                title:'Library',
                author
            });
        });  
    });

  
 



/* GET SINGLE User BY ID */
authorsRouter.get('/updateauthor/:id', function(req, res) {
   res.render('updateauthor',{Authordata:req.params.id,
    nav1, nav3,
    title:'Library',
  })
    });

    authorsRouter.post('/updateauthor/:id',function(req,res){
      
        /* UPDATE User */
      
         upload(req, res, (err) => {
         var item={ 
            authorname: req.body.authorname,
            work: req.body.work,
            published: req.body.published,
            image: req.file.originalname
         }
            
            
          Authordata.findByIdAndUpdate(req.params.id, item, function(err) {
              if (err) {
                  res.redirect('updateauthor/' + req.params.id);
              } else {
                  res.redirect('/authors')
              }
            });  
        });
    });    

authorsRouter.get('/delete/:id', function(req, res) {

    Authordata.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {
            res.redirect('/authors');
        } else
        {
            res.redirect('/authors');
        }
    });
});

  
    return authorsRouter;
}


module.exports=router;