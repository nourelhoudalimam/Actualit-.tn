const mongoose=require('mongoose');
const schema=mongoose.Schema;
const actualiteSchema=new schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body :{
        type:String,
        required:true
    },
    image:{
        data: Buffer,
        contentType: String
    }

},{timestamp:true});
const News=mongoose.model('News',actualiteSchema);
module.exports=News;