const fs=require('node:fs'),vm=require('node:vm');vm.runInThisContext(fs.readFileSync('docs/data.js','utf8'));const a=globalThis.ATLAS;
const source=id=>a.sources.find(s=>s.id===id),node=id=>a.nodes.find(n=>n.id===id);
const cite=s=>`[${s.id}] ${s.authors}. ${s.title}[EB/OL]. ${s.year}. [${s.checked}]. ${s.url}`;
const refs=ids=>ids.map(id=>`[${id}](${source(id).url})`).join('、');
const bibliography=['# 参考文献与出处','核查日期：2026-10-18。以下为原始论文、官方项目、教材或用户提供原文。预印本保留 arXiv 标识；不虚构卷期页码。',...a.sources.flatMap(s=>[`## ${s.id} · ${s.title}`,cite(s),`- 原文定位：${s.where}`,`- 支持范围：${s.note}`,`- 类型：${s.kind}`])].join('\n\n');
fs.writeFileSync('docs/references.md',bibliography+'\n');
const bibRows=[['R01','kim2024openvla','Kim, Moo Jin and Pertsch, Karl and Karamcheti, Siddharth and others','2024','2406.09246','v3'],['R02','brohan2023rt2','Brohan, Anthony and Brown, Noah and Carbajal, Justice and others','2023','2307.15818','v1'],['R03','black2024pi0','Black, Kevin and Brown, Noah and Driess, Danny and others','2024','2410.24164','v4'],['R04','shukor2025smolvla','Shukor, Mustafa and Aubakirova, Dana and Capuano, Francesco and others','2025','2506.01844',''],['R05','chi2023diffusion','Chi, Cheng and Feng, Siyuan and Du, Yilun and others','2023','2303.04137',''],['R06','oxe2023','{Open X-Embodiment Collaboration} and others','2023','2310.08864','v9'],['R07','liu2023libero','Liu, Bo and Zhu, Yifeng and Gao, Chongkai and others','2023','2306.03310','']];
const bib=bibRows.map(([id,key,author,year,eprint,version])=>`@misc{${key},\n  title = {${source(id).title.replace('π0','{\\pi}_0')}},\n  author = {${author}},\n  year = {${year}},\n  eprint = {${eprint}${version}},\n  archivePrefix = {arXiv},\n  url = {${source(id).url}},\n  note = {Accessed 2026-10-18; ${id}; original release year; see source for revisions}\n}`).join('\n\n');
fs.writeFileSync('docs/references.bib',bib+'\n');
const lines=['# 三张活地图作业参考样本：VLA 驱动的桌面整理机器人',
'> 制作于 2026-10-18。文献事实、样本设计、学习建议与尚未完成的实践明确区分。没有实际运行 VLA、制造机器人、完成真机测试或组织同学互评，不提供虚构成功率和多周经历。',
'## 一、选题与研究边界',a.meta.scope,
'典型任务：给定桌面场景与明确指令，机器人选择目标、抓取并放到正确容器。前沿主线是视觉语言预训练与机器人动作学习的连接；新生重点看懂整体、关系、依据和后续学习入口。',
...['domain','ecosystem','cognition'].flatMap((m,i)=>[`## ${['二、领域地图','三、生态地图','四、认知地图'][i]}`,a.maps[m].description,...a.nodes.filter(n=>n.map===m).flatMap(n=>[`### ${n.label}｜${n.sub}`,`性质：${n.fact}。`,`含义：${n.summary}`,`作用与依据：${n.why}`,`例子 / 判断：${n.example}`,`限制 / 疑问：${n.limits}`,`学习基础：${n.prereq}`,`下一步：${n.next}`,`引用：${refs(n.sources)}`])]),
'## 五、三个分析案例',...a.cases.flatMap(c=>[`### ${c.id} ${c.title}`,`具体问题：${c.question}`,`方法：${c.method}`,`依据与比较：${c.evidence}`,`当前判断：${c.judgment}`,`尚存疑问：${c.unknown}`,`来源：${refs(c.sources)}`]),
'### 文献阅读后的判断细化','将“通用模型应该全面更好”作为需要检查的宽泛说法，而非虚构本组曾经持有的信念。阅读 OpenVLA 项目页针对窄任务和语言条件多任务的对照后，样本将结论收窄为：优势依赖任务、设备、数据与适配条件，不能按单个总体指标替代本地测试。',refs(['R08','R01','R05']),
'## 六、课程关联与三条成长路线','未获得本校培养方案和大纲，以下只提供真实公开资源及样本能力链；本校对应、覆盖类型和适用年级待核实。未来课程不是本作业的先修要求。',
...a.coursePaths.map(p=>`- ${p.goal} → ${p.ability} → ${p.course}（${p.content}） → ${p.concept} → ${p.practice}。定位：${p.coverage}。${refs([p.source])}`),
'科学家取向：追问解释、比较同条件证据并保留反例。工程师取向：画数据流，检查接口、执行、反馈与故障。设计师取向：观察用户如何定义“整理好”，设计确认、介入与反馈。三者可交叉，本样本以工程师取向为主。',
'课堂认识方法：系统观用于拆解失败环节，发展观用于理解预训练、跨具身数据与动作生成的问题演进。第三个“观”需按课堂核实，不自行猜测。',
'## 七、三图关系清单','连线分别标论文事实、官方事实、概念关系、学习建议、方案分析和样本推断；拟议工程关系不当作真实合作。',
...a.edges.map(([f,t,l,k,ss])=>`- ${node(f).label} → **${l}** → ${node(t).label}（${k}；${refs(ss)}）。`),
'## 八、地图相关 AI 的真实实现','75 条标注短句训练浏览器内的多项式朴素贝叶斯，识别五类问题意图；名称与字符相似度检索节点，答案由已有地图字段摘录并返回引用。网页助手不是 VLA 模型，不控制机器人，不联网查新，不生成文献之外的事实。无依据时说明未知，本校课程未知时拒绝确认。若教师要求大模型接口，需另接服务端并核查输出；GitHub Pages 不保存模型密钥。',refs(['R21','R20']),
'## 九、持续更新、互评与贡献','每周流程：新论文、仓库更新、试验或同学反馈 → 待核实线索 → 读原文或实际验证 → 修改节点和关系 → 留下日期、对象、依据、内容和原因 → 更新仓库 → 发布并验证访问。没有新变化可记录检查结果，不为增加数量而更新。',
...a.changes.map(c=>`- ${c.date}｜${c.object}｜依据：${c.basis}｜修改：${c.change}｜原因：${c.reason}`),
'节点修改、日志和反馈保存在当前浏览器，可导出 JSON；不同设备不会自动同步。维护者需汇总、核实并修改 data.js 后发布。',
'至少 3 名非本组同学独立浏览：解释一个概念、一个生态关系和一个分析案例。反馈记录：日期、代号、对象、原意见、核实过程、具体修改或暂缓、理由。开发测试和 AI 意见不计作同学互评。',
...a.roles.map(([r,t])=>`- ${r}：${t} 由实际成员填写日期、任务、证据和共同复核人；不是已完成贡献。`),
'## 十、七周计划（待本组执行）',...a.weeks.map(([w,t,p])=>`- ${w}｜${t}：${p}`),
'## 十一、8 分钟展示提纲','1 分钟说选题与边界；3 分钟沿 VLA → OpenVLA → 对照反例 → 评价 → 课程探索三图；2 分钟演示地图问答与本组真实修改；1 分钟说明一次有证据的认识细化；1 分钟说明未知与后续入口。',
'## 十二、尚需真实补充',...a.unknowns.map(x=>'- '+x),
'## 十三、GitHub 发布','解压后将里面的 docs 文件夹直接上传到仓库根目录。在 Settings → Pages 选择 Deploy from a branch → main → /docs → Save。不要把外层发布包目录再套在 docs 上方。自动工作流是可选方案。以 GitHub 实际显示网址为准，必须再做免登录和国内网络访问检查。',
'## 十四、参考文献',bibliography,
'AI 使用说明：AI 辅助整理结构、解释、来源与网页实现；事实依据来自所列原文。学生理解、学校信息、实践、反馈与长期维护需小组亲自完成。'];
fs.writeFileSync('docs/reference.md',lines.join('\n\n')+'\n');fs.writeFileSync('docs/.nojekyll','');console.log('Generated reference.md, references.md, references.bib and .nojekyll.');
