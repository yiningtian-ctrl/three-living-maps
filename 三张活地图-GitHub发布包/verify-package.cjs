const fs=require('node:fs'),assert=require('node:assert/strict');
const h=fs.readFileSync('docs/index.html','utf8');
for(const m of h.matchAll(/(?:src|href)="([^"]+)"/g)){
  const p=m[1];if(p.startsWith('#'))continue;
  assert(fs.existsSync('docs/'+p),p);
  assert(!p.startsWith('/'),'Absolute path breaks repository subpath: '+p);
}
const y=fs.readFileSync('.github/workflows/pages.yml','utf8');
for(const p of ['pages: write','id-token: write','path: docs','actions/deploy-pages@v4'])assert(y.includes(p),p);
assert(fs.existsSync('docs/index.html'));assert(!fs.existsSync('.openai'));assert(!fs.existsSync('.git'));
console.log('PASS: local assets and relative URLs; Pages configuration; original hosting configuration and Git history excluded.');
