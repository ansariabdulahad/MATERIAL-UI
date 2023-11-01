const mongo = require('mongoose');
const { Schema } = mongo;

const noteSchema = new Schema({
  userId: String,
  filename: {
   type: String,
   default: "noname"
  },
  content: {},
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongo.model('Note', noteSchema);
