import { Hotel } from "../models/hotel.model.js";
export const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching hotels", error });
    }
};
export const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.status(200).json(hotel);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching hotel", error });
    }
};
