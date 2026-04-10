import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import IssueCard from './components/IssueCard';
import IssueDetail from './components/IssueDetail';
import { getIssues, getIssueByNumber } from './lib/github';

function App() {
  const [view, setView] = useState('home');
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    loadIssues();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const loadIssues = async () => {
    setLoading(true);
    try {
      const data = await getIssues();
      setIssues(data);
    } catch (error) {
      console.error('Failed to load issues:', error);
    }
    setLoading(false);
  };

  const handleIssueClick = async (number) => {
    setLoading(true);
    try {
      const issue = await getIssueByNumber(number);
      setSelectedIssue(issue);
      setView('detail');
    } catch (error) {
      console.error('Failed to load issue:', error);
    }
    setLoading(false);
  };

  const handleBack = () => {
    setSelectedIssue(null);
    setView('home');
    loadIssues();
  };

  const stats = {
    articles: issues.filter((i) => i.labels.some((l) => l.name === 'article')).length,
    total: issues.length,
    contributors: [...new Set(issues.map((i) => i.user.login))].length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onBack={view === 'detail' ? handleBack : null}
      />

      <main className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-vercel-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-vercel-gray-500">加载中...</p>
            </div>
          </div>
        ) : view === 'detail' && selectedIssue ? (
          <IssueDetail issue={selectedIssue} onBack={handleBack} />
        ) : (
          <HomePage issues={issues} stats={stats} onIssueClick={handleIssueClick} />
        )}
      </main>

      <Footer />
    </div>
  );
}

function HomePage({ issues, stats, onIssueClick }) {
  return (
    <>
      {/* Hero — Vercel clean white style */}
      <section className="relative py-20 md:py-28 bg-white">
        <div className="absolute inset-0 grid-bg" />
        <div className="container-custom relative">
          <div className="max-w-2xl mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl font-semibold text-vercel-black mb-5 leading-none"
              style={{ letterSpacing: '-0.04em' }}
            >
              硬件测试知识库
            </h1>
            <p className="text-lg text-vercel-gray-600 mb-10 leading-relaxed">
              收录硬件测试工程师的实战经验与技术分享
            </p>
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <div
                  className="text-3xl font-semibold text-vercel-black font-mono"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {stats.articles}
                </div>
                <div className="text-xs text-vercel-gray-500 mt-1">知识文章</div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-semibold text-vercel-black font-mono"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {stats.contributors}
                </div>
                <div className="text-xs text-vercel-gray-500 mt-1">贡献者</div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-semibold text-vercel-black font-mono"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {stats.total}
                </div>
                <div className="text-xs text-vercel-gray-500 mt-1">总条目</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ boxShadow: 'rgba(0, 0, 0, 0.08) 0px -1px 0px 0px' }} />

      {/* Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-vercel-black text-white">
              全部
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-vercel-blue-light text-vercel-blue-dark">
              知识文章
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-vercel-blue-light text-vercel-blue-dark">
              硬件
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-vercel-gray-50 text-vercel-gray-600">
              问答
            </span>
          </div>

          {issues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {issues.map((issue, index) => (
                <IssueCard
                  key={issue.number}
                  issue={issue}
                  index={index}
                  onClick={() => onIssueClick(issue.number)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-vercel-black mb-2 tracking-tight">
                暂无内容
              </h3>
              <p className="text-vercel-gray-500 mb-6">成为第一个贡献者！</p>
              <a
                href="https://github.com/xfengyin/hardware-test-wiki/issues/new?labels=article"
                target="_blank"
                rel="noopener"
                className="btn btn-primary no-underline text-white"
              >
                提交文章
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
