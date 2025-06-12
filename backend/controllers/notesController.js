const Note = require("../models/Note");

const getAllNotes =async (req, res)=>{
    try{
        const allNotes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Notes fetched successfully",
            data: allNotes
        });
    }catch(err){
        console.error("Error fetching notes:", err.message);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

const createNotes =async (req, res)=>{
    try{
        const { title, content} = req.body;
        await Note.create({
            title,
            content
        })
        res.status(201).json({
            message: "Note created successfully",
        });
    }catch(err){
        console.error("Error creating note:", err.message);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

const updateNotes =async (req, res)=>{
    try{
        const { id } = req.params;
        const { title, content } = req.body;
        const findNote = await Note.findById(id);
        if(!findNote){
            return res.status(404).json({
                message: "Note not found"
            });
        }
        findNote.title = title;
        findNote.content = content;
        await findNote.save();
        res.status(200).json({
            message: "Note updated successfully",
            data: findNote
        });
    }catch(err){
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

const deleteNotes =async (req, res)=>{
    try{
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.status(200).json({
            message: "Note deleted successfully",
        });
    }catch(err){
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

const getSpecificNote = async (req, res)=>{
    try{
        const { id } = req.params;
        const findNote = await Note.findById(id);
        if(!findNote){
            return res.status(404).json({
                message: "Note not found"
            });
        }
        res.status(200).json({
            message: "Note fetched successfully",
            data: findNote
        });
    }catch(err){
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}


module.exports = {
    getAllNotes,
    createNotes,
    updateNotes,
    deleteNotes,
    getSpecificNote
}