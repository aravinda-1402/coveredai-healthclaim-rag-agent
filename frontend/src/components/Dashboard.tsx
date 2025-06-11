import React from 'react';
import {
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentArrowDownIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { Benefits, Answer, Source } from '../types';

interface DashboardProps {
  files: string[];
  selectedFile: string | null;
  setSelectedFile: (file: string | null) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteFile: (filename: string) => void;
  onSummarizePlan: () => void;
  onExportReport: () => void;
  loading: boolean;
  error: string | { error: string; message: string } | null;
  benefits: Benefits | null;
  summary: string;
  question: string;
  setQuestion: (question: string) => void;
  onQuestionSubmit: () => void;
  answer: Answer | null;
  suggestedQuestions: string[];
  fileInputRef: React.MutableRefObject<HTMLInputElement>;
}

const Dashboard: React.FC<DashboardProps> = ({
  files,
  selectedFile,
  setSelectedFile,
  onFileChange,
  onDeleteFile,
  onSummarizePlan,
  onExportReport,
  loading,
  error,
  benefits,
  summary,
  question,
  setQuestion,
  onQuestionSubmit,
  answer,
  suggestedQuestions,
  fileInputRef,
}) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuestionSubmit();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Sidebar - File Management */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <DocumentTextIcon className="w-6 h-6 mr-2 text-blue-600" />
            Your Documents
          </h2>
          
          {/* Upload Button */}
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-100 border-dashed rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all duration-200 mb-4"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ArrowUpTrayIcon className="w-8 h-8 mb-2 text-blue-600" />
              <p className="text-sm text-blue-600 font-medium">
                Upload Insurance Document
              </p>
              <p className="text-xs text-blue-400">PDF and DOCX files supported</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept=".pdf,.docx"
              onChange={onFileChange}
              ref={fileInputRef}
            />
          </label>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-medium">Error</p>
              <p className="text-sm text-red-500">
                {typeof error === 'string' ? error : error.error}
              </p>
              {typeof error === 'object' && error.message && (
                <p className="text-sm text-red-500 mt-1">{error.message}</p>
              )}
            </div>
          )}

          {/* Files List */}
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file}
                className={`group flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                  selectedFile === file
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <input
                    type="radio"
                    name="selected-file"
                    checked={selectedFile === file}
                    onChange={() => setSelectedFile(file)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 truncate flex-1">
                    {file}
                  </span>
                </div>
                <button
                  onClick={() => onDeleteFile(file)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all duration-200"
                >
                  <XMarkIcon className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={onSummarizePlan}
              disabled={!selectedFile || loading}
              className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 
                ${
                  !selectedFile || loading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <DocumentTextIcon className="w-5 h-5 mr-2" />
                  Summarize Plan
                </>
              )}
            </button>
            
            <button
              onClick={onExportReport}
              disabled={!answer || loading}
              className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 
                ${
                  !answer || loading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-800 text-white hover:bg-gray-900'
                }`}
            >
              <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
              Download Report
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-2 space-y-6">
        {/* Q&A Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2 text-blue-600" />
            Ask Questions
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="question" className="sr-only">
                Your question
              </label>
              <div className="mt-1">
                <textarea
                  rows={3}
                  name="question"
                  id="question"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Ask a question about your insurance document..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!selectedFile || loading}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                !selectedFile || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {loading ? (
                <>
                  <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Ask Question'
              )}
            </button>
          </form>

          {/* Suggested Questions */}
          {suggestedQuestions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Suggested Questions:
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuestion(q);
                      onQuestionSubmit();
                    }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Answer Display */}
          {answer && (
            <div className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium text-gray-900">Answer:</h3>
                <p className="text-gray-700">{answer.answer}</p>
                {answer.sources && answer.sources.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">Sources:</h4>
                    <ul className="mt-2 text-sm text-gray-600">
                      {answer.sources.map((source, index) => (
                        <li key={index} className="mt-1">
                          {typeof source === 'string' 
                            ? source 
                            : `${source.document}: ${source.text}`
                          }
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Benefits and Summary Section */}
        {(benefits || summary) && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Summary Section */}
            {summary && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <DocumentTextIcon className="w-6 h-6 mr-2 text-blue-600" />
                  Plan Summary
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
                </div>
              </div>
            )}

            {/* Benefits Section */}
            {benefits && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <DocumentTextIcon className="w-6 h-6 mr-2 text-blue-600" />
                  Benefits Details
                </h2>
                <div className="space-y-6">
                  {/* Key Benefits */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Key Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {benefits.deductible && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-blue-700">Deductible</p>
                          <p className="text-gray-700">{benefits.deductible}</p>
                        </div>
                      )}
                      {benefits.outOfPocketMax && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-blue-700">Out of Pocket Maximum</p>
                          <p className="text-gray-700">{benefits.outOfPocketMax}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Coverage Details */}
                  {benefits.coverageDetails && benefits.coverageDetails.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Coverage Details</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {benefits.coverageDetails.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Copays and Coinsurance */}
                  {benefits.copaysAndCoinsurance && Object.keys(benefits.copaysAndCoinsurance).length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Copays and Coinsurance</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(benefits.copaysAndCoinsurance).map(([service, cost]) => (
                          cost && (
                            <div key={service} className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm font-medium text-gray-700">{service}</p>
                              <p className="text-gray-700">{cost}</p>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 