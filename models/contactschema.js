const mongoose = require('mongoose')


const contactschema = new mongoose.Schema(
    {
        name: { type: String },
        age: { type: Number },
        mailid: { type: String },
        phonumber: { type: Number },
    }, {
    timeseries: true
}
)

module.exports=mongoose.model('Contact',contactschema)