import Link from 'next/link';
import { getIssueByNumber, getIssueComments, getIssueLabels, formatDate } from '@/lib/github';

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
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold text-vercel-black mb-2 tracking-tight">
            文章未找到
          </h2>
          <p className="text-vercel-gray-500 mb-6">
            该文章可能已被删除或不存在
          </p>
          <Link href="/" className="btn btn-primary no-underline text-white">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const labels = getIssueLabels(issue);

  return (
    <div className="min-h-screen">
      <div
        className="bg-white sticky top-14 z-40"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 0px 0px' }}
      >
        <div className="container-custom py-2.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-vercel-gray-500 hover:text-vercel-black transition-colors no-underline font-normal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首页
          </Link>
        </div>
      </div>

      <div className="container-custom py-10">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap gap-1.5 mb-4">
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

            <h1 className="text-2xl md:text-3xl font-semibold text-vercel-black mb-4 tracking-tight leading-tight">
              {issue.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-vercel-gray-500">
              <div className="flex items-center gap-2">
                <img
                  src={issue.user.avatar_url}
                  alt={issue.user.login}
                  className="w-5 h-5 rounded-full"
                />
                <span className="font-medium text-vercel-black">{issue.user.login}</span>
              </div>
              <span className="text-vercel-gray-400">·</span>
              <span>{formatDate(issue.created_at)}</span>
              <span className="text-vercel-gray-400">·</span>
              <span className="font-mono">{issue.comments} 条评论</span>
            </div>
          </header>

          <div
            className="card p-6 sm:p-8"
            dangerouslySetInnerHTML={{
              __html: formatMarkdown(issue.body || ''),
            }}
          />

          {comments.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-semibold text-vercel-black mb-6 tracking-tight">
                评论 ({comments.length})
              </h2>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="card p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={comment.user.avatar_url}
                        alt={comment.user.login}
                        className="w-6 h-6 rounded-full"
                      />
                      <div>
                        <span className="text-sm font-medium text-vercel-black">
                          {comment.user.login}
                        </span>
                        <span className="text-xs text-vercel-gray-400 ml-2">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdown(comment.body),
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <footer className="mt-12 pt-6" style={{ borderTop: '1px solid #ebebeb' }}>
            <div className="flex items-center justify-between">
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-vercel-link-blue hover:text-vercel-blue transition-colors"
              >
                在 GitHub 上查看 →
              </a>
              <div className="flex gap-4 text-xs text-vercel-gray-500">
                <span className="font-mono">👍 {issue.reactions?.plus1 || 0}</span>
                <span className="font-mono">👁️ {issue.views || 0}</span>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

function formatMarkdown(text) {
  if (!text) return '';
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre><code class="language-$1">$2</code></pre>'
  );
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(
    /^### (.+)$/gm,
    '<h3 style="font-size:1.125rem;font-weight:600;margin-top:1.5rem;margin-bottom:0.75rem;color:#171717;letter-spacing:-0.01em">$1</h3>'
  );
  html = html.replace(
    /^## (.+)$/gm,
    '<h2 style="font-size:1.25rem;font-weight:600;margin-top:2rem;margin-bottom:1rem;color:#171717;letter-spacing:-0.02em">$1</h2>'
  );
  html = html.replace(
    /^# (.+)$/gm,
    '<h1 style="font-size:1.5rem;font-weight:600;margin-top:2rem;margin-bottom:1rem;color:#171717;letter-spacing:-0.02em">$1</h1>'
  );
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" style="color:#0072f5;text-decoration:underline;text-underline-offset:2px" target="_blank" rel="noopener">$1</a>'
  );
  html = html.replace(
    /^- (.+)$/gm,
    '<li style="margin-left:1rem;margin-bottom:0.25rem;color:#4d4d4d">$1</li>'
  );
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter((c) => c.trim());
    if (cells.some((c) => c.trim().match(/^-+$/))) return '';
    const row = cells
      .map((c) => `<td style="padding:8px 16px;border-bottom:1px solid #ebebeb;font-size:0.875rem;color:#4d4d4d">${c.trim()}</td>`)
      .join('');
    return `<tr>${row}</tr>`;
  });
  html = html.replace(
    /(<tr>.*<\/tr>)/s,
    '<table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.875rem">$1</table>'
  );
  html = html.replace(/\n\n/g, '</p><p style="margin:1rem 0;color:#4d4d4d;line-height:1.75">');
  html = '<p style="margin:1rem 0;color:#4d4d4d;line-height:1.75">' + html + '</p>';
  return html;
}
