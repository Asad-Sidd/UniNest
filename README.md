<div align="center">
  <img src="https://raw.githubusercontent.com/Asad-Sidd/UniNest/main/frontend/public/favicon.ico" alt="UniNest Logo" width="120" />
  <h1>UniNest 🏡</h1>
  <p><strong>Find Your Nest. The Ultimate Student Accommodation Platform.</strong></p>
  <p><i>Tailored specifically for students of Integral University, Lucknow.</i></p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#ai-search">AI Search</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 🌟 Overview

**UniNest** is a modern, AI-powered platform designed to help students easily find the perfect Paying Guest (PG) or Hostel accommodation near their campus. Say goodbye to endless scrolling—just tell our AI what you need, and it finds the perfect match.

With a beautiful, responsive UI and blazing-fast performance, UniNest brings property hunting into the future.

---

## ✨ Features

- 🤖 **Natural Language AI Search:** Powered by Groq & Qwen, simply type *"Find me a PG near Kursi Road under ₹5000 with WiFi"* and let the AI do the heavy lifting.
- 🗺️ **Interactive Maps Integration:** See exactly where your future nest is located with built-in Google Maps routing.
- 📱 **Fully Responsive Design:** A premium, buttery-smooth experience whether you're on a 4K desktop or a mobile phone.
- 🎬 **Custom SVG Animations:** Enjoy a beautiful, zero-dependency, 60fps SVG intro splash screen every time you launch the app.
- 🔍 **Advanced Filtering:** Filter accommodations by price, amenities (WiFi, AC, Laundry), sharing options, and exact locations.

---

## 🛠️ Tech Stack

UniNest is built using a modern, scalable full-stack architecture:

### Frontend
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** Lucide React
- **Animations:** Pure CSS & SVG (Zero external heavy libraries)

### Backend
- **Server:** Node.js with [Express](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) & Mongoose
- **AI Integration:** [Groq API](https://groq.com/) (Qwen 27B / Llama 3)
- **Language:** TypeScript

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB URI
- Groq API Key
- Google Maps API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Asad-Sidd/UniNest.git
   cd UniNest
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GROQ_API_KEY=your_groq_api_key
   ```
   Run the backend development server:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
   ```
   Run the frontend development server:
   ```bash
   npm run dev
   ```

4. **Explore the App:**
   Open [http://localhost:3000](http://localhost:3000) in your browser!

---

## 🧠 How the AI Search Works

UniNest uses Groq's ultra-fast inference engine to parse natural language queries. 

When you type a search query, the backend sends it to the LLM (Large Language Model) with a strict JSON schema prompt. The AI intelligently extracts your requirements (budget, location, amenities) and converts them into a complex MongoDB query. This allows for incredibly intuitive searches without the need for dozen of dropdown menus.

---

<div align="center">
  <p>Built with ❤️ for students.</p>
</div>
