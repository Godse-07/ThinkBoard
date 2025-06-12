const mongoose = require("mongoose");

const mongooseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Note = mongoose.model("Note", mongooseSchema);
module.exports = Note;