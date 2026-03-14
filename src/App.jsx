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
    // 检测系统主题
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    // 加载 Issues
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
    articles: issues.filter(i => i.labels.some(l => l.name === 'article')).length,
    total: issues.length,
    contributors: [...new Set(issues.map(i => i.user.login))].length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg">
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        onBack={view === 'detail' ? handleBack : null}
      />
      
      <main className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-500 dark:text-dark-muted">加载中...</p>
            </div>
          </div>
        ) : view === 'detail' && selectedIssue ? (
          <IssueDetail issue={selectedIssue} onBack={handleBack} />
        ) : (
          <HomePage 
            issues={issues} 
            stats={stats}
            onIssueClick={handleIssueClick}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

function HomePage({ issues, stats, onIssueClick }) {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ⚡ 硬件测试知识库
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              收录硬件测试工程师的实战经验与技术分享
            </p>
            <div className="flex justify-center gap-8 text-slate-400">
              <div><span className="text-2xl font-mono font-bold text-primary-400">{stats.articles}</span><br/>知识文章</div>
              <div><span className="text-2xl font-mono font-bold text-accent-400">{stats.contributors}</span><br/>贡献者</div>
              <div><span className="text-2xl font-mono font-bold text-cyan-400">{stats.total}</span><br/>总条目</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="tag bg-primary-500 text-white">全部</span>
            <span className="tag tag-article">📝 知识文章</span>
            <span className="tag tag-hardware">🔌 硬件</span>
            <span className="tag tag-question">❓ 问答</span>
          </div>

          {issues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-2">暂无内容</h3>
              <p className="text-slate-500 dark:text-dark-muted">成为第一个贡献者！</p>
              <a href="https://github.com/xfengyin/hardware-test-wiki/issues/new?labels=article" 
                 target="_blank" rel="noopener"
                 className="btn btn-primary mt-4 inline-block">
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