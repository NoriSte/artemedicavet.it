# artemedicavet.it
🚧 New artemedicavet.it (Italian vet clinic) website

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Variables

This project requires the following environment variables to fetch business hours from Google Places API:

### Required Variables

Create a `.env.local` file in the root directory with:

```env
# Google Places API Configuration
GOOGLE_PLACES_API_KEY=your_api_key_here
GOOGLE_PLACE_ID=your_place_id_here

# Optional: Base URL for production (used for API calls)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Getting Your Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API (New)**
4. Go to "Credentials" and create an API key
5. Restrict the API key to only allow Places API (New)

### Finding Your Google Place ID

You can find your Place ID using:
- [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
- Or search for your business and extract it from the URL

### Features

The working hours are fetched from Google Places API and include:
- **Regular weekly hours** - automatically grouped (e.g., "Lunedì – Venerdì")
- **Special days** - holidays or special hours (e.g., Dec 24th)
- **Current open/closed status**
- **Fallback to static hours** if the API is unavailable
- **Automatic Schema.org markup** for SEO

Google Business Profile remains the single source of truth for all business hours.

### API Costs

**Good news: The API is FREE for this use case!**

- Google provides **10,000 free requests per month**
- Plus a **$200 monthly credit** (until Feb 2025)
- With 1-hour caching, you'll use ~720 requests/month
- **Cost: $0** (well within free tier)

See [GOOGLE_PLACES_INTEGRATION.md](GOOGLE_PLACES_INTEGRATION.md#api-costs) for detailed pricing information.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
