# Mission: This Light to Conor

A cinematic Mission: Impossible-themed bachelor party invitation website.

## Features

- 🔐 Individual password authentication for each operative
- 🎬 5-second countdown with glitch effects
- 🎵 YouTube Shorts embed with M:I theme
- 📝 Typewriter-style mission briefing
- 🕵️ Operative selection and RSVP system
- 💾 Supabase integration for authentication and tracking responses
- 📱 Mobile responsive design
- ♿ Accessible (keyboard navigation, proper contrast)

## Prerequisites

- Node.js 18+ and npm/yarn
- Existing Supabase project (reuse from wedding site)
- Vercel account (for deployment)
- Domain access (gabyandconor.com)

## Setup Instructions

### 1. Install Dependencies

```bash
cd mission-invitation
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Use the same Supabase credentials from your wedding website.**

### 3. Set Up Database

1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Run the SQL from `SCHEMA.sql` to create the `mission_rsvps` table
4. Add your operatives with individual passwords:

```sql
INSERT INTO mission_rsvps (operative_name, operative_password) VALUES
  ('Agent Name 1', 'their_password_1'),
  ('Agent Name 2', 'their_password_2'),
  ('Agent Name 3', 'their_password_3');
```

**Important:** Each operative gets their own unique password!

### 4. Update Operative Names

Edit `lib/constants.ts` and replace with your actual guest names (must match database exactly):

```typescript
export const OPERATIVES = [
  'Agent Name 1',
  'Agent Name 2',
  'Agent Name 3',
  // Add your guests here
]
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to create new project
```

### Option 2: Deploy via Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Configure Subdomain

After deployment:

1. In Vercel project settings, go to **Domains**
2. Click "Add Domain"
3. Enter: `mission.gabyandconor.com` (or `redacted.gabyandconor.com`)
4. Vercel will provide DNS records to add

5. In your domain registrar (e.g., Namecheap, GoDaddy):
   - Add a **CNAME record**:
     - Name: `mission` (or `redacted`)
     - Target: `cname.vercel-dns.com`
   - TTL: Auto or 3600

6. Wait for DNS propagation (5-30 minutes)
7. Your site will be live at `mission.gabyandconor.com`!

## Project Structure

```
mission-invitation/
├── app/
│   ├── api/
│   │   ├── login/route.ts    # Authentication API endpoint
│   │   └── rsvp/route.ts     # RSVP API endpoint
│   ├── globals.css           # Global styles + animations
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main orchestrator
├── components/
│   ├── LoginScreen.tsx       # Agent authentication screen
│   ├── Countdown.tsx         # 5-second countdown
│   ├── MissionBriefing.tsx   # Typewriter mission text
│   ├── OperativeSelector.tsx # RSVP dropdown + button
│   └── VideoEmbed.tsx        # YouTube Shorts player
├── lib/
│   ├── constants.ts          # Guest names & mission details
│   └── supabase.ts           # Supabase client
├── SCHEMA.sql                # Database schema
└── README.md                 # This file
```

## Testing Checklist

- [ ] Login screen loads with IMF branding
- [ ] Correct agent name + password grants access
- [ ] Incorrect credentials show error message
- [ ] Countdown animates smoothly after login
- [ ] Video autoplays (or shows play button on mobile)
- [ ] Mission briefing text appears sequentially
- [ ] Operative dropdown works
- [ ] RSVP submits successfully
- [ ] Success animation shows after submission
- [ ] Accepted_at timestamp updates in database
- [ ] Works on mobile devices
- [ ] Works on different browsers (Chrome, Safari, Firefox)
- [ ] Keyboard navigation works (Tab, Enter)

## Viewing RSVPs

To see who has accepted the mission:

### Option 1: Supabase Dashboard
1. Go to Supabase → Table Editor
2. Select `mission_rsvps` table
3. View all responses

### Option 2: API Endpoint
Visit: `https://mission.gabyandconor.com/api/rsvp`

Returns all RSVPs in JSON format.

## Troubleshooting

### Video won't autoplay
- Most browsers block autoplay with sound
- The component includes a fallback "Play Theme" button
- This is expected behavior on mobile

### RSVP not saving
- Check `.env.local` has correct Supabase credentials
- Verify `mission_rsvps` table exists in Supabase
- Check browser console for errors

### Subdomain not working
- Verify CNAME record is added correctly
- Wait up to 48 hours for DNS propagation (usually < 1 hour)
- Use [dnschecker.org](https://dnschecker.org) to verify propagation

## Nice-to-Have Enhancements

Future improvements (not currently implemented):

- [ ] Add Mission: Impossible audio theme (mp3 file)
- [ ] Personalized messages per operative
- [ ] Easter eggs in browser console
- [ ] Email confirmation after RSVP
- [ ] Cinematic sound effects (static, encrypted blips)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Video**: react-youtube
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel

## License

Private project for personal use.

---

**Questions?** Contact Conor or check the Vercel/Supabase docs.
