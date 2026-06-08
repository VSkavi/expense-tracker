# 💸 Expense Tracker

A modern personal finance web app built with **React 19**, **Vite**, and **Tailwind CSS v4** — track your income and expenses, visualize spending with charts, and export reports as PDF.

---

## 🚀 Live Demo

> https://expense-tracki-app.netlify.app/login

---

## ✨ Features

- 📊 **Interactive Charts** — visualize income vs. expenses using Recharts
- ➕ **Add / Edit / Delete Transactions** — manage your financial records with ease
- 🗂️ **Category-wise Breakdown** — organize transactions by category
- 📄 **PDF Export** — download transaction reports via jsPDF + AutoTable
- 🔀 **Multi-page Routing** — smooth navigation with React Router DOM v7
- 📱 **Responsive Design** — works seamlessly on desktop and mobile
- ⚡ **Fast & Lightweight** — powered by Vite with HMR for instant dev feedback

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 8 | Build tool & dev server |
| Tailwind CSS v4 | Utility-first styling |
| React Router DOM v7 | Client-side routing |
| Recharts | Data visualization |
| jsPDF + jspdf-autotable | PDF report generation |
| Lucide React + React Icons | Icon library |

---

## 📁 Project Structure

```
expense-tracker/
├── public/             # Static assets (favicon, etc.)
├── src/                # React source files
│   ├── main.jsx        # App entry point
│   └── ...             # Components, pages, hooks
├── index.html          # Root HTML template
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
└── eslint.config.js    # ESLint configuration
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/VSkavi/expense-tracker.git

# 2. Navigate into the project
cd expense-tracker

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```bash
npm run dev       # Start dev server with HMR
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

---

## 📦 Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy on Vercel, Netlify, or any static host.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 👤 Author

**Kavi** — [github.com/VSkavi](https://github.com/VSkavi)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
