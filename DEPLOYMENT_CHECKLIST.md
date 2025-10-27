# Pre-Deployment Checklist

Use this checklist before going live.

## Before Deployment

### Code Configuration
- [ ] Updated `lib/constants.ts` with all guest names
- [ ] Verified mission details (dates, location, temperature)
- [ ] Tested video URL works: https://www.youtube.com/shorts/z4IrhjPfDsI
- [ ] Removed any TODO comments or placeholder text

### Database Setup
- [ ] Ran `SCHEMA.sql` in Supabase SQL Editor
- [ ] Verified `mission_rsvps` table exists
- [ ] Tested table permissions (can insert/select)
- [ ] Confirmed using same Supabase project as wedding site

### Local Testing
- [ ] Countdown works (5→1)
- [ ] Video plays (or shows play button)
- [ ] Mission briefing animates properly
- [ ] Dropdown shows all operatives
- [ ] RSVP submits successfully
- [ ] Success screen displays
- [ ] No console errors

### Environment Variables
- [ ] `.env.local` has correct Supabase URL
- [ ] `.env.local` has correct Supabase anon key
- [ ] `.env` is in `.gitignore` (don't commit secrets!)

## During Deployment

### Vercel Setup
- [ ] Created new Vercel project
- [ ] Added environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Deployment succeeded (no build errors)
- [ ] Preview URL works

### Domain Configuration
- [ ] Added subdomain in Vercel (e.g., `mission.gabyandconor.com`)
- [ ] Added CNAME record in DNS:
  - Name: `mission`
  - Target: `cname.vercel-dns.com`
- [ ] Waited for DNS propagation (~5-30 min)
- [ ] Verified subdomain resolves: `nslookup mission.gabyandconor.com`

## After Deployment

### Production Testing
- [ ] Site loads at subdomain URL
- [ ] All animations work
- [ ] Video plays
- [ ] RSVP submission works
- [ ] Data appears in Supabase
- [ ] Tested on mobile device
- [ ] Tested on different browsers (Chrome, Safari, Firefox)

### Mobile Testing
- [ ] Countdown visible and readable
- [ ] Video positioned correctly (not blocking text)
- [ ] Mission briefing scrollable
- [ ] Dropdown works on touch devices
- [ ] Button clickable and responsive

### Final Checks
- [ ] No sensitive data exposed in source
- [ ] Analytics/tracking setup (optional)
- [ ] Shared link with one test person
- [ ] Verified RSVP appears in Supabase

## Monitoring

### How to Check RSVPs

**Option 1: Supabase Dashboard**
1. Go to Supabase → Table Editor
2. Select `mission_rsvps`
3. View all responses

**Option 2: API Endpoint**
Visit: `https://mission.gabyandconor.com/api/rsvp`

**Option 3: SQL Query**
```sql
SELECT operative_name, accepted_at
FROM mission_rsvps
ORDER BY accepted_at DESC;
```

## Rollback Plan

If something goes wrong:

1. **Vercel Deployment Issues**
   - Go to Vercel → Deployments
   - Click "..." on previous working deployment
   - Select "Promote to Production"

2. **Database Issues**
   - Drop table: `DROP TABLE mission_rsvps;`
   - Re-run `SCHEMA.sql`

3. **DNS Issues**
   - Remove CNAME record
   - Wait for TTL expiration
   - Re-add with correct values

## Go-Live Timeline

Recommended timeline:
1. **T-7 days**: Deploy to Vercel
2. **T-5 days**: Configure subdomain
3. **T-3 days**: Test with friends
4. **T-2 days**: Final verification
5. **T-0**: Send invites! 🚀

---

**Ready to launch?** Double-check everything, then send those invites!
