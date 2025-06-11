import React, { useState, useRef, useEffect } from 'react';
import {
  DocumentArrowUpIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  ChartBarIcon,
  DocumentArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import { Benefits, Answer } from './types';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import MultiPlanComparison from './components/MultiPlanComparison';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const App: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | { error: string; message: string } | null>(null);
  const [benefits, setBenefits] = useState<Benefits | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [summary, setSummary] = useState('');
  const [showSources, setShowSources] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    // Check if user is logged in
    fetch('http://localhost:5000/auth/user', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setUser(data);
          // Only fetch files if user is logged in
          fetchUserFiles();
        }
      })
      .catch(err => console.error('Failed to fetch user:', err));
  }, []);

  const fetchUserFiles = () => {
    fetch('http://localhost:5000/get-user-files', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setFiles(data.files);
      })
      .catch(err => console.error('Failed to fetch user files:', err));
  };

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/login/google';
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/auth/logout', {
        credentials: 'include'
      });
      setUser(null);
      setFiles([]);
      setBenefits(null);
      setSummary('');
      setAnswer(null);
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFileUpload(event.target.files[0]);
    }
  };

  const handleFileUpload = async (selectedFile: File) => {
    setLoading(true);
    setError('');
    setBenefits(null);
    setSummary('');

    // Check if file with same name already exists
    if (files.includes(selectedFile.name)) {
      setError('This file has already been uploaded');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload file');
      }

      // Check if the returned filename already exists in the files array
      if (files.includes(data.filename)) {
        setError('This file has already been uploaded');
        return;
      }

      setFiles(prev => [...prev, data.filename]);
      setSuggestedQuestions(data.suggested_questions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async (filename: string) => {
    try {
      const response = await fetch('http://localhost:5000/delete-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ filename })
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      setFiles(prev => prev.filter(f => f !== filename));
      if (selectedFile === filename) {
        setSelectedFile(null);
        setBenefits(null);
        setSummary('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete file');
    }
  };

  const handleSummarizePlan = async () => {
    if (!selectedFile) {
      setError('Please select a document to summarize');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ filename: selectedFile })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to summarize plan');
      }

      setBenefits(data.benefits || null);
      setSummary(data.summary || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to summarize plan');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSubmit = async () => {
    if (!selectedFile || !question.trim()) {
      setError('Please select a file and enter a question');
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: selectedFile,
          question: question.trim()
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get answer');
      }

      setAnswer(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get answer');
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = async () => {
    try {
      const response = await fetch('http://localhost:5000/export-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate report');
      }

      const downloadUrl = `http://localhost:5000/uploads/${data.filename}`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  CoveredAI
                </h1>
                {user && (
                  <>
                    <Link
                      to="/"
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/compare"
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      <DocumentDuplicateIcon className="w-5 h-5" />
                      Compare Plans
                    </Link>
                  </>
                )}
              </div>

              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 ease-in-out"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200 ease-in-out"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Sign in with Google
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {!user ? (
            <Home onLogin={handleLogin} />
          ) : (
            <Routes>
              <Route 
                path="/" 
                element={
                  <Dashboard
                    files={files}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    onFileChange={handleFileChange}
                    onDeleteFile={handleDeleteFile}
                    onSummarizePlan={handleSummarizePlan}
                    onExportReport={handleExportReport}
                    loading={loading}
                    error={error}
                    benefits={benefits}
                    summary={summary}
                    question={question}
                    setQuestion={setQuestion}
                    onQuestionSubmit={handleQuestionSubmit}
                    answer={answer}
                    suggestedQuestions={suggestedQuestions}
                    fileInputRef={fileInputRef}
                  />
                } 
              />
              <Route path="/compare" element={<MultiPlanComparison />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
};

export default App;
