# CoveredAI - Intelligent Health Insurance Plan Analysis

A sophisticated web application that helps users analyze, compare, and understand health insurance plans using AI-powered document processing and natural language interactions.

## 🌟 Features

### Document Management
- **Secure Upload**: Support for PDF and DOCX insurance documents
- **Document Validation**: Automatic verification of insurance-related documents

### Plan Analysis
- **Smart Extraction**: Automatically extracts key benefits and coverage details
- **Benefits Breakdown**: Clear presentation of:
  - Individual & Family Deductibles
  - Out-of-pocket Maximums
  - Copays (Primary Care, Specialist, ER, Urgent Care)
  - Prescription Drug Coverage
  - Mental Health Coverage

### Plan Comparison
- **Side-by-side Comparison**: Compare up to 3 insurance plans simultaneously
- **Difference Highlighting**: Easily identify variations between plans
- **Custom Labeling**: Add custom labels to plans for easy reference

### Interactive Features
- **AI-Powered Q&A**: Ask questions about your insurance plans in natural language
- **Smart Summaries**: Get concise summaries of plan details
- **Suggested Questions**: AI-generated relevant questions about your plans
- **Export Capabilities**: Generate detailed PDF reports of your analysis

### Security & Privacy
- **Google OAuth Integration**: Secure user authentication
- **Session Management**: Persistent user sessions
- **HIPAA Considerations**: Built-in PII/PHI sanitization
- **Secure File Handling**: Temporary file processing with automatic cleanup

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern UI framework
- **Material-UI**: Polished component library
- **React Router**: Client-side routing
- **TypeScript**: Type-safe development

### Backend
- **Flask**: Python web framework
- **LangChain**: AI/LLM integration framework
- **OpenAI**: GPT-powered analysis
- **FAISS**: Vector similarity search
- **PyMuPDF**: PDF processing
- **python-docx**: DOCX file handling

### AI/ML Features
- **Document Processing**: Intelligent text extraction and analysis
- **Semantic Search**: Context-aware document querying
- **Natural Language Processing**: Advanced text processing capabilities

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- OpenAI API Key
- Google OAuth Credentials

### Environment Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Backend Setup:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Create `.env` file in backend directory:
```env
OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FLASK_SECRET_KEY=your_secret_key
```

4. Frontend Setup:
```bash
cd frontend
npm install
```

### Running the Application

1. Start the Backend:
```bash
cd backend
flask run
```

2. Start the Frontend:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

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
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
