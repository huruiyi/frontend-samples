import type { Article, Tag, SiteConfig } from '@/types'

const ARTICLES_KEY = 'blog_articles'
const TAGS_KEY = 'blog_tags'
const CONFIG_KEY = 'blog_config'

const defaultTags: Tag[] = [
  { id: '1', name: '前端开发', color: '#3B82F6' },
  { id: '2', name: 'Vue.js', color: '#42b883' },
  { id: '3', name: 'TypeScript', color: '#3178c6' },
  { id: '4', name: '工具推荐', color: '#f59e0b' },
  { id: '5', name: '随笔', color: '#8b5cf6' },
  { id: '6', name: '技术思考', color: '#ef4444' },
]

const defaultConfig: SiteConfig = {
  title: '我的技术博客',
  subtitle: '记录技术成长，分享开发心得',
  authorName: 'Blog Author',
  authorBio: '一名热爱前端开发的程序员，喜欢探索新技术，记录学习心得。',
  authorAvatar: '',
  githubUrl: 'https://github.com',
  email: 'blog@example.com',
  aboutContent: `## 关于我

你好，我是这个博客的作者！

## 我的技术栈

- **前端**: Vue.js, React, TypeScript
- **后端**: Node.js, Python
- **工具**: Git, Docker, Vite

## 关于博客

这个博客记录我在技术探索路上的点点滴滴，包括：

- 前端开发技巧
- 框架使用心得
- 工具推荐与评测
- 个人随笔与思考

## 联系方式

欢迎通过邮件或 GitHub 与我交流！
`,
}

const defaultArticles: Article[] = [
  {
    id: '1',
    title: 'Vue3 Composition API 深度解析',
    summary: '本文深入探讨 Vue3 Composition API 的核心概念，包括 setup、ref、reactive、computed、watch 等，带你全面理解组合式 API 的优势与使用场景。',
    content: `# Vue3 Composition API 深度解析

## 前言

Vue3 引入了全新的 Composition API，相比 Options API 提供了更灵活的代码组织方式。

## setup 函数

\`setup\` 是 Composition API 的入口，在组件创建之前执行：

\`\`\`ts
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubled = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    return { count, doubled, increment }
  }
}
\`\`\`

## ref 与 reactive

**ref** 用于基本类型：

\`\`\`ts
const name = ref('Vue')
console.log(name.value) // 'Vue'
\`\`\`

**reactive** 用于对象：

\`\`\`ts
const state = reactive({
  count: 0,
  message: 'Hello'
})
\`\`\`

## watch 与 watchEffect

\`\`\`ts
// 监听特定值
watch(count, (newVal, oldVal) => {
  console.log(\`count changed: \${oldVal} -> \${newVal}\`)
})

// 自动追踪依赖
watchEffect(() => {
  console.log(\`count is \${count.value}\`)
})
\`\`\`

## 总结

Composition API 让逻辑复用变得更加优雅，通过自定义 composables 可以轻松抽离和共享逻辑。
`,
    tags: ['1', '2'],
    createdAt: '2026-04-10T10:00:00Z',
    updatedAt: '2026-04-10T10:00:00Z',
    published: true,
    viewCount: 128,
  },
  {
    id: '2',
    title: 'TypeScript 实用技巧汇总',
    summary: '整理日常开发中常用的 TypeScript 技巧，涵盖类型体操、工具类型、泛型约束等实用知识点，助力写出更健壮的代码。',
    content: `# TypeScript 实用技巧汇总

## 工具类型

TypeScript 内置了很多实用的工具类型：

\`\`\`ts
// Partial - 所有属性变可选
type PartialUser = Partial<User>

// Required - 所有属性变必选
type RequiredUser = Required<User>

// Pick - 选取部分属性
type UserPreview = Pick<User, 'id' | 'name'>

// Omit - 排除部分属性
type UserWithoutPassword = Omit<User, 'password'>
\`\`\`

## 泛型约束

\`\`\`ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'Alice', age: 30 }
const name = getProperty(user, 'name') // string
\`\`\`

## 联合类型缩小

\`\`\`ts
type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number }

function getArea(shape: Shape): number {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2
  }
  return shape.side ** 2
}
\`\`\`

## 条件类型

\`\`\`ts
type IsArray<T> = T extends any[] ? true : false

type A = IsArray<number[]> // true
type B = IsArray<string>   // false
\`\`\`
`,
    tags: ['1', '3'],
    createdAt: '2026-04-12T14:30:00Z',
    updatedAt: '2026-04-12T14:30:00Z',
    published: true,
    viewCount: 95,
  },
  {
    id: '3',
    title: '我常用的开发效率工具',
    summary: '分享我日常开发中离不开的效率工具，包括编辑器插件、命令行工具、在线资源等，希望能帮助你提升开发效率。',
    content: `# 我常用的开发效率工具

## 编辑器

**VS Code** 是我的主力编辑器，以下是必装插件：

- **Volar** - Vue 官方插件，语法高亮 + 智能提示
- **ESLint** - 代码规范检查
- **Prettier** - 代码格式化
- **GitLens** - Git 增强工具

## 命令行工具

\`\`\`bash
# oh-my-zsh - zsh 增强框架
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# zoxide - 智能目录跳转
cargo install zoxide

# fzf - 模糊搜索
brew install fzf
\`\`\`

## 在线工具

- [Excalidraw](https://excalidraw.com) - 手绘风格流程图
- [Carbon](https://carbon.now.sh) - 代码截图美化
- [Regex101](https://regex101.com) - 正则表达式调试
- [JSON Crack](https://jsoncrack.com) - JSON 可视化

## 总结

好工具能大幅提升开发体验，值得花时间配置好自己的工具链。
`,
    tags: ['4'],
    createdAt: '2026-04-15T09:00:00Z',
    updatedAt: '2026-04-15T09:00:00Z',
    published: true,
    viewCount: 67,
  },
  {
    id: '4',
    title: '关于坚持写博客这件事',
    summary: '写博客快一年了，聊聊我对坚持写博客的感悟，以及它给我带来了哪些改变。',
    content: `# 关于坚持写博客这件事

## 为什么开始写

最初开始写博客，纯粹是因为想记录学习过程。技术知识点容易遗忘，写下来一方面帮助记忆，另一方面如果以后遇到同样的问题可以快速查阅。

## 写作让我更清晰

费曼学习法的核心是：**如果你不能简单地解释一件事，说明你还没有真正理解它。**

当我尝试把技术点用文字表达出来的时候，往往会发现自己有些地方理解得并不到位。写作的过程本身就是深入思考的过程。

## 意外的收获

- 结识了不少有共同爱好的朋友
- 有几篇文章被广泛转发，获得了很多鼓励
- 养成了系统整理知识的习惯

## 建议

如果你也想开始写博客，不要等到"准备好了"再写。

> 完成比完美更重要。

从今天开始，把你最近学到的一个知识点写下来，这就是最好的开始。
`,
    tags: ['5', '6'],
    createdAt: '2026-04-17T20:00:00Z',
    updatedAt: '2026-04-17T20:00:00Z',
    published: true,
    viewCount: 43,
  },
]

export function getArticles(): Article[] {
  const raw = localStorage.getItem(ARTICLES_KEY)
  if (!raw) {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(defaultArticles))
    return defaultArticles
  }
  return JSON.parse(raw)
}

export function saveArticles(articles: Article[]) {
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles))
}

export function getTags(): Tag[] {
  const raw = localStorage.getItem(TAGS_KEY)
  if (!raw) {
    localStorage.setItem(TAGS_KEY, JSON.stringify(defaultTags))
    return defaultTags
  }
  return JSON.parse(raw)
}

export function saveTags(tags: Tag[]) {
  localStorage.setItem(TAGS_KEY, JSON.stringify(tags))
}

export function getSiteConfig(): SiteConfig {
  const raw = localStorage.getItem(CONFIG_KEY)
  if (!raw) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(defaultConfig))
    return defaultConfig
  }
  return JSON.parse(raw)
}

export function saveSiteConfig(config: SiteConfig) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}
