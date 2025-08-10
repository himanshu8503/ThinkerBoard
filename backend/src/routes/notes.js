import { Router } from "express";
import { createNotes, deletingNote, getallNotes, getNotes, updateNote } from "../controlles/notes.js";

const notesRouter = Router();

notesRouter.get("/",getallNotes);

notesRouter.get("/:id",getNotes);

notesRouter.post("/",createNotes);

notesRouter.put("/:id",updateNote);

notesRouter.delete("/:id",deletingNote);

export default notesRouter;
