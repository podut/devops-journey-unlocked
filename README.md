# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b50f6057-468e-4638-8f2a-bd13a6bab68d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

**Use GitHub Codespaces**

## DevOps & Deployment Insights

### 🚀 Build Process
Acest proiect folosește un sistem de automatizare pentru SEO și rute. Pentru un deployment corect pe Coolify/Vercel, urmează acești pași local:

1. **Curățare și Build:**
   ```sh
   npm run build
   ```
   *Acest pas generează automat și sitemap.xml prin scriptul `generate-sitemap.js`.*

2. **Sincronizare rădăcină (pentru Coolify Static):**
   Deoarece Coolify servește fișierele din rădăcina branch-ului, fișierele din `dist/` trebuie copiate în root:
   ```sh
   xcopy dist\* . /E /Y /H
   ```

### ⚠️ Reguli Critice (Anti-Gap)
* **index.html:** Trebuie să conțină MEREU `<script type="module" src="/src/main.tsx"></script>`. Nu înlocui manual cu fișiere din `assets/` în codul sursă; Vite se ocupă de asta la build.
* **Rute noi:** Când adaugi o pagină nouă, asigură-te că este importată în `App.tsx` și că ai un link către ea (chiar și ascuns) în `Index.tsx` pentru a preveni Tree Shaking-ul agresiv al Vite.
* **Sitemap:** Nu edita manual `sitemap.xml`. Orice articol nou adăugat în `src/content/blog/*.md` va fi inclus automat la următorul build.

### 📁 Structură Blog
* Articolele se scriu în `src/content/blog/` sub formă de fișiere `.md`.
* Fiecare fișier trebuie să aibă un header de tip Frontmatter (title, date, description, tags).

## What technologies are used for this project?

This project is built with:

## How can I deploy this project?

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
