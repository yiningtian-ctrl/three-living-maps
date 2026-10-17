const fs=require('node:fs'),assert=require('node:assert/strict');require('./docs/data.js');const a=globalThis.ATLAS,ai=require('./docs/engine.js');
const ids=new Set(a.nodes.map(n=>n.id)),refs=new Set(a.sources.map(s=>s.id));assert.equal(ids.size,a.nodes.length);assert.equal(refs.size,a.sources.length);
for(const n of a.nodes){for(const f of ['summary','why','example','limits','prereq','next'])assert(n[f],n.id+f);for(const r of n.sources)assert(refs.has(r),r);}
for(const [f,t,l,k,rs]of a.edges){assert(ids.has(f)&&ids.has(t),f+t);assert(l&&k);rs.forEach(r=>assert(refs.has(r),r));}
for(const m of Object.values(a.maps))for(const id of m.ids)assert(ids.has(id),id);
for(const s of a.sources){assert(s.title&&s.authors&&s.where&&s.note);if(!s.url.startsWith('https:'))assert(fs.existsSync('docs/'+s.url),s.url);}
const checks=[['VLA是什么？','explain'],['比较模块化与VLA','compare'],['OpenVLA有哪些限制？','boundary'],['坐标变换需要什么课程基础？','course'],['今天天气怎么样','unknown']];
for(const [q,intent]of checks){const r=ai.answer(q,a);assert.equal(r.intent,intent,q);for(const s of r.sections)for(const id of s.sources)assert(refs.has(id),id);r.evidence.forEach(id=>assert(ids.has(id),id));}
assert(ai.answer('我们学校该上什么课？',a).lead.includes('不能确认'));
assert(ai.answer('哪个VLA模型成功率最高？',a).lead.includes('没有'));
assert(Object.values(ai.samples).reduce((s,arr)=>s+arr.length,0)===75);
const html=fs.readFileSync('docs/index.html','utf8');for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){const p=m[1];if(p.startsWith('#'))continue;assert(!p.startsWith('/'),p);assert(fs.existsSync('docs/'+p),p);}
const manuscript=fs.readFileSync('docs/reference.md','utf8'),bib=fs.readFileSync('docs/references.bib','utf8');assert.equal((bib.match(/@misc\{/g)||[]).length,7);for(const id of refs)assert(manuscript.includes(id),id);
const report={date:'2026-10-18',topic:a.meta.title,nodes:ids.size,edges:a.edges.length,sources:refs.size,bibEntries:7,checks:['节点、关系、文献编号一致','所有引用有作者、原文定位与支持范围','地图问答、路线比较和未知拒答','本校课程不确定性与无真机排名保留','相对资源路径支持仓库子路径','参考稿与七篇论文 BibTeX 完整'],note:'开发检查，不是真机、VLA模型复现、独立学术审稿或同学互评。'};
fs.writeFileSync('docs/verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
