// Vercel serverless entry. The vercel.json buildCommand runs `npm run build`
// before functions are bundled, so dist/server.cjs (the esbuild backend
// bundle) exists by the time this import resolves. Typed via the ambient
// declaration in server-cjs.d.ts instead of a blanket @ts-ignore.
import server from '../dist/server.cjs';

export default server;
