// Type shim for the esbuild backend bundle. dist/server.cjs only exists after
// `npm run build` (vercel.json runs it before function bundling), so the
// import must type-check whether or not the artifact is present on disk.
declare module '*/server.cjs' {
  import type { Express } from 'express';
  const app: Express;
  export default app;
}
