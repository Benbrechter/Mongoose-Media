const {Thought} = require('../models');

module.exports  = {
  async getThoughts(req,res) {
    try{
        const thoughts = await Thought.find();
        res.status(200).json(thoughts)

    }catch (err){
        res.status(500).json(err)
    }
  },

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

  async createThought(req, res){
    try{
        const dbthoughtData = await Thought.create(req.body);
        res.status(200).json(dbthoughtData)
        
    }catch (err){
        res.status(500).json(err)
    }
  },

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
  }

}