const express = require("express");
const app = new express();
const port = process.env.PORT || 5002;

const nav=[
    {
        link:'/admin',name:'Admin'
      
    },
    {
        link:'/user',name:'User'
       
    }
]
const nav1 = [
    {
        link:"/books", name:"Books"
    },
    {
        link:"/authors",name:"Authors"
    },
    {
        link:"/addBooks",name:"Add Book"
    },
    {
        link:"/addAuthors",name:"Add Author"
    }
]
const nav2 = [
    {
        link:"/login",name:"login"
    },
    {
        link:"/signup",name:"Sign Up"
    }
]
const nav3=[
    {
        link:'/',name:'Logout'
      
    }
]
const nav4=[
    {
        link:'/user/books',name:'Books'
    },
    {
        link:'/user/authors',name:'Authors'
    }
] 

const adminRouter=require('./src/routes/adminRoutes')(nav1,nav3);
const userRouter=require('./src/routes/userRoutes')(nav4,nav3);

const booksRouter=require('./src/routes/bookRoutes')(nav1,nav3);
const authorsRouter=require('./src/routes/authorRoutes')(nav1,nav3);
const addbookRouter=require('./src/routes/addbookRoutes')(nav1,nav3);
const addauthorRouter=require('./src/routes/addauthorRoutes')(nav1,nav3);
const loginRouter=require('./src/routes/loginRoutes')(nav1,nav2);
const signupRouter=require('./src/routes/signupRoutes')(nav1,nav2);
const readbookRouter=require('./src/routes/readbookRoutes')(nav4,nav3);
const readauthorRouter=require('./src/routes/readauthorRoutes')(nav4,nav3);


app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/addbooks',addbookRouter);
app.use('/addauthors',addauthorRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/user/books',readbookRouter);
app.use('/user/authors',readauthorRouter);



app.use('/admin',adminRouter);
app.use('/user',userRouter);



app.get('/',function(req,res){
     
    res.render("index",{
       nav,
        nav2,
        title:'Library'
    });
});



app.listen(port,()=>{console.log("server Reay at" + port)});