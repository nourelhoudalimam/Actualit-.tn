const express= require('express');
const { result } = require('lodash');
const mongoose=require('mongoose');
var fs = require('fs');
const newscontroller=require('./Controller/NewsController');
const path=require('path');
const bodyparser=require('body-parser');
const app=express();
const News = require('./models/news');
const db ='mongodb+srv://admin:Chaimahouidi24@actualitetn.5dhtuy6.mongodb.net/?retryWrites=true&w=majority';
const session=require('express-session');
const {v4:uuidv4}=require('uuid');
const router = require('./Routes/routerlogin');
const dotenv=require('dotenv/config');
const multer=require('multer');
const storage=multer.diskStorage({destination:(req,file,cb)=>{cb(null,'uploads')},
filename:(req,file,cb)=>{console.log(file);cb(null,Date.now()+'-'+path.extname(file.originalname))}});
const upload=multer({storage:storage})
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>{app.listen(3000);}).catch((err)=>{console.log(err)});
app.use(session({
  secret:uuidv4(),
saveUninitialized:true,
resave:false
}));
app.set('view engine','ejs');
app.set('Myviews','views');
app.get('/',(req,res)=>{res.render('index',{title :'acceuil'})});
app.get('/About-us',(req,res)=>{
res.render('about',{title:'à propos'})});
app.get('/blogs',(req,res)=>{
  res.render('blogs',{title:'Actualité'})});
app.get('/Admin-login',(req,res)=>{
  res.render('login',{title:'connexion'})});
app.get('/Admin-add',newscontroller.News_add);
 //   app.post('/Admin-add',newscontroller.News_addpost);
    app.get('/Admin-News',newscontroller.Admin_blogs);
   
 app.get('/Admin-blogs/:id',newscontroller.blogdelete);
app.get('/All-News',newscontroller.News_index);
  app.get('/News/create',newscontroller.menu);

      
          
             app.get('/blogs/:id',newscontroller.News_details);
            
                
             app.get('/Admin-News/:id',newscontroller.blogdelete);
            
 app.get('Error_404',(req,res)=>{
  res.render('404',{title:'Error 404 '})})                     
 app.delete('/Admin-News/:id',newscontroller.News_delete);
 app.post('/Admin-add', upload.single("image"),(req,res)=>
 {var obj = {
  title: req.body.title,
  snippet: req.body.snippet,
  body:req.body.body,
  image: req.body.image={
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: 'image/png'
  }
}
const  blog=new News(req.body);
console.log(req.body)
blog.save()
.then((result)=>res.redirect('/Admin-News')).catch((err)=>{console.log(err)})});
app.use('/public',express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
//app.use((req,res)=>{res.status(404).render('404');});
app.use('/router',router);
