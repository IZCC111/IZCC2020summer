const router = require('express').Router();
const apply =require('../model/applySchema');



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
        await formInfo.save();
        res.send('報名成功!請隨時關注我們的粉專來確定活動消息!');
    }catch (e) {
        console.log(e);
        res.status(400).send('你有欄位沒填或是字數超過限制!');
    }

});

router.get('/admit/:id',async function (req,res) {
    await apply.updateOne({_id:req.params.id},{$set:{success:req.query.value}})
    res.send('success')
});
module.exports=router;