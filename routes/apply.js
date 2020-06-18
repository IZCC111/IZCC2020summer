const router = require('express').Router();
const apply =require('../model/applySchema');
const nodeMailer = require('nodemailer');
const ejs = require('ejs');




router.post('/register', async function(req, res) {
    const form =req.body;
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
    });
    try{
        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type:'OAuth2',
                user:process.env.MAIL,
                pass:process.env.MAILPASSWORD,
                clientId:'480631511990-gvng29rvk7c832t1siepdai4m40qbda4.apps.googleusercontent.com',
                clientSecret:'Jii_L5XlQ4XsqCIaMXji-c39',
                refreshToken:'1//04_-2N-UG9BlrCgYIARAAGAQSNwF-L9IrS2BJmRjF7DbvLxNMyPwRbo8wOLZE2fl7yYKJuztGwuXOaq9yAOcC8DztngqySGtQGpI',
            },
        });
        await formInfo.save();
        ejs.renderFile(__dirname+'/../views/applymail.ejs',{name:formInfo.name},
            (err,html)=>{
            const mail ={
                from:'楓下共建成中景 <izcc111st@gmail.com>',
                to:formInfo.email,
                subject:'報名成功通知',
                html:html
            }
            transporter.sendMail(mail,(err,info)=>{
                if (err) console.log(err);
                else console.log(info);
            });
        })
        res.send('報名成功!請隨時關注我們的粉專來確定活動消息!');
    }catch (e) {
        console.log(e)
        res.status(400).send('你有欄位沒填或是字數超過限制!');
    }

});


router.get('/admit/:id',async function (req,res) {
    await apply.updateOne({_id:req.params.id},{$set:{success:req.query.value}})
    res.send('success')
});
router.get('/delete/:id',async function (req,res) {
    await apply.deleteOne({_id:req.params.id})
    res.send('deleted')
});
module.exports=router;