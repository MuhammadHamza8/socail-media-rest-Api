const User = require("../models/User");
const bcrypt = require("bcrypt");


exports.register =async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      const olduser = await User.findOne({ email: req.body.email});
      const oldusername= await User.findOne({username:req.body.username});
  
      if(!olduser && !oldusername){
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
  
      }
      else
      {
        res.status(401).json({message:"This user is alredy exist !!"});
      } 
    }catch (err) {
      res.status(500).json(err)
    }
  };
  

  exports.login =async (req, res) => {
    try {
      const olduser = await User.findOne({ email: req.body.email });
  
      if(!olduser)
      {
        res.status(404).json({message:"user not found"});
      }
      
  
      const validPassword = await bcrypt.compare(req.body.password, olduser.password)
  
      if(!validPassword){ 
        
        res.status(400).json({message:"wrong password"});
     }
     res.status(200).json(olduser)
    }catch (err) {
      res.status(500).json(err)
    }
  };