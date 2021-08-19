
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.fmpzz.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');


// User Schema
const UserSchema = mongoose.Schema({
  username:String,
  email:String,
  password:String,
  confirmpassword:String 
});

const Userdata = mongoose.model('userdata', UserSchema);
module.exports= Userdata;