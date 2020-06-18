const jwt = require('jsonwebtoken');

//to verify if the cookie is admin
module.exports  =function  (req,res,next) {
     const token = req.cookies.adminToken;
     if (!token) return res.redirect('/');
     try{
         req.user=jwt.verify(token,process.env.SECRET)
         next();
     }catch (e) {
         res.status('404').render('error')
     }
}
