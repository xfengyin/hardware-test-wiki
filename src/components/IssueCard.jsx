import React from 'react';
import { getIssueLabels, formatDate } from '../lib/github';

export default function IssueCard({ issue, index, onClick }) {
  const labels = getIssueLabels(issue);
  
  return (
    <div 
      onClick={onClick}
      className="card card-gradient group cursor-pointer transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {labels.map((label) => (
            <span 
              key={label.name}
              className="tag"
              style={{
                backgroundColor: `#${label.color}20`,
                color: `#${label.color}`,
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold text-slate-900 dark:text-dark-text mb-2 group-hover:text-primary-500 transition-colors">
          {issue.title}
        </h3>
        
        <p className="text-slate-600 dark:text-dark-muted text-sm line-clamp-2 mb-4">
          {issue.body?.substring(0, 120)}...
        </p>
        
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-dark-muted">
          <div className="flex items-center gap-3">
            <span>💬 {issue.comments}</span>
            <span>👍 {issue.reactions?.total_count || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={issue.user.avatar_url} alt={issue.user.login} className="w-5 h-5 rounded-full"/>
            <span>{issue.user.login}</span>
            <span>·</span>
            <span>{formatDate(issue.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}