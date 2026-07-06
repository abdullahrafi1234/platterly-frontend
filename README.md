# Platterly — Frontend

Platterly is a full-stack food ordering platform that connects hungry customers with local kitchens. Customers can browse meals by cuisine, check ratings and reviews, add items to their cart, and check out with cash on delivery or online payment. Restaurant owners get their own dashboard to manage their menu and track incoming orders in real time. Admins have full oversight of the platform, including user management and order monitoring.

## Live URL

https://platterly-frontend.vercel.app

## Features

- **Browsing** — search meals, filter by category and price range
- **Ordering** — cart management, checkout with delivery address
- **Payments** — Cash on Delivery, SSLCommerz, and Stripe
- **Customer** — order history, cancellation, profile editing, reviews
- **Provider** — menu management, order status updates, dashboard stats
- **Admin** — user management, platform-wide order overview, category management
- **UX** — loading states, form validation, error handling, mobile-responsive design

## Tech Stack

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Axios · React Context

## Getting Started

### Clone the repository

\`\`\`bash
git clone https://github.com/<your-username>/platterly-frontend.git
cd platterly-frontend
\`\`\`

### Install dependencies

\`\`\`bash
npm install
\`\`\`

### Configure environment variables

Create a \`.env.local\` file in the root directory:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`
This should point to your running backend instance.

### Run the development server

\`\`\`bash
npm run dev
\`\`\`
Open \`http://localhost:3000\` in your browser.

## Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Related

- [Backend Repository](https://github.com/<your-username>/platterly-backend)
