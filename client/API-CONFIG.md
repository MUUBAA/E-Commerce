# E-Commerce Client Setup

## API Base URL Configuration

- **Local Development:**
  - The Vite dev server uses a proxy for API calls. Set the following in `.env.local`:
    
    ```env
    VITE_API_BASE_URL=/
    ```
  - This allows API calls like `/auth/login` to be proxied to your backend during `npm run dev`.

- **Production (Vercel):**
  - Set the environment variable `VITE_API_BASE_URL` in the Vercel dashboard to your backend URL, e.g.:
    
    ```env
    VITE_API_BASE_URL=https://nestonlinestore.onrender.com
    ```
  - All API calls will be sent directly to this backend.

## CORS Requirement

Your backend (Nest API) **must** allow CORS requests from your deployed frontend domain (e.g., `https://yourapp.vercel.app`).

Example (NestJS):

```
app.enableCors({
  origin: [
    'http://localhost:5015', // local dev
    'https://yourapp.vercel.app' // production
  ],
  credentials: true,
});
```

If CORS is not configured, API requests from your deployed frontend will fail.

---

For more details, see the Vercel and NestJS documentation.