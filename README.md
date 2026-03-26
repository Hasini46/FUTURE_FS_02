# ⬡ Mini CRM — Client Lead Management System

A full-stack CRM application to manage client leads from website contact forms.

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | HTML + CSS + React.js (CDN) |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (JSON Web Tokens) |

---

## 📁 Project Structure

```
mini-crm/
├── backend/
│   ├── models/
│   │   ├── Lead.js        # Lead schema
│   │   └── Admin.js       # Admin schema
│   ├── routes/
│   │   ├── leads.js       # Lead CRUD APIs
│   │   └── auth.js        # Login API
│   ├── middleware/
│   │   └── auth.js        # JWT middleware
│   ├── server.js          # Express server
│   ├── .env.example       # Environment variables template
│   └── package.json
├── frontend/
│   └── index.html         # Complete React frontend (single file)
└── README.md
```

---

## ✨ Features

- ✅ Secure admin login with JWT
- ✅ Add / Edit / Delete leads
- ✅ Lead fields: name, email, phone, company, source, status
- ✅ Status management: New → Contacted → Converted / Lost
- ✅ Notes & follow-ups per lead
- ✅ Search & filter leads
- ✅ Dashboard stats (total, new, contacted, converted)
- ✅ Follow-up date tracking

---

## 🚀 Setup & Run

### 1. Clone the repo
```bash
git clone https://github.com/Hasini46/FUTURE_FS_02.git
cd mini-crm
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### 3. Setup MongoDB
- Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
- Get your connection string and paste it in `.env`

### 4. Create Admin Account
```bash
# With the backend running, send this POST request once:
curl -X POST http://localhost:5000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

### 5. Open Frontend
- Open `frontend/index.html` in your browser
- Login with your admin credentials

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/leads` | Get all leads (with filters) |
| POST | `/api/leads` | Create new lead |
| GET | `/api/leads/:id` | Get single lead |
| PUT | `/api/leads/:id` | Update lead |
| DELETE | `/api/leads/:id` | Delete lead |
| POST | `/api/leads/:id/notes` | Add note |
| DELETE | `/api/leads/:id/notes/:noteId` | Delete note |

---

## 📬 Contact

Built by **Sadu Hasini** — [github.com/Hasini46](https://github.com/Hasini46)
