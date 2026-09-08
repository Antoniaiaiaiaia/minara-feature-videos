/* Illustrative research dialogue. User reference: references/s06-s07-team-v6.jpg.
 * Avatars use the actual react-nice-avatar 1.5.0 component, rendered offline. */
const researchAgents={rhea:{name:'Rhea',role:'Coordinator'},atlas:{name:'Atlas',role:'Market research'},noor:{name:'Noor',role:'Execution research'},sable:{name:'Sable',role:'Risk review'}};
let avatarInstance=0;
function researchAvatar(key){
  const prefix=`avatar-${++avatarInstance}-`;
  return niceAvatarMarkup[key].replace(/id="([^"]+)"/g,(_,id)=>`id="${prefix}${id}"`).replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#${prefix}${id})`);
}
const researchMessages=[
  ['rhea','I’ll coordinate. Atlas, check the market. Noor, execution. Sable, risk.',7.47],
  ['atlas','The setup looks constructive. Refresh the $77,673 quote before entry.',8.35],
  ['noor','Keep the size at 0.01 BTC. Add a slippage check to the market order.',9.19],
  ['sable','I wouldn’t increase leverage. Margin is $155.35. Keep approval mandatory.',10.03],
  ['atlas','Agreed on the limit. Don’t chase a moving quote—recheck before submitting.',10.87],
  ['rhea','Checks aligned. I’ve prepared the execution workflow for your approval.',11.67],
];
const research=document.createElement('section');research.id='research';research.setAttribute('aria-label','Trading research team');
research.innerHTML=`<header class="research-heading"><div class="research-members">${Object.keys(researchAgents).map(k=>`<div class="member-avatar">${researchAvatar(k)}</div>`).join('')}</div><div><h2>Trading research team</h2><p>4 agents <span>·</span> Shared context</p></div></header>
<div class="research-viewport"><div id="research-thread"><article class="research-row research-user"><div class="research-author">You</div><div class="research-bubble">Long 0.01 BTC at 5x. Ask me to confirm.</div></article>${researchMessages.map(([key,body],i)=>`<article class="research-row" id="research-message-${i}"><div class="research-avatar">${researchAvatar(key)}</div><div class="research-message"><div class="research-author">${researchAgents[key].name}<span>${researchAgents[key].role}</span></div><div class="research-bubble">${body}</div></div></article>`).join('')}</div></div>`;
document.querySelector('#camera').before(research);
const researchOrder=document.querySelector('.order-inline');
const orderSlot=document.createElement('div');orderSlot.className='research-order-slot';
orderSlot.style.height=`${researchOrder.offsetHeight}px`;
document.querySelector('#research-thread').append(orderSlot);orderSlot.append(researchOrder);
// Review happens in the floating conversation; confirmation belongs to the whole stage.
document.querySelector('#stage').append(document.querySelector('#confirm-layer'));
function addResearchMotion(){
  gsap.set('#research,.research-row',{autoAlpha:0});
  tl.set('#research',{autoAlpha:1},6.88);
  grow('.research-members > .member-avatar',6.89,.32,.07);grow('.research-heading h2',7,.3);grow('.research-heading p',7.1,.3);
  const rows=Array.from(document.querySelectorAll('.research-row'));
  rows.forEach((row,i)=>{
    const at=i?researchMessages[i-1][2]:6.94;
    tl.set(row,{autoAlpha:1},at);
    grow(row.querySelectorAll('.research-avatar'),at,.32);
    grow(row.querySelectorAll('.research-author'),at+.07,.25);
    surface(row.querySelector('.research-bubble'),at+.14,.3);
    planText(row.querySelector('.research-bubble'),at+.22);
    const scroll=Math.max(0,row.offsetTop+row.offsetHeight-555);
    if(scroll)tl.to('#research-thread',{y:-scroll,duration:.44,ease:'power3.inOut'},at+.16);
  });
  tl.to('#research-thread',{y:-(orderSlot.offsetTop+orderSlot.offsetHeight-615),duration:1.15,ease:'power3.inOut'},12.2);
  
  tl.to('#research',{autoAlpha:0,duration:.22},15.18);
  // Remove the client shell during research; the real order card survives its return.
  tl.to('.client',{backgroundColor:'rgba(10,10,11,0)',borderColor:'rgba(58,58,64,0)',boxShadow:'0 0 0 0 transparent',duration:.25},6.78);
  tl.to('#chat',{backgroundColor:'rgba(10,10,11,0)',duration:.25},6.78);
  tl.to('.topbar,.ticker',{autoAlpha:0,duration:.18},6.78);
  tl.to('#composer',{autoAlpha:0,duration:.22},6.78);
  tl.to('.client',{backgroundColor:'#0a0a0b',borderColor:'#3a3a40',boxShadow:'0 30px 80px -30px #14141666',duration:.55},15.35);
  
  tl.to('.topbar,.ticker',{autoAlpha:1,duration:.45},15.35);
}
