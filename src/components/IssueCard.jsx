import React from 'react';
import { getIssueLabels, formatDate } from '../lib/github';

export default function IssueCard({ issue, index, onClick }) {
  const labels = getIssueLabels(issue);

  return (
    <div
      onClick={onClick}
      className="card card-gradient group cursor-pointer"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {labels.map((label) => (
            <span
              key={label.name}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
              style={{
                backgroundColor: `#${label.color}15`,
                color: `#${label.color}`,
              }}
            >
              {label.name}
            </span>
          ))}
        </div>

        <h3 className="text-base font-semibold text-vercel-black mb-2 group-hover:text-vercel-blue transition-colors tracking-tight leading-snug">
          {issue.title}
        </h3>

        <p className="text-vercel-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
          {issue.body?.substring(0, 120)}...
        </p>

        <div className="flex items-center justify-between text-xs text-vercel-gray-500">
          <div className="flex items-center gap-3">
            <span className="font-mono">💬 {issue.comments}</span>
            <span className="font-mono">👍 {issue.reactions?.total_count || 0}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <img src={issue.user.avatar_url} alt={issue.user.login} className="w-4 h-4 rounded-full" />
            <span>{issue.user.login}</span>
            <span className="text-vercel-gray-400">·</span>
            <span>{formatDate(issue.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
