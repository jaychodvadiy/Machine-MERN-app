import React, { useState, useContext, useRef } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const price = tour?.price ? Number(tour.price) : 990;
  const title = tour?.title || "Tour Package";

  const [booking, setBooking] = useState({
    userId: user?._id || "",
    userEmail: user?.email || "",
    tourName: title,
    price: price || "",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const serviceFee = 10;
  const totalAmount = price * Number(booking.guestSize) + serviceFee;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prev) => ({ ...prev, [id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(" Booking Button Clicked!");
    console.log(" Debugging AuthContext User:", user);

    if (!user || (!user._id && !user.id)) {
      setErrorMessage(" You must be logged in to book a tour.");
      return;
    }

    const { fullName, phone, guestSize, bookAt } = booking;

    if (!fullName.trim() || !phone.trim() || !bookAt || guestSize < 1) {
      console.log(" Missing required fields:", booking);
      setErrorMessage(" All fields are required.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      console.log(" Invalid phone number.");
      setErrorMessage(" Phone number must be exactly 10 digits.");
      return;
    }

    setLoading(true);
    setErrorMessage(""); 

    try {
      const bookingData = {
        userId: user._id || user.id, 
        userEmail: user.email,
        tourName: booking.tourName,
        fullName,
        phone,
        guestSize: Number(guestSize),
        bookAt,
        price: booking.price,
      };

      console.log(" Sending API Request with data:", JSON.stringify(bookingData, null, 2));

      const res = await fetch(`${BASE_URL}/v1/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bookingData),
      });

      console.log(" API Response Status:", res.status);

      const result = await res.json();
      console.log(" API Response:", result);

      if (!res.ok) {
        console.error(" API Error:", result);
        setErrorMessage(result.error || " Booking failed. Please try again.");
        setLoading(false);
        return;
      }
      navigate('/thank-you')
      console.log(" Booking successful!");
      setLoading(false);
    } catch (err) {
      console.error(" Fetch Error:", err.message);
      setErrorMessage(" An error occurred. Please try again.");
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div className="booking">
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form">
          <FormGroup>
            <input type="text" placeholder="Full Name" id="fullName" required onChange={handleChange} value={booking.fullName} />
          </FormGroup>
          <FormGroup>
            <input type="text" placeholder="Phone (10 digits)" id="phone" required onChange={handleChange} value={booking.phone} maxLength="10" />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input type="date" id="bookAt" required onChange={handleChange} value={booking.bookAt} />
            <input type="number" placeholder="Guests" id="guestSize" required onChange={handleChange} value={booking.guestSize} min="1" />
          </FormGroup>
        </Form>

        {/* Error message display */}
        {errorMessage && (
          <div className="error-message mt-2 text-danger">
            <strong>{errorMessage}</strong>
          </div>
        )}
      </div>

      <div className="booking">
        <div className="booking__bottom">
          <ListGroup className="booking-summary">
            <ListGroupItem className="border-0 px-0 d-flex justify-content-between align-items-center">
              <h5>₹{price} × {booking.guestSize} person</h5>
              <span className="price">₹{price * booking.guestSize}</span>
            </ListGroupItem>
            <ListGroupItem className="border-0 px-0 d-flex justify-content-between align-items-center">
              <h5>Service charges</h5>
              <span className="service-fee">₹{serviceFee}</span>
            </ListGroupItem>
            <ListGroupItem className="border-0 px-0 d-flex justify-content-between align-items-center total-amount">
              <h5><strong>Total</strong></h5>
              <span><strong>₹{totalAmount}</strong></span>
            </ListGroupItem>
          </ListGroup>
          <Button className="btn book-now-btn w-100 mt-3" onClick={handleClick} disabled={loading}>
            {loading ? "Processing..." : "Book Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
