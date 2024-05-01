const { Schema, model } = require('mongoose');

//I am using this regex to check if the email follows emailing format because I don't think mongoose has a built email validator
const validEmail = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/

const userSchema = new Schema({
  username: {type: String, required: true, unique: true, trimmed: true},
  email: {type: String, required: true, unique: true,
     validate: {
     //I am running the email validation through the .test method it is looking for v which = value
     validator: function(v) { 
       return validEmail.test(v);
      },
    }
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