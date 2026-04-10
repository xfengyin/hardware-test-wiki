# 🎨 硬件测试知识分享平台 - UI 设计方案

## 设计理念

**Vercel Design System** — 黑白精确，极简技术感，developer-first。  
遵循 Vercel 设计系统规范，以纯粹的黑白灰构建专业硬件测试知识平台。

---

## 🎨 色彩系统

### 主色调 — Vercel Palette

| 用途 | 颜色 | Hex |
|------|------|-----|
| 主色 (Primary) | Vercel Black | `#171717` |
| 强调色 (Accent) | Link Blue | `#0070f3` |
| 背景 | Pure White | `#FFFFFF` |
| 次文字 | Gray 600 | `#4d4d4d` |
| 辅助文字 | Gray 500 | `#666666` |

### 灰度系统

| 用途 | 颜色 | Hex |
|------|------|-----|
| 边框/分隔线 | Gray 100 | `#ebebeb` |
| 微妙表面 | Gray 50 | `#fafafa` |
| 占位文字 | Gray 400 | `#808080` |
| 辅助文字 | Gray 500 | `#666666` |
| 次文字 | Gray 600 | `#4d4d4d` |
| 主文字 | Vercel Black | `#171717` |

### Badge/标签色

| 用途 | 背景 | 文字 |
|------|------|------|
| 蓝色标签 | `#ebf5ff` | `#0068d6` |
| 灰色标签 | `#fafafa` | `#666666` |

---

## 🔤 字体系统

```css
/* 主字体 — Geist Sans (几何无衬线) */
font-family: 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* 等宽字体 — Geist Mono */
font-family: 'Geist Mono', ui-monospace, SFMono-Regular, monospace;

/* OpenType 特性 */
font-feature-settings: "liga" 1;  /* 连字 — 全局启用 */
```

**三字重体系**: 400 (阅读), 500 (交互), 600 (标题)

---

## 🃏 组件设计

### 1. Issue 卡片 (IssueCard)

- 圆角: 8px
- 边框: shadow-as-border `rgba(0,0,0,0.08) 0px 0px 0px 1px`
- 阴影栈: `border + elevation + inner #fafafa ring`
- 悬停: shadow 加深
- 顶部装饰: 0.5px 蓝色条 `#0070f3`

### 2. 导航栏 (Header)

- 固定顶部 `sticky top-0 z-50`
- 毛玻璃效果 `bg-white/90 backdrop-blur-md`
- 边框: shadow-as-bottom
- 高度: h-14
- Logo: 黑色方块+⚡
- CTA: 黑色实心按钮

### 3. 标签 (Tag/Pill Badge)

- 圆角: `rounded-full` (9999px pill)
- 内边距: `px-2 py-0.5`
- 字号: 11px weight 500

### 4. 按钮 (Button)

- **Primary**: bg `#171717`, text `#fff`, radius 6px
- **Secondary**: bg `#fff`, shadow-border, radius 6px

---

## 🔲 深度系统 (Shadow-as-Border)

| 层级 | 处理 | 用途 |
|------|------|------|
| Ring | `rgba(0,0,0,0.08) 0px 0px 0px 1px` | 替代传统边框 |
| Subtle Card | Ring + `rgba(0,0,0,0.04) 0px 2px 2px` | 标准卡片 |
| Full Card | Ring + Subtle + inner `#fafafa` ring | 重点卡片 |
| Focus | `2px solid hsla(212,100%,48%,1)` | 键盘焦点 |

---

## 📐 布局原则

- 基础单位: 8px
- 容器最大宽度: 1200px
- 画廊式留白，分隔依靠 shadow-border 和间距
