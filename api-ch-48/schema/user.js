const mongo = require('mongoose');
const { Schema } = mongo;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    fullname: String,
    email: {
      type: String,
      required: [true,"email field is required"]
    },
    password: String,
    mobile: Number,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
});

userSchema.pre("save",async function(next){
  const user = await mongo.model('User').findOne({
    email: this.email
  });
  if(user)
  {
    next("Username already exist");
  }
  else {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});

module.exports = mongo.model('User', userSchema);
