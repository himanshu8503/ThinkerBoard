import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
},{timestamps:true});

const NoteModel = mongoose.model("notes",notesSchema);

export default NoteModel;

