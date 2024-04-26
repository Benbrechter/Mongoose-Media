const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        min: [1],
        max: [280]
      },
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

reactionSchema.virtuals('FormatCreatedAt').get(function () {
  const date = new Date(this.createdAt);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return `time created ${formattedDate}`;
});

module.exports = reactionSchema;