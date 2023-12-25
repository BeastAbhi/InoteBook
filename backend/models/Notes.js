const mongoose = require('mongoose');
const { Schema } = mongoose;


const NoteSchema = new Schema({
    user:{
        //This shows the notes of a same user
        //By this block the user cnnot see other user's notes
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        require:true
    },
    description:{
        type: String,
        require:true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('notes', NoteSchema);