# LINUX DO Topic Blocker

`LINUX DO Topic Blocker` 是一组 Userscript 内容屏蔽脚本，用来在 `linux.do` 和 `ldcstore.com` 前端隐藏不想看到的话题、商品、小店、求购与热榜内容。

项目当前开发文件放在 `dev` 分支；`dist/` 中的 `.user.js` 是可直接安装的构建产物。

## 快速安装

先安装脚本管理器，推荐使用 `Violentmonkey` 或 `Tampermonkey`。

LINUX DO：

1. 打开 [linux-do-topic-blocker.user.js](https://raw.githubusercontent.com/0-V-linuxdo/LINUX-DO-Topic-Blocker/dev/dist/linux-do-topic-blocker.user.js)。
2. 在脚本管理器弹出的安装页中确认安装。
3. 访问 `https://linux.do/`，脚本会自动生效。

LD士多：

1. 打开 [ldcstore-content-blocker.user.js](https://raw.githubusercontent.com/0-V-linuxdo/LINUX-DO-Topic-Blocker/dev/dist/ldcstore-content-blocker.user.js)。
2. 在脚本管理器弹出的安装页中确认安装。
3. 访问 `https://ldcstore.com/`，脚本会自动生效。

## 功能

- 按标题关键词、类别、标签隐藏 LINUX DO 话题列表内容。
- 按名称关键词、分类或状态、卖家或标签隐藏 LD士多内容。
- 支持为标题、类别、标签分别添加 JavaScript 正则规则。
- 搜索页提供悬浮过滤器，支持“屏蔽 / 必含 / 正则”，并按搜索词分别保存。
- 设置保存后即时生效，不需要手动刷新页面。
- 支持配置导入和导出，便于跨浏览器或跨设备同步。
- 仅做前端隐藏，不依赖登录接口，也不会删除站点原始内容。
- 保留 `window.triggerContentFilter`，兼容外部总结脚本联动。

## 使用说明

在脚本管理器菜单中打开 `⚙️ 屏蔽设置`。

常规规则：

- 标题关键词：逗号分隔，按包含匹配处理。
- 类别：逗号分隔，按完全匹配处理。
- 标签：逗号分隔，按完全匹配处理。

高级正则：

- 在标题、类别、标签各自的正则页中添加规则。
- 输入 JavaScript 正则表达式主体，不需要写成 `/.../`。
- 无效正则会提示错误；有效规则会保存并立即参与过滤。

搜索页过滤：

- 在 `https://linux.do/search?q=...` 和 LD士多搜索页中使用右上角悬浮过滤器。
- `屏蔽` 表示黑名单关键词。
- `必含` 表示白名单关键词，结果至少命中一个才会显示。
- `正则` 表示每行一个 JavaScript 正则表达式。

## 配置导入导出

设置弹窗提供同步功能：

- 导出：下载当前站点的 JSON 配置文件。
- 导入：选择之前导出的 JSON 文件并覆盖当前配置。

导出的配置包含 `schemaVersion`，核心结构如下：

```json
{
  "schemaVersion": 1,
  "blockedTitles": [],
  "blockedCategories": [],
  "blockedTags": [],
  "titleRegexList": [],
  "categoryRegexList": [],
  "tagRegexList": [],
  "searchFilterMap": {},
  "summaryScriptEnabled": true
}
```

兼容说明：

- 旧版本的 `blockedTtags` 会在读取或导入时迁移为 `blockedTags`。
- 没有 `schemaVersion` 的旧备份仍可导入。
- 新配置写回时只输出当前字段。

## 开发

要求：

- Node.js `>= 18`
- npm

常用命令：

```sh
npm install
npm run dev
npm run build
npm test
```

说明：

- `npm run dev` 使用 Rollup watch 模式持续构建。
- `npm run build` 输出 `dist/linux-do-topic-blocker.user.js` 和 `dist/ldcstore-content-blocker.user.js`。
- `npm test` 使用 Node.js 内置测试运行器。
- `legacy/` 中的旧脚本是历史归档，不会被构建命令覆盖。

## 项目结构

```text
src/        源码，按核心逻辑、站点 profile、功能模块和平台适配拆分
dist/       构建产物，也是正式安装入口
test/       Node.js 测试
legacy/     历史脚本归档
reference/  参考脚本和素材
scripts/    辅助脚本
```

## License

MIT
