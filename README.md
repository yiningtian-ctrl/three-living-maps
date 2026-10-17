# VLA 驱动的桌面整理机器人：三张活地图

制作于 2026-10-18。26 个节点，46 条类型关系，22 个文献与资料入口。围绕“把笔放进笔筒、把积木放进盒子”，连接领域、生态与认知。

## 最简单的 GitHub 发布方法

1. 解压本次 ZIP，打开外层文件夹，找到里面的 **docs**。
2. 到 GitHub 仓库首页，选择 **Add file → Upload files**，拖入 **docs 文件夹本身**，提交到 `main`。
3. 上传后，仓库首页必须直接显示 `docs`；点击后能看到 `index.html`。
4. 进入 **Settings → Pages → Source → Deploy from a branch**，选择 **main → /docs → Save**。
5. 等发布成功，点击 **Visit site**。用无痕模式、手机流量与校园网再验证。

关键结构：`仓库根目录/docs/index.html`。不要变成 `仓库根目录/机器人三张地图发布包/docs/index.html`。

可直接在你已创建的 `three-living-maps` 仓库上传新版 docs；相同路径文件会在提交后更新。原来外层目录中的文件不会被该发布路径使用。你的 GitHub 仓库尚未由我代为上传，本包本身不代表已上线。

## 以后怎样更新

在仓库更新 `docs` 中的文件并提交后，GitHub 会按设置重新发布。使用本包的 /docs 分支发布即可，无需手工创建工作流。

## 文献在哪里

- 页面“文献与出处”：每条有作者、年份、版本、链接、定位和支持范围。
- `docs/references.md`：完整参考文献清单。
- `docs/references.bib`：7 篇核心论文的 BibTeX；只填已核查信息，不虚构卷期页码。
- `docs/reference.md`：完整文字参考稿，含三图节点、关系和案例。

## 本地浏览与修改

双击 `docs/index.html` 即可使用内置内容，无需模型密钥或下载依赖。修改节点与关系请编辑 `docs/data.js`。网页内的节点编辑、反馈和更新记录只存当前浏览器，可导出 JSON；核实后需更新仓库才会公开同步。

`docs/engine.js` 是轻量机器学习意图识别与地图摘录。它不是 VLA 推理、不控制机械臂、不调用大语言模型，也不联网查新。

## 参考样本的边界

已提供知识框架、论文入口、样本案例和学习路径。未完成本校培养方案核查、真机或 VLA 运行、真实成功率测试、至少 3 人互评、多周记录与成员贡献。它们不能用 AI 编造。

## 维护脚本

有 Node.js 时，在本目录运行 `node build-reference.cjs` 可重生成参考稿和引用清单；`node verify.cjs` 检查节点、来源和问答边界。浏览器验证记录见 `docs/browser-verification.json`，它是开发检查，不是同学互评。

GitHub Pages 托管静态页面；后续若接大模型，请使用独立服务端保护密钥。国内网络访问情况需实际测试，不作可达性保证。

发布规则依据：[GitHub Pages 官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。
