# 🚀 SEO Analyzer

A full-stack SEO Analyzer inspired by Woorank that performs comprehensive website analysis without using any paid SEO APIs.

The application analyzes any public website and generates an SEO report including Technical SEO, On-Page SEO, Performance, Content Quality, Metadata checks, and an overall SEO score.

---

## 📌 Features

### Website Analysis

* Website crawling
* HTML parsing
* SEO audit generation

### Technical SEO

* HTTPS detection
* Redirect detection
* robots.txt detection
* sitemap.xml detection
* Canonical tag detection
* Indexability check
* Structured data detection

### On-Page SEO

* Title analysis
* Meta description analysis
* Heading hierarchy (H1-H6)
* Image ALT analysis
* Internal links
* External links
* URL analysis

### Content Analysis

* Word count
* Character count
* Readability score
* Top keyword extraction
* Heading hierarchy validation

### Metadata Analysis

* Mobile friendliness
* Open Graph metadata
* Twitter metadata
* Social metadata

### Performance Analysis

* Response time
* Page size
* Server information
* Compression
* Cache-Control
* Security headers
* Google Lighthouse integration

  * Performance Score
  * Accessibility Score
  * Best Practices Score
  * SEO Score
  * First Contentful Paint
  * Largest Contentful Paint
  * Speed Index
  * Total Blocking Time
  * Cumulative Layout Shift

### SEO Scoring

* Technical SEO Score
* On-Page SEO Score
* Content Score
* Performance Score
* Overall SEO Score (0–100)
* SEO Grade
* Recommendations

---

# 🏗️ Tech Stack

## Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite
* BeautifulSoup4
* Requests
* Readability
* Lighthouse
* Chrome Launcher

## Frontend

* React
* Vite
* Axios
* Chart.js
* React ChartJS 2

---

# 📂 Project Structure

```text
seo-analyzer/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── utils/
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── lighthouse_runner.js
│   ├── requirements.txt
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Swagat-01-sys/seo-analyzer
cd seo-analyzer
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

npm install
```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

API Documentation

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 📡 API Endpoints

## POST

```
POST /api/analyze
```

Request

```json
{
  "url": "https://github.com"
}
```

Response

```json
{
  "job_id": 1,
  "status": "processing"
}
```

---

## GET

```
GET /api/results/{job_id}
```

Returns

* Analysis status
* Technical SEO
* Metadata
* On-Page SEO
* Content Analysis
* Performance
* SEO Score

---

# 📊 SEO Scoring Logic

The scoring system combines multiple categories:

| Category      | Weight |
| ------------- | ------ |
| Technical SEO | 30%    |
| On-Page SEO   | 25%    |
| Content       | 20%    |
| Performance   | 25%    |

The weighted scores are combined to produce an overall SEO score (0–100) and a grade (A–F).

---

# 🧠 Architecture

```
React Frontend
       │
       ▼
FastAPI REST API
       │
       ▼
Analysis Engine
       │
       ├── Website Crawler
       ├── Technical Analyzer
       ├── OnPage Analyzer
       ├── Metadata Analyzer
       ├── Content Analyzer
       ├── Performance Analyzer
       ├── Lighthouse Runner
       └── SEO Scorer
       │
       ▼
SQLite Database
```

---

# 📸 Screenshots

Add screenshots after deployment.

Example:

* Home Page
* Analysis Dashboard
* Score Breakdown
* Keyword Chart
* Recommendations

---

# 🚀 Deployment

Backend: Render

Frontend: Vercel

---

# 👨‍💻 Author

Swagata Chowdhury

B.Tech CSE

VisionIQ • SEO Analyzer • AI Projects