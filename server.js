import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4173;

// 1. Enable Compression (Gzip/Brotli support)
app.use(compression());

// 2. Security Headers (CWE-1021, CWE-79, CWE-430)
// Configured to be secure but also "Pingdom-friendly"
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https:"],
      },
    },
    frameguard: { action: "deny" },
    noSniff: false, // Turned off temporarily for debugging MIME types if images fail
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);

// 3. Static Files with Strong Caching (PageSpeed/Pingdom A100)
// We serve assets from 'dist/assets' with 1 year cache
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) res.set('Content-Type', 'application/javascript');
    if (path.endsWith('.css')) res.set('Content-Type', 'text/css');
  }
}));

// 4. Other static files (favicon, robots.txt, etc.)
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d'
}));

// 5. Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Secured & High Performance Server on port ${PORT}`);
});
