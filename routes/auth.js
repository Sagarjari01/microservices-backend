const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/login',(req,res)=>{
    const {name,password} = req.body
    if(!name || !password){
        return res.status(422).json({error:"Please fill all fields"})
    }
    const token = jwt.sign({user:name},JWT_SECRET)
    res.status(200).json({token})
})

module.exports = router