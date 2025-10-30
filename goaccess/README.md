# GoAccess (separate compose)

This folder contains a standalone GoAccess setup to analyze your backend logs.

## What it does
- Parses `../frontend/logs/nginx/access.log`
- Generates a real-time HTML report to `./reports/index.html`
- Serves the report at `http://localhost:8081`
- Exposes WebSocket updates on `ws://localhost:7890`

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
# Open http://localhost:8081
# Stop with: docker compose down
```

## Notes
- Ensure `../backend/logs/backend.log` exists and is being written by your backend.
- The report updates in real-time as logs are appended.
- Reports are persisted under `./reports`.
