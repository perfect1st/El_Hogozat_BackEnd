const express = require("express");
const router = express.Router();
const Service = require("../models/service");
router.get("/" ,async (req,res)=> { 
    
    const services= await Service.findAll();
    try {
        const services= await Service.findAll();

        if (!services) { return res.status(400).json({ message: "لا يوجد خدمات" }); }

        res.status(200).json(services)

    } catch (error) {
        return res.status(500).send({ message: error || "حدثت مشكله ", });
    }

});


module.exports = router;