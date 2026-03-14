// GitHub API
const REPO_OWNER = 'xfengyin';
const REPO_NAME = 'hardware-test-wiki';

const headers = {
  'Accept': 'application/vnd.github.v3+json',
};

export async function getIssues() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open&per_page=100`,
      { headers }
    );
    if (!response.ok) return [];
    const issues = await response.json();
    return issues.filter(issue => !issue.pull_request);
  } catch (error) {
    console.error('Failed to fetch issues:', error);
    return [];
  }
}

export async function getIssueByNumber(number) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues/${number}`,
      { headers }
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch issue:', error);
    return null;
  }
}

export function getIssueLabels(issue) {
  return issue.labels.map(label => ({
    name: label.name,
    color: label.color,
  }));
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays < 7) return `${diffDays} 天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} 周前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} 月前`;
  return `${Math.floor(diffDays / 365)} 年前`;
}