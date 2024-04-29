const {User} = require('../models');
 

module.exports = {

  //get all 
 async getUsers(req, res) {
    try{
      const users = await User.find();
      res.status(200).json(users);
    }catch (err){
      res.status(500).json(err)  
    }
 },
 //get one
 async getSingleUser(req,res) {
    try{
      const user = await User.findOne({ _id:req.params.userId })
     

    if (!user){
        return res.status(404).json({message:'No user with this Id found'});
    }

    res.status(200).json(user);
    }catch (err){
    res.status(500).json(err) 
    }
 },
 //post a user
 async createUser(req, res) {
    try{
      const dbUserData = await User.create(req.body);
      res.status(200).json(dbUserData) 
    }catch (err){
      res.status(500).json(err); 
    }
 },
 //update a user
 async updateUser(req,res) {
    try{
     const user = await User.findOneAndUpdate(
      {_id: req.params.userId},
      {$set: req.body},
      {runValidators: true, new: true}
     );

    if(!user){
      return res.status(404).json({message: 'No user with this Id'})
    }

    res.status(200).json(user)

    }catch (err){
      res.status(500).json(err)
    }
 },
 //delete user
 async deleteUser(req, res) {
    try{
     const user = await User.findOneAndDelete({_id: req.params.userId});
    
    if(!user){
      res.status(404).json({message: 'User could not be found'})
    }
    res.status(200).json(user)
    }catch(err){
      res.status(500).json(err)
    }
 } 
}

//I am not sure if I put the routes to create friends on here