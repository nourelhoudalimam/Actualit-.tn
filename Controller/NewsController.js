const { result } = require('lodash');

const path=require('path');
const News=require('../models/news');
const News_index=(req,res)=>{
    News.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('actualités', {title:'Toutes les actualités', blogs: items });
        }
    });
}
 const blogdelete=(req,res)=>{
    const id=req.params.id;
    News.findById(id).then((result)=>res.render('blogdelete',{blog:result,title:'Details Actualité'})).catch((err)=>{res.status().render('404',{title:'404 Error'})})};     
const News_add=(req,res)=>{
    res.render('add',{title:'ajouter une actualité'})}
const menu=(req,res)=>{
    res.render('create',{title:'Menu'});};
const News_details=(req,res)=>{
    const id=req.params.id;
    News.findById(id).then((result)=>res.render('blogs',{blog:result,title:'Details Actualité'})).catch((err)=>{res.status().render('404',{title:'404 Error'})})}
  const Admin_blogs=(req,res)=>{
   News.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('delete', { title:'Actualité admin',blogs: items });
        }
    });
}
/*const News_addpost= (req, res) => {
  
    var obj = {
        title: req.body.title,
        snippet: req.body.snippet,
        body:req.body.body,
        image: {
            data: fs.readFileSync(path.join(__dirname + 'uploads' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    const  blog=new News(req.body);
    console.log(req.body)
    blog.save()
    .then((result)=>res.redirect('/Admin-News')).catch((err)=>{console.log(err)})
  }
(req,res)=>{const  blog=new News(req.body);
    console.log(req.body)
    blog.save()
    .then((result)=>res.redirect('/Admin-News')).catch((err)=>{console.log(err)})}*/
const News_delete=(req,res)=>{
    const id=req.params.id;
    News.findByIdAndDelete(id).then(result=>{res.json({redirect:'/Admin-News'})}).catch(err=>console.log(err))}
    module.exports={News_index,News_add,menu,News_details,Admin_blogs,News_delete,blogdelete}