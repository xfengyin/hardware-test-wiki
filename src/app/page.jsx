import { getIssues } from '@/lib/github';
import IssueCard from '@/components/IssueCard';

// 生成静态页面参数
export async function generateStaticParams() {
  return [];
}

export const revalidate = 300; // 5 分钟重新验证

export default async function HomePage({ searchParams }) {
  const search = searchParams?.search || '';
  
  // 获取 Issues
  let issues = await getIssues();
  
  // 搜索过滤
  if (search) {
    issues = issues.filter(issue => 
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.body?.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // 统计信息
  const stats = {
    articles: issues.filter(i => i.labels.some(l => l.name === 'article')).length,
    total: issues.length,
    contributors: [...new Set(issues.map(i => i.user.login))].length,
  };

  return (
    <div className="min-h-screen">
      {/* Hero 区域 */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900 grid-bg">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
        
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ⚡ 硬件测试知识库
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              收录硬件测试工程师的实战经验与技术分享
            </p>
            
            {/* 统计数据 */}
            <div className="flex justify-center gap-8 text-slate-400">
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-primary-400">{stats.articles}</div>
                <div className="text-sm">知识文章</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-accent-400">{stats.contributors}</div>
                <div className="text-sm">贡献者</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-cyan-400">{stats.total}</div>
                <div className="text-sm">总条目</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 内容区域 */}
      <section className="py-12">
        <div className="container-custom">
          {/* 标签筛选 */}
          <div className="flex flex-wrap gap-3 mb-8">
            <a 
              href="/"
              className={`tag ${!searchParams?.label ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-700 dark:bg-dark-card dark:text-dark-muted'}`}
            >
              全部
            </a>
            <a 
              href="/?label=article"
              className="tag tag-article"
            >
              📝 知识文章
            </a>
            <a 
              href="/?label=hardware"
              className="tag tag-hardware"
            >
              🔌 硬件
            </a>
            <a 
              href="/?label=question"
              className="tag tag-question"
            >
              ❓ 问答
            </a>
          </div>
          
          {/* Issue 列表 */}
          {issues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.map((issue, index) => (
                <IssueCard key={issue.number} issue={issue} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-dark-text mb-2">
                暂无内容
              </h3>
              <p className="text-slate-500 dark:text-dark-muted">
                {search ? '没有找到相关文章' : '成为第一个贡献者！'}
              </p>
              <a
                href="https://github.com/xfengyin/hardware-test-wiki/issues/new?labels=article"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-4 inline-block"
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