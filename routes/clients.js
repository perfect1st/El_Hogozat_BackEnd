const express = require("express");
const router = express.Router();
const Clients = require("../models/clients");
router.get("/" ,async (req,res)=> { 
    const clients= await Clients.findAll({});
    
    res.status(200).json(clients)

});


module.exports = router;