# CoveredAI - Healthcare Insurance Document Assistant

CoveredAI is an intelligent document analysis application that helps users understand their healthcare insurance documents through natural language interactions. The application uses advanced AI to process insurance documents and provide accurate, context-aware answers to coverage-related questions.

## Features

### Document Management
- **PDF Upload**: Upload multiple insurance documents in PDF format
- **Document Organization**: Manage and select specific documents for analysis
- **Secure Storage**: Documents are securely stored and processed
- **Document Deletion**: Remove uploaded documents when no longer needed

### AI-Powered Analysis
- **Intelligent QA System**: Ask natural language questions about your insurance coverage
- **Smart Summarization**: Get concise summaries of your insurance plans
- **Context-Aware Responses**: Answers are provided with relevant source citations
- **Multi-Document Analysis**: Cross-reference information across multiple documents

### User Experience
- **Google OAuth Authentication**: Secure login with your Google account
- **Intuitive Interface**: Clean, modern UI with responsive design
- **Interactive Q&A**: Suggested questions and real-time responses
- **Source Verification**: View source excerpts for answer verification
- **Report Generation**: Download detailed QA reports in PDF format

## Technical Stack

### Frontend
- React with TypeScript
- TailwindCSS for styling
- Responsive design principles
- Modern component architecture

### Backend
- Flask Python server
- PyPDF2 for PDF processing
- Advanced text chunking with RecursiveCharacterTextSplitter
- Flask-Dance for OAuth integration
- Flask-Session for server-side session management
- ReportLab for PDF report generation

### AI/ML
- RAG (Retrieval Augmented Generation) for accurate responses
- Context-aware document processing
- Optimized token management
- Smart text chunking for improved accuracy

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Set up the backend:
```bash
cd backend
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

4. Configure environment variables:
Create `.env` files in both frontend and backend directories with the necessary configurations:

Backend `.env`:
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SECRET_KEY=your_secret_key
```

Frontend `.env`:
```
REACT_APP_API_URL=http://localhost:5000
```

### Running the Application

1. Start the backend server:
```bash
cd backend
python app.py
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. **Login**: Sign in using your Google account
2. **Upload Documents**: Upload your insurance PDFs through the drag-and-drop interface
3. **Ask Questions**: Use the question input to ask about your coverage
4. **View Answers**: Get AI-powered responses with source citations
5. **Generate Reports**: Download comprehensive QA reports
6. **Manage Documents**: Delete documents when no longer needed

## Security Features

- Secure OAuth2 authentication
- Server-side session management
- Secure document storage
- Protected API endpoints
- Client-side route protection

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 