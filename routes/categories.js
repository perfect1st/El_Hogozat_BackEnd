const express = require("express");
const router = express.Router();
const Categories = require("../models/category");
router.get("/", async (req, res) => {

    try {
        const categories = await Categories.findAll();

        if (!categories) { return res.status(400).json({ message: "لا يوجد اقسام" }); }

        res.status(200).json(categories)

    } catch (error) {
        return res.status(500).send({ message: error || "حدثت مشكله ", });
    }

});


router.post("/", async (req, res) => {

    try {

        const { branchId, email, userName, mobile, regNum, birthDate, gender, password } = req.body;

        ///////////////////////////////////////////////////////////////////////////////////////////// Check  

        const categoryData = {
            cats_cat: "",
            cats_num: "",
            cats_nam: "",
            cats_enm: "",
            cats_key: "",
            cats_state: ""
        };

        const categoryObject = await Categories.create(categoryData);

        return res.status(201).send(categoryObject);

    } catch (error) {
        return res.status(500).send({ message: error || "حدثت مشكله اثناء عمليه الأضافه", });
    }

});


module.exports = router;