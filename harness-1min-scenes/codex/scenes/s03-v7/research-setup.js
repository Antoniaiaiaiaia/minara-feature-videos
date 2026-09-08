/* One seekable clock. Existing S06 research / S08 strategy UI; illustrative data only. */
gsap.registerPlugin(CustomEase);
const enter=CustomEase.create('s03-enter','.16,1,.3,1');
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const DURATION=3, EXIT=2.35, EXIT_DURATION=.6;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const paths={home:'m3 10 9-7 9 7v11h-6v-8H9v8H3Z',chart:'M4 3v18h17M8 16V9m5 7V5m5 11v-5',chat:'M3 4h18v13H8l-5 4Z',code:'m8 6-6 6 6 6m8-12 6 6-6 6m-3-16-2 20',candle:'M5 3v3m0 9v6m7-19v10m0 7v3m7-19v5m0 8v5M3 6h4v9H3Zm7 6h4v7h-4Zm7-4h4v8h-4Z',wallet:'M21 8V4H5a3 3 0 0 0 0 6h16v10H5a3 3 0 0 1-3-3V7m19 6h-5v4h5',grid:'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',panel:'M3 3h18v18H3Zm7 0v18',left:'m14 5-7 7 7 7M7 12h14',right:'m10 5 7 7-7 7M3 12h14',up:'m5 12 7-7 7 7m-7-7v16',search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',bell:'M18 8a6 6 0 0 0-12 0c0 8-3 8-3 10h18c0-2-3-2-3-10M10 22h4',rocket:'M12 15 9 12c2-5 6-8 12-9-1 6-4 10-9 12Zm-3-3-5 1 3-6 5-1m0 9-1 5 6-3 1-5M7 17l-4 4m2-6-3 3m7 1-3 3',sliders:'M3 6h8m4 0h6M3 18h4m4 0h10M11 3h4v6h-4ZM7 15h4v6H7Z',mic:'M9 4a3 3 0 0 1 6 0v9a3 3 0 0 1-6 0ZM5 11v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8',bot:'M6 7h12a3 3 0 0 1 3 3v9H3v-9a3 3 0 0 1 3-3Zm6 0V3m-2 0h4M7 11v4m10-4v4M8 19v2m8-2v2',database:'M21 5c0 2-4 3-9 3S3 7 3 5s4-3 9-3 9 1 9 3ZM3 5v14c0 2 4 3 9 3s9-1 9-3V5M3 12c0 2 4 3 9 3s9-1 9-3',screen:'M3 3h18v14H3Zm5 19 4-5 4 5M8 10l3-3 3 3 4-4',download:'M12 3v12m-5-5 5 5 5-5M3 16v5h18v-5'};
const icon=name=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]||paths.grid}"/></svg>`;
$$('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
const navs=[['Office','home'],['Markets','chart'],['Chat','chat'],['Coding','code'],['Strategies','candle'],['Portfolio','wallet'],['More','grid']];
$('#sidebar-tabs').innerHTML=navs.map(([name,key])=>`<button data-page="${name}" aria-selected="${name==='Office'}">${icon(key)}${name}</button>`).join('');
$$('#quick-actions button').forEach(el=>el.insertAdjacentHTML('afterbegin',icon(el.dataset.iconName)));
const agents={rhea:['Rhea','Coordinator'],atlas:['Atlas','Market research'],noor:['Noor','Execution research'],sable:['Sable','Risk review']};
let avatarCount=0;
const avatar=key=>{const prefix=`v4-${++avatarCount}-`;return niceAvatarMarkup[key].replace(/id="([^"]+)"/g,(_,id)=>`id="${prefix}${id}"`).replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#${prefix}${id})`);};
$('.research-members').innerHTML=Object.keys(agents).map(key=>`<div class="member-avatar">${avatar(key)}</div>`).join('');
// Reuse the existing approved research conversation without adding trading behavior.
const messages=[
 ['rhea','I’ll coordinate. Atlas, check the market. Noor, execution. Sable, risk.'],
 ['atlas','The setup looks constructive. Refresh the $77,673 quote before entry.'],
 ['noor','Keep the size at 0.01 BTC. Add a slippage check to the market order.'],
 ['sable','I wouldn’t increase leverage. Margin is $155.35. Keep approval mandatory.'],
 ['atlas','Agreed on the limit. Don’t chase a moving quote—recheck before submitting.'],
 ['rhea','Checks aligned. I’ve prepared the execution workflow for your approval.'],
];
$('#research-thread').innerHTML=`<article class="research-row research-user"><div class="research-author">You</div><div class="research-bubble">Long 0.01 BTC at 5x. Ask me to confirm.</div></article>`+messages.map(([key,body],i)=>`<article class="research-row" id="research-message-${i}"><div class="research-avatar">${avatar(key)}</div><div class="research-message"><div class="research-author">${agents[key][0]}<span>${agents[key][1]}</span></div><div class="research-bubble">${body}</div></div></article>`).join('');
