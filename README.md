
# The Flavour Unit Corp

This repository contains the official website for The Flavour Unit Corporation. 
## Deployment Instructions

After cloning this repository, follow these steps to deploy to GitHub Pages:

1. Make sure you have all dependencies installed:
   ```
   npm install
   ```

2. Manually update your package.json file to include these scripts:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "tsc && vite build",
     "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
     "preview": "vite preview",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Run the deployment command:
   ```
   npm run dev
   ```


