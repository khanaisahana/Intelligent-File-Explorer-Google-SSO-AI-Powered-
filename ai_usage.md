# 🤖 AI Usage Guide

This document explains how **AI integration** is leveraged in the Intelligent File Explorer.

---

## 1. File Categorization

- Default behavior: categorize by extension (`.pdf → pdf`, `.docx → doc`, `.pptx → ppt` etc.)
- If extension is missing/unknown → query **Mistral API** with file content snippet
- Response mapped into categories (pdf, doc, ppt, image, csv, txt, other)

---

## 2. Semantic Search

- Input: user query string
- Process:
  1. Query is sent to **Mistral API**
  2. AI matches query with file metadata & content embeddings
  3. Returns ranked list of relevant files

---

## 3. File Summarization

- Supported formats: **PDF, DOCX, TXT**
- Extracted text passed to **Mistral API**
- AI returns a **summary paragraph**
- Displayed in frontend popup modal for quick preview

---

## 4. AI Service Configuration

- API key stored in `.env`:
  ```bash
  MISTRAL_API_KEY=your-mistral-api-key
  ```

- AI calls abstracted in backend service (`backend/app/services/ai.py`)
- Failover mechanism:
  - If Mistral API fails → fallback to rule-based classification (by extension)
