const express = require("express");
const { model } = require("mongoose");
const { getAllNotes, createNotes, updateNotes, deleteNotes, getSpecificNote } = require("../controllers/notesController");

const router = express.Router();


router.get("/", getAllNotes)

router.get("/:id", getSpecificNote)

router.post("/", createNotes)

router.put("/:id", updateNotes)

router.delete("/:id", deleteNotes)

module.exports = router;