# LoTuz Competitive Platform — Front-end starter

This is a local website prototype for the requested LoTuz layout:
- 25 server cards: 10 × 5v5, 3 × 1v1, 3 × 2v2, 3 × 3v3, 3 × 4v4, 3 × Fun 5v5
- Mode filters, map pool, copy-IP and `steam://connect` buttons (enabled only after an IP is configured in the page demo)
- Sample 1–10,000 ELO leaderboard with Global at 7,000+
- Skin-selection UI, `.r / READY` placeholder, and demo admin panel
- Exportable demo server config

## Open
Extract ZIP and open `index.html` in a browser. No build step is required.

## Important: not yet a live service
The server cards intentionally start without IP addresses. This site does NOT provision, host, or run CS2 dedicated servers. To make players really join, you must rent or run 25 CS2 servers (or initially fewer), configure public IPs/ports and firewall/UDP access, and populate the real addresses. A server panel can automate deployment, but it requires hosting access.

The Admin panel is explicitly demo-only. It is not authentication, does not persist data to a database, and does not remotely change a server. Never expose admin credentials in frontend JavaScript. Implement admin authorization on a backend and verify admin SteamID server-side.

## Required production components
1. **Hosting:** a Linux/Windows host or game-server provider with enough resources and network capacity. 25 separate game instances may be expensive; start with a small number and scale.
2. **CS2 servers:** SteamCMD + CS2 Dedicated Server, unique ports/configs per instance. Use server query APIs or a backend status checker for truthful online/player/map data.
3. **Steam sign-in:** implement Steam OpenID on the backend. Validate the response server-side and store SteamID only; never collect Steam passwords.
4. **ELO:** persist ratings/matches in a database. Start at 1000, clamp 1–10000, Global at 7000+. Only update after a verified server-side match result; add anti-abuse and rate limits.
5. **Maps:** a map appearing in the UI does not mean it is installed on a server. Install and test each supported map and set its actual map name.
6. **Skins/custom models:** the current skin gallery is illustrative. In-game cosmetics need compatible server plugins and assets. Custom models/materials may require clients to download content or may be limited by game/server rules. Do not claim a skin is applied until the plugin confirms it.
7. **Ready command:** `.r` is a placeholder. Configure a compatible CS2 plugin to recognize `.r`/`!ready`, manage ready states, and start the match only when the required players are ready.
8. **Fun modes:** install and test compatible server plugins/configs for each fun mode; a UI label alone does not create a game mode.

## Safety and honesty
Do not publish sample player names/ranks as real statistics. Keep this prototype's demo labels until real backend data is connected. Do not store Steam passwords or secret keys in this directory.


## Publish so people can search for “LoTuz”
This project is currently a static front-end. It must be deployed to a public hosting service before it can appear in Chrome/Google search.
1. Upload this folder to a static host (for example GitHub Pages, Netlify, or Cloudflare Pages).
2. Choose a public site address or connect a domain you own, e.g. `lotuz.example` (example only; not a real available domain).
3. Add the published site to Google Search Console and verify ownership.
4. Submit the site's sitemap if you create one, and request indexing for the homepage.
5. Search indexing is not immediate and cannot be guaranteed. In the meantime, people can open the direct public URL or bookmark it.
