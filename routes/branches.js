const express = require("express");
const router = express.Router();
const Branches = require("../models/branch");
router.get("/" ,async (req,res)=> { 
    const branches= await Branches.findAll(
        // {
        //     where : {cln_nam: "رايتو تجربة"}
        // }
    );
    
    res.status(200).json(branches)

});


module.exports = router;