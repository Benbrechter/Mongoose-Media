const { Schema, model, } = require('mongoose');

//I am setting up a new thoughts schema to store thoughts data
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

//this return the length of the reaction array giving the total number of reactions
thoughtSchema.virtuals('reactionCount').get(function () {
    return this.reactions.length
});

//source code is fro mongoose documentation adding a getter method to set the date to DD/MM/YYYY
thoughtSchema.virtuals('FormatCreatedAt').get(function () {
    const date = new Date(this.createdAt);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return `time created ${formattedDate}`;
  });

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;

