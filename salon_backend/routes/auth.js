const express = require("express")
const {RegisterUser,LoginUser, ResgisterStaff ,getStaffById} = require("../controller/authController");

const router = express.Router();

router.post("/registeruser" , RegisterUser)
router.post("/loginuser" , LoginUser)
router.post("/registerstaff" , ResgisterStaff)
router.get("/getstaff/:SalonId" , getStaffById)

module.exports = router;