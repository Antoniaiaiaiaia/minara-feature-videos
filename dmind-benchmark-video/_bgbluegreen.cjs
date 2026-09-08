const fs=require('fs');
const files=['scene1.html','scene2.html','scene3.html','scene4.html','scene5.html','scene6.html','scene7.html'];
// blue/green only, saturated, big, overlapping, heavy blur
const ROOTBG = "background: radial-gradient(1600px 1200px at 26% 20%, rgba(47,107,255,0.30), transparent 62%), radial-gradient(1500px 1150px at 78% 82%, rgba(21,195,154,0.32), transparent 62%), radial-gradient(1200px 1000px at 60% 50%, rgba(61,139,255,0.18), transparent 60%), #FFFFFF;";
const ORB_BASE = ".orb{ position:absolute; border-radius:50%; filter:blur(130px); opacity:0.62; }";
const ORBS = {
  a:".orb.a{ width:1150px; height:1150px; left:-180px; top:-220px; background:#2F6BFF; }",
  b:".orb.b{ width:1050px; height:1050px; right:-200px; bottom:-240px; background:#12C39A; }",
  c:".orb.c{ width:980px; height:980px; left:30%; top:14%; background:#3D8BFF; }",
  d:".orb.d{ width:900px; height:900px; right:18%; top:36%; background:#19B888; }",
};
for(const f of files){
  let s=fs.readFileSync(f,'utf8');
  // 1) root background → blue/green
  s=s.replace(/background:\s*radial-gradient[\s\S]*?#FFFFFF;/, ROOTBG);
  // 2) orb base
  s=s.replace(/\.orb\{[^}]*\}/, ORB_BASE);
  // 3) each orb variant present
  for(const k of ['a','b','c','d']){
    const re=new RegExp('\\.orb\\.'+k+'\\{[^}]*\\}');
    if(re.test(s)) s=s.replace(re, ORBS[k]);
  }
  fs.writeFileSync(f,s);
  console.log(f,'bg → blue/green');
}
