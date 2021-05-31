### 审批流编辑器

[演示地址](https://hangaoke1.github.io/examine-react/)

### 目录结构

```
├── components
│   ├── MancoEditor // 代码编辑器
│   │   └── index.vue
│   └── YsFlow
│       ├── components
│       │   ├── AddNodeBtn.jsx // 节点添加按钮
│       │   ├── FlowEditNode.jsx // 节点公共组件
│       │   └── TitleInput.jsx // 标题编辑
│       ├── index.less // 样式文件
│       ├── index.jsx // 编辑器入口组件
│       ├── nodes // 节点
│       │   ├── FlowBranchNode.jsx // 分支节点
│       │   └── FlowRouteNode.jsx // 路由节点
│       └── panel
│           └── EditPanel.jsx // 配置编辑面板
├── lib // 核心工具类
│   ├── flow.js
│   ├── eventbus.js// 事件总线
│   ├── outputBranch.js
│   └── utils.js
```

不同项目，在审批流业务配置上有较大的区别，所以本示例代码中移除了所有业务相关的逻辑，用户可以根据自己需要进行业务配置扩展。
