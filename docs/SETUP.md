# Setup Guide

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your actual values:

```bash
cp .env.example .env.local
```

### Required Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Webhook URL
NEXT_PUBLIC_WEBHOOK_URL=your-webhook-url
NEXT_PUBLIC_WEBHOOK_BASIC_AUTH=your-username:your-password
```

### Where to get these values:

1. **Supabase URL & Key**: From your Supabase project dashboard
2. **Webhook URL**: Your n8n webhook endpoint
3. **Basic Auth**: Username:password for webhook authentication

## Security Notes

- ⚠️ **Never commit `.env.local`** - it contains sensitive data
- ✅ **Use `.env.example`** for documentation
- ✅ **Add `.env.local` to `.gitignore`** (already done)

## Development

```bash
npm install
npm run dev
```

## Production

Make sure to set environment variables in your deployment platform (Vercel, Netlify, etc.)
