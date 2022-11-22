const express = require('express')
const router = express.Router()
const path = require('path');
const jsonpatch = require('fast-json-patch')
const mongoose = require('mongoose')
const sharp = require('sharp')
const authenticate = require('../middleware/authenticate')
let download = require('image-downloader')
const User = mongoose.model('Users')
const imageExtensions = ['jpg', 'tif', 'gif', 'png', 'svg']

const get_url_extension = ( url ) => {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}


// add address for user into database
router.post('/add-address',authenticate,(req,res)=>{
    const {address} = req.body
    User.findOne({name:req.user})
    .then((isSaved)=>{
        if(isSaved){
            // console.log(isSaved)
            isSaved.address.push(address)
            isSaved.save()
            return res.json({user:isSaved})
        }
        const user = new User({
            name:req.user,
            address
        })
        user.save()
        .then((savedUser)=>{
            return res.json({user:savedUser})
        })
    })
})

// json patch for object
router.patch('/patch',authenticate,(req,res)=>{
    let {document ,operation } = req.body
    let updateddoc= jsonpatch.applyOperation(document, operation).newDocument;
    if(updateddoc){
        return res.status(200).json({"document":updateddoc})
    }
    return res.status(422).json({error:"something went wrong"})
})

// create thumbnail of 50x50
router.post('/thumbnail',authenticate,(req,res)=>{
    const {imgUrl} = req.body
    let imgExtension = get_url_extension(imgUrl)
    let original = path.join(__dirname,'..','imgs','original')
    const resizedFolder = path.join(__dirname,'..','imgs','resized','resize')
    if(imageExtensions.includes(imgExtension)){
        let options = {
            url:imgUrl,
            dest:original
        }
        download.image(options)
        .then((img)=>{
            sharp(img.filename)
            .resize(50,50)
            .toFile(`${resizedFolder}output.${imgExtension}`)
            .then((data)=>{
                return res.json({converted:true,thumbnail:`${resizedFolder}output.${imgExtension}`})
            })
            .catch((err)=>res.send(err))
        })
    }else{
        return res.status(400).json({error:`No files with standard extension: ${[imageExtensions]}`})
    } 
})

module.exports = router