# Google Places API Integration - Business Hours

This document describes the implementation of dynamic business hours fetching from Google Places API.

## Overview

The WorkingHours component now fetches business hours directly from Google Places API, making Google Business Profile the single source of truth for:

1. **Regular weekly hours** (e.g., Monday-Friday 10:00-12:30)
2. **Special days** (bank holidays, Dec 24th special hours, etc.)
3. **Current open/closed status**

## Architecture

### Components

```
src/
├── app/
│   ├── api/
│   │   └── business-hours/
│   │       └── route.ts                 # API endpoint to fetch hours
│   └── components/
│       ├── workingHours/
│       │   └── WorkingHours.tsx         # Server component displaying hours
│       └── schema/
│           └── Schema.tsx               # Schema.org structured data
├── types/
│   └── googlePlaces.ts                  # TypeScript types for Google Places API
└── utils/
    └── workingHours.ts                  # Utility functions for formatting hours
```

### Data Flow

1. **User visits page** → Next.js renders page (Server Side)
2. **WorkingHours component** → Calls internal API `/api/business-hours`
3. **API route** → Fetches from Google Places API (New) v1
4. **Response cached** → Next.js caches response for 1 hour
5. **Fallback** → If API fails, uses static FALLBACK_HOURS

## API Endpoint

### `/api/business-hours`

**Method:** GET
**Response:** JSON

```typescript
{
  regularHours: [
    {
      dayOfWeek: "Lunedì",
      periods: [
        { open: "10:00", close: "12:30" },
        { open: "15:30", close: "20:00" }
      ]
    },
    // ... more days
  ],
  specialDays: [
    {
      date: "2024-12-24",
      description: "Orario speciale",
      closed: false,
      hours: [{ open: "10:00", close: "14:00" }]
    }
  ],
  isOpenNow: true,
  lastUpdated: "2024-10-11T12:00:00Z"
}
```

## Features

### 1. Regular Hours Display

The component automatically groups consecutive days with identical hours:

```
Lunedì – Venerdì: 10:00 – 12:30 / 15:30 – 20:00
Sabato: 10:00 – 18:30
Domenica: Chiuso
```

### 2. Special Days Alert

When special days are configured in Google Business Profile, they appear as a highlighted alert:

```
⚠️ Attenzione - Orari speciali:
• 24 dicembre 2024 - 10:00 – 14:00 (Oggi)
• 1 gennaio 2025 - Chiuso
```

### 3. Current Status

Shows if the business is currently open or closed:

```
Aperto ora
```

or

```
Chiuso ora
```

### 4. Fallback Behavior

If the Google Places API is unavailable (network error, rate limit, etc.), the component falls back to static hours defined in `src/utils/workingHours.ts`.

### 5. Schema.org Integration

The [Schema.tsx](src/app/components/schema/Schema.tsx) component automatically generates structured data for search engines with the same dynamic hours.

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
GOOGLE_PLACES_API_KEY=your_api_key_here
GOOGLE_PLACE_ID=your_place_id_here
NEXT_PUBLIC_BASE_URL=https://yourdomain.com  # Optional for production
```

### Getting API Credentials

#### 1. Google Cloud Console Setup

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Places API (New)**
4. Create API key in "Credentials"
5. Restrict API key to Places API (New) only

#### 2. Find Your Place ID

Use the [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder) or:

1. Search for your business on Google Maps
2. Copy the Place ID from the URL or details

### API Costs

Google Places API (New) pricing (as of 2025):

#### Free Tier
- **$200 monthly credit** (available until February 28, 2025)
- **10,000 free requests per month** (Place Details Essentials)

#### Paid Pricing (after free tier)
- 0-10,000 requests: **$5.00 per 1,000 requests** ($0.005 per request)
- 10,001-100,000 requests: $4.00 per 1,000 requests
- 100,001-500,000 requests: $3.00 per 1,000 requests
- 500,001+ requests: Volume discounts available

#### Cost Estimation for This Website

With 1-hour caching:
- **Maximum requests per day**: 24 (one per hour)
- **Maximum requests per month**: ~720
- **Cost**: **FREE** (well within the 10,000 free tier)

Even with heavy traffic, you'll stay within the free tier. The $200 credit covers approximately 40,000 requests per month.

See [Google Maps Platform Pricing](https://developers.google.com/maps/billing-and-pricing/pricing) for complete details.

## Caching Strategy

### Client-side (Next.js)
- **Revalidation**: 1 hour (3600 seconds)
- **Method**: Next.js built-in `fetch` cache with `revalidate`

### API Response Headers
- `Cache-Control: public, s-maxage=3600, stale-while-revalidate=7200`
- Allows CDN caching for 1 hour
- Serves stale content for up to 2 hours while revalidating

## Updating Business Hours

To update business hours:

1. Log into [Google Business Profile](https://business.google.com/)
2. Select your business location
3. Update hours in the dashboard
4. Changes will appear on the website within 1 hour (cache expiry)

## Testing

### Without API Credentials

The component works without API credentials by falling back to static hours defined in `FALLBACK_HOURS`.

### With API Credentials

1. Add credentials to `.env.local`
2. Restart development server
3. Visit the page
4. Check browser console for any API errors

### Special Days Testing

To test special days:

1. Add a special day in Google Business Profile
2. Wait for cache expiry (1 hour) or restart server
3. Special days appear as highlighted alerts

## Troubleshooting

### Issue: "Missing required environment variables"

**Solution:** Ensure `.env.local` contains `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID`

### Issue: "Failed to fetch business hours"

**Possible causes:**
- Invalid API key
- API key not enabled for Places API (New)
- Invalid Place ID
- Rate limit exceeded
- Network error

**Solution:** Check server logs for detailed error messages

### Issue: Hours not updating

**Cause:** Next.js cache not expired yet

**Solution:**
- Wait up to 1 hour for cache to expire
- Or restart the development server
- Or clear Next.js cache: `rm -rf .next`

## Future Enhancements

Potential improvements:

1. **On-demand revalidation** - Add webhook to invalidate cache when hours change
2. **Multiple locations** - Support for businesses with multiple locations
3. **Holiday calendar** - Automatic handling of national holidays
4. **Admin panel** - UI to preview and manage hours without Google Business Profile access
5. **Analytics** - Track when special hours are displayed

## Related Files

- [WorkingHours.tsx](src/app/components/workingHours/WorkingHours.tsx) - Main component
- [Schema.tsx](src/app/components/schema/Schema.tsx) - Schema.org markup
- [route.ts](src/app/api/business-hours/route.ts) - API endpoint
- [googlePlaces.ts](src/types/googlePlaces.ts) - TypeScript types
- [workingHours.ts](src/utils/workingHours.ts) - Utility functions
- [README.md](README.md) - Project setup instructions

## API Documentation

- [Google Places API (New) Overview](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Place Details API](https://developers.google.com/maps/documentation/places/web-service/place-details)
- [OpeningHours Schema](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places#openinghours)
