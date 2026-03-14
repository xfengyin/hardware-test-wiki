import React, { useEffect, useState } from 'react';
import { getIssueComments, getIssueLabels, formatDate } from '../lib/github';

export default function IssueDetail({ issue, onBack }) {
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    getIssueComments(issue.number).then(setComments);
  }, [issue.number]);
  
  const labels = getIssueLabels(issue);
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article>
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {labels.map((label) => (
              <span key={label.name} className="tag" style={{ backgroundColor: `#${label.color}20`, color: `#${label.color}` }}>
                {label.name}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text mb-4">{issue.title}</h1>
          
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-dark-muted">
            <div className="flex items-center gap-2">
              <img src={issue.user.avatar_url} alt={issue.user.login} className="w-6 h-6 rounded-full"/>
              <span>{issue.user.login}</span>
            </div>
            <span>·</span>
            <span>{formatDate(issue.created_at)}</span>
            <span>·</span>
            <span>{issue.comments} 条评论</span>
          </div>
        </header>
        
        <div className="bg-white dark:bg-dark-card rounded-xl p-8 border border-slate-200 dark:border-dark-border">
          <div className="prose prose-slate dark:prose-invert max-w-none" 
               dangerouslySetInnerHTML={{ __html: formatMarkdown(issue.body || '') }} />
        </div>
        
        {comments.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-6">💬 评论 ({comments.length})</h2>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white dark:bg-dark-card rounded-xl p-6 border border-slate-200 dark:border-dark-border">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={comment.user.avatar_url} alt={comment.user.login} className="w-8 h-8 rounded-full"/>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-dark-text">{comment.user.login}</div>
                      <div className="text-sm text-slate-500">{formatDate(comment.created_at)}</div>
                    </div>
                  </div>
                  <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: formatMarkdown(comment.body) }} />
                </div>
              ))}
            </div>
          </section>
        )}
        
        <footer className="mt-8 pt-6 border-t border-slate-200 dark:border-dark-border">
          <a href={issue.html_url} target="_blank" rel="noopener" className="text-primary-500 hover:underline">
            在 GitHub 上查看 →
          </a>
        </footer>
      </article>
    </div>
  );
}

function formatMarkdown(text) {
  if (!text) return '';
  let html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono">$1</code>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-8 mb-4">$1</h2>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-500 hover:underline">$1</a>');
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(/\n\n/g, '</p><p class="my-4">');
  return '<p class="my-4">' + html + '</p>';
}