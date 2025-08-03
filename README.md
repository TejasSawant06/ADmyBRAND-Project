# 📊 ADmyBRAND Insights Dashboard

A **modern, responsive analytics dashboard** built with **Next.js 14+, shadcn/ui, TailwindCSS, Recharts**, and AI-assisted development.  
Designed for digital marketing agencies to visualize **revenue, campaign performance, user metrics**, and more.

---

## 🚀 Features
- **Responsive UI** — Works seamlessly on **desktop, tablet, and mobile**.
- **Dark/Light Mode** — Toggle theme with `next-themes`.
- **Analytics Overview**
  - Revenue
  - Users
  - Conversions
  - Growth %
- **Interactive Charts** (via Recharts)
  - Line chart — Revenue Over Time
  - Bar chart — Campaign Clicks
  - Pie chart — Traffic Sources
- **Data Table** — Sortable & responsive with `@tanstack/react-table`.
- **Date Range Filtering** — Select custom date ranges.
- **Real-time Updates** — Mock API auto-refreshes metrics & charts.
- **Export Options**
  - **CSV** export with `papaparse`
  - **PDF** export with `dom-to-image-more` + `jsPDF`
- **Loading Skeletons** — Beautiful placeholders while data loads.

---

## 🛠 Tech Stack
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Table**: [TanStack Table](https://tanstack.com/table)
- **Date Picker**: [react-date-range](https://github.com/hypeserver/react-date-range)
- **CSV Export**: [PapaParse](https://www.papaparse.com/)
- **PDF Export**: [dom-to-image-more](https://github.com/1904labs/dom-to-image-more), [jsPDF](https://github.com/parallax/jsPDF)

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/admybrand-dashboard.git
cd admybrand-dashboard

2️⃣ Install dependencies

npm install

3️⃣ Setup shadcn/ui
If starting from scratch:

npx shadcn-ui init
Add required components:

npx shadcn-ui add card button table input select dropdown-menu switch skeleton popover

4️⃣ Run the development server

npm run dev
Then open http://localhost:3000


👨‍💻 Author
Developed by Tejas Sawant
📧 sawanttejas777@gmail.com