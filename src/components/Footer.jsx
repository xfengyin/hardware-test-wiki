import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-mono font-semibold text-slate-900 dark:text-dark-text">HardwareTest</span>
          </div>
          <div className="text-sm text-slate-500 dark:text-dark-muted text-center">
            <p>© {year} · 收录硬件测试工程师的实战经验</p>
          </div>
        </div>
      </div>
    </footer>
  );
}