const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{5}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('data', userSchema)

