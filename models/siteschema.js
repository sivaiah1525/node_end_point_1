const mongoose=require ('mongoose')

const siteschema=new mongoose.Schema(
    {
        name:{type:String},
        serialNo:{type:Number},
        Manager:{type:String},
    },{
        timestamps:true
    }
)

module.exports=mongoose.model('site',siteschema)