const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username:{
    type: String,
    unique: true,
  },
  email:{
    type:String,
    unique: true,
  },
  careerPosted:[{type: Schema.Types.ObjectId, ref:'career'}]
});

const User = mongoose.model('user', userSchema);

module.exports = {
  User,
}
