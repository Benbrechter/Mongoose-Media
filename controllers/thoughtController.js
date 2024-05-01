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

  //create reaction
  async createReaction(req, res) {
    try{
        const {thoughtId} = req.params;
        const {reactionBody, username} = req.body;
//since reactions is embeded in the thoughts model you have to update the thought model to add a reaction
        const updateThought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $push : {reactions: {reactionBody, username} } },
            { new: true, runValidators: true }
          );
    //$push pushes the reaction into the [reaction array in the thought model]
    
          if (!updateThought) {
            return res.status(404).json({ message: 'Thought not found' });
          }
      
          res.status(200).json(updateThought)
    }catch (err){
       res.status(500).json(err)
    }

  },

  //delet reaction
  async deleteReaction(req, res) {
    try{
        const {thoughtId, reactionId} = req.params;
//you have to update the thought model to access the reactions schema 
//$delets an item from an array by the Id 
      const updateThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: {_id: reactionId}  } },
        {new: true}
      );
    if(!updateThought){
        res.status(404).json({message: 'No thought with this Id was found'})
    }
    res.status(200).json(updateThought)
   
    }catch (err){
        res.status(500).json(err)
    }
  }

}