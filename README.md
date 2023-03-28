

## Getting Started

First, install with node dependencies:

```bash
npm install
```
Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Third, enable the JSON server with the following commands in the terminal:
```bash
json-server --watch dbteste.json --port 3001
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

And open [http://localhost:3001](http://localhost:3001) with your browser to see the list prodcuts in json.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

