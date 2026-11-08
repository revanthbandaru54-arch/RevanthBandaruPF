# Bandaru Revanth — F1 Telemetry Engineering Portfolio

[![Status](https://img.shields.io/badge/Status-Build_Ready-E60000?style=flat-square)](#)
[![Stack](https://img.shields.io/badge/Stack-HTML5_%7C_CSS3_%7C_Vanilla_ES6+-FF9900?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=flat-square)](LICENSE)

An interactive Formula 1 Pit-Lane Telemetry portfolio website built for **Bandaru Revanth** — Computer Science Engineering undergraduate (`2k26 - 2k30`) at **GVP College of Engineering**, Visakhapatnam, building at the edge of systems engineering, Linux workflows, and practical AI automation.

---

## ✨ Key Features

- **F1 Pit-Lane Telemetry Aesthetic**:
  - Carbon-fiber diagonal weave background (`.carbon-bg`), animated 6-second perspective speed grid (`.speed-grid`), smoked titanium glass cards (`.smoked-glass`, `.smoked-card`), and F1 crimson (`#E60000`) & amber (`#FF9900`) accents.
- **4-View Single-Page Architecture**:
  1. **Projects & Hero (`#view-projects`)**:
     - Interactive **Engineering Workbench & DSA Telemetry Deck** featuring **LeetCode** (`u/revanthbandaru54`), **CodeChef** (`husk_calm_81`), live system pipeline benchmarks, and the `C++20 STL Priority Graph` complexity trace.
     - Tabbed F1 Telemetry Console separating **ACTIVE PROJECTS** (**DistroAI** automated voice-to-ERP wholesale pipeline) and **HACKATHON BUILDS** (**DhwaniDrishti** Top 10 Finalist build).
  2. **Skills Diagnostic Bench (`#view-skills`)**:
     - ECU competency readouts across `MOD 01` (*Systems & Low-Level*), `MOD 02` (*AI & Automation*), and `MOD 03` (*Tooling & Infrastructure*).
  3. **Hackathons & Live ISL Sandbox (`#view-hackathons`)**:
     - Embedded 3-pillar interactive simulation of **[DhwaniDrishti](https://github.com/revanthbandaru54-arch/DhwaniDrishti)**:
       - **LectureCast**: Multilingual (`en-IN`, `te-IN`, `hi-IN`) SVO-to-ISL SOV topological grammar engine + real-time 48-bone 3D avatar canvas.
       - **ISL-STEM Coach**: Sakoe-Chiba Dynamic Time Warping (`r=8`) & Vector Cosine per-joint similarity evaluator.
       - **DoubtDesk**: 543-landmark MediaPipe Holistic stream simulator + 1D-CNN & Bi-LSTM classifier with Web Speech TTS.
  4. **About & Arch Linux Zsh Terminal (`#view-about`)**:
     - Engineering philosophy, `2k26 - 2k30` academic timeline, and an interactive `zsh` terminal supporting `--stack` and `--socials`.

---

## 📂 Project Structure

```text
GitHub/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml   # Automated GitHub Pages CI/CD workflow
├── index.html                 # Main SPA entry point & 4 telemetry views
├── styles.css                 # Carbon weave, speed grid & smoked-glass styles
├── app.js                     # View router, workbench logic & DhwaniDrishti engine
├── revanth.jpg                # Portrait asset
├── ARCHITECTURE.md            # Master system & architecture blueprint
├── LICENSE                    # MIT License
└── README.md                  # Repository documentation
```

---

## 🚀 Quick Start (Zero Build Required)

Because this is a pure static website with zero build dependencies, you can run it immediately:

### Option 1: Open Directly
Double-click `index.html` or open it in any browser.

### Option 2: Local Static Server
```bash
# Using Python 3
python -m http.server 8080

# Or using Node.js npx serve
npx serve .
```
Then visit `http://localhost:8080`.

---

## 🌐 Deployment (GitHub Pages / Vercel)

- **GitHub Pages**: Push this folder to a GitHub repository's `main` branch. The included `.github/workflows/deploy-pages.yml` workflow automatically publishes the site to GitHub Pages.
- **Vercel / Netlify**: Import the repository with **Framework Preset: Other** (no build command needed, output directory `.`).

---

## 🔗 Connect with Bandaru Revanth

- **GitHub**: [github.com/revanthbandaru54-arch](https://github.com/revanthbandaru54-arch)
- **LinkedIn**: [linkedin.com/in/revanth-bandaru-470876432](https://www.linkedin.com/in/revanth-bandaru-470876432/)
- **LeetCode**: [leetcode.com/u/revanthbandaru54](https://leetcode.com/u/revanthbandaru54/)
- **CodeChef**: [codechef.com/users/husk_calm_81](https://www.codechef.com/users/husk_calm_81)

