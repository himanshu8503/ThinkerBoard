import NoteModel from "../model/notes.js";

export async function getallNotes(req,res){
    try{
        const allNotes = await NoteModel.find().sort({createdAt:-1});

        return res.status(200).send(allNotes);
    }
    catch(error){
        console.error("ERROR FOUND FOR GETTING ALL NOTES : ",error)
        return res.status(500).json({msg:"INTERNAL SERVER ERROR"})
    }
}

export async function getNotes(req,res){
    try{
        const Note = await NoteModel.findById(req.params.id);
        if(!Note) return res.status(404).json({msg:"Note not Found"})
        return res.status(200).send(Note);
    }
    catch(error){
        console.error("ERROR FOUND FOR GETTING ALL NOTES : ",error)
        return res.status(500).json({msg:"INTERNAL SERVER ERROR"})
    }
}


export async function createNotes(req,res){
    try{
        const {title,content} = req.body;
        const note = await NoteModel.create({title,content})
        return res.status(200).send(note);
    }
    catch(error){
        console.error("ERROR FOUND FOR CREATING THE NOTES : ",error)
        return res.status(500).json({msg:"INTERNAL SERVER ERROR"})
    }
}

export async function updateNote(req,res){
    try{
        const {title,content} = req.body;
        const note = await NoteModel.findByIdAndUpdate(req.params.id,{title,content},{new:true});

        if(!note) return res.status(404).json({msg:"Note is not found"});

        return res.status(200).send(note);
    }
    catch(error){
        console.error("ERROR FOUND FOR UPDATING THE NOTES : ",error)
        return res.status(500).json({msg:"INTERNAL SERVER ERROR"})
    }
}

export async function deletingNote(req,res){
    try{
        const note = await NoteModel.findByIdAndDelete(req.params.id);

        if(!note) return res.status(404).json({msg:"Note is not found"});

        return res.status(200).json({msg:"Deleted the note Succesfully"})
    }
    catch(error){
        console.error("ERROR FOUND FOR DELETING THE NOTES : ",error)
        return res.status(500).json({msg:"INTERNAL SERVER ERROR"})
    }
}

