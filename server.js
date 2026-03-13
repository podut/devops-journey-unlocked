import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4173;

// 1. Enable Gzip Compression (Removes Pingdom D67 warning)
app.use(compression());

// 2. Security Headers (CWE-1021, CWE-79, CWE-430)
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
    noSniff: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);

// 3. Static Files with Long-term Cache (Removes Pingdom E56 warning)
// Assets (JS, CSS, Images) cached for 1 year
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  maxAge: '1y',
  immutable: true
}));

// Other static files (favicon, robots.txt, etc.)
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d' // Cache general files for 1 day
}));

// 4. Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Secured & Optimized Server running on port ${PORT}`);
});
