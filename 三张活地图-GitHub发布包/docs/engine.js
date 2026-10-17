(function(root){
  'use strict';
  function tokens(text){
    const s=String(text).toLowerCase(), out=s.match(/[a-z][a-z0-9-]*/g)||[];
    for(const segment of s.match(/[\u3400-\u9fff]+/g)||[]){
      for(let i=0;i<segment.length;i++){out.push(segment[i]);if(i+1<segment.length)out.push(segment.slice(i,i+2));}
    }
    return out;
  }
  const samples={
    explain:['这是什么概念','请解释一下原理','用简单的话说明作用','能不能举一个例子','这个技术是干什么的','如何理解这个方法','告诉我它的基本含义','帮我讲清楚这个工具','向新生介绍它的作用','这个概念解决什么问题','RAG是什么','什么是文本嵌入','检索是做什么的','重排是什么意思','Faiss的作用是什么'],
    course:['这个概念应该学什么课','需要什么学习基础','有什么课程和学习资料','我应该从哪里开始学习','有哪些前置知识','推荐一个学习路径','入门该读哪份大纲','以后去哪门课继续学','这个工具要求哪些基础','给我相关课程的入口','检索需要先学什么','文本嵌入如何入门','Faiss可以从哪里学','RAG有什么学习资料','哪些课程覆盖向量基础'],
    compare:['这两种方法有什么区别','请比较这两个方案','哪个路线更适合','两者分别有什么优缺点','这个方法和另一个怎么选','比较一下作用和局限','在两条技术路线间怎么取舍','它们是替代关系吗','两个工具对比一下','请区分这两个概念','检索和重排有什么区别','向量和关键词对比','Faiss与生成模型的区别','RAG和全文阅读怎么选择','比较两者的适用范围'],
    trace:['这个结论的来源是什么','有什么证据支持','谁提出了这个方法','哪个团队开发了工具','如何找到原论文','这个关系有依据吗','带我查找出处','我想看它的官方文档','作者和机构是什么关系','来源在哪里可以核实','RAG论文的作者是谁','Faiss是谁开发的','嵌入的资料依据在哪','重排的官方文档在哪','检索示例由谁提供'],
    boundary:['这个方法有什么局限','什么情况下会失败','有什么风险和不足','能不能保证一定正确','这个方法有哪些适用条件','什么时候不适合用','这项结论有什么反例','有什么问题仍不确定','还有什么地方待核实','会不会误导用户','Faiss有哪些局限','RAG不能保证什么','文本嵌入可能出现哪些错误','检索会不会出错','重排的限制有哪些']
  };
  class IntentModel{
    constructor(training=samples){
      this.classes=Object.keys(training);this.vocab=new Set();this.counts={};this.total={};this.priors={};
      const n=Object.values(training).reduce((s,a)=>s+a.length,0);
      for(const c of this.classes){this.counts[c]={};this.total[c]=0;this.priors[c]=Math.log(training[c].length/n);
        for(const sentence of training[c])for(const t of tokens(sentence)){this.vocab.add(t);this.counts[c][t]=(this.counts[c][t]||0)+1;this.total[c]++;}}
    }
    predict(q){
      const ts=tokens(q).filter(t=>this.vocab.has(t));
      const scores=this.classes.map(c=>({label:c,score:this.priors[c]+ts.reduce((s,t)=>s+Math.log(((this.counts[c][t]||0)+1)/(this.total[c]+this.vocab.size)),0)})).sort((a,b)=>b.score-a.score);
      return {label:scores[0].label,scores,knownTokens:ts.length};
    }
  }
  const aliases={rag:['rag','检索增强生成'],docs:['资料版本','有效版本','版本','通知','截止日期','截止时间','资料权限'],chunk:['切分','分块','chunk','片段','段落'],retrieve:['检索','召回','关键词','bm25','搜索'],embedding:['嵌入','embedding','向量','bge'],rerank:['重排','rerank','交叉编码器'],generate:['生成','拒答','提示词','大模型'],cite:['引用','出处','可追溯'],evaluate:['评估','评价','评测','命中率','hit@1','准确率'],faiss:['faiss'],workflow:['dify','ragflow','编排'],courses:['课程','学习路径','学习基础','前置'],lewis:['lewis','刘易斯'],flag:['flagopen','flagembedding','bge-m3'],sbert:['sentence transformers','sbert'],meta:['meta','fair'],platforms:['langgenius','infiniflow'],venues:['会议','ccf','neurips','acl','sigir'],stakeholders:['付费','维护者','使用者','采购'],resources:['成本','算力','开源','许可'],problem:['需求','问题定义'],system:['系统观','瓶颈'],compare:['反例','对照'],tradeoff:['取舍'],evolution:['发展观','演进'],habits:['成长','协作','分工']};
  function rankNodes(q,nodes){
    const qs=tokens(q),qset=new Set(qs),low=q.toLowerCase();
    const df={};const docs=nodes.map(n=>{const ts=tokens([n.label,n.sub,n.summary,n.why,n.example,n.prereq,n.next].join(' '));const counts={};ts.forEach(t=>counts[t]=(counts[t]||0)+1);for(const t of Object.keys(counts))df[t]=(df[t]||0)+1;return {n,counts};});
    const idf=t=>Math.log(1+(nodes.length+1)/(1+(df[t]||0)));
    return docs.map(({n,counts})=>{
      let overlap=0,norm=0,qn=0;for(const [t,c]of Object.entries(counts)){const v=(1+Math.log(c))*idf(t);norm+=v*v;if(qset.has(t))overlap+=v*idf(t);}for(const t of qset)qn+=idf(t)**2;
      const matched=(aliases[n.id]||[n.label.toLowerCase()]).filter(a=>low.includes(a));
      const exact=matched.length?Math.max(...matched.map(a=>a.length))/10:0;
      return {node:n,score:overlap/Math.sqrt(norm*qn||1)+exact,exact:matched.length>0,overlap:[...qset].filter(t=>counts[t]).length};
    }).sort((a,b)=>b.score-a.score);
  }
  function answer(q,atlas){
    q=String(q||'').trim().slice(0,500);
    if(!q)return {intent:'unknown',lead:'请先输入一个与地图相关的问题。',evidence:[],sections:[]};
    const prediction=model.predict(q),rank=rankNodes(q,atlas.nodes),intent=prediction.label;
    const exact=rank.filter(x=>x.exact), topical=exact.filter(x=>!['courses','compare','habits','generate'].includes(x.node.id));
    if(/我们学校|我校|本校|我.*专业|学分|开课学期/.test(q))return {intent:'course',lead:'目前没有你们学校、专业和年级的培养方案，无法确认本校课程名称、学分或开课学期。下面仅列已经核查的公开课学习入口。',evidence:['courses'],sections:atlas.coursePaths.map(p=>({title:p.course,text:p.content+'。定位：'+p.coverage+'。可尝试：'+p.practice+'。',sources:[p.source]}))};
    if(!topical.length&&!(rank[0].score>.18&&rank[0].overlap>=4))return {intent:'unknown',lead:'现有地图没有足够依据回答这个问题。我只能检索本样本的 RAG、工具、课程入口和分析案例，不能查实时消息或补造事实。',evidence:[],sections:[]};
    if(/关键词|bm25/.test(q)&&/向量|语义/.test(q)&&/区别|比较|怎么选|对比/.test(q))return {intent:'compare',lead:'这是两条可以比较、也可以组合的检索路线。以下是文档支持的机制差异，尚未在真实课程资料上比较效果。',evidence:['retrieve','embedding','tradeoff'],sections:[{title:'关键词路线',text:'依赖字面匹配，适合精确术语和编号；同义表达可能漏检。应作为小样本基线。',sources:['S02','S09']},{title:'向量路线',text:'比较编码后的文本表示，可用于语义相近表达；可能混淆版本、数字与否定条件。',sources:['S02','S05']},{title:'当前取舍',text:'先在同一批带证据的问题上比较有效证据命中；可评估混合检索。没有实测，不宣布某条路线全面更优。',sources:['S02','S16']}]};
    const candidates=(topical.length?topical:rank.filter(x=>x.score>.12)).slice(0,3).map(x=>x.node);
    if(intent==='compare'&&candidates.length<2)return {intent,lead:'比较需要两个明确对象。目前只识别到一个地图对象；请写出第二个名称，例如“比较检索和重排”。地图外的方法需要先补可靠来源。',evidence:candidates.map(n=>n.id),sections:[]};
    if(intent==='course')return {intent,lead:'先确定要形成的能力，再选择学习入口。以下基础与资源来自地图；本校对应关系尚未核实。',evidence:[...new Set([...candidates.map(n=>n.id),'courses'])],sections:candidates.slice(0,2).map(n=>({title:n.label+'：学习与实践',text:n.prereq+' 下一步：'+n.next,sources:n.sources})).concat(atlas.coursePaths.map(p=>({title:p.course,text:p.content+'。'+p.coverage+'。',sources:[p.source]})))};
    if(intent==='trace')return {intent,lead:'以下是相关节点、关系与原始来源。研究团队归属按来源发表时信息理解；拟议职责和团队推断不会当作已证实合作。',evidence:candidates.map(n=>n.id),sections:candidates.map(n=>({title:n.label,text:n.why+' 内容性质：'+n.fact+'。',sources:n.sources}))};
    if(intent==='boundary')return {intent,lead:'这些限制来自地图中已写明的适用条件；它们不等于完整风险清单。',evidence:candidates.map(n=>n.id),sections:candidates.map(n=>({title:n.label+'的边界',text:n.limits,sources:n.sources}))};
    if(intent==='compare')return {intent,lead:'按作用、局限与下一步实践比较。不同层次的对象可以协同，不应只按名称判断替代关系。',evidence:candidates.slice(0,2).map(n=>n.id),sections:candidates.slice(0,2).map(n=>({title:n.label,text:n.summary+' 局限：'+n.limits+' 验证：'+n.next,sources:n.sources}))};
    return {intent:'explain',lead:'下面摘取地图中的解释与例子，供你回到节点和来源核查。样本判断与实验证据的范围会一并保留。',evidence:candidates.map(n=>n.id),sections:candidates.slice(0,2).map(n=>({title:n.label,text:n.summary+' 例子：'+n.example+' 边界：'+n.limits,sources:n.sources}))};
  }
  const model=new IntentModel();
  const API={tokens,IntentModel,samples,model,rankNodes,answer};
  root.MapAI=API;if(typeof module!=='undefined')module.exports=API;
})(globalThis);
