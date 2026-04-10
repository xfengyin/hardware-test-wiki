import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white" style={{ boxShadow: 'rgba(0, 0, 0, 0.08) 0px -1px 0px 0px' }}>
      <div className="max-w-content mx-auto px-5 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-vercel-black rounded-6 flex items-center justify-center">
              <span className="text-white text-xs">⚡</span>
            </div>
            <span className="font-mono text-xs font-semibold text-vercel-black tracking-tight">
              HardwareTest
            </span>
          </div>
          <div className="text-xs text-vercel-gray-500 text-center">
            © {year} · 收录硬件测试工程师的实战经验
          </div>
          <a
            href="https://github.com/xfengyin/hardware-test-wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-vercel-gray-500 hover:text-vercel-black transition-colors no-underline"
          >
            GitHub →
          </a>
        </div>
      </div>
    </footer>
  );
}
