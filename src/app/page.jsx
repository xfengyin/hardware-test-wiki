import { getIssues } from '@/lib/github';
import IssueCard from '@/components/IssueCard';

export async function generateStaticParams() {
  return [];
}

export const revalidate = 300;

export default async function HomePage({ searchParams }) {
  const search = searchParams?.search || '';

  let issues = await getIssues();

  if (search) {
    issues = issues.filter(
      (issue) =>
        issue.title.toLowerCase().includes(search.toLowerCase()) ||
        issue.body?.toLowerCase().includes(search.toLowerCase())
    );
  }

  const stats = {
    articles: issues.filter((i) => i.labels.some((l) => l.name === 'article')).length,
    total: issues.length,
    contributors: [...new Set(issues.map((i) => i.user.login))].length,
  };

  return (
    <div className="min-h-screen">
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
            <a
              href="/"
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium no-underline hover:font-medium ${
                !searchParams?.label
                  ? 'bg-vercel-black text-white'
                  : 'bg-vercel-gray-50 text-vercel-gray-600'
              }`}
            >
              全部
            </a>
            <a
              href="/?label=article"
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-vercel-blue-light text-vercel-blue-dark no-underline hover:font-medium"
            >
              知识文章
            </a>
            <a
              href="/?label=hardware"
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-vercel-blue-light text-vercel-blue-dark no-underline hover:font-medium"
            >
              硬件
            </a>
            <a
              href="/?label=question"
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-vercel-gray-50 text-vercel-gray-600 no-underline hover:font-medium"
            >
              问答
            </a>
          </div>

          {issues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {issues.map((issue, index) => (
                <IssueCard key={issue.number} issue={issue} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-vercel-black mb-2 tracking-tight">
                暂无内容
              </h3>
              <p className="text-vercel-gray-500 mb-6">
                {search ? '没有找到相关文章' : '成为第一个贡献者！'}
              </p>
              <a
                href="https://github.com/xfengyin/hardware-test-wiki/issues/new?labels=article"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary no-underline text-white"
              >
                提交文章
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
