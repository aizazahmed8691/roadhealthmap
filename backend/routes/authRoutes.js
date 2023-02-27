const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtToken = require('../middleware/AuthTokenRequired')
const router = express.Router();
const Admin = mongoose.model('Admin');
const bcrypt = require('bcrypt');
require('dotenv').config();


router.post('/signup', async (req, res) => {
    console.log(req.body);

    const { email, password} = req.body;
    if( !email || !password){
        return res.status(422).send({error: "All fields are required"});
    }

    Admin.findOne({email: email})
    .then( async (savedAdmin) => {
            if(savedAdmin){
                return res.status(422).send({error: "User already exist"});
            }
            const admin = new Admin({
                email,
                password
            })
            try{
                await admin.save();
                const token = jwt.sign({ _id: admin._id}, process.env.JWT_SECRET);
                res.send({token});
            }
            catch(err) {
                console.log('Error: ', err);
                return res.status(422).send({error: err.message});
            }
        }
    )
})

router.post('/login', async (req, res) => {
    const{email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error: "Email or Password is not entered!"});
    }
    const savedAdmin = await Admin.findOne({email: email});

    if(!savedAdmin){
        return res.status(422).json({error: "Invalid Credentials"});
    }

    try{
        bcrypt.compare(password, savedAdmin.password, (err, result) => {
            if(result){
                const token = jwt.sign({ _id: savedAdmin._id}, process.env.JWT_SECRET,
                    {
                        expiresIn: "2h",
                    });
                    Admin.token = token
                console.log(savedAdmin)
                console.log(Admin.token)
                res.status(200).json({
                    token,
                    savedAdmin
                });
            }
            else{
                return res.status(422).json({error: "Invalid Password"})
            }
        })
    }
    catch(err) {
        console.log(err);
    }
})

router.get('/profile')

router.put('/changePassword', jwtToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.admin;
  
    try {
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).send({ error: 'Admin not found' });
      }

      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res.status(401).send({ error: 'Current password is incorrect' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      admin.password = hashedPassword;
      await admin.save();
  

      res.status(200).send({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Server error' });
    }
  });

module.exports = router;