const mongoose = require("mongoose");



const talukSchema = new mongoose.Schema({
    talukName: {
        type: String,
        required: true,
    },
    districtID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "District"
    }
});


const TalukSchema = mongoose.model('Taluk', talukSchema);

module.exports = {Taluk: TalukSchema};