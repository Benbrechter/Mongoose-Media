const {Thought, Reaction} = require('../models');

module.exports  = {
    //get all thoughts 
  async getThoughts(req,res) {
    try{
        const thoughts = await Thought.find();
        res.status(200).json(thoughts)

    }catch (err){
        res.status(500).json(err)
    }
  },

  // get one thought
  async getSingleThought(req, res) {
    try{
        const thought = await Thought.findOne({_id: req.params.thoughtId})

    if(!thought){
        return res.status(404).json({message: 'thought does not exist'})
    }
        res.status(200).json(thought)

    }catch (err){
        res.status(500).json(err)
    }
  },
 // POST A THOUGHT
  async createThought(req, res){
    try{
        const dbthoughtData = await Thought.create(req.body);
        res.status(200).json(dbthoughtData)
        
    }catch (err){
        res.status(500).json(err)
    }
  },
  
  //update
  async updateThought(req,res){
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {new: true}
        );
    if(!thought){
        res.status(404).json({message: 'No thought with this Id found'})
    };
        res.status(200).json(thought)

    }catch (err){
        res.status(500).json(err)
    }
  },
 //delete thought
  async deleteThought(req,res){
    try{
        const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId });
    if(!thought){
        res.status(404).json({message: 'No thought with this Id was found'})
    }
        res.status(200).json(thought)
    }catch (err){
        res.status(500).json(err)
    }
  },

  //I don't know if it isn't being ccreated because I am trying to create a model when reactions isn's a model
  async createReaction(req, res) {
    try{
        const {thoughtId} = req.params;
        const {reactionBody, username} = req.body;

        const updateThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $push : {reactions: {reactionBody, username} } },
            { new: true, runValidators: true }
          );
    
    
          if (!updateThought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
      
          res.status(200).json(updateThought)
    }catch (err){
       res.status(500).json(err)
    }

  },

  
  async deleteReaction(req, res) {
    try{
        const reaction = await Reaction.delete({_id: req.params.reactionId});

    if(!reaction){
        res.status(404).json({message: 'No reacction with this Id found'})
    }
        res.status(200).json(reaction) 

    }catch (err){
        res.status(500).json(err)
    }
  }

}