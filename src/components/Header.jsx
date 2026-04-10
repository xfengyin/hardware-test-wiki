import React from 'react';

export default function Header({ darkMode, setDarkMode, onBack }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px' }}
    >
      <div className="max-w-content mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="mr-1 p-1.5 rounded-6 hover:bg-vercel-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 text-vercel-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            )}
            <a href="/" className="flex items-center gap-2 no-underline hover:font-normal">
              <div className="w-7 h-7 bg-vercel-black rounded-6 flex items-center justify-center">
                <span className="text-white text-sm">⚡</span>
              </div>
              <span className="font-semibold text-sm tracking-tight text-vercel-black hidden sm:block">
                HardwareTest
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode && setDarkMode(!darkMode)}
              className="p-2 rounded-6 hover:bg-vercel-gray-50 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <svg className="w-4 h-4 text-vercel-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-vercel-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <a
              href="https://github.com/xfengyin/hardware-test-wiki"
              target="_blank"
              rel="noopener"
              className="p-2 rounded-6 hover:bg-vercel-gray-50 transition-colors no-underline"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 text-vercel-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://github.com/xfengyin/hardware-test-wiki/issues/new?labels=article"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary ml-2 no-underline text-white text-xs"
            >
              提交文章
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
