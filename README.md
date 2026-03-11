# 🏥 Dr Health | Premium Vitamin & Mineral Guide (English & Tamil)

**Dr Health** is a high-performance, interactive nutritional encyclopedia. Built with a modern **Glassmorphism** aesthetic, it delivers critical health data on vitamins and minerals. The platform features an instantaneous **Tamil Translation** engine and a fully responsive **Dark Mode** interface.

> [!NOTE]
> **SEO Priority**: Optimized for Google Search using Semantic HTML5, JSON-LD Schema (Medical & FAQ), and Core Web Vitals performance hooks.

---

## 🚀 Key Features

*   🌍 **Dual-Language Support**: Real-time switch between English and Tamil datasets.
*   🌙 **Dark Mode**: Persistent dark/light theme switching with system detection.
*   🔍 **Advanced Search**: Instant keyword matching across benefits, sources, and symptoms.
*   📈 **SEO Optimized**: Pre-configured OG tags, Twitter Cards, Canonical URLs, and Robots.txt.
*   📦 **Performance**: Content-visibility containment and efficient Vanilla JS rendering.

---

## 🏗️ Architecture & Technology Stack

*   **Frontend**: Vanilla JavaScript (ES6+), Tailwind CSS (Utility-first), CSS3 Glassmorphism.
*   **Data**: Decoupled JSON architecture (`data/english.json` & `data/tamil.json`).
*   **Schema**: JSON-LD Structured Data for Medical Entities, Breadcrumbs, and FAQs.

---

## 📂 Directory Structure

```text
VitaminsRepo/
├── assets/
│   ├── css/
│   │   └── style.css       # Core design system & Dark Mode
│   └── js/
│   │   └── app.js          # State engine & Translation logic
├── data/ 
│   ├── english.json        # English nutrition dataset
│   └── tamil.json          # Tamil nutrition dataset
├── index.html              # Main application entry point & SEO Meta
├── sitemap.xml             # Search Engine index map
├── robots.txt              # Crawler instructions
└── README.md               # Deployment & Documentation
```

---

## 🌐 Deployment to GitHub Pages

To go live under 1 minute:
1.  **Push to GitHub**:
    ```bash
    git add .
    git commit -m "Deploy: Updated SEO and Dark Mode"
    git push origin main
    ```
2.  **Enable Pages**:
    - Go to your Repository on GitHub.
    - Click **Settings** > **Pages**.
    - Under "Build and deployment", set Source to **Deploy from a branch**.
    - Select **main** and folder **/(root)**. Click **Save**.
3.  **Live Site**: Your app will be live at `https://myprowess.github.io/health-tracker/`.

### 🔍 Submit to Google Search Console
1.  Verify your site ownership in [Google Search Console](https://search.google.com/search-console).
2.  Navigate to **Sitemaps** in the sidebar.
3.  Enter `sitemap.xml` in the "Add a new sitemap" field and click **Submit**.

---

## 🤝 Contribution & License
Distributed under the **MIT License**. Contributions to the Tamil translation or nutrient database are welcome via Pull Requests.

---

> [!IMPORTANT]
> **Health Disclaimer**: This application is for informational purposes only. Please refer to the **Indian Council of Medical Research (ICMR)** guidelines for definitive medical clarifications.
