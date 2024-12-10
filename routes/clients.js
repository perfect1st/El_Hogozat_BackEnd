const express = require("express");
const router = express.Router();
const Clients = require("../models/clients");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config")
router.get("/:id", async (req, res) => {
   
    try {
        const clients = await Clients.findOne({ where: { cln_L4: req.params.id } });
        if(!clients){
            return res.status(400).json({message : "لا يوجد مستخدمين"});
        }
        res.status(200).json(clients)

    } catch (error) {
        return res.status(500).send({ message: error || "حدثت مشكله ", });   
    }

});


router.post("/register", async (req, res) => {

    try {

        const { branchId, email, userName, mobile, regNum, birthDate, gender , password } = req.body;

        ///////////////////////////////////////////////////////////////////////////////////////////// Check  

        const emailCheck = await Clients.findOne({ where: { cln_email: email } });
        const usernameCheck = await Clients.findOne({ where: { cln_username: userName } });
        if (emailCheck) { return res.status(400).send({ message: "هذا الأيميل مستخدم بالفعل" }); }
        if (usernameCheck) { return res.status(400).send({ message: "هذا المستخدم موجود بالفعل" }); }

        /////////////////////////////////////////////////////////////////////////////////////// Generate cln_key , date

        let clnKey = "1104";
        clnKey += (parseInt("0000", 10) + branchId).toString().padStart(4, "0");
        clnKey += "0001";
        const lastClient = await Clients.findOne({ order: [['cln_L4', 'DESC']], where: { cln_L1: 1104 } });
        let serialNumber = lastClient.cln_L4 + 1;
        clnKey += (parseInt("000000", 10) + serialNumber).toString().padStart(6, "0");
        let [day, month, year] = birthDate.split("-");
        let date = new Date(Date.UTC(year, month - 1, day, 22, 0, 0, 0));

        // ///////////////////////////////////////////////////////////////////////////////////////////////

        // console.log(serialNumber)

        const clientData = {
            cln_L1: 1104, // ثابت
            cln_L2: branchId, // رقم الفرع
            cln_L4: serialNumber, // رقم مسلسل
            cln_email: email, // البريد الألكتروني
            cln_pass: bcrypt.hashSync(password , 10), // الباسورد
            cln_username: userName, // اسم المستخدم
            cln_birthdate: date, // تاريخ الميلاد
            cln_RegNum: regNum, // رقم الهويه
            cln_mobl: mobile, // رقم الهاتف
            cln_typ: Number(gender), // النوع  ذكر - انثي 
            cln_date: new Date().toISOString().split(":")[0].split("T")[0], // تاريخ اليوم
            cln_key: Number(clnKey),
            cln_nam: userName,
            cln_enm: userName,
            cln_prsn: userName,
            cln_RegName: userName,
        };

        const clientObject = await Clients.create(clientData);

        return  res.status(201).send(clientObject);

    } catch (error) {
        return res.status(500).send({ message: error || "حدثت مشكله اثناء عمليه الأضافه", });
    }

});

router.post("/login", async (req, res) => {

    try {

        const { email , password } = req.body;
        let userFound = await Clients.findOne({where : {cln_email : email}});
        if(!userFound){  return res.status(400).send({message : "هذا المستخدم غير متاح"});   }
        if(userFound && !bcrypt.compareSync(password , userFound.cln_pass) ){
            return res.status(400).send({message : "من فضلك تأكد من الباسورد اذا كان صحيحا"});
        }

        const token = jwt.sign(
            {
            cln_L4: userFound.cln_L4,
            cln_username: userFound.cln_username,
            cln_email: userFound.cln_email,
        },
         process.env.secret );

          return  res.status(200).send( { ...userFound.dataValues, token } );

    } catch (error) {
        return res.status(500).send({ message: error || "حدثت مشكله اثناء عمليه الأضافه", });
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