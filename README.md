# Product API

A simple Node.js API for managing products.

## Local Development

```
npm install
npm run dev
```

## Deployment Instructions

### Render

1. Create an account on [Render](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Use the following settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables:
   - `PORT`: Will be provided by Render
   - `MONGODB_URI`: Your MongoDB connection string

### Railway

1. Create an account on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Create a new project
4. Deploy from GitHub
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string

### Vercel

1. Create an account on [Vercel](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in your project folder
4. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
