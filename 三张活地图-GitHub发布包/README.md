# 三张活地图：有据可查的课程资料问答

用于 GitHub Pages 的发布包：26 个节点、45 条关系、三图探索、轻量机器学习地图问答、可复现合成实验、来源、学习路径和本地更新记录。

## 首次发布（只用浏览器）

1. 登录 GitHub，打开 https://github.com/new 。仓库名填写 `three-living-maps`，可见性选 **Public**，勾选 **Add README**，点击 **Create repository**。免费账号的 Pages 使用公开仓库。
2. 解压上传包，进入仓库的 **Add file → Upload files**。将解压后的 `.github` 文件夹、`docs` 文件夹和本 README 一起拖入。上传的是文件与文件夹，不是 ZIP 压缩包。确认出现 `docs/index.html` 和 `.github/workflows/pages.yml`，然后 **Commit changes** 到 `main`。
3. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 回到 **Actions**，打开 **Publish three living maps**。如果第一次在启用 Pages 前失败，点 **Re-run all jobs**；也可以用 **Run workflow** 从 `main` 手动启动。
5. 工作流成功后，在 **Settings → Pages → Visit site** 查看网站。网址通常为 `https://你的用户名.github.io/three-living-maps/`。以 GitHub 显示的实际网址为准；发布可能需要等待几分钟。
6. 用无痕窗口、手机流量和校园网验证免登录访问，再把实际网址交给同学。国内不同网络的可达性尚未由本样本实测。

## 若没有成功上传 `.github` 文件夹

网页上传有问题时，可以只上传 `docs` 文件夹，然后在 **Settings → Pages** 选择 **Deploy from a branch → main → /docs → Save**。这是另一种发布方式，两种选一种即可；分支发布使用 GitHub 自动生成的部署流程，不需要自定义工作流。

## 以后怎样更新

在仓库编辑或重新上传 `docs/data.js` 等文件并提交，GitHub 会按所选发布方式重新部署。网站内部“修改节点”和“反馈表”只保存在访问者自己的浏览器；维护者需收集导出记录、核实内容，再更新仓库。

## 作业还需完成什么

- 本校真实课程和培养方案核实、课堂第三个“观”、具体会议类别。
- 获授权的真实资料测试、至少 3 名非本组同学独立反馈、每位成员真实贡献。
- 中期以来的持续更新、真实认识变化，以及国内普通网络可访问验证。
- 样本实现的是本地朴素贝叶斯意图识别与内容检索，不是大语言模型调用。GitHub Pages 托管静态网页，后续模型密钥应保存在独立服务端。

## 文件

- `docs/index.html`：网站首页。
- `docs/data.js`：节点、关系、来源与课程入口。
- `docs/engine.js`：轻量 AI 算法和 75 条训练短句。
- `docs/reference.md`：完整文字参考稿。
- `docs/experiment.json`、`docs/experiment.cjs`：合成数据、排名与复现脚本。
- `.github/workflows/pages.yml`：提交到 `main` 后发布 `docs/` 的配置。

本发布包不包含原始 Sites 项目配置、Git 历史、依赖目录或凭据。发布的网页与仓库均应只放获准公开的内容。

依据：[GitHub Pages 官方创建说明](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)、[官方 Actions 发布说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。核查于 2026-10-17。
