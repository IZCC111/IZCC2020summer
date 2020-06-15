const router = require('express').Router();
const walk = require('walk');
const path = require('path');
const fs = require('fs');
const apply = require('../model/applySchema');
const jwt = require('jsonwebtoken');
const verify = require('../routes/verify');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '首頁'});
});
router.get('/about',function(req, res, next) {
    res.render('about', { title: '簡介' });
});
router.get('/class',function (req,res) {
    res.render('class');
});
router.get('/qa',function (req,res) {
    res.render('QA');
});

router.get('/signup',function(req, res, next) {
    res.render('signup', { title: '報名' });
});

router.get('/history', function(req, res, next) {
    var files = [];
    var walker = walk.walk('images/2018', {followLinks: false});
    walker.on('file', function(root, start, next) {
        files.push(root + '/' + start.name);
        next();
    });
    walker.on('end', function() {
        files = shuffle(files);
        res.render('history', { title: '回顧', ImageFiles: files });
    });
});

router.get('/list', function(req, res, next) {
    //var lists = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../lists.json"), 'utf8'));
    res.render('list', { title: '錄取名單' });
});

router.get('/api/getRegisterData', function(req, res, next) {
    console.log('Download Requestsed');
    res.download(path.resolve(__dirname,'../2019_cscamp_registration.zip'),'2019_cscamp_registration.zip');
})
router.get('/adminlog',function (req,res) {
    res.render('login');
})
router.post('/admin/login',function (req,res) {
    if (req.body.secret!==process.env.SECRET
        || req.body.name!==process.env.ADMIN
        ||req.body.password!==process.env.PASSWORD) return res.status(400).send('錯誤!')
    const token= jwt.sign('ADMIN:'+process.env.ADMIN,process.env.SECRET);
    res.cookie('adminToken',token,{httpOnly:true,sameSite:'strict'}).send('登入成功');
})

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
router.get('/applylist/:id',async function (req,res) {
    const member = await apply.findOne({_id:req.params.id});
    if(!member) return res.status(404).render('error');
    var image = Buffer.from(member.parentalConsent).toString('base64');
    res.render('memberInfo',{data:member,image:image})
})

function shuffle(arr) {
    var i,j,temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};
function readSubject() {
    var obj = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../subjects.json"), 'utf8'));
    return obj;
}

module.exports = router;