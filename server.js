import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4173;

app.use(compression());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'", 
          "'unsafe-inline'", 
          "'unsafe-eval'", 
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com"
        ],
        scriptSrcElem: [
          "'self'",
          "'unsafe-inline'",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com"
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "https://www.googletagmanager.com"],
        connectSrc: [
          "'self'", 
          "https://www.google-analytics.com",
          "https://analytics.google.com",
          "https://googletagmanager.com",
          "https://n8n.petrupodut.dev"
        ],
        upgradeInsecureRequests: null, // Dezactivează forțarea HTTPS în browser
      },
    },
    hsts: false, // Dezactivează HSTS (Strict-Transport-Security) care forțează HTTPS
    frameguard: { action: "deny" },
    noSniff: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    crossOriginOpenerPolicy: false, // Rezolvă eroarea COOP pe origini netrustuite
  })
);

// PINGDOM FIX: Function to add legacy 'Expires' header
const setCustomCacheControl = (res, filePath) => {
  const oneYear = 31536000;
  const expiresDate = new Date(Date.now() + oneYear * 1000).toUTCString();

  if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$/)) {
    res.setHeader('Cache-Control', `public, max-age=${oneYear}, immutable`);
    res.setHeader('Expires', expiresDate);
  }
};

// Serve specific SEO files directly
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'robots.txt'));
});

// Serve assets
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  setHeaders: setCustomCacheControl
}));

// Serve root statics (favicon, etc)
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: setCustomCacheControl
}));

// Catch-all for SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (HTTP mode)`);
});
