const express = require('express');
const User = require("../routes/models/user");
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Zakładanie nowego konta
router.post('/register', async (req, res, next) => {

    const userWithAccount = await User.findOne({ email: req.body.email });
      
    if(userWithAccount){
        return res.status(200).json({message: 'email already exists'})
    }
    else{
    bcrypt.hash(req.body.passwordRegister, 10).then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then(() =>
          res.status(200).json({ message: 'success' })
        )
        .catch((err) => res.status(500).json(err));
    });}

  });

  //logowanie
router.post('/login', (req,res,next) => {
    User.findOne({email: req.body.email}).
    then(user => {
        if(!user) return res.status(404).json({message: "authorization error"});

        bcrypt.compare(req.body.password, user.password).
        then(result =>{
            if(result) { 
              const token = jwt.sign({email: user.email},process.env.JWT_KEY, {
                expiresIn: '1h',
              })  
                
                return res.status(200).json({message: "login correct", token: token, user: user.email });}
            else return res.status(401).json({message: "authorization error"})
        }).
        catch((err) => res.status(500).json(err));

    }).
    catch( (err) => console.log(err));
});


module.exports = router;