<div align="center">
  <br />
  <img src="public/assets/images/logo-text.svg" alt="Imaginify Logo" width="280" />
  <br />
  <br />

  <p align="center">
    <strong>An AI-powered SaaS platform for image manipulation, enhancement, and monetization.</strong>
  </p>

  <p align="center">
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 15" />
    </a>
    <a href="https://react.dev">
      <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    </a>
    <a href="https://cloudinary.com/">
      <img src="https://img.shields.io/badge/Cloudinary-AI-blueviolet?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
    </a>
    <a href="https://clerk.com/">
      <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" />
    </a>
    <a href="https://stripe.com/">
      <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
    </a>
    <a href="https://www.mongodb.com/">
      <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    </a>
  </p>

  <br />
</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Webhooks Setup](#-webhooks-setup)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Imaginify** is a full-stack, enterprise-grade AI image transformation SaaS platform. It enables users to perform complex AI image editing tasks effortlessly—ranging from generative fills and background removals to object recoloring and photo restoration—backed by a robust credit-based subscription and checkout model using Stripe.

---

## ✨ Key Features

### 🤖 AI Image Transformations (Powered by Cloudinary)
- **Image Restore:** Refines degraded or old images by eliminating digital noise, grain, and imperfections.
- **Generative Fill:** Extends image boundaries with context-aware AI outpainting matching standard aspect ratios (1:1, 3:4, 9:16).
- **Object Remove:** Accurately identifies and removes unwanted objects and shadows from images.
- **Object Recolor:** Selects specific objects within an image and changes their color based on custom prompt specifications.
- **Background Remove:** Extracts subjects from images with clean edges using AI background segmentation.

### 💳 Credits & Stripe Payments
- **Credit Consumption:** Each AI transformation securely charges credits from the user's account.
- **Free Tier:** New users automatically receive 20 free starting credits upon registration.
- **Flexible Pricing Plans:** Integration with Stripe Checkout for seamless credit bundle top-ups (Free, Pro, and Premium packages).
- **Insufficient Credits Modal:** Real-time credit validation prompting user upgrades before initiating transformations.

### 🔐 Authentication & Profile Management
- **Secure Authentication:** Managed through Clerk with seamless social logins, user sessions, and protected routes.
- **Webhook Sync:** Real-time synchronization between Clerk user events (`user.created`, `user.updated`, `user.deleted`) and MongoDB.
- **User Dashboard & Profile:** View remaining credits, purchased history, and browse all personal past transformations.

### 🔍 Search & Community Gallery
- **Community Collection:** Discover recent transformations created across the platform.
- **Debounced Search:** Fast, server-side search across image titles and tags.
- **Pagination:** Smooth pagination controls for fast exploration across large image collections.
- **Image Download & Sharing:** Instant high-resolution downloads of transformed results.

---

## 🛠 Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Frontend** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) |
| **Authentication** | [Clerk Auth](https://clerk.com/) |
| **Database** | [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/) |
| **AI & Media CDN** | [Cloudinary](https://cloudinary.com/) (`next-cloudinary`) |
| **Payments** | [Stripe](https://stripe.com/) (`@stripe/stripe-js`) |
| **Form Management** | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 18.18+ or 20+)
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), or [yarn](https://yarnpkg.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database
- A [Cloudinary](https://cloudinary.com/) account
- A [Clerk](https://clerk.com/) account
- A [Stripe](https://stripe.com/) account

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/imaginify.git
   cd imaginify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

### Running the App

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore Imaginify!

---

## 🔔 Webhooks Setup

### 1. Clerk Webhook (User Sync)
1. Go to your **Clerk Dashboard** > **Webhooks** > **Add Endpoint**.
2. Set Endpoint URL to: `https://<your-domain>/api/webhooks/clerk` (use [ngrok](https://ngrok.com/) or [Localtunnel](https://localtunnel.me/) for local development).
3. Subscribe to events: `user.created`, `user.updated`, and `user.deleted`.
4. Copy the **Signing Secret** and assign it to `WEBHOOK_SECRET` in `.env.local`.

### 2. Stripe Webhook (Credit Purchases)
1. Go to the **Stripe Dashboard** > **Developers** > **Webhooks** > **Add destination**.
2. Set URL to: `https://<your-domain>/api/webhooks/stripe`.
3. Subscribe to: `checkout.session.completed`.
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET` in `.env.local`.

---

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server with Turbopack |
| `npm run build` | Builds the production bundle |
| `npm run start` | Runs the production build server |
| `npm run lint` | Runs ESLint to inspect code quality |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/your-username/imaginify/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.