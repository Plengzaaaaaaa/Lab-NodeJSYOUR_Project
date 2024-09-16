const Booking = require("../models/booking"); // Corrected path reference

exports.addBookingTime = async (req, res) => {
    const { roomName, date } = req.body;

    try {
        // Create a new Booking document with provided values
        const newBooking = new Booking({
            roomName: roomName,
            date: new Date(date), // Ensure the date is a JavaScript Date object
            bookings: [
                { timeSlot: 1, bookedBy: null },
                { timeSlot: 2, bookedBy: null },
                { timeSlot: 3, bookedBy: null },
                { timeSlot: 4, bookedBy: null },
                { timeSlot: 5, bookedBy: null }
            ]
        });

        const savedBooking = await newBooking.save();
     
        res.status(201).json(savedBooking);
    } catch (err) {
        
        res.status(500).json({ message: err.message });
    }
};




exports.updateBooking = async (req, res) => {
    const { roomName, date, timeSlot, bookedBy } = req.body;

    try {
     
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

      
        const updatedBooking = await Booking.findOneAndUpdate(
            { roomName, date: parsedDate, "bookings.timeSlot": timeSlot },
            { $set: { "bookings.$.bookedBy": bookedBy } },
            { new: true }
        );

      
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

       
        res.status(200).json(updatedBooking);
    } catch (err) {
       
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};