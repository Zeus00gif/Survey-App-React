const express=require('express');
const router=express.Router();
const templates=require('../models/model');
const takeSureyTemplate=require('../models/takeSurveyModel');

router.post('/sendVal',(request,res)=>{
    const survey=new templates({
        multival:request.body.multival,
        optionarray:request.body.optionarray,
        question:request.body.question,
        singleval:request.body.singleval,
        title:request.body.title
    })
    survey.save()
    .then(data=>{
        res.json(data);
    })
    .catch(error=>{
        res.json(error);
    })
})
router.get('/values',(req,res)=>{
    templates.find().then(data=>{
        res.json(data)
    })
})
router.post('/submitVal',(request,res)=>{
    const survey=new takeSureyTemplate({
        response:request.body.response,
        title:request.body.title,
        username:request.body.username
    })
    
    survey.save()
    .then(data=>{
        res.json(data);
    })
    .catch(error=>{
        res.json(error);
    })
})
module.exports=router;