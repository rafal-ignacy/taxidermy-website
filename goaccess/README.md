# GoAccess (separate compose)

This folder contains a standalone GoAccess setup to analyze your backend logs.

## What it does
- Parses `../frontend/logs/nginx/access.log`
- Generates a real-time HTML report to `./reports/index.html`
- Serves the report via Nginx at `http://localhost:8081/` (or `/index.html`)
- WebSocket updates from GoAccess at `ws://localhost:7891`
 - Optional GeoIP world map (requires MMDB mounted in `goaccess/geoip`)

## Log format
Configured to your custom format:

```
log-format %h %^[%d:%t %^] "%r" %s %b "%R" "%u" "%^"
```

With:
```
date-format %d/%b/%Y
time-format %T
```

## Usage

From this folder:

```bash
docker compose up -d
# Open http://localhost:8081/
### World map (GeoIP)

1) Download a GeoIP2 City database and place it in `goaccess/geoip/`:
   - MaxMind GeoLite2 City (requires free account): file name `GeoLite2-City.mmdb`
   - OR DB-IP City Lite (free): file name like `dbip-city-lite-YYYY-MM.mmdb` (rename to `GeoLite2-City.mmdb` or update config path)
2) The compose already mounts `./geoip` to `/geoip` and the config points to `/geoip/GeoLite2-City.mmdb`.
3) Restart the stack and refresh the report; the world map will appear.

# Stop with: docker compose down
```

## Notes
- Ensure `../backend/logs/backend.log` exists and is being written by your backend.
- The report updates in real-time as logs are appended.
- Reports are persisted under `./reports`.
