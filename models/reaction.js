const { Schema, Types } = require('mongoose');
//since this is not a model you do not have to call the model class

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      //reeaction body is required and has a minand max count 
      reactionBody: {
        type: String,
        required: true,
        minlength: [1],
        maxlength: [280]
      },
      //this is the username of the person who created the reaction
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date, 
        default: Date.now,
      }
    },
    {
       toJSON: {
        virtuals: true
       },
       id: false,
    }
)

//source code is fro mongoose documentation adding a getter method to set the date to DD/MM/YYYY
reactionSchema.virtual('FormatCreatedAt').get(function () {
  const date = new Date(this.createdAt);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return `time created ${formattedDate}`;
});

module.exports = reactionSchema;