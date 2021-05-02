const router = require("express").Router();
const {Election} = require("../models/election");
const {storage} = require("../config");
const multer = require("multer");
const { District } = require("../models/district");
const { Taluk } = require("../models/taluk");



// Upload
const upload = multer({
    storage: multer.memoryStorage(),
});

const uploadPhoto = upload.single('file');


// GET
router.get("/election", async(_,res) => {
    const data = await Election.find({}).populate("district taluk").sort({"votecount": "-1"});
    if(data.length == 0) {
        return res.status(200).json({"message": "There is no data"});
    }
    return res.status(200).json({"elections": data});
})


// POST
router.post("/election", uploadPhoto, async(req, res) => {
    let file = req.file
    let metadata = {contentType: file.mimetype, name: file.originalname}
    var storageRef = storage.ref().child(`election/${Date.now()}_${file.originalname}`).put(file.buffer, metadata)
    storageRef.on(
        "state_changed",
        (snapshot) => { },
        (error) => {
            return res.status(400).json({"error": "Something went wrong"});
        },
        () => {
            storageRef.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                const data = new Election({
                    name: req.body.name,
                    gender: req.body.gender,
                    district: req.body.district,
                    taluk: req.body.taluk,
                    votecount: req.body.votecount,
                    party: req.body.party,
                    picture: downloadURL,
                })
                try {
                    await data.save();
                    return res.status(200).json({"status": "Data added successfully"});
                } catch(err) {
                    return res.status(400).json({"error": "Something went wrong"});
                }
            })
        }
    )
})


// GET District
router.get("/election/:district", async (req,res) => {
    const exist = await District.findById({_id: req.params.district});
    if(!exist) {
        return res.status(200).json({"message": "There is no district!"})
    }
    const data = await Election.find({district: req.params.district}).populate("district taluk").sort({"votecount":"-1"});
    if(data.length == 0) {
        return res.status(200).json({"message": "There is no data"})
    }
    return res.status(200).json({"elections": data});
})


// GET Party
router.get("/electionparty/:party", async (req,res) => {
    const data = await Election.find({party: req.params.party}).populate("district taluk").sort({"votecount":"-1"})
    if(data.length == 0) {
        return res.status(200).json({"message": "There is no data"})
    }
    return res.status(200).json({"elections": data});
})


// GET Taluk
router.get("/electionbytaluk/:taluk", async (req,res) => {
    const existTaluk = await Taluk.findById({_id: req.params.taluk});
    if(!existTaluk) {
        return res.status(200).json({"message": "There is no data!"})
    }
    const data = await Election.find({taluk: req.params.taluk}).populate("district taluk").sort({"votecount": "1"});
    if(data.length == 0) {
        return res.status(200).json({"message": "There is no data"})
    }
    return res.status(200).json({"elections": data});
})


// GET DIstrict ID and Party Name
router.get("/electionsort/:districtid/:party", async (req,res) => {
    const data = await Election.find({district: req.params.districtid, party: req.params.party}).populate("district taluk").sort({"votecount": "1"});
    if(data.length == 0){
        return res.status(200).json({"message": "There is no data"})
    }
    return res.status(200).json({"elections": data});
})

// DELETE
router.delete("/election/:id", async(req,res) => {
    const exist = await Election.findById({_id:  req.params.id});
    if(!exist) {
        return res.status(200).json({"message": "There is no user!"})
    }
    try {
        const data = await Election.findById({_id: req.params.id});
        storage.refFromURL(data.picture).delete().then(async () => {
            await Election.findByIdAndDelete({_id: req.params.id});
            return res.status(200).json({"status": "Data is removed from database"});
        })
    } catch(err) {
        return res.status(400).json({"error": "Something went wrong"});
    }
})


module.exports = router;