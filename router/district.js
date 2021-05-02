const router = require("express").Router();
const {District} = require("../models/district");


// GET
router.get("/district", async (_, res) => {
    const data = await District.find({}).sort({"_id": "-1"});
    if(data.length == 0) {
        return res.status(500).json({"message": "There is no data"})
    }
    return res.status(200).json({"districts": data});
})


// POST
router.post("/district", async (req, res) => {
    const districtName = await District.findOne({districtName: req.body.districtName});
    if(districtName) {
        return res.status(400).json({"error": `${req.body.districtName} already exist`})
    }
    const data = new District({
        districtName: req.body.districtName
    })
    try {
        await data.save();
        return res.status(200).json({"status": "Data added successfully"})
    } catch(err) {
        return res.status(400).json({"error":"Something went wrong"});
    }
})

module.exports = router;