const mongoose = require('mongoose');
const { Schema } = mongoose;

const careerSchema = new Schema ({
  careerName:{
    type: String,
    unique: true,
  },
  description:{
    type: String,
  },
  prerequisite:{
    type: String
  },
  author:[{type: Schema.Types.ObjectId, ref:'user'}]
});

const Career = mongoose.model('career', careerSchema);

module.exports = {
  Career
};
