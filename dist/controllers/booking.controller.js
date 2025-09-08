import { Booking } from "../models/booking.model.js";
import { verifyToken } from "../utils/jwt.js";
import { Hotel } from "../models/hotel.model.js";
import stripe from "../config/stripe.js"; // ملف مخصص لتجهيز stripe instance
export const createBooking = async (req, res) => {
    try {
        const { hotelId, rooms, guests, nights, checkIn, checkOut, paymentMethod, totalPrice, } = req.body;
        // ✅ تحقق من وجود الفندق
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        // ✅ تحقق من التوكن
        const { decoded } = verifyToken(req.cookies.accessToken);
        const userEmail = decoded?.email ?? "guest";
        const userId = decoded?.id ?? undefined;
        // ✅ إنشاء الحجز
        const booking = await Booking.create({
            hotel: hotelId,
            user: userId,
            guestEmail: userEmail,
            checkIn,
            checkOut,
            rooms,
            guests,
            nights,
            paymentMethod,
            totalPrice,
            paymentStatus: paymentMethod === "card" ? "pending" : "paid",
        }); // Explicitly define the type to include _id
        if (!booking) {
            return res.status(400).json({ message: "Failed to create booking" });
        }
        const bookingId = booking._id.toString();
        // ✅ تجهيز الريسبونس حسب طريقة الدفع
        if (paymentMethod === "card") {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "egp",
                            product_data: { name: `حجز فندق - ${hotel.name}` },
                            unit_amount: Math.round(totalPrice * 100),
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.CLIENT_URL}/cancel`,
                metadata: { bookingId: bookingId }, // 🔗 ربط الجلسة بالحجز
            });
            return res.status(201).json({
                message: "Booking created successfully",
                checkoutUrl: session.url, // 🔗 ده هيروح للـ frontend
            });
        }
        // ✅ الدفع كاش
        return res.status(201).json({
            message: "Booking created successfully",
            payment: "تم الدفع كاش",
        });
    }
    catch (error) {
        console.error("Booking error:", error);
        return res.status(500).json({
            message: "Error creating booking",
            error: error.message,
        });
    }
};
// Webhook handler
export const stripeWebhook = async (req, res) => {
    try {
        const sig = req.headers["stripe-signature"];
        // نتحقق من التوقيع علشان نتأكد إن اللي بعت هو Stripe مش حد بيهاجمنا
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object;
                const bookingId = session.metadata?.bookingId;
                if (bookingId) {
                    await Booking.findByIdAndUpdate(bookingId, { paymentStatus: "paid" });
                }
                break;
            }
            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object;
                const bookingId = paymentIntent.metadata?.bookingId;
                if (bookingId) {
                    await Booking.findByIdAndUpdate(bookingId, { paymentStatus: "failed" });
                }
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        res.json({ received: true });
    }
    catch (err) {
        console.error("Webhook error:", err);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};
// ✅ Get Bookings Session
export const getBookingsSession = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
        // استخراج البيانات اللي انت محتاج الفرونت يشوفها بس
        const responseData = {
            amountPaid: session.amount_total,
            currency: session.currency,
            paymentStatus: session.payment_status,
            customerName: session.customer_details?.name || 'غير معروف',
            customerEmail: session.customer_details?.email || 'غير معروف',
            bookingId: session.metadata?.bookingId || null,
        };
        res.json(responseData);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        else {
            console.error('An unknown error occurred');
        }
        res.status(500).json({ error: 'فشل في جلب بيانات الجلسة' });
    }
};
// ✅ Get All Bookings
export const getBookings = async (_req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("hotel", "name city price")
            .populate("user", "email");
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
};
// ✅ Get Single Booking
export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id)
            .populate("hotel", "name city price")
            .populate("user", "email");
        if (!booking)
            return res.status(404).json({ message: "Booking not found" });
        res.json(booking);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching booking", error: error.message });
    }
};
// ✅ Delete Booking
export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking)
            return res.status(404).json({ message: "Booking not found" });
        res.json({ message: "Booking deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting booking", error: error.message });
    }
};
