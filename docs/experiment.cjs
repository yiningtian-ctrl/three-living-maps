const fs = require('node:fs');
const path = require('node:path');
const outputDir = fs.existsSync(path.join(__dirname,'dist','engine.js')) ? path.join(__dirname,'dist') : __dirname;
const {tokens} = require(path.join(outputDir,'engine.js'));
// 合成资料：仅演示检索机制，不代表任何学校、课程或真实通知。
const documents = [
  {id:'A-old',scope:'项目A',current:false,text:'项目A的提交截止时间是10月20日。提交截止时间以本通知为准。'},
  {id:'A-new',scope:'项目A',current:true,text:'项目A补充通知：原截止安排已调整，最终上交日期为10月27日。'},
  {id:'A-format',scope:'项目A',current:true,text:'项目A提交材料应包含网站链接和更新记录。'},
  {id:'B-old',scope:'项目B',current:false,text:'项目B展示时长为5分钟，展示时长不要超出。'},
  {id:'B-new',scope:'项目B',current:true,text:'项目B更新说明：本次汇报改为8分钟，替代此前的演示安排。'},
  {id:'C-current',scope:'项目C',current:true,text:'项目C提交材料为一份PDF文件。'}
];
const questions = [
  {id:'Q1',scope:'项目A',q:'项目A的提交截止时间是什么？',gold:'A-new'},
  {id:'Q2',scope:'项目B',q:'项目B展示时长是多少分钟？',gold:'B-new'},
  {id:'Q3',scope:'项目A',q:'项目A提交材料包含什么？',gold:'A-format'},
  {id:'Q4',scope:'项目C',q:'项目C提交材料是什么？',gold:'C-current'}
];
function score(query,text){const a=new Set(tokens(query)),b=new Set(tokens(text));return [...a].filter(x=>b.has(x)).length/Math.sqrt(a.size*b.size||1);}
function run(useCurrent){return questions.map(q=>{const ranked=documents.filter(d=>d.scope===q.scope&&(!useCurrent||d.current)).map(d=>({id:d.id,score:score(q.q,d.text),text:d.text})).sort((a,b)=>b.score-a.score);return {...q,top:ranked[0].id,hit:ranked[0].id===q.gold,ranked};});}
const baseline=run(false),filtered=run(true);
const result={label:'合成资料上的有效证据命中实验',date:'2026-10-17',hypothesis:'仅按相关性找到一个看似相关的通知，未必能支持当前规则；先筛有效版本可能修复此类错误。',dataKind:'教学合成资料，非真实学校规定',metric:'Evidence Hit@1 = 排名第一的片段是人工标注有效证据的问题数 / 4。不是生成答案正确率。',controls:'固定资料、问题、适用项目范围、字符特征和余弦打分；仅改变是否先应用 current 有效版本字段。current 是人工提供的元数据，不由模型推测。',documents,questions,baseline,filtered,summary:{baselineHits:baseline.filter(r=>r.hit).length,filteredHits:filtered.filter(r=>r.hit).length,total:questions.length},conclusion:'旧通知可因词面更接近而排在新版之前。版本有效性需要单独处理；引用能打开不代表引用适用于当前问题。',limits:'仅 4 个刻意包含版本冲突的合成问题；没有语言模型生成、真实学生、独立盲测或性能测试，不能据此估计生产系统提升幅度。',revision:{before:'若只检查检索结果是否相关、引用能否打开，可能把过期条款计为成功。',evidence:'Q1 与 Q2 的第一名在相关性基线下为旧版；加入相同范围内的有效版本筛选后为人工标注的新版。',after:'本样本的评价标准明确为“当前有效证据命中”，并把版本核查加入资料与引用节点。',unknown:'真实资料的替代关系和适用范围由谁维护？如何处理并未明确宣布失效的旧通知？'}};
fs.writeFileSync(path.join(outputDir,'experiment.json'),JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(path.join(outputDir,'experiment-data.js'),'globalThis.EXPERIMENT = '+JSON.stringify(result)+';\n');
console.log(JSON.stringify({metric:result.metric,summary:result.summary,rows:baseline.map((r,i)=>({id:r.id,baseline:r.top,filtered:filtered[i].top,gold:r.gold}))},null,2));
