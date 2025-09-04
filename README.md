# booking-hotels-back-end-Api


# 🏨 Hotels API Usage (Frontend Guide)

## Base URL
جميع الـ Endpoints موجودة تحت:
```
https://booking-hotels-back-end-api.vercel.app
```

---

## Endpoints

##  دليل استخدام المصادقة في الواجهة الأمامية

يعتمد نظام المصادقة في الواجهة الخلفية على استخدام `HTTP-only cookies` لتخزين `access token` و `refresh token`. هذا يعني أن المتصفح سيتعامل مع هذه الكوكيز تلقائيًا، مما يزيد من الأمان ويقلل من مخاطر هجمات `XSS`.

### 1. التسجيل (Register)

لإنشاء حساب مستخدم جديد، ستحتاج إلى إرسال طلب `POST` إلى نقطة نهاية التسجيل مع البريد الإلكتروني وكلمة المرور.

**نقطة النهاية:** `/api/Auth/register`
**النوع:** `POST`

**مثال باستخدام `fetch`:**

```javascript
// ... existing code ...

async function registerUser(email, password) {
  try {
    const response = await fetch('https://booking-hotels-back-end-api.vercel.app/api/Auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('User registered successfully:', data.message);
      // يمكنك توجيه المستخدم إلى صفحة تسجيل الدخول أو عرض رسالة نجاح
    } else {
      console.error('Registration failed:', data.message);
      // عرض رسالة خطأ للمستخدم
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
}

// مثال للاستخدام
// registerUser('test@example.com', 'password123');

// ... existing code ...
```

**مثال باستخدام `axios`:**

```javascript
// ... existing code ...

import axios from 'axios';

async function registerUserAxios(email, password) {
  try {
    const response = await axios.post('https://booking-hotels-back-end-api.vercel.app/api/Auth/register', {
      email,
      password,
    });
    console.log('User registered successfully:', response.data.message);
    // يمكنك توجيه المستخدم إلى صفحة تسجيل الدخول أو عرض رسالة نجاح
  } catch (error) {
    console.error('Registration failed:', error.response ? error.response.data.message : error.message);
    // عرض رسالة خطأ للمستخدم
  }
}

// مثال للاستخدام
// registerUserAxios('test@example.com', 'password123');

// ... existing code ...
```

### 2. تسجيل الدخول (Login)

لتسجيل دخول المستخدم والحصول على التوكنات، ستحتاج إلى إرسال طلب `POST` مع البريد الإلكتروني وكلمة المرور. سيتم تعيين الكوكيز تلقائيًا بواسطة المتصفح.

**نقطة النهاية:** `/api/Auth/login`
**النوع:** `POST`

**مثال باستخدام `fetch`:**

```javascript
// ... existing code ...

async function loginUser(email, password) {
  try {
    const response = await fetch('https://booking-hotels-back-end-api.vercel.app/api/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Login successful:', data.message);
      // بمجرد تسجيل الدخول بنجاح، سيتم تعيين الكوكيز تلقائيًا.
      // يمكنك توجيه المستخدم إلى لوحة التحكم أو الصفحة الرئيسية.
    } else {
      console.error('Login failed:', data.message);
      // عرض رسالة خطأ للمستخدم
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
}

// مثال للاستخدام
// loginUser('test@example.com', 'password123');

// ... existing code ...
```

**مثال باستخدام `axios`:**

```javascript
// ... existing code ...

import axios from 'axios';

async function loginUserAxios(email, password) {
  try {
    const response = await axios.post('https://booking-hotels-back-end-api.vercel.app/api/Auth/login', {
      email,
      password,
    }, {
      withCredentials: true, // مهم لإرسال واستقبال الكوكيز
    });
    console.log('Login successful:', response.data.message);
    // بمجرد تسجيل الدخول بنجاح، سيتم تعيين الكوكيز تلقائيًا.
    // يمكنك توجيه المستخدم إلى لوحة التحكم أو الصفحة الرئيسية.
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data.message : error.message);
    // عرض رسالة خطأ للمستخدم
  }
}

// مثال للاستخدام
// loginUserAxios('test@example.com', 'password123');

// ... existing code ...
```

### 3. التحقق من التوكن (Verify Token)

للتحقق مما إذا كان التوكن الحالي صالحًا (على سبيل المثال، عند تحميل الصفحة أو الوصول إلى مسار محمي)، يمكنك إرسال طلب إلى نقطة نهاية التحقق. سيتم إرسال `accessToken` تلقائيًا مع الطلب عبر الكوكيز.

**نقطة النهاية:** `/api/Auth/veryfayToken`
**النوع:** `POST`

**مثال باستخدام `fetch`:**

```javascript
// ... existing code ...

async function verifyAuthToken() {
  try {
    const response = await fetch('https://booking-hotels-back-end-api.vercel.app/api/Auth/veryfayToken', {
      method: 'POST',
      // لا حاجة لإضافة headers للتوكن، المتصفح يرسل الكوكيز تلقائيًا
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Token is valid:', data.message);
      return true;
    } else {
      console.error('Token verification failed:', data.message);
      return false;
    }
  } catch (error) {
    console.error('Error during token verification:', error);
    return false;
  }
}

// مثال للاستخدام
// verifyAuthToken().then(isValid => {
//   if (isValid) {
//     console.log('User is authenticated');
//   } else {
//     console.log('User is not authenticated');
//     // توجيه المستخدم إلى صفحة تسجيل الدخول
//   }
// });

// ... existing code ...
```

**مثال باستخدام `axios`:**

```javascript
// ... existing code ...

import axios from 'axios';

async function verifyAuthTokenAxios() {
  try {
    const response = await axios.post('https://booking-hotels-back-end-api.vercel.app/api/Auth/veryfayToken', null, {
      withCredentials: true, // مهم لإرسال واستقبال الكوكيز
    });
    console.log('Token is valid:', response.data.message);
    return true;
  } catch (error) {
    console.error('Token verification failed:', error.response ? error.response.data.message : error.message);
    return false;
  }
}

// مثال للاستخدام
// verifyAuthTokenAxios().then(isValid => {
//   if (isValid) {
//     console.log('User is authenticated');
//   } else {
//     console.log('User is not authenticated');
//     // توجيه المستخدم إلى صفحة تسجيل الدخول
//   }
// });

// ... existing code ...
```

### 4. تحديث التوكن (Refresh Token)

إذا انتهت صلاحية `accessToken`، يمكن للواجهة الخلفية استخدام `refreshToken` (المخزن أيضًا في الكوكيز) لإنشاء `accessToken` جديد تلقائيًا. هذا يحدث عادةً في `middleware` أو عند محاولة الوصول إلى مسار محمي بـ `accessToken` منتهي الصلاحية. الواجهة الأمامية لا تحتاج عادةً إلى استدعاء هذه النقطة مباشرة، ولكن من المهم فهم أنها تحدث في الخلفية.

**نقطة النهاية:** `/api/Auth/refresh`
**النوع:** `POST`

**ملاحظة:** في معظم الحالات، لن تحتاج إلى استدعاء هذه النقطة يدويًا من الواجهة الأمامية. سيتم التعامل مع تحديث التوكن تلقائيًا بواسطة الواجهة الخلفية عندما يكون `accessToken` منتهي الصلاحية ويتم إرسال `refreshToken` صالح.

### 5. تسجيل الخروج (Logout)

لتسجيل خروج المستخدم، ستحتاج إلى إرسال طلب `POST` إلى نقطة نهاية تسجيل الخروج. سيؤدي هذا إلى مسح الكوكيز من المتصفح.

**نقطة النهاية:** `/api/Auth/logout`
**النوع:** `POST`

**مثال باستخدام `fetch`:**

```javascript


async function logoutUser() {
  try {
    const response = await fetch('https://booking-hotels-back-end-api.vercel.app/api/Auth/logout', {
      method: 'POST',
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Logged out successfully:', data.message);
      // توجيه المستخدم إلى صفحة تسجيل الدخول أو الصفحة الرئيسية
    } else {
      console.error('Logout failed:', data.message);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

```

**مثال باستخدام `axios`:**

```javascript

import axios from 'axios';

async function logoutUserAxios() {
  try {
    const response = await axios.post('https://booking-hotels-back-end-api.vercel.app/api/Auth/logout', null, {
      withCredentials: true, // مهم لضمان مسح الكوكيز
    });
    console.log('Logged out successfully:', response.data.message);
    // توجيه المستخدم إلى صفحة تسجيل الدخول أو الصفحة الرئيسية
  } catch (error) {
    console.error('Logout failed:', error.response ? error.response.data.message : error.message);
  }
}



### ملاحظات هامة للواجهة الأمامية:

*   **`withCredentials: true`:** عند استخدام `axios` أو `fetch`، تأكد من تعيين `withCredentials: true` في طلباتك إذا كنت تتعامل مع الكوكيز عبر النطاقات (cross-origin requests). هذا يضمن إرسال الكوكيز مع الطلبات واستقبالها من الاستجابات.
*   **`CORS`:** تأكد من أن الواجهة الخلفية (backend) قد تم تكوينها بشكل صحيح للتعامل مع `CORS` (Cross-Origin Resource Sharing) للسماح لعنوان `URL` الخاص بالواجهة الأمامية بالوصول إلى `API`.
*   **معالجة الأخطاء:** قم دائمًا بمعالجة الأخطاء بشكل مناسب في الواجهة الأمامية، مثل عرض رسائل خطأ للمستخدم أو توجيهه إلى صفحة تسجيل الدخول إذا كان التوكن غير صالح أو منتهي الصلاحية.


## Base URL
جميع الـ Endpoints موجودة تحت:

[/api/hotels](/api/hotels)


---



### 2. Get All Hotels
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

### 3. Get Single Hotel by ID

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
    const res = await fetch(`/api/hotels`);
    const data = await res.json();
    console.log("Hotels:", data);
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
}

// Get single hotel
async function getHotelById(id) {
  try {
    const res = await fetch(`/api/hotels/${id}`);
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

const API_URL = `/api/hotels`;

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
