const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const router=require('./routes/routes');
const cors=require('cors');
const path=require('path');

dotenv.config()

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Vishak:Vishak2000@tigersurveycluster.hqbzd.mongodb.net/tiger_survey_app?retryWrites=true&w=majority",
{useNewUrlParser: true,useUnifiedTopology: true},()=>console.log("db connected"))

app.use(express.json());
app.use(cors());
app.use('/app',router);
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}
app.listen(process.env.PORT||4000,()=>{
    console.log('Server is up and running');
});