# Platterly — Frontend

Platterly is a full-stack food ordering platform that connects hungry customers with local kitchens. Customers can browse meals by cuisine, check ratings and reviews, add items to their cart, and check out with cash on delivery or online payment. Restaurant owners get their own dashboard to manage their menu and track incoming orders in real time, from order placed to delivered. Admins have full oversight of the platform, including user management and order monitoring.

## Live URL

https://platterly-frontend.vercel.app

## Features

- **Browsing** — search meals, filter by category and price range
- **Ordering** — cart management, checkout with delivery address
- **Payments** — Cash on Delivery, SSLCommerz, and Stripe
- **Customer** — order history, cancellation, profile editing, reviews
- **Provider** — menu management (add/edit/delete meals), order status updates, dashboard stats
- **Admin** — user management (suspend/activate), platform-wide order overview, category management
- **UX** — loading states, form validation, error handling, mobile-responsive design

## Tech Stack

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Axios · React Context

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Environment Variables

\`\`\`
NEXT_PUBLIC_API_URL=
\`\`\`
