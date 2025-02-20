// bookings.js
import express from "express";
import {
  createBooking,
  getAllBooking,
  getBooking,
  updateBooking,
} from "../controllers/bookingController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", createBooking);  
router.get("/:id", getBooking);   
router.get("/", getAllBooking);   
router.put("/:id", updateBooking);


export default router;
