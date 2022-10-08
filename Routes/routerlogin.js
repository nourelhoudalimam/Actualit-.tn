const express=require('express');
const router=express.Router();
const credential={
    email:"adminActualite.tn@gmail.com",
    password:"Chaimahouidi24"
}

router.post('/Admin-login',(req,res)=>{
    if(req.body.email==credential.email && req.body.password==credential.password){
        req.session.user = req.body.email;
        res.redirect('/router/Dashboard');
   
   // res.end("connexion avec succés");
    }
   else{res.render('login',{title:'se connecter',error:"l'email ou le mot de passe est (sont) invalide(s)"});}
});

router.get('/Dashboard',(req,res)=>{if(req.session.user){
    res.render('create',{title:'Tableau de bord',user:req.session.user})}
  else{
    res.send('utilisateur non autorisé');
  }});
  router.get('/logout',(req,res)=>{req.session.destroy(function(err){
    if(err){
        console.log(err);
        res.send("Error")
    }else{
        res.render('login', { title: "Se connecter", logout : "deconnecter avec succés!"})
    }
})
})
module.exports=router;