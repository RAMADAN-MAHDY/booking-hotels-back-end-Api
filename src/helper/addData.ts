import { Hotel } from "../models/hotel.model.js";

const hotels = [
  {
    name: "فندق النخبة",
    city: "القاهرة",
    price: 100,
    rating: 4.5,
    distance: 2,
    images: ["/hotel.jpg", "/hotel2.jpg", "/hotel3.jpg"],
    description: "فندق فاخر في قلب القاهرة مع جميع الخدمات الحديثة.",
    rooms: 50,
    availableRooms: 10,
    services: [
      "♿ Accessibility",
      "👶 Babysitter",
      "⚡ Electric charging station 22kW",
      "💪 Gym",
      "🅿️ Parking",
      "🐾 Pets",
      "🏊 Pool",
      "🧖 Spa",
    ],
    cancellationPolicy: "يمكنك إلغاء الحجز قبل 24 ساعة من الوصول.",
    paymentPolicy: "يتم الدفع عند الوصول.",
    minimumAge: 18,
  },
  {
    name: "فندق البحر الأحمر",
    city: "الغردقة",
    price: 80,
    rating: 4,
    distance: 5,
    images: ["/hotel4.jpg", "/hotel5.jpg", "/hotel6.jpg"],
    description:
      "فندق جميل يطل على البحر الأحمر ويوفر العديد من الأنشطة البحرية.",
    rooms: 40,
    availableRooms: 5,
    services: [
      "⚡ Electric charging station 7kW",
      "💪 Gym",
      "🅿️ Parking",
      "🏊 Pool",
      "🧖 Spa",
    ],
    cancellationPolicy: "يجب إلغاء الحجز قبل 48 ساعة من الوصول.",
    paymentPolicy: "يتم الدفع مقدماً.",
    minimumAge: 16,
  },
  {
    name: "فندق الأهرامات",
    city: "الجيزة",
    price: 120,
    rating: 4.8,
    distance: 1.2,
    images: ["/hotel7.jpg", "/hotel8.jpg", "/hotel9.jpg"],
    description: "فندق فاخر بجوار الأهرامات مع إطلالة رائعة.",
    rooms: 60,
    availableRooms: 8,
    services: [
      "♿ Accessibility",
      "⚡ Electric charging station 50-150kW",
      "🐾 Pets",
      "🧖 Spa",
      "🅿️ Parking",
    ],
    cancellationPolicy: "يمكنك إلغاء الحجز قبل 72 ساعة من الوصول.",
    paymentPolicy: "يتم الدفع عند الوصول.",
    minimumAge: 18,
  },
  {
    name: "فندق البحرين",
    city: "شرم الشيخ",
    price: 140,
    rating: 5,
    distance: 3.5,
    images: ["/hotel10.jpg", "/hotel11.jpg", "/hotel12.jpg"],
    description: "منتجع فاخر في شرم الشيخ مع شاطئ خاص.",
    rooms: 80,
    availableRooms: 15,
    services: [
      "🚌 Shuttle",
      "⚡ Electric charging station 7kW",
      "💪 Gym",
      "🏊 Pool",
      "🧖 Spa",
    ],
    cancellationPolicy: "يمكنك إلغاء الحجز قبل 24 ساعة من الوصول.",
    paymentPolicy: "يتم الدفع مقدماً.",
    minimumAge: 18,
  },
  {
    name: "فندق الماس",
    city: "شرم الشيخ",
    price: 150,
    rating: 5,
    distance: 4,
    images: ["/hotel13.jpg", "/hotel14.jpg", "/hotel15.jpg"],
    description: "منتجع فاخر في شرم الشيخ مع شاطئ خاص.",
    rooms: 80,
    availableRooms: 15,
    services: [
      "⚡ Electric charging station 22kW",
      "🅿️ Parking",
      "🐾 Pets",
      "🏊 Pool",
      "🧖 Spa",
    ],
    cancellationPolicy: "يجب إلغاء الحجز قبل 48 ساعة من الوصول.",
    paymentPolicy: "يتم الدفع عند الوصول.",
    minimumAge: 18,
  },
  {
    name: "فندق الواحة",
    city: "الغردقة",
    price: 95,
    rating: 4.3,
    distance: 2.8,
    images: ["/hotel16.jpg", "/hotel17.jpg", "/hotel18.jpg"],
    description: "فندق ممتاز مع حمام سباحة ومنطقة استرخاء في الغردقة.",
    rooms: 40,
    availableRooms: 12,
    services: [
      "♿ Accessibility",
      "⚡ Electric charging station 7kW",
      "💪 Gym",
      "🏊 Pool",
      "🧖 Spa",
    ],
    cancellationPolicy: "يمكنك إلغاء الحجز قبل 24 ساعة من الوصول.",
    paymentPolicy: "يتم الدفع مقدماً.",
    minimumAge: 18,
  },
];

export const seedHotels = async () => {
  try {

    await Hotel.insertMany(hotels);
    console.log("✅ Hotels seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding hotels:", error);
    process.exit(1);
  }
};

