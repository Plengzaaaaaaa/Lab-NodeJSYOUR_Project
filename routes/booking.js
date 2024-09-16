const express = require("express");
const router = express.Router();
const { addBookingTime, updateBooking } = require("../controllers/bookingController");

router.post("/addbooking", addBookingTime);//สร้างคิวแต่ล่ะวัน
router.put("/booking", updateBooking);//จองห้องประชุม

module.exports = router;
