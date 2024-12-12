const express = require("express");
const router = express.Router();
const Employees = require("../models/employee");
router.get("/" ,async (req,res)=> { 

    try {
        const employees= await Employees.findAll({});

        if (!employees) { return res.status(400).json({ message: "لا يوجد موظفين" }); }

        res.status(200).json(employees)

    } catch (error) {
        return res.status(500).send({ message: error || "حدثت مشكله ", });
    }
});


module.exports = router;