# Deploy

## Local

```
docker compose up --build
```

Browse http://localhost. Nginx proxies `/api/*` to the backend and `/` to Next.js.

## Azure VM (Ubuntu)

```
git clone git@github.com:ethj0r/Tubes2_PengenLibur_BE.git
git clone git@github.com:ethj0r/Tubes2_PengenLibur_FE.git
cd Tubes2_PengenLibur_FE
docker compose up -d --build
```

Open port 80 on the VM's network security group.

## Environment

- `BACKEND_ORIGIN` — internal URL the Next.js rewriter uses when the browser never calls it directly. Defaults to `http://localhost:8080`.
- `CORS_ALLOWED_ORIGIN` — origin the Go CORS middleware accepts. Set to the public hostname in production.
- `PORT` — port the backend/frontend listens on inside its container.
