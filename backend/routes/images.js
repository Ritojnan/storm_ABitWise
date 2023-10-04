const express = require('express');
const router = express.Router();
// const fetchuser = require('../middleware/fetchuser');
const Image = require('../models/Image');
// const { body, validationResult } = require('express-validator');
const multer = require('multer')

const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')

    },
    filename:function(req,file,cb){
        // const uniqueSuffix=Date.now()+'-'+Math.round(Math.round()*1E9)
        // cb(null,file.fieldname+'-'+uniqueSuffix)
        const uniqueSuffix=Date.now()
        cb(null,uniqueSuffix+file.originalname)
    },
})

const upload=multer({storage:storage})
// ROUTE 1: Get All the Notes using: GET "/api/images/uploadimage". Login required

router.post('/uploadimage',upload.single("image"),async(req,res)=>{
console.log(req.body);
const imageName =req.file.filename;

try{
    await Image.create({image:imageName})
    res.json({status:"ok"})
}catch(error){
    res.json({status:error})
}
// const {base64}=req.body;
// try{
//     Image.create({image:base64});
//     res.send({Status:"ok"})
// }
// catch(error){

// res.status(500).send("Internal Server Error");

// }
}

)



// ROUTE 2: Get All the Notes using: GET "/api/images/getimage". Login required

router.get('/getimage',async(req,res)=>{
    try{
await Image.find({}).then(data=>{
    res.send({status:"ok",data:data})
})

}
    catch(error){
    
    res.status(500).send("Internal Server Error");
    
    }
    }
    )

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
// router.get('/fetchallnotes', fetchuser, async (req, res) => {
//     try {
//         const notes = await Note.find({ user: req.user.id });
//         res.json(notes)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
// router.post('/addnote', fetchuser, [
//     body('title', 'Enter a valid title').isLength({ min: 3 }),
//     body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
//         try {
//             const { title, description, tag } = req.body;

//             // If there are errors, return Bad request and the errors
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }
//             const note = new Note({
//                 title, description, tag, user: req.user.id
//             })
//             const savedNote = await note.save()

//             res.json(savedNote)

//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send("Internal Server Error");
//         }
//     })

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
// router.put('/updatenote/:id', fetchuser, async (req, res) => {
//     const { title, description, tag } = req.body;
//     try {
//         // Create a newNote object
//         const newNote = {};
//         if (title) { newNote.title = title };
//         if (description) { newNote.description = description };
//         if (tag) { newNote.tag = tag };

//         // Find the note to be updated and update it
//         let note = await Note.findById(req.params.id);
//         if (!note) { return res.status(404).send("Not Found") }

//         if (note.user.toString() !== req.user.id) {
//             return res.status(401).send("Not Allowed");
//         }
//         note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
//         res.json({ note });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
// router.delete('/deletenote/:id', fetchuser, async (req, res) => {
//     try {
//         // Find the note to be delete and delete it
//         let note = await Note.findById(req.params.id);
//         if (!note) { return res.status(404).send("Not Found") }

//         // Allow deletion only if user owns this Note
//         if (note.user.toString() !== req.user.id) {
//             return res.status(401).send("Not Allowed");
//         }

//         note = await Note.findByIdAndDelete(req.params.id)
//         res.json({ "Success": "Note has been deleted", note: note });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })
module.exports = router