# Quick Start Guide

Get your Mission Invitation running in 5 minutes.

## Step 1: Install

```bash
cd mission-invitation
npm install
```

## Step 2: Environment Variables

Create `.env.local` with your wedding site's Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 3: Database Setup

1. Open Supabase SQL Editor
2. Copy and run the SQL from `SCHEMA.sql`
3. Verify `mission_rsvps` table was created

## Step 4: Update Guest List

Edit `lib/constants.ts`:

```typescript
export const OPERATIVES = [
  'Sean',
  'Mike',
  'Jake',
  // Add your actual guests
]
```

## Step 5: Test Locally

```bash
npm run dev
```

Visit: http://localhost:3000

## Step 6: Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or push to GitHub and deploy via Vercel dashboard.

## Step 7: Configure Subdomain

1. In Vercel: Domains → Add `mission.gabyandconor.com`
2. In DNS settings: Add CNAME record:
   - Name: `mission`
   - Target: `cname.vercel-dns.com`

Done! 🎉

---

**Need help?** See full README.md for detailed instructions.
