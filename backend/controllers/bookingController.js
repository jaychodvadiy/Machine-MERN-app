import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  console.log("📩 Incoming Booking Data:", req.body); // Log request body

  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    console.log("✅ Booking Saved:", savedBooking); // Log stored data
    res
      .status(200)
      .json({
        success: true,
        message: "Your tour is booked",
        data: savedBooking,
      });
  } catch (err) {
    console.error("❌ Error Saving Booking:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get single booking by ID
export const getBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Booking.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Successful", data: book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all bookings
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();
    res.status(200).json({ success: true, message: "Successful", data: books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update an existing booking
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
