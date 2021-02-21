const mongoose=require('mongoose');
const takeSureyTemplate=new mongoose.Schema({
    response:{
        type:Array,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('response',takeSureyTemplate);