const mongoose=require('mongoose');
const template=new mongoose.Schema({
    multival:{
        type:Boolean,
        required:true
    },
    optionarray:{
        type:[String],
        required:true
    },
    question:{
        type:String,
        required:true
    },
    singleval:{
        type:Boolean,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('original',template);