const router = require('express').Router();
const apply =require('../model/applySchema');
const nodeMailer = require('nodemailer');
const ejs = require('ejs');

const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+(([.\-])[A-Za-z0-9]+)*\.[A-Za-z]+$/;


//handle apply request
router.post('/register', async function(req, res) {
    const form =req.body;
    //new apply info
    const emailCheck = form.email.match(emailRule);
    if(!emailCheck) return res.status(400).send('無效的電子郵件');
    const emailExist = await apply.findOne({email:form.email});
    if(emailExist) return res.status(400).send('此電子郵件已註冊過，如果有疑問請洽粉專管理員');
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
        //mail configuration(use gmail)
        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type:'OAuth2',
                user:'izcc111st@gmail.com',
                pass:'DUxx111N',
                clientId:'480631511990-gvng29rvk7c832t1siepdai4m40qbda4.apps.googleusercontent.com',
                clientSecret:'Jii_L5XlQ4XsqCIaMXji-c39',
                refreshToken:'1//04_-2N-UG9BlrCgYIARAAGAQSNwF-L9IrS2BJmRjF7DbvLxNMyPwRbo8wOLZE2fl7yYKJuztGwuXOaq9yAOcC8DztngqySGtQGpI',
            },
        });
        //save
        await formInfo.save();
        //render mail and send
        ejs.renderFile(__dirname+'/../views/applymail.ejs',{name:formInfo.name},
            (err,html)=>{
            const mail ={
                from:'楓下共建成中景 <izcc111st@gmail.com>',
                to:formInfo.email,
                subject:'報名成功通知',
                html:html
            };
            transporter.sendMail(mail,(err,info)=>{
                if (err) console.log(err);
                else console.log(info);
            });
        });
        res.send('報名成功!請隨時關注我們的粉專來確定活動消息!');
    }catch (e) {
        //error handling
        console.log(e);
        res.status(400).send('你有欄位沒填或是字數超過限制!');
    }

});
router.get('/verify',async function (req,res) {
    const applies = await apply.find({success: true});
    const notApplies = await apply.find({success: false});
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type:'OAuth2',
            user:'izcc111st@gmail.com',
            pass:'DUxx111N',
            clientId:'480631511990-gvng29rvk7c832t1siepdai4m40qbda4.apps.googleusercontent.com',
            clientSecret:'Jii_L5XlQ4XsqCIaMXji-c39',
            refreshToken:'1//04ZLbit44n6SnCgYIARAAGAQSNwF-L9IrvJOoTU0Qg4EytGFskBBO-unUPLf4cw76lyiEUBeZzHSDslqmB9lcWKOsUCPgMiZr5j0',
        },
    });
    applies.forEach(function (data) {
        ejs.renderFile(__dirname+'/../views/verify.ejs',
            {
                name:data.name,
                status:data.success,

            },
            (err,html)=>{
                const mail ={
                    from:'楓下共建成中景 <izcc111st@gmail.com>',
                    to:data.email,
                    subject:'報名結果通知',
                    html:html,
                    attachments:[{
                        filename:"家長同意書",
                        path:__dirname+'/../file/學員家同.pdf',
                        contentType: 'application/pdf'
                    }]
                };
                transporter.sendMail(mail,(err,info)=>{
                    if (err) console.log(err);
                    else console.log(info);
                });
            })

    });
    notApplies.forEach(function (data) {
        ejs.renderFile(__dirname+'/../views/verify.ejs',
            {
                name:data.name,
                status:data.success,
            },
            (err,html)=>{
                const mail ={
                    from:'楓下共建成中景 <izcc111st@gmail.com>',
                    to:data.email,
                    subject:'報名結果通知',
                    html:html,
                };
                transporter.sendMail(mail,(err,info)=>{
                    if (err) console.log(err);
                    else console.log(info);
                });
            })

    });
    res.render('index')
});


//to admit an data
router.get('/admit/:id',async function (req,res) {
    await apply.updateOne({_id:req.params.id},{$set:{success:req.query.value}});
    res.send('success');
});
//to delete an data
router.get('/delete/:id',async function (req,res) {
    await apply.deleteOne({_id:req.params.id});
    res.send('deleted');
});
module.exports=router;