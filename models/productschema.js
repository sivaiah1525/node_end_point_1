const mongoose =require ('mongoose')

const productschema = new mongoose.Schema(
    {
        name:{type:String},
        Price:{type:Number},
        Wight:{type:Number},
        Discreption:{type:String},
    },
    {
        timestamps:true,
    }
)

module.exports=mongoose.model('Product',productschema)