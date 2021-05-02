const router = require("express").Router();
const { District } = require("../models/district");
const {Taluk} = require("../models/taluk");


// GET
router.get("/taluk", async (_, res) => {
    const data = await Taluk.find({}).sort({"_id": "-1"});
    if(data.length == 0) {
        return res.status(500).json({"message": "There is no data"})
    }
    return res.status(200).json({"taluks": data})
})


// GET District

router.get("/taluk/:id", async (req, res) => {
    const exist = await District.findById({_id: req.params.id});
    if(!exist) {
        return res.status(500).json({"message": "There is no district"})
    }
    const data = await Taluk.find({districtID: req.params.id}).sort({"_id": "-1"})
    return res.status(200).json({"taluks": data})
})


// POST
router.post("/taluk", async (req,res) => {
    const talukName = await Taluk.findOne({talukName: req.body.talukName});
    if(talukName) {
        return res.status(400).json({"error": `${req.body.talukName} already exist`});
    }
    const data = new Taluk({
        talukName: req.body.talukName,
        districtID: req.body.districtID
    })
    try {
        await data.save();
        return res.status(200).json({"status": "Data added successfully"})
    } catch(err) {
        return res.status(400).json({"error": "Something went wrong"});
    }
})

module.exports = router;