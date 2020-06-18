const router = require('express').Router();
const apply = require('../model/applySchema');
const jwt = require('jsonwebtoken');
const verify = require('../routes/verify');



//render homepage
router.get('/', function(req, res, next) {
    res.render('index', { title: '首頁'});
});

//render about page
router.get('/about',function(req, res, next) {
    res.render('about', { title: '簡介' });
});

//render class page
router.get('/class',function (req,res) {
    res.render('class');
});

//render Q&A page
router.get('/qa',function (req,res) {
    res.render('QA');
});

//render signup page
router.get('/signup',function(req, res, next) {
    res.render('signup', { title: '報名' });
});


/*router.get('/list', function(req, res, next) {
    //var lists = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../lists.json"), 'utf8'));
    res.render('list', { title: '錄取名單' });
});*/

//render admin log page
router.get('/adminlog',function (req,res) {
    res.render('login');
})

//handle admin login
router.post('/admin/login',function (req,res) {
    if (req.body.secret!==process.env.SECRET
        || req.body.name!==process.env.ADMIN
        ||req.body.password!==process.env.PASSWORD) return res.status(400).send('錯誤!')
    const token= jwt.sign('ADMIN:'+process.env.ADMIN,process.env.SECRET);
    res.cookie('adminToken',token,{httpOnly:true,sameSite:'strict'}).send('登入成功');
})

//render applylist page(only for admin)
router.get('/applylist',verify,async function (req,res) {
    const applyList =await apply.find();
    const member={name:[],email:[],contact:[],id:[],admit:[]}
    applyList.forEach(function (list) {
        member.name.push(list.name);
        member.email.push(list.email);
        member.contact.push(list.phone);
        member.id.push(list._id);
        member.admit.push(list.success);
    })
    res.render('applylist',{data:member});
})

//get the detailed page
router.get('/applylist/:id',async function (req,res) {
    const member = await apply.findOne({_id:req.params.id});
    if(!member) return res.status(404).render('error');
    res.render('memberInfo',{data:member})
})


module.exports = router;