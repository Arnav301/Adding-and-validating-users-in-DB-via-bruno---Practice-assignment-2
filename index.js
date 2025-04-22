const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User=require('./Models/User');

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());




app.post('/login', async(req,res) => {
  try{
    const {mail, password} = req.body;

    if(!mail || !password){
      return res.status(400).json({message: 'Email and Password are required'});
    }

    const user = await User.findOne({mail});
    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({message: "Invalid credentials"});
    }

    res.status(200).json({ message: "Login Successful", user: {id: user._id, email: user.mail}});
  } catch(error){
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

mongoose.connect('mongodb+srv://arnavvermas84:Password123@cluster3.0ohrbta.mongodb.net/', {
  

})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const PORT = port || 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});