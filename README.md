# ⚡ HardwareTest Wiki

硬件测试知识分享平台 - 静态站点

![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-brightgreen)

## 🚀 快速部署

### 方式一：直接使用 (推荐)

项目已生成静态文件在 `dist/` 目录。

1. Fork 本仓库
2. 进入 **Settings** → **Pages**
3. Source 选择 **Deploy from a branch**
4. Branch 选择 **main**，目录选择 `/dist`
5. 保存后等待部署完成

### 方式二：本地构建后推送

```bash
# 静态文件位置
dist/index.html
```

## 📝 提交文章

1. 访问 [Issues](https://github.com/xfengyin/hardware-test-wiki/issues/new)
2. 选择标签: `article`
3. 填写标题和内容 (支持 Markdown)
4. 提交

### 标签说明

| 标签 | 用途 |
|------|------|
| `article` | 知识文章 |
| `hardware` | 硬件相关 |
| `question` | 问答 |

## 🎨 特性

- 🚀 静态 HTML，无需服务器
- 🌙 深色/浅色主题切换
- 📱 响应式设计
- ⚡ GitHub Issues 作为内容管理
- 🎯 实时从 GitHub 获取内容

## 📁 项目结构

```
hardware-test-wiki/
├── dist/
│   └── index.html     # 静态网站 (已构建)
├── src/               # 源文件
├── .github/
│   └── workflows/    # 部署配置
└── README.md
```

## 🔧 本地开发

如果需要修改并重新构建：

```bash
# 需要 Node.js 环境
npm install
npm run build

# 输出到 dist/
```

## 📄 许可证

MIT License