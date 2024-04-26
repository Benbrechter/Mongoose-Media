const { Schema, model } = require('mongoose');

const validEmail = '/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/'

const userSchema = new Schema({
  username: {type: String, required: true, unique: true, trimmed: true},
  email: {type: String, required: true, unique: true},
  validate: {
    validator: function(v) { 
      return validEmail.test(v);
     },
    },
  thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }
  ],
  friends: [ 
    {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
  ]
});

const User = model('user', userSchema)

module.exports = User;