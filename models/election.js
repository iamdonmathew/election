const mongoose = require("mongoose");


const electionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "District"
    },
    taluk: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Taluk',
    },
    votecount: {
        type: Number,
        required: true,
    },
    party: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: false,
    },
});


const ElectionSchema = mongoose.model('Election', electionSchema);

module.exports = {Election: ElectionSchema};