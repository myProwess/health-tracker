# 🏥 Dr Health | Premium Vitamin & Mineral Guide (English & Tamil)

**Dr Health** is a premium, interactive web application designed to empower users with essential nutritional knowledge. Built with a modern **Glassmorphism** aesthetic, it provides a comprehensive database of vitamins and minerals, detailing their vital functions, rich food sources, and deficiency symptoms.

> [!NOTE]
> **Priority Focus**: Nutritional Awareness, Vitamin Charts, Mineral Deficiency Identification, Healthy Eating, and Multi-language Health Support.

---

## 🏗️ Architecture & Technology Stack

The project follows a clean, decoupled architecture focusing on high performance, accessibility, and modern aesthetics.

*   **Frontend Logic**: Vanilla JavaScript (ES6+) with a state-driven rendering engine for instantaneous searching, filtering, and data switching.
*   **Styling Engine**: Modern CSS3 using Glassmorphism principles, vibrant gradients, and dynamic micro-animations. It leverages native `::marker` pseudo-elements for semantic list styling.
*   **Data Layer**: Dual-source JSON architecture (`english.json` and `tamil.json`) allowing for offline-capable, lightning-fast content translation without server round-trips.
*   **Processing Pipeline**: Automated PDF extraction (using Python-based pipelines) was utilized to distill complex medical charts into structured, web-ready JSON datasets.
*   **SEO & A11y**: Optimized for Core Web Vitals using `content-visibility` and `contain-intrinsic-size`, alongside robust ARIA labeling and screen-reader accessibility layers.

---

## 📸 Visuals & User Interface

> [!TIP]
> **Experience the Interface**: The application features a "Luminous Glass" modal system that highlights specific health sections (Food Sources vs. Symptoms) based on user interaction.

| Feature | Visual Suggestion |
| :--- | :--- |
| **Nutrient Grid** | A sleek grid of cards with hover scales and semi-transparent backgrounds. |
| **Language Toggle** | An interactive ON/OFF switch that transforms the entire UI from English to Tamil instantly. |
| **Luminous Modal** | High-contrast dialog windows with vibrant indigo-to-violet gradients. |

---

## 🚀 Installation & Setup

### Prerequisites
*   A modern web browser (Chrome, Firefox, Edge, Safari).
*   (Optional) A local development server like `Node.js` (for `npx serve`) or VS Code's `Live Server`.

### Quick Start
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/VitaminsRepo.git
    cd VitaminsRepo
    ```
2.  **Launch the Application**:
    You can simply open `index.html` in your browser, or run a local server:
    ```bash
    # Using npx
    npx -y serve -l 3000 .
    ```
3.  **Access the App**: Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Usage Examples

### Searching for Nutrients
Users can search across multiple fields (Name, Benefits, Symptoms) in both languages:
```javascript
// Example: The search logic handles partial matches across all data keys
const match = [name, n.whatitdoes, n.foodsources].some(f => 
    f.toLowerCase().includes(query)
);
```

### Navigating the Language Toggle
By default, the application launches in **Tamil**. Click the **"Tamil Translate"** toggle in the header:
*   **OFF**: Switches everything—including search placeholders and button labels—to English.
*   **ON**: Re-renders the UI with authentic Tamil translations from `tamil.json`.

---

## 📂 Directory Structure

```text
VitaminsRepo/
├── data/ (Conceptual Source)
│   ├── english.json        # English nutrition dataset
│   └── tamil.json          # Tamil nutrition dataset
├── index.html              # Main application entry point & UI structure
├── style.css               # Design system & Glassmorphic themes
├── app.js                  # Core logic, translation engine & rendering
├── README.md               # Project documentation
└── docs/                   # Original PDF source charts for reference
```

---

## 🤝 Contribution & License

### Contributing
We welcome contributions to help expand the nutrient database or improve the Tamil translations.
1.  Fork the project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

### License
Distributed under the **MIT License**. See `LICENSE` for more information.

---

> [!IMPORTANT]
> **Health Disclaimer**: This application is for informational purposes only. Please refer to the **Indian Council of Medical Research (ICMR)** guidelines for definitive medical clarifications.
