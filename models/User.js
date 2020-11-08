const {Schema, model, Types} = require('mongoose')

const userShema = new Schema({
  email: { 
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  lists: [
    {
      type: Types.ObjectId,
      ref: 'List'
    }
  ]
})

module.exports = model('User', userShema)