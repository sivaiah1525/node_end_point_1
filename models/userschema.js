const mongoose = require('mongoose');
const {Schema}=mongoose;


function isStrongPassword(pw) {
  if (!pw) return false;
  // at least 8 chars, one uppercase, one lowercase, one digit
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw);
}


const addresschema=new Schema({
  address:{type:String,trim:true,required:[true,'address is required']},
  city:{type:String,trim:true,required:[true,'city is required']},
  country:{type:String,trim:true,required:[true,'country is required']},
  zipcode:{type:Number,trim:true,required:[true,'zipcode is required']},

})


const userSchema= new Schema({
   firstName:{
     type:String,
     required:[true,'first name is required'],
     trim:true,
     minlength:[2,'first name must be at least 2 characters long'],
     maxlength:[50,'first name must be at most 50 characters long'],
   },
     lastName:{
     type:String,
     required:[true,'last name is required'],
     trim:true,
     minlength:[2,'last name must be at least 2 characters long'],
     maxlength:[50,'last name must be at most 50 characters long'],
   },
   email:{
    type:String,
    required:[true,'email is required'],
    trim:true,
    unique:true,
    lowercase:true,
    match:[/.+@.+\..+/, 'Please fill a valid email address']
   },
   password:{
    type:String,
    required:[true,'password is required'],
    validate: {
      validator: isStrongPassword,
      message: 'Password must be strong'
   },
    minlength:[8,'password must be at least 8 characters long'],
    maxlength:[100,'password must be at most 100 characters long'],
   },
     role: {
    type: String,
    enum: {
      values: ['User', 'Manager', 'Admin', 'Super Manager'],
      message: 'Role must be one of User, Manager, Admin, Super Manager'
    },
    default: 'User'
  },
    phoneNumber: {
    type: String,
    trim: true,
    match: [/^\d{10}$/, 'Phone number must be a 10-digit number']
  },
   age: {
    type: Number,
    min: [16, 'Age must be at least 16'],
    max: [120, 'Age must be at most 120']
  },
  addres:[addresschema]
})




const registerSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  role: { type: String },
  phonumber: { type: String },
  username:{type:String},
  password:{type:String}
}, {
  timestamps: true
});
 

const User = mongoose.model('User', userSchema);
const Register = mongoose.model('Register', registerSchema);

module.exports = { User, Register };
