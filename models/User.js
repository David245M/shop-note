const {Schema, model, Types} = require('mongoose')

const userShema = new Schema({
  email: { 
    type: String,
    required: true,
    unique: true
  },
  nick: {
    type: String,
    required: true
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
},
{
  versionKey: false,
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
})

module.exports = model('User', userShema)