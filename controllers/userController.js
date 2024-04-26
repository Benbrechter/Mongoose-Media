const {User} = require('../models');

module.exports = {

 async getUsers(req, res) {
    try{
      const users = await User.find();
      res.status(200).json(users);
    }catch (err){
      res.status(500).json(err)  
    }
 },
 async getSingleUser(req,res) {
    try{
      const user = await User.findOne({ _id:req.params.userId })
       .select('__v');

    if (!user){
        return res.status(404).json({message:'No user with this Id found'});
    }

    res.status(200).json(user);
    }catch (err){
    res.status(500).json(err) 
    }
 },
 async createUser(req, res) {
    try{
      const dbUserData = await User.create(req.body);
      res.status(200).json(dbUserData) 
    }catch (err){
      res.status(500).json(err); 
    }
 },
 async updateUser(req,res) {
    try{

    }catch (err){
      res.status(500).json(err)
    }
 },
 async deleteUser(req, res) {
    try{

    }catch(err){
      res.status(500).json(err)
    }
 } 


}