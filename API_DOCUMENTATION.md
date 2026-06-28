# 📚 API Documentation

## Overview

The SEO Analyzer backend is developed using **FastAPI** and exposes RESTful APIs for submitting website analysis requests and retrieving completed SEO reports.

The API follows an asynchronous processing model. After a website URL is submitted, a background task performs the SEO analysis while the client periodically requests the analysis status.

---

# Base URL

Production

```
https://seo-analyzer-lbi9.onrender.com
```

Local

```
http://localhost:8000
```

---

# Interactive Documentation

Swagger UI

```
https://seo-analyzer-lbi9.onrender.com/docs
```

OpenAPI Specification

```
https://seo-analyzer-lbi9.onrender.com/openapi.json
```

---

# API Endpoints

## 1. Create Analysis Job

### Endpoint

```
POST /api/analyze
```

### Description

Creates a new SEO analysis job for the provided website URL.

### Request Body

```json
{
    "url": "https://github.com"
}
```

### Successful Response

```json
{
    "job_id": 1,
    "status": "processing"
}
```

---

## 2. Get Analysis Result

### Endpoint

```
GET /api/results/{job_id}
```

### Description

Retrieves the SEO report for a previously created analysis job.

### Example

```
GET /api/results/1
```

### Successful Response

```json
{
    "status": "completed",
    "results": {
        "score": {},
        "metadata": {},
        "technical": {},
        "performance": {},
        "content": {}
    }
}
```

---

# API Workflow

```
Client
   │
   │ POST /api/analyze
   ▼
FastAPI
   │
   ▼
Create Job
   │
   ▼
Background SEO Analysis
   │
   ▼
Store Results
   │
   ▼
GET /api/results/{job_id}
   │
   ▼
Return SEO Report
```

---

# Error Handling

Possible responses include:

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Request Successful    |
| 404         | Job Not Found         |
| 422         | Invalid URL Format    |
| 500         | Internal Server Error |

---

# Technologies Used

* FastAPI
* Pydantic
* SQLAlchemy
* SQLite
* BackgroundTasks
* Swagger UI
* OpenAPI

---

# Swagger UI

The project includes automatically generated Swagger documentation for easy API testing and exploration.
