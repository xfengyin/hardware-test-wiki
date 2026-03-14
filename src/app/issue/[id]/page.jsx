import Link from 'next/link';
import { getIssueByNumber, getIssueComments, getIssueLabels, formatDate } from '@/lib/github';

// 生成静态页面参数
export async function generateStaticParams() {
  return [];
}

export const revalidate = 300;

export default async function IssuePage({ params }) {
  const issue = await getIssueByNumber(params.id);
  const comments = await getIssueComments(params.id);
  
  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-dark-text mb-2">
            文章未找到
          </h2>
          <p className="text-slate-500 dark:text-dark-muted mb-4">
            该文章可能已被删除或不存在
          </p>
          <Link href="/" className="btn btn-primary">
            返回首页
          </Link>
        </div>
      </div>
    );
  }
  
  const labels = getIssueLabels(issue);

  return (
    <div className="min-h-screen">
      {/* 顶部导航 */}
      <div className="bg-white dark:bg-dark-card border-b border-slate-200 dark:border-dark-border sticky top-16 z-40">
        <div className="container-custom py-3">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-dark-muted hover:text-primary-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首页
          </Link>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <article className="max-w-4xl mx-auto">
          {/* 标题区域 */}
          <header className="mb-8">
            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
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
            
            {/* 标题 */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-dark-text mb-4">
              {issue.title}
            </h1>
            
            {/* 作者信息 */}
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-dark-muted">
              <div className="flex items-center gap-2">
                <img 
                  src={issue.user.avatar_url} 
                  alt={issue.user.login}
                  className="w-6 h-6 rounded-full"
                />
                <span>{issue.user.login}</span>
              </div>
              <span>·</span>
              <span>{formatDate(issue.created_at)}</span>
              <span>·</span>
              <span>{issue.comments} 条评论</span>
            </div>
          </header>
          
          {/* 内容 */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div 
              className="bg-white dark:bg-dark-card rounded-xl p-8 border border-slate-200 dark:border-dark-border"
              dangerouslySetInnerHTML={{ 
                __html: formatMarkdown(issue.body || '') 
              }}
            />
          </div>
          
          {/* 评论区 */}
          {comments.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-6">
                💬 评论 ({comments.length})
              </h2>
              
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div 
                    key={comment.id}
                    className="bg-white dark:bg-dark-card rounded-xl p-6 border border-slate-200 dark:border-dark-border"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={comment.user.avatar_url} 
                        alt={comment.user.login}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-dark-text">
                          {comment.user.login}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-dark-muted">
                          {formatDate(comment.created_at)}
                        </div>
                      </div>
                    </div>
                    <div 
                      className="prose prose-sm dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: formatMarkdown(comment.body) 
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* 底部操作 */}
          <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600"
              >
                在 GitHub 上查看 →
              </a>
              
              <div className="flex gap-4">
                <span className="text-slate-500 dark:text-dark-muted">
                  👍 {issue.reactions?.plus1 || 0}
                </span>
                <span className="text-slate-500 dark:text-dark-muted">
                  👁️ {issue.views || 0}
                </span>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

// 简单的 Markdown 格式化
function formatMarkdown(text) {
  if (!text) return '';
  
  // 转义 HTML
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // 代码块
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, 
    '<pre><code class="language-$1">$2</code></pre>');
  
  // 行内代码
  html = html.replace(/`([^`]+)`/g, 
    '<code class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm font-mono">$1</code>');
  
  // 标题
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-8 mb-4">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>');
  
  // 粗体和斜体
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
    '<a href="$2" class="text-primary-500 hover:underline" target="_blank" rel="noopener">$1</a>');
  
  // 列表
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(/(<li.*<\/li>)/s, '<ul>$1</ul>');
  
  // 表格
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(c => c.trim());
    if (cells.some(c => c.trim().match(/^-+$/))) {
      return '';
    }
    const row = cells.map(c => `<td class="px-4 py-2 border border-slate-200 dark:border-dark-border">${c.trim()}</td>`).join('');
    return `<tr>${row}</tr>`;
  });
  html = html.replace(/(<tr>.*<\/tr>)/s, '<table class="w-full border-collapse my-4">$1</table>');
  
  // 段落
  html = html.replace(/\n\n/g, '</p><p class="my-4">');
  html = '<p class="my-4">' + html + '</p>';
  
  return html;
}