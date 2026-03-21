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

// PINGDOM FIX: Function to add legacy 'Expires' header
const setCustomCacheControl = (res, filePath) => {
  const mimeType = express.static.mime.lookup(filePath);
  
  // Cache for 1 year (31536000 seconds)
  const oneYear = 31536000;
  const expiresDate = new Date(Date.now() + oneYear * 1000).toUTCString();

  if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$/)) {
    res.setHeader('Cache-Control', `public, max-age=${oneYear}, immutable`);
    res.setHeader('Expires', expiresDate); // THE PINGDOM FIX
  }
};

// Serve specific SEO files directly
app.get(['/sitemap.xml', '/robots.txt'], (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', req.path));
});

// Serve assets
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  setHeaders: setCustomCacheControl
}));

// Serve root statics (favicon, etc)
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: setCustomCacheControl
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ULTRA-OPTIMIZED Server running on port ${PORT}`);
});
