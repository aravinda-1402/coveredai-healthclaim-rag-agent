# 🧠 CoveredAI - Intelligent Health Insurance Plan Analysis

CoveredAI is a full-stack AI-powered application that helps users **analyze**, **compare**, and **understand** health insurance plans using **RAG (Retrieval-Augmented Generation)** and natural language interaction. Whether you’re a policyholder or analyst, CoveredAI extracts critical information, answers questions, and enables smarter comparisons between plans.

---

## 📸 Demo

Take a quick visual tour of **CoveredAI** – a smart insurance document analysis platform powered by RAG (Retrieval-Augmented Generation) and modern UI.

### 🔹 Homepage – Simple & Inviting
![Homepage](./assets/screenshots/Screenshot_2025-06-11_103334.png)

### 🔹 Dashboard – Upload, Summarize, Ask, Download
![Dashboard](./assets/screenshots/Screenshot_2025-06-11_103409.png)

### 🔹 Plan Comparison – Upload and Configure
![Compare Upload](./assets/screenshots/Screenshot_2025-06-11_103417.png)

### 🔹 Q&A in Action – Ask Anything
![Q&A Mode](./assets/screenshots/Screenshot_2025-06-11_103506.png)

### 🔹 Visual Plan Comparison – Differences Highlighted
![Compare Table](./assets/screenshots/Screenshot_2025-06-11_103535.png)

---

## 🎥 Video Walkthrough

> ⏯️ [Click to watch the demo video](./assets/demo/demo.mp4)  

---
## 🌟 Features

### 📄 Document Management
- **Secure Upload** of PDF and DOCX insurance documents
- **Document Validation** to ensure uploaded files are insurance-related
- **Temporary Storage & Cleanup** for enhanced privacy

### 📊 Plan Analysis
- **Smart Extraction** of key plan components
- **Benefits Breakdown** including:
  - Deductibles (Individual & Family)
  - Out-of-Pocket Maximums
  - Copays (Primary, Specialist, ER, Urgent Care)
  - Prescription Coverage
  - Mental Health Coverage
- **AI Summarization** for quick understanding

### 🧠 RAG-Based Q&A
- **Ask Questions in Plain English**
- Uses **semantic search + LLMs (GPT)** to return answers grounded in your actual insurance documents
- **Suggested Questions** to guide your exploration

### 🆚 Plan Comparison
- **Side-by-side Comparison** of up to 3 plans
- **Difference Highlighting** for easy visual comparison
- **Custom Labeling** of plans for clarity

### 🧾 Export Capabilities
- Download **AI-generated PDF reports** of plan analysis and comparisons

---

## 🔐 Security & Privacy

- 🔒 **Google OAuth** authentication
- 🧼 **Automatic PHI/PII Sanitization**
- 🗑️ Temporary file processing with auto-deletion
- 🧠 Session-based file isolation

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- **React 18 + TypeScript**
- **Material-UI (MUI)** + **TailwindCSS** for styling
- **Heroicons** for icons
- **React Router** for navigation

### 🧠 Backend
- **Flask** with RESTful API design
- **LangChain** for LLM orchestration
- **OpenAI GPT** for answer generation
- **FAISS** for semantic retrieval (vector search)
- **PyMuPDF** & **python-docx** for document parsing

---

## 🔁 RAG Architecture

CoveredAI is built on a **Retrieval-Augmented Generation** pipeline:

1. 🧾 **Chunk + Embed:** Each uploaded plan is split into text chunks and embedded using OpenAI embeddings.
2. 🔍 **Retrieve:** FAISS retrieves relevant chunks based on user query.
3. 💬 **Generate:** GPT generates accurate, context-aware answers grounded in the retrieved content.

---

## 🚀 Getting Started

### ✅ Prerequisites
- Python 3.8+
- Node.js 16+
- OpenAI API Key
- Google OAuth Credentials

### 📦 Installation

```bash
git clone https://github.com/yourusername/coveredai.git
cd coveredai
```

## 🔒 Security Considerations

- All uploaded files are processed securely and temporarily
- Sensitive information is automatically sanitized
- Files uploaded for comparison are not stored permanently
- User authentication is required for all operations
- Session management ensures secure access to user data

## 💡 Usage Tips

1. **Document Upload**:
   - Use clear, scanned copies of insurance documents
   - Ensure documents are in PDF or DOCX format
   - Label plans clearly for easy comparison

2. **Plan Comparison**:
   - Upload up to 3 plans simultaneously
   - Use the "Show Differences Only" feature to highlight variations
   - Export comparison results for future reference

3. **AI Interaction**:
   - Ask specific questions about coverage details
   - Use suggested questions for guidance
   - Request summaries for complex sections

## 📝 License
This project is licensed under the [Apache-2.0 License](http://www.apache.org/licenses/LICENSE-2.0).
