# 🏥 Prescripto — Doctor Appointment Booking App

Full-stack MERN application with **Patient Frontend**, **Admin Panel**, and **Doctor Portal**.

---

## 📁 Project Structure

```
prescripto/
├── backend/         ← Express.js API Server (Port 4000)
├── frontend/        ← Patient React App (Port 5173)
└── admin/           ← Admin & Doctor React Panel (Port 5174)
```

---

## 🚀 Features

### Patient (Frontend)
- Register / Login with JWT
- Browse doctors by speciality
- Book appointment with time slots
- Online payment via **Stripe** and **Razorpay**
- View & cancel appointments
- Update profile with photo upload

### Admin Panel
- Secure admin login
- Add/manage doctors (with Cloudinary image upload)
- View all appointments & cancel
- Dashboard with stats (doctors, appointments, patients)

### Doctor Portal
- Doctor login
- View assigned appointments
- Mark appointments complete or cancel
- Update profile, fees, availability
- Personal dashboard with earnings

---

## ⚙️ Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file (already included as template):

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/prescripto
JWT_SECRET=your_secret_key_here
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=admin123
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
CURRENCY=USD
PORT=4000
```

Start backend:
```bash
npm run dev
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Update `.env`:
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

Copy your asset images from the `assets` folder into:
- `frontend/src/assets/assets_frontend/`

Start frontend:
```bash
npm run dev
# Opens at http://localhost:5173
```

---

### 3. Admin Panel Setup

```bash
cd admin
npm install
```

Update `.env`:
```env
VITE_BACKEND_URL=http://localhost:4000
```

Copy admin assets into:
- `admin/src/assets/assets_admin/`

Start admin:
```bash
npm run dev
# Opens at http://localhost:5174
```

---

## 🔑 Default Admin Login

```
Email:    admin@prescripto.com
Password: admin123
```
(Set in backend `.env` — change before production!)

---

## 🌐 API Endpoints

### Admin Routes (`/api/admin`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | Admin login |
| POST | `/add-doctor` | Add new doctor |
| POST | `/all-doctors` | Get all doctors |
| POST | `/change-availability` | Toggle doctor availability |
| GET | `/appointments` | All appointments |
| POST | `/cancel-appointment` | Cancel appointment |
| GET | `/dashboard` | Dashboard stats |

### Doctor Routes (`/api/doctor`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/list` | All doctors (public) |
| POST | `/login` | Doctor login |
| GET | `/appointments` | Doctor's appointments |
| POST | `/complete-appointment` | Mark complete |
| POST | `/cancel-appointment` | Cancel |
| GET | `/dashboard` | Doctor dashboard |
| GET | `/profile` | Get profile |
| POST | `/update-profile` | Update profile |

### User Routes (`/api/user`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register user |
| POST | `/login` | User login |
| GET | `/get-profile` | Get profile |
| POST | `/update-profile` | Update profile |
| POST | `/book-appointment` | Book appointment |
| GET | `/appointments` | User's appointments |
| POST | `/cancel-appointment` | Cancel |
| POST | `/payment-stripe` | Stripe checkout |
| POST | `/verifyStripe` | Verify stripe |
| POST | `/payment-razorpay` | Razorpay order |
| POST | `/verifyRazorpay` | Verify razorpay |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS, Axios |
| Admin | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (jsonwebtoken) + bcrypt |
| File Upload | Multer + Cloudinary |
| Payments | Stripe, Razorpay |

---

## 🌍 Deployment Tips

- **Backend**: Deploy on Railway, Render, or VPS
- **Frontend/Admin**: Deploy on Vercel or Netlify
- Update `.env` `VITE_BACKEND_URL` to your deployed backend URL
- Add Razorpay script to `frontend/index.html`:
  ```html
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  ```

---

## 📦 Assets

Place your Prescripto image assets in:
- `frontend/src/assets/assets_frontend/` — doctor images, icons, logos
- `admin/src/assets/assets_admin/` — admin icons

Assets JS files show the expected filenames.
