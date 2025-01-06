# E-Library Next.js Application

A modern digital library built with Next.js 14, Apollo Client, and ContentStack CMS.

## Features

- 📚 Browse books catalog
- 🔍 Search functionality
- 👤 Author profiles
- 🎨 Responsive design
- 🚀 Fast page loads with ISR
- 📱 Mobile-friendly interface
- 🔄 Real-time updates
- 🎯 SEO optimized

## Tech Stack

- Next.js 14
- TypeScript
- Apollo Client
- ContentStack CMS
- CSS Modules

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/dmitriykodenskiy/e-library-next.git
cd e-library-next
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your ContentStack credentials

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Required ContentStack configuration:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APIKEY` | ContentStack API key |
| `NEXT_PUBLIC_DELIVERY_TOKEN` | ContentStack delivery token |
| `NEXT_PUBLIC_ENVIRONMENT` | ContentStack environment name |

## Project Structure

```
e-library-next/
├── src/
│ ├── app/ # Next.js pages and layouts
│ ├── apollo/ # GraphQL setup and queries
│ ├── components/ # React components
│ │ ├── BooksList/ # Book listing components
│ │ ├── SingleBook/ # Book details view
│ │ ├── Search/ # Search functionality
│ │ └── ui/ # Shared UI components
│ ├── hooks/ # Custom React hooks
│ └── types/ # TypeScript definitions
├── public/ # Static assets
└── ...config files
```

## Project Key Features

### Search
- Client-side search across books
- Searches in titles, descriptions, and author names
- URL-based search parameters
- Debounced input

### SEO
- Dynamic metadata per page
- JSON-LD structured data
- Automatic sitemap generation
- Proper robots.txt configuration

### Data Updates
- ISR with 5-minute revalidation
- Real-time updates via Apollo polling

## Deployment

The project is configured for Vercel deployment.

## Live Demo

Visit [https://e-library-next-git-cmsintegration-dmitriykodenskiys-projects.vercel.app](https://e-library-next-git-cmsintegration-dmitriykodenskiys-projects.vercel.app?_vercel_share=VYPwuyIPVpn3juSyTuKgZ2bLXrmwqkrt)