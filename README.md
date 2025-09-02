# booking-hotels-back-end-Api


# 🏨 Hotels API Usage (Frontend Guide)

## Base URL
جميع الـ Endpoints موجودة تحت:

[/api/hotels](/api/hotels)


---

## Endpoints

### 1. Get All Hotels
- **URL:** `/api/hotels`
- **Method:** `GET`
- **Description:** إرجاع قائمة بكل الفنادق.

📌 **Response Example:**
```json
[
  {
    "_id": "64d1234567abcd890ef12345",
    "name": "فندق النخبة",
    "city": "القاهرة",
    "price": 100,
    "rating": 4.5,
    "distance": 2,
    "images": ["/hotel.jpg", "/hotel2.jpg", "/hotel3.jpg"],
    "description": "فندق فاخر في قلب القاهرة مع جميع الخدمات الحديثة.",
    "rooms": 50,
    "availableRooms": 10,
    "services": ["♿ Accessibility", "👶 Babysitter", "💪 Gym"],
    "cancellationPolicy": "يمكنك إلغاء الحجز قبل 24 ساعة من الوصول.",
    "paymentPolicy": "يتم الدفع عند الوصول.",
    "minimumAge": 18
  }
]
````

---

### 2. Get Single Hotel by ID

* **URL:** `/api/hotels/:id`
* **Method:** `GET`
* **Description:** إرجاع بيانات فندق واحد حسب الـ ID.

📌 **Example:**

GET /api/hotels/64d1234567abcd890ef12345

---

## Frontend Integration Examples

### Using `fetch`

```js
// Get all hotels
async function getHotels() {
  try {
    const res = await fetch(`${URL}/api/hotels`);
    const data = await res.json();
    console.log("Hotels:", data);
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
}

// Get single hotel
async function getHotelById(id) {
  try {
    const res = await fetch(`${URL}/api/hotels/${id}`);
    const data = await res.json();
    console.log("Hotel:", data);
  } catch (error) {
    console.error("Error fetching hotel:", error);
  }
}
```

---

### Using `axios`

```js
import axios from "axios";

const API_URL = `${URL}/api/hotels`;

// Get all hotels
async function getHotels() {
  try {
    const res = await axios.get(API_URL);
    console.log("Hotels:", res.data);
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
}

// Get single hotel
async function getHotelById(id) {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    console.log("Hotel:", res.data);
  } catch (error) {
    console.error("Error fetching hotel:", error);
  }
}
```

---
