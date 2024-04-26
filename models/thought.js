const { Schema, model, } = require('mongoose');

const thoughtSchema = new Schema(
    {
       thoughtText: {
         type: String,
         required: true,
         min: [1, 'Must have at least 1 character'],
         max: [280, 'You have exeeded the character limit'] 
        }, 
         createdAt: {
         type: Date, 
         default: Date.now,
        },
         username: {
            type: String,
            required: true
        },  
         reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'reaction'
        }
       ]
    },
    {
     toJSON: {
        virtuals: true,
     },
     id: false,
     }

) 

thoughtSchema.virtuals('reactionCount').get(function () {
    return this.reactions.length
});

thoughtSchema.virtuals('FormatCreatedAt').get(function () {
    const date = new Date(this.createdAt);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return `time created ${formattedDate}`;
  });

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;

