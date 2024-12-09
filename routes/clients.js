const express = require("express");
const router = express.Router();
const Clients = require("../models/clients");


router.get("/", async (req, res) => {
    const clients = await Clients.findAll({ where: { cln_L4: "824298" } });
    res.status(200).json(clients)

});


router.post("/", async (req, res) => {

    try {

        const { branchId, email, userName, mobile, regNum, birthDate, gender } = req.body;
        ///////////////////////////////////////////////////////////////////////////////////////////////   
        let clnKey = "1104";
        clnKey += (parseInt("0000", 10) + branchId).toString().padStart(4, "0");
        clnKey += "0001";
        const lastClient = await Clients.findOne({ order: [['cln_L4', 'DESC']] });
        let serialNumber = lastClient.cln_L4 + 1;
        clnKey += (parseInt("000000", 10) + serialNumber).toString().padStart(6, "0");
        let [day, month, year] = req.body.birthDate.split("-");
        let date = new Date(Date.UTC(year, month - 1, day, 22, 0, 0, 0));
        ///////////////////////////////////////////////////////////////////////////////////////////////
        console.log(lastClient)

        const clientData = {
            cln_L1: 1104, // ثابت
            cln_L2: branchId, // رقم الفرع
            cln_L4: serialNumber, // رقم مسلسل
            cln_email: email,
            cln_username: userName, // اسم المستخدم
            cln_birthdate: date, // تاريخ الميلاد
            cln_RegNum: regNum, // رقم الهويه
            cln_mobl: mobile, // رقم الهاتف
            cln_typ: gender, // النوع  ذكر - انثي 
            cln_date: req.body.birthDate,
            cln_key: Number(clnKey),
            cln_nam: userName,
            cln_enm: userName,
            cln_prsn: userName,
            cln_RegName: userName,
        };

        const clientObject = await Clients.create(clientData);

        res.status(201).send(clientObject);

    } catch (error) {
        res.status(500).send({ message: err || "حدثت مشكله اثناء عمليه الأضافه", });
    }

});

router.put("/:id", async (req, res) => {
    const id = req.params.id;

    console.log(req.body)

    try {

        const update = await Clients.update(req.body, { where: { cln_L4: id }, });
        if (update == 1) {
            res.status(200).send({ message: "تم تعديل بيانات هذا العميل" });
        }
        else {
            console.log(update)
            res.status(500).send({ message: "لدينا مشكله في عمليه تعديل هذا العميل" });
        }

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {

    try {
        const id = req.params.id;

        const update = await Clients.destroy({ where: { cln_L4: id }, });
        if (update == 1) {
            res.status(200).send({ message: "تم حذف بيانات هذا العميل" });
        }
        else {
            console.log(update)
            res.status(500).send({ message: "لدينا مشكله في عمليه حذف هذا العميل" });
        }

    } catch (error) {
        res.status(500).send({ message: error.message });
    }


});


module.exports = router;