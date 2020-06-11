const router = require('express').Router();
const multer = require('multer');
const apply =require('../model/applySchema');

const upload = multer({
    limit:{
        fileSize:500000
    },
    fileFilter(req,file,cb){
        console.log(file.originalname);
        cb(null,true);
    }
})


router.post('/register',upload.single('file'), async function(req, res) {
    const form =req.body;
    const image = (req.file) ? req.file.buffer : '';
    const formInfo = new apply({
        name:form.name,
        gender:form.gender,
        size:form.size,
        school:form.school,
        phone:form.phone,
        parent:form.parent,
        eat:form.eat,
        email:form.email,
        emergency:form.emergency,
        traffic:form.traffic,
        identity:form.identity,
        birthday:form.birthday,
        note:form.note,
        parentalConsent:image
    })
    try{
        await formInfo.save();
        res.send('報名成功!請隨時關注我們的粉專來確定活動消息');
    }catch (e) {
        res.status(400).send('你有欄位沒填!');
    }

});

module.exports=router;