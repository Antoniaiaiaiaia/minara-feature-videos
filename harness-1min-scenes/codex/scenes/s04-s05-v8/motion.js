/* Browser port of the existing snapcn orbit-gallery math. Original sources
 * preserved in reference/. Prompt reveal and camera targets use prompt-send. */
gsap.registerPlugin(CustomEase);
CustomEase.create('minara','.95,.03,0,.98');
CustomEase.create('enter','.16,1,.3,1');
CustomEase.create('promptReveal','.3,0,.35,1');
const clamp=x=>Math.max(0,Math.min(1,x));
const beat=(t,start,duration,ease='none')=>gsap.parseEase(ease)(clamp((t-start)/duration));
const spiral=(n,r,turns)=>({x:r*(1-n)*Math.cos(n*turns*Math.PI*2),y:-r*(1-n)*Math.sin(n*turns*Math.PI*2)});
function buildArcTable(turns,samples=2000){
 const cum=new Float64Array(samples+1),out=new Float64Array(samples+1);let prev=spiral(0,1,turns),j=0;
 for(let k=1;k<=samples;k++){const p=spiral(k/samples,1,turns);cum[k]=cum[k-1]+Math.hypot(p.x-prev.x,p.y-prev.y);prev=p;}
 for(let k=0;k<=samples;k++){const target=k/samples*cum[samples];while(j<samples&&cum[j+1]<target)j++;const width=cum[j+1]-cum[j];out[k]=(j+(width>0?(target-cum[j])/width:0))/samples;}
 return out;
}
function arcToN(s,table){const x=clamp(s)*(table.length-1),i=Math.floor(x);return table[i]+(table[Math.min(i+1,table.length-1)]-table[i])*(x-i);}
const PREFIX='how to build position for ';
// Only the asset suffix is erased. Holds make each supported market legible.
function draftAt(t){
 if(t<3.35)return PREFIX.slice(0,Math.round(PREFIX.length*beat(t,2.64,.71,'sine.inOut')));
 for(const [symbol,start,typed,hold,erase] of [['NVDA',3.35,.16,.28,.14],['CL',3.99,.12,.28,.12],['BTC',4.58,.17,.35,0]]){
  if(t<start) return PREFIX;
  if(t<start+typed)return PREFIX+symbol.slice(0,Math.round(symbol.length*beat(t,start,typed,'sine.inOut')));
  if(t<start+typed+hold||erase===0)return PREFIX+symbol;
  if(t<start+typed+hold+erase)return PREFIX+symbol.slice(0,Math.round(symbol.length*(1-beat(t,start+typed+hold,erase,'power2.in'))));
 }
 return PREFIX;
}
