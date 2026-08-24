# Bangla Plus

Classic Bengali-theme OTT site (React + Vite + Tailwind).

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Content placeholders

Edit `src/data/videos.ts`:

- **42 titles** across Featured Originals, Romance & Drama, Family Stories, Mystery & Crime, Comedy & Light
- `thumbnail` — replace with real image URLs when ready
- `videoPath` — leave empty until video API; player shows a placeholder message

## Same flow as Bharat Plus

Phone → plan → auth in `localStorage` → video modal (or auth gate)

Routes: `/`, `/watch/:id`, `/account`, `/about`, `/contact`, `/terms`, `/privacy`, `/refund`
