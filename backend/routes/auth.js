const express = require('express')
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Amanisagoodb$oy';

const {body , validationResult } = require('express-validator');
// router.get('/',(req,res)=>{
//     obj= {
//         a:'this',
//         number:34
//     }
//     res.json(obj)
// })

// // Create a User using: POST "/api/auth/createuser". No login required

router.post('/createuser',[
   body('name',"Enter a valid name").isLength({min:3}),
   body('email',"Enter a valid email").isEmail(),
   body('password',"Password must be atleast 5 character").isLength({min:5}),

],async (req,res)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty())
   {
      return res.status(400).json({erros:errors.array()});
   }

   // Check whether the user with this email exists already
  try {
   let user = await User.findOne({ email: req.body.email });
   if (user) {
     return res.status(400).json({ error: "Sorry a user with this email already exists" })
   }  
   const salt = await bcrypt.genSalt(10);
   const secPass = await bcrypt.hash(req.body.password, salt);   
   // Create a new user
   user = await User.create({
     name: req.body.name,
     password:secPass,
   //   password: req.body.password,
     email: req.body.email,
   });
   const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);


    // res.json(user)
    res.json({authtoken})

 } catch (error) {
   console.error(error.message);
   res.status(500).send("Some Error occured");
 }
})

//    User.create({
//       name: req.body.name,
//       password: req.body.password,
//       email: req.body.email,
//     }).then(user => res.json(user))
//     .catch(err=> {console.log(err)
//   res.json({error: 'Please enter a unique value for email', message: err.message})})
//    // res.send(req.body);
// })

// router.post('/',(req,res)=>{
//    console.log(req.body)
//    const user = User(req.body)
//    user.save()
//    res.send(req.body)
// })
module.exports = router
