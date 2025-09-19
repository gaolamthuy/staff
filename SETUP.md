# Setup Guide

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your actual values:

```bash
cp .env.local.example .env.local
```

### Required Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Webhook URL
NEXT_PUBLIC_WEBHOOK_URL=your-webhook-url
```

### Where to get these values:

1. **Supabase URL & Key**: From your Supabase project dashboard
2. **Webhook URL**: Your n8n webhook endpoint

## Security Notes

- ⚠️ **Never commit `.env.local`** - it contains sensitive data
- ✅ **Use `.env.local.example`** for documentation
- ✅ **Add `.env.local` to `.gitignore`** (already done)

## Development

```bash
npm install
npm run dev
```

## Production

Make sure to set environment variables in your deployment platform (Vercel, Netlify, etc.)
