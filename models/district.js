const mongoose = require("mongoose");



const districtSchema = new mongoose.Schema({
    districtName: {
        type: String,
        required: true,
    },
});


const DistrictSchema = mongoose.model('District', districtSchema);

module.exports = {District: DistrictSchema};