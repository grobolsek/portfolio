# Portfolio

One-page portfolio at https://grobolsek.com: Vue 3, Vite, Tailwind CSS 4 and Lucide icons, prerendered at build
time and served by nginx, published through a Cloudflare Tunnel. Design system and checks from taste-skill
(`frontend/public/kit/`).

## Develop

```bash
cd frontend
npm install
npm run dev
```

## Change the content

Everything the page says is in `frontend/src/content.js`: projects, skills (with `learning: true` for the
greyed ones), work, education, the About lines and the age (worked out from the birth date).

- **Photographs:** every picture slot is a grey box until it has a photo. Put yours in `frontend/public/img/` and set
  `src: '/img/<file>'` on its entry in `photos` (or on a project's `image`). Pictures are landscape; they keep their
  tilt, fade into the page and glow with their own colours; `position` picks the part of a tall photo that shows.
- **Portrait:** stands in front of the circle with its head above the edge. That needs a PNG with the background
  removed (`cutout: true`); a normal photo works with `cutout: false` and is cropped into the circle.
- **Pentest report:** the PDF lives in `frontend/src/docs/`; the project shows its first page and links to it.
- **Theme:** follows the system until a visitor picks one with the toggle; the dark palette is in `index.html`.

## Run locally with Docker

```bash
docker compose up --build          # http://localhost:8080 (this machine only)
```

## Publish on grobolsek.com (Cloudflare Tunnel)

The site runs in Docker next to `cloudflared`, which connects out to Cloudflare; Cloudflare serves the domain over
HTTPS. No ports are opened on the server.

1. **Cloudflare, once:** Zero Trust > Networks > Tunnels > your tunnel > Public Hostname > Add:
   hostname `grobolsek.com`, service type `HTTP`, URL `frontend:80`. Add `www.grobolsek.com` the same way if you
   want it. If Cloudflare says a record already exists, delete the old **A** record for that name under DNS first
   (leave the mail records alone).
2. **Server:** copy the tunnel's token (the long string in its "Install connector" command) into `.env`:
   ```bash
   cp .env.example .env               # then set TUNNEL_TOKEN=...
   docker compose -f docker-compose.yml -f docker-compose.tunnel.yml up -d --build
   ```
3. **Updates:** `git pull`, then the same `docker compose ... up -d --build`.

If `cloudflared` already runs on the server as a system service instead, skip the tunnel compose file: run
`docker compose up -d --build` and point the public hostname at `http://localhost:8080`.

The Caddy setup (`docker-compose.https.yml`) is the alternative for a server with ports 80 and 443 open and no tunnel.
