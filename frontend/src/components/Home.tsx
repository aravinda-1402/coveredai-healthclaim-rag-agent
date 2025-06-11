import React from 'react';
import '../styles/Home.css';
import { DocumentTextIcon, ChatBubbleBottomCenterTextIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

interface HomeProps {
  onLogin: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogin }) => {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <div className="hero-section">
          <h1 className="hero-title">Understand Your Health Insurance in Seconds</h1>
          <p className="hero-subtitle">
            Upload your insurance documents and get instant answers to your coverage questions with AI-powered insights. 
            Summarize plans, ask specific questions, and download personalized reports — all in one secure platform.
          </p>
          <button className="cta-button" onClick={onLogin}>
            Get Started
          </button>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <DocumentTextIcon className="w-12 h-12 feature-icon" />
            <h3 className="feature-title">Plan Summarization</h3>
            <p className="feature-description">
              Automatically extract key benefits, limits, copays, and coverage rules from your uploaded plan.
            </p>
          </div>

          <div className="feature-card">
            <ChatBubbleBottomCenterTextIcon className="w-12 h-12 feature-icon" />
            <h3 className="feature-title">Interactive Q&A</h3>
            <p className="feature-description">
              Ask any coverage-related question in plain English — get instant, accurate answers with references.
            </p>
          </div>

          <div className="feature-card">
            <DocumentArrowDownIcon className="w-12 h-12 feature-icon" />
            <h3 className="feature-title">Downloadable Reports</h3>
            <p className="feature-description">
              Export a clean PDF report of your summary and Q&A session for future reference or sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 