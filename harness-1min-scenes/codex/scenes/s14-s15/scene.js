/* Every position, click and data view is driven by the same seekable scene clock. */
gsap.registerPlugin(CustomEase);
document.fonts.load('400 18px Geist');
document.fonts.load('600 48px Geist');
CustomEase.create('minara','M0,0 C0.95,0.03 0,0.98 1,1');
CustomEase.create('settle','M0,0 C0.16,1 0.3,1 1,1');
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const introExtension=55/30, duration=10+introExtension, money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
const signed=n=>`${n>=0?'+':'-'}${money(Math.abs(n))}`, cls=n=>n<0?'loss':'gain';
const icon=name=>`<span data-icon="${name}">${ICONS[name]||''}</span>`;
const logo=s=>`../s04-s05/assets/logos/${s.toLowerCase()}.svg`;
function hydrate(root=document){root.querySelectorAll('[data-icon]:empty').forEach(e=>e.innerHTML=ICONS[e.dataset.icon]||'');}
const coins=s=>`<span class="coin-stack">${s.map(x=>`<img src="${logo(x)}" alt="${x}">`).join('')}</span>`;
const holdings=[
  {symbol:'BTC',name:'Bitcoin',qty:1.6,price:64250,pnl:29700,change:2.34},
  {symbol:'ETH',name:'Ethereum',qty:20,price:2945.4,pnl:12408,change:1.81},
  {symbol:'SOL',name:'Solana',qty:250,price:145.2,pnl:7132,change:-.62},
  {symbol:'USDC',name:'USD Coin',qty:33834.2,price:1,pnl:0,change:0}
];
const positions=[
  {symbol:'BTC',qty:1.25,entry:52000,mark:64250,leverage:3,liquidation:37180.5},
  {symbol:'ETH',qty:30,entry:2400,mark:2945.4,leverage:4,liquidation:1842.6},
  {symbol:'SOL',qty:180,entry:130.5,mark:145.2,leverage:3,liquidation:89.4}
];
const strategies=[
  {name:'CoinFull Prime (Neutral)',short:'CoinFull Prime',creator:'Minara Labs',universe:'Coin Full',assets:['BTC','ETH','SOL'],allocation:98540,pnl:24680,ret:33.42,days:32,running:true},
  {name:'US Quality Compounders, Top 5',short:'US Quality Compounders',creator:'You',universe:'TradFi 30',assets:['MSFT','NVDA','AAPL'],allocation:65000,pnl:18240,ret:39.01,days:28,running:true},
  {name:'BTC + ETH Adaptive Momentum',short:'Adaptive Momentum',creator:'Minara Labs',universe:'Coin 30',assets:['BTC','ETH','SOL'],allocation:35000,pnl:12680,ret:56.81,days:24,running:true},
  {name:'Multi-value-profit Tradfi 30, Top 3',short:'Multi-Value Long',creator:'Lowes',universe:'TradFi 30',assets:['NVDA','MU','MSFT'],allocation:48000,pnl:15840,ret:49.25,days:18,running:false},
  {name:'Semiconductor Trend, Long Only',short:'Semiconductor Trend',creator:'You',universe:'TradFi 30',assets:['NVDA','MU','AMD'],allocation:56000,pnl:-12450,ret:-18.19,days:16,running:false}
];
positions.forEach(p=>{p.takeProfit=p.mark*1.2;p.stopLoss=p.mark*.9;});
const baseline=structuredClone({holdings,strategies,positions});
let perpBalance=154900.6, available=86360.1, activeTab='Overview',activeSub='Holdings',period='1M',manual=false,driver=null,time=0,initialPoster=false,panelMotion;
const spotTotal=()=>holdings.reduce((sum,h)=>sum+h.qty*h.price,0);
const total=()=>spotTotal()+perpBalance;
const perpsPnl=()=>positions.reduce((sum,p)=>sum+(p.mark-p.entry)*p.qty,0);
// Distinct mock market regimes; seeded bridges add irregular intraperiod movement.
const chartProfiles=[
  [30,34,29,31,47,50,44,37,39,53,61,58,56,70,73],
  [26,24,35,43,40,31,30,34,52,55,49,56,66,63,72],
  [38,42,39,35,27,31,29,33,51,58,53,60,59,62,75],
  [28,32,48,51,44,39,43,41,42,57,68,60,62,59,76],
  [34,33,34,41,46,44,36,32,39,56,61,58,65,69,67],
  [62,64,75,71,68,53,48,54,58,49,34,38,28,31,24],
  [23,28,26,39,48,45,43,46,33,36,48,63,59,68,74],
  [31,27,25,29,35,48,46,51,45,50,67,64,68,62,71],
  [36,40,38,45,42,47,55,49,37,42,55,60,56,66,72],
  [25,29,41,38,34,36,35,42,59,63,55,49,57,71,69],
  [33,35,31,37,43,40,41,52,57,54,47,51,65,67,74],
  [40,33,29,35,32,38,50,61,54,45,47,58,68,64,77],
  [24,35,33,29,31,32,45,51,47,43,54,59,56,72,70],
  [29,28,37,45,42,48,53,50,44,37,43,61,68,65,73],
  [35,38,35,33,40,52,60,57,44,46,51,65,63,69,75],
  [71,68,69,62,49,46,56,59,53,40,43,39,30,25,29],
  [27,32,30,41,47,40,34,38,37,39,55,68,62,67,74],
  [32,34,38,35,43,42,40,51,62,57,52,59,64,61,73],
  [39,42,40,47,44,36,33,42,57,63,58,66,62,68,76],
  [30,26,29,37,46,54,50,43,46,59,57,51,61,70,72],
  [24,29,27,32,31,43,51,47,39,44,57,66,64,61,75],
  [35,31,38,44,39,42,41,49,61,58,49,54,67,71,68],
  [28,30,42,40,38,45,48,41,33,39,54,61,57,65,74],
  [37,34,36,43,55,50,46,48,57,61,52,58,64,69,72],
  [31,36,33,40,38,32,37,49,58,54,52,64,70,65,77],
  [29,35,43,38,41,48,46,39,42,56,66,61,59,68,73],
  [40,42,36,31,35,45,52,48,46,57,63,55,62,71,75],
  [25,27,33,30,39,43,38,45,56,61,58,52,63,67,72],
  [34,30,32,39,44,42,48,56,50,46,54,68,64,70,76],
  [28,33,31,35,42,46,43,40,51,58,53,61,65,62,71]
];
function chartValues(seed=0,negative=false){
  let state=(seed+1)*2654435761>>>0;
  const random=()=>{state^=state<<13;state^=state>>>17;state^=state<<5;return (state>>>0)/4294967296;};
  const profile=chartProfiles[seed%chartProfiles.length],values=[profile[0]];
  for(let segment=1;segment<profile.length;segment++){
    const steps=6+Math.floor(random()*8),volatility=.4+random()*1.4,walk=[0];
    for(let j=1;j<=steps;j++)walk.push(walk[j-1]+(random()-.5)*volatility*2);
    for(let j=1;j<=steps;j++){
      const t=j/steps;
      values.push(profile[segment-1]+(profile[segment]-profile[segment-1])*t+walk[j]-walk[steps]*t);
    }
  }
  return (values.at(-1)<values[0])===negative?values:values.map(v=>100-v);
}
function miniChart(seed=0,negative=false){
  const values=chartValues(seed,negative),min=Math.min(...values),range=Math.max(...values)-min;
  const points=values.map((v,i)=>`${(2+i/(values.length-1)*122).toFixed(2)},${(79-(v-min)/range*62).toFixed(2)}`).join(' ');
  return `<svg class="mini-chart ${negative?'loss':'gain'}" viewBox="0 0 126 90" role="img" aria-label="Illustrative performance"><polygon class="area" points="0,90 ${points} 126,90"/><polyline points="${points}"/></svg>`;
}
function trend(kind='Perps'){
  const current=kind==='Perps'?perpBalance:total();
  const raw=chartValues(kind==='Perps'?31:30),start=raw[0],end=raw.at(-1);
  const history=raw.map(v=>current*(.67+.33*(v-start)/(end-start)));
  const vals=period==='1D'?history.slice(-24):period==='7D'?history.slice(-68):history;
  const max=Math.ceil(Math.max(...vals)/10000)*10000,min=Math.floor(Math.min(...vals)/10000)*10000,n=vals.length;
  const y=v=>207-(v-min)/(max-min)*181;
  const points=vals.map((v,i)=>`${64+i/(n-1)*1273},${y(v).toFixed(2)}`).join(' ');
  const labels=period==='1D'?['00:00','04:00','08:00','12:00','16:00','20:00']:period==='7D'?['08-31','09-01','09-02','09-03','09-04','09-06']:['08-08','08-13','08-18','08-23','08-28','09-06'];
  return `<svg class="pnl-chart" viewBox="0 0 1360 242" preserveAspectRatio="none" role="img" aria-label="${kind} equity chart, ${period}">${[0,1,2,3].map(i=>{const v=min+(max-min)*i/3;return `<line x1="64" x2="1337" y1="${y(v)}" y2="${y(v)}"/><text x="50" y="${y(v)+5}" text-anchor="end">$${Math.round(v/1000)}k</text>`;}).join('')}<polygon class="area" points="64,207 ${points} 1337,207"/><polyline class="curve" points="${points}"/>${labels.map((l,i)=>`<text x="${64+i*254.6}" y="234" text-anchor="${i===5?'end':i===0?'start':'middle'}">${l}</text>`).join('')}</svg>`;
}
const metric=(name,value,color='')=>`<div><small>${name}</small><strong class="${color}">${value}</strong></div>`;
const subtabs=(names,selected)=>`<nav class="subtabs ${activeTab==='Perps'?'perp-subtabs':''}" aria-label="${activeTab} records">${names.map(n=>`<button class="${n===selected?'selected':''}" data-sub="${n}">${n}</button>`).join('')}</nav>`;
const assetCell=h=>`<div class="asset-cell">${h.symbol==='USDC'?'<span class="cash-mark">$</span>':`<img src="${logo(h.symbol)}" alt="">`}<div><strong>${h.symbol}</strong>${h.name?`<small>${h.name}</small>`:`<small>${h.leverage}x</small>`}</div></div>`;
function holdingsTable(){return `<table class="table holdings"><colgroup>${Array.from({length:5},()=>'<col>').join('')}</colgroup><thead><tr><th>Asset</th><th>Balance</th><th>Price / 24h</th><th>Value</th><th>Allocation</th></tr></thead><tbody>${holdings.map((h,i)=>`<tr data-row="holding:${i}" tabindex="0"><td>${assetCell(h)}</td><td>${h.qty.toLocaleString('en-US',{maximumFractionDigits:4})} ${h.symbol}</td><td>${money(h.price)} <small class="${cls(h.change)}">${h.change>=0?'+':''}${h.change.toFixed(2)}%</small></td><td>${money(h.qty*h.price)}</td><td><div class="allocation">${(h.qty*h.price/spotTotal()*100).toFixed(1)}%<i><b style="width:${h.qty*h.price/spotTotal()*100}%"></b></i></div></td></tr>`).join('')}</tbody></table>`;}
function positionTable(){return `<table class="table positions"><thead><tr>${['Symbol','Side','Size','Entry','Mark','Position Value','Liq. Price','Unrealized PnL','TP/SL'].map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${positions.map((p,i)=>`<tr data-row="position:${i}" tabindex="0"><td>${assetCell(p)}</td><td><span class="long">Long</span></td><td>${p.qty}</td><td>${money(p.entry)}</td><td>${money(p.mark)}</td><td>${money(p.qty*p.mark)}</td><td>${money(p.liquidation)}</td><td class="gain">${signed(p.qty*(p.mark-p.entry))}</td><td><button data-protect="${i}">Edit</button></td></tr>`).join('')}</tbody></table>`;}
function recordsTable(sub){
  if(sub==='Funding History')return `<table class="table"><thead><tr>${['Time','Asset','Position Value','Funding Rate','Payment'].map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${positions.map((p,i)=>`<tr><td>Sep 06, 16:00</td><td>${p.symbol}</td><td>${money(p.qty*p.mark)}</td><td>${[.008,.012,.006][i].toFixed(3)}%</td><td class="loss">${signed(-p.qty*p.mark*[.00008,.00012,.00006][i])}</td></tr>`).join('')}</tbody></table>`;
  const isOrder=sub==='Open Orders';
  const rows=isOrder?[
    ['BTC','Limit buy','0.25 BTC','$58,000.00','$14,500.00','Open'],['ETH','Limit buy','8 ETH','$2,700.00','$21,600.00','Open']
  ]:[['BTC','Buy','0.50 BTC','$52,000.00','$26,000.00','Filled'],['ETH','Buy','10 ETH','$2,325.00','$23,250.00','Filled'],['SOL','Buy','120 SOL','$111.00','$13,320.00','Filled']];
  return `<table class="table"><thead><tr>${['Asset','Type','Amount','Price','Total',isOrder?'Status':'Status / Sep 06'].map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td${i===5?' class="gain"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}
function strategyTable(running){return `<table class="table strategy-table ${running?'':'paused'}"><thead><tr>${['Strategy','Creator','Universe','Wallet','Duration','Net pnl','Return'].map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${strategies.map((s,i)=>s.running!==running?'':`<tr data-row="strategy:${i}" tabindex="0"><td><div class="strategy-name"><i></i>${s.name}</div></td><td><div class="creator"><b>${s.creator[0]}</b>${s.creator}</div></td><td><div class="universe-cell">${coins(s.assets)}${s.universe}</div></td><td><div class="strategy-wallet">${icon('Wallet')}official strategy</div></td><td>${s.days} days</td><td class="${cls(s.pnl)}">${signed(s.pnl)}</td><td class="${cls(s.ret)}">${s.ret>0?'+':''}${s.ret.toFixed(2)}%</td></tr>`).join('')}</tbody></table>`;}
function chartHead(kind){return `<div class="chart-head"><h3>${kind==='Perps'?'PnL trend':'Portfolio value'}</h3><div class="chart-periods" aria-label="Chart period">${['1D','7D','1M','All'].map(p=>`<button data-period="${p}" class="${p===period?'selected':''}">${p}</button>`).join('')}</div></div>${trend(kind)}`;}
function renderPanel(){
  const el=$('#panel');
  if(activeTab==='Spot'){
    el.innerHTML=`<div class="metrics">${metric('Total Value',money(spotTotal()))}${metric('Balance',money(spotTotal()-49240))}${metric('24h PnL','+$12,642.80','gain')}${metric('7d PnL','+$28,416.40','gain')}${metric('30d PnL','+$49,240.00','gain')}</div>${subtabs(['Holdings','Activity','Open Orders'],activeSub)}${activeSub==='Holdings'?holdingsTable():recordsTable(activeSub)}`;
  }else if(activeTab==='Perps'){
    el.innerHTML=`<div class="metrics">${metric('Account Equity',money(perpBalance))}${metric('Available to Trade',money(available))}${metric('Used margin',money(perpBalance-available))}${metric('Unrealized PnL',signed(perpsPnl()),'gain')}<button class="share" data-share>${icon('Share2')}Share</button></div><div class="period-pnl"><div><small>24h PnL</small><b class="gain">+$12,304.80 (+8.63%)</b></div><div><small>7d PnL</small><b class="gain">+$26,182.40 (+20.34%)</b></div><div><small>30d PnL</small><b class="gain">+$41,285.60 (+36.34%)</b></div></div>${chartHead('Perps')}${subtabs(['Position','Open Orders','Trade History','Funding History','Order History'],activeSub)}${activeSub==='Position'?positionTable():recordsTable(activeSub)}`;
  }else if(activeTab==='Strategies'){
    el.innerHTML=`<h3 class="strategy-heading">Running <span>${strategies.filter(s=>s.running).length}</span></h3>${strategyTable(true)}<h3 class="strategy-heading paused-title">Paused <span>${strategies.filter(s=>!s.running).length}</span></h3>${strategyTable(false)}<button class="marketplace-button" data-marketplace>Explore Strategy Marketplace ${icon('ArrowRight')}</button>`;
  }else{
    el.innerHTML=`<div class="metrics">${metric('Total Value',money(total()))}${metric('Spot',money(spotTotal()))}${metric('Perps',money(perpBalance))}${metric('30d PnL','+$90,525.60','gain')}</div>${chartHead('Overview')}${subtabs(['Holdings','Activity'],activeSub)}${activeSub==='Holdings'?holdingsTable():recordsTable(activeSub)}`;
  }
  el.setAttribute('aria-labelledby',`tab-${activeTab}`);
  // Rebuild the component timeline with each real tab view, including after scrubbing.
  panelMotion?.kill();
  const components=el.querySelectorAll('.metrics > *, .period-pnl > div, .chart-head > *, .pnl-chart, .subtabs > button, thead, tbody > tr, .strategy-heading, .marketplace-button');
  panelMotion=gsap.timeline({paused:true}).fromTo(components,{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.64,stagger:{amount:.44},ease:'power2.out'});
  panelMotion.progress(manual?1:0);
}
function selectTab(tab,animate=false){
  activeTab=tab;activeSub=tab==='Perps'?'Position':'Holdings';
  const spot=tab==='Spot',perps=tab==='Perps';
  $('#account-balance').textContent=money(spot?spotTotal():perps?perpBalance:total());
  $('#wallet-name').textContent=spot?'Spot wallet':perps?'official strategy':'All wallets';
  $('#network').textContent=perps?'Hyperliquid · 0x7a2e...94b1':'EVM · 0x7a2e...94b1 / Solana · D3mo...9c2A';
  $$('#tabs button').forEach(b=>{const selected=b.dataset.tab===tab;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});
  renderPanel();
  if(animate)panelMotion.restart();
}
const cards=[
  ['strategy',strategies[1].short,strategies[1].assets,strategies[1].allocation,strategies[1].ret],
  ['perps','NVDA / USD',['NVDA'],24850,42.8],
  ['spot','AAPL',['AAPL'],18642.8,24.16],
  ['strategy','Semiconductor Core',['NVDA','MU','AMD'],125800,31.6],
  ['spot','MSFT',['MSFT'],28480,28.92],
  ['perps','TSLA / USD',['TSLA'],-12450,-18.19],
  ['spot','NVDA',['NVDA'],32480,48.2],
  ['strategy','Multi-Asset Long',['NVDA','BTC','ETH'],186250,37.65],
  ['perps','BTC / USD',['BTC'],15312.5,23.56],
  ['spot','ETH',['ETH'],12408,26.68],
  ['strategy','Digital Asset Core',['BTC','ETH','SOL'],154900.6,36.34],
  ['perps','ETH / USD',['ETH'],16362,22.72],
  ['strategy','Value + Momentum',['MSFT','GOOGL','BTC'],75000,21.4],
  ['perps','SOL / USD',['SOL'],14250,32.7],
  ['spot','BTC',['BTC'],29700,40.63],
  ['perps','HYPE / USD',['HYPE'],-10820,-12.6],
  ['strategy','Adaptive Momentum',['BTC','ETH','SOL'],35000,56.81],
  ['strategy','CoinFull Prime',['BTC','ETH','SOL'],98540,33.42],
  ['spot','GOOGL',['GOOGL'],16480,21.37],
  ['spot','AMD',['AMD'],22840,34.72],
  ['spot','MU',['MU'],19260,28.14],
  ['spot','TSLA',['TSLA'],-14260,-16.48],
  ['spot','SOL',['SOL'],18360,31.28],
  ['perps','MSFT / USD',['MSFT'],17680,24.83],
  ['perps','AMD / USD',['AMD'],21340,38.65],
  ['perps','COIN / USD',['COIN'],-13180,-22.74],
  ['perps','AVAX / USD',['AVAX'],16240,29.56],
  ['strategy','Quality + Income',['MSFT','AAPL','GOOGL'],82500,22.65],
  ['strategy','AI Infrastructure',['NVDA','AMD','MU'],112800,41.23],
  ['strategy','Cross-Market Balance',['BTC','MSFT','ETH'],145600,28.84]
].sort((a,b)=>['spot','perps','strategy'].indexOf(a[0])-['spot','perps','strategy'].indexOf(b[0]));
function cardHTML(c,i){const [kind,name,assets,value,ret]=c,allocation=kind==='strategy';return `<article class="asset-card ${allocation?'allocation-card':''} ${[2,7,10,14].includes(i)?'light-card':''}" data-card="${i}"><div class="card-top"><span class="card-type">${icon(allocation?'ChartPie':kind==='perps'?'ChartCandlestick':'ArrowUpDown')}${allocation?'MULTI-ASSET STRATEGY':kind==='perps'?'PERPS TRADE':'SPOT TRADE'}</span><span class="card-state"><i></i>${allocation?'Running':'Closed'}</span></div><h2>${name}</h2><div class="card-identity">${coins(assets)}${allocation?'Long allocation':kind==='perps'?'Long · 3x · Isolated':'Buy → Sell · Filled'}</div><div class="card-result"><div><small>${allocation?'Allocated capital':'Realized PnL'}</small><strong class="${allocation?'':cls(value)}">${allocation?money(value):signed(value)}</strong></div>${miniChart(i,value<0)}</div>${allocation?'<div class="allocation-bars"><i style="flex:4"></i><i style="flex:3"></i><i style="flex:2"></i><i style="flex:1"></i></div>':''}<div class="card-bottom"><span>${allocation?'3 assets · Daily rebalance':'Position value'} ${allocation?'':`<b>${money(Math.abs(value)*3.2)}</b>`}</span><b class="return ${cls(ret)}">${ret>0?'+':''}${ret.toFixed(2)}%</b></div></article>`;}
$('#cards').innerHTML=cards.map(cardHTML).join('');
$('#ticker-track').innerHTML=Array.from({length:3},()=>[['ETH','$2,945.40','+1.81%'],['BTC','$64,250.00','+2.34%'],['SP500','$5,642.80','+0.52%'],['NVDA','$128.40','+1.24%'],['SOL','$145.20','-0.62%'],['COIN','$212.84','-0.36%'],['MSFT','$428.16','+0.74%'],['HYPE','$38.42','+2.45%']].map(x=>`<span>${x[0]} &nbsp; ${x[1]} <b class="${x[2][0]==='-'?'loss':'gain'}">${x[2][0]==='-'?'▾':'▴'} ${x[2]}</b></span>`).join('')).join('');
hydrate();selectTab('Overview');
function resize(){const w=$('#viewport').clientWidth;$('#stage').style.transform=`scale(${w/1920})`;}
resize();addEventListener('resize',resize);
const tl=gsap.timeline({paused:true});
const allCards=$$('.asset-card');
const clickTimes=[6.5,7.6,8.7],tabPoints=['Spot','Perps','Strategies'].map(tabPoint);
const categoryNames=['Spot','Perps','Strategies'];
gsap.set('#client,#pointer,#click-ring',{autoAlpha:0});
allCards.forEach((e,i)=>{
  const col=i%10,row=Math.floor(i/10),x=1700+col*432+(row===1?180:0),y=82+row*308;
  const stageScale=$('#stage').getBoundingClientRect().width/1920;
  const wordRight=80+$(`#tab-${categoryNames[row]}`).getBoundingClientRect().width/stageScale*88/26;
  const fadeAt=55/30+(x-wordRight-48-780)/1950;
  gsap.set(e,{x,y:y+100,autoAlpha:0,scale:1,zIndex:i+1});
  tl.to(e,{autoAlpha:1,y,duration:.37,ease:'settle'},1.54+row*.05)
    .to(e,{x:x-5850,duration:3,ease:'none'},55/30)
    .to(e,{autoAlpha:0,duration:.4,ease:'sine.inOut'},fadeAt);
});
categoryNames.forEach((name,i)=>{
  const label=$(`#category-${name}`),tab=$(`#tab-${name}`);
  gsap.set(tab,{autoAlpha:0});
  const destination=()=>{const r=tab.getBoundingClientRect(),s=$('#stage').getBoundingClientRect(),k=s.width/1920;return {x:(r.left-s.left)/k-80,y:(r.top+r.height/2-s.top)/k-(223+i*308)};};
  tl.to(label,{'--label-color':'#aaa',duration:.5,ease:'sine.inOut'},3.8)
    .to(label,{x:()=>destination().x,y:()=>destination().y,scale:26/88,duration:1.38,ease:'power2.inOut'},4.2+i*.06)
    .set(label,{autoAlpha:0},5.7)
    .set(tab,{autoAlpha:1},5.7);
});
// The window stays fixed. Its actual DOM components arrive independently, without a mask.
tl.to('#cards',{autoAlpha:0,duration:.55,ease:'sine.inOut'},3.25)
  .to('#client',{autoAlpha:1,duration:.56,ease:'sine.inOut'},3.8)
  .fromTo('.window-controls,.windowbar',{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.65,stagger:.08,ease:'power2.out'},4.36)
  .fromTo('.sidebar-profile,.navlist > div,.download,.sidebar-user',{autoAlpha:0,x:-12},{autoAlpha:1,x:0,duration:.68,stagger:.065,ease:'power2.out'},4.46)
  .fromTo('.avatar,.wallet-line,#account-balance,.account-actions > button',{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.7,stagger:.085,ease:'power2.out'},4.54)
  .fromTo('#tab-Overview',{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.66,ease:'power2.out'},4.92)
  .fromTo('.ticker',{autoAlpha:0,y:8},{autoAlpha:1,y:0,duration:.7,ease:'power2.out'},5.28)
  .to('#ticker-track',{x:-600,duration:10,ease:'none'},0)
  .set('#pointer',{x:940,y:526,autoAlpha:1},6.12);
function tabPoint(name){const r=$(`#tab-${name}`).getBoundingClientRect(),s=$('#stage').getBoundingClientRect(),k=s.width/1920;return {x:(r.left+r.width*.58-s.left)/k-5,y:(r.top+r.height*.63-s.top)/k-5};}
['Spot','Perps','Strategies'].forEach((name,i)=>{
  const pt=tabPoints[i],at=clickTimes[i];
  tl.to('#pointer',{x:pt.x,y:pt.y,duration:i?.32:.30,ease:'minara'},at-(i?.35:.31))
    .to('#pointer',{scale:.83,duration:.065,ease:'power2.out'},at-.065)
    .to('#pointer',{scale:1,duration:.10,ease:'power2.out'},at)
    .fromTo('#click-ring',{x:pt.x+5,y:pt.y+5,scale:.32,autoAlpha:.68},{scale:1.2,autoAlpha:0,duration:.23,ease:'power2.out',immediateRender:false},at);
});
tl.to('#pointer',{x:1080,y:433,duration:.34,ease:'settle'},9.05).to('#pointer',{autoAlpha:0,duration:.17},9.55);
// Preserve the approved product choreography while the opening title runs at half speed.
tl.shiftChildren(introExtension);
clickTimes.forEach((at,i)=>clickTimes[i]=at+introExtension);
tl.to('#title',{autoAlpha:0,duration:.1},3.6);
const playhead={t:0};
function sync(t){
  time=t;tl.seek(t,false);
  window.titleFrame=Math.min(354,Math.round(t*30));window.setTitleFrame?.(window.titleFrame);
  if(!manual){const tab=t>=clickTimes[2]?'Strategies':t>=clickTimes[1]?'Perps':t>=clickTimes[0]?'Spot':'Overview';if(tab!==activeTab)selectTab(tab);}
  const afterClick=[...clickTimes].reverse().find(x=>t>=x);
  if(!manual)panelMotion.seek(Math.max(0,t-(afterClick??(5.16+introExtension))));
  const v=$('#flow');if(v.readyState>=2&&!v.seeking&&Math.abs(v.currentTime-t)>.08)v.currentTime=t;
  $('#scrub').value=t;$('#time').value=`${t.toFixed(2)} / ${duration.toFixed(2)}s`;
}
function pause(){driver?.kill();driver=null;$('#flow').pause();$('#play').innerHTML=ICONS.Play;$('#play').title='Play';}
function closeOverlays(){$('#detail').hidden=true;$('#wallet-menu').hidden=true;$('#wallet-button').setAttribute('aria-expanded','false');$('#receipt').hidden=true;$('#action-dialog').close();}
function seek(t){
  pause();initialPoster=false;
  if(manual){holdings.forEach((h,i)=>Object.assign(h,baseline.holdings[i]));strategies.forEach((s,i)=>Object.assign(s,baseline.strategies[i]));positions.forEach((p,i)=>Object.assign(p,baseline.positions[i]));perpBalance=154900.6;available=86360.1;}
  manual=false;document.body.classList.remove('interactive');closeOverlays();period='1M';playhead.t=Math.max(0,Math.min(duration,Number(t)||0));selectTab('Overview');sync(playhead.t);
  $('#review-note').textContent='Mock data only. Play, scrub, or try the Portfolio tabs. No MP4 has been rendered.';
}
function play(){if(initialPoster||manual||time>=duration-.02)seek(0);pause();driver=gsap.to(playhead,{t:duration,duration:(duration-time)/Number($('#speed').value),ease:'none',onUpdate:()=>sync(playhead.t),onComplete:pause});$('#play').innerHTML=ICONS.Pause;$('#play').title='Pause';}
function interact(){pause();manual=true;document.body.classList.add('interactive');if(time<6.24+introExtension){playhead.t=duration;sync(duration);selectTab('Spot');}panelMotion.progress(1);$('#review-note').textContent='Interactive mock Portfolio. Tabs, chart periods, rows and wallet actions are local and clickable.';}
function receipt(message){$('#receipt').textContent=message;$('#receipt').hidden=false;}
$('#play').onclick=()=>driver?pause():play();$('#replay').onclick=()=>{seek(0);play();};$('#scrub').oninput=e=>seek(e.target.value);
$('#speed').onchange=()=>{if(driver)play();};$('#interactive').onclick=()=>{seek(duration);interact();selectTab('Spot');};
$('#fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():$('#viewport').requestFullscreen();
$$('[data-seek]').forEach(b=>b.onclick=()=>seek(b.dataset.seek));
$$('[data-tab]').forEach(b=>b.onclick=()=>{interact();closeOverlays();selectTab(b.dataset.tab,true);});
$('#tabs').onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const names=['Overview','Spot','Perps','Strategies'];let i=names.indexOf(activeTab);i=e.key==='Home'?0:e.key==='End'?3:(i+(e.key==='ArrowRight'?1:3))%4;interact();selectTab(names[i],true);$(`#tab-${names[i]}`).focus();};
$('#wallet-button').onclick=()=>{interact();$('#wallet-menu').hidden=!$('#wallet-menu').hidden;$('#wallet-button').setAttribute('aria-expanded',String(!$('#wallet-menu').hidden));};
$$('[data-wallet]').forEach(b=>b.onclick=()=>{selectTab(b.dataset.wallet,true);$('#wallet-menu').hidden=true;$('#wallet-button').setAttribute('aria-expanded','false');});
function showDetail(type,i){
  interact();const s=type==='strategy'?strategies[i]:type==='position'?positions[i]:holdings[i];
  const name=s.name||`${s.symbol} / USD`,value=type==='strategy'?s.allocation:type==='position'?s.qty*s.mark:s.qty*s.price;
  $('#detail-body').innerHTML=`${type==='strategy'?coins(s.assets):s.symbol!=='USDC'?`<img class="detail-mark" src="${logo(s.symbol)}" alt="">`:''}<h2>${name}</h2><span class="muted">${type==='strategy'?'Allocated capital':'Position value'}</span><strong class="detail-value">${money(value)}</strong>${miniChart(i,(s.pnl||0)<0)}<dl>${type==='strategy'?`<div><dt>Status</dt><dd class="gain">${s.running?'Running':'Paused'}</dd></div><div><dt>Net PnL</dt><dd class="${cls(s.pnl)}">${signed(s.pnl)}</dd></div><div><dt>Return</dt><dd class="${cls(s.ret)}">${s.ret>0?'+':''}${s.ret.toFixed(2)}%</dd></div><div><dt>Duration</dt><dd>${s.days} days</dd></div>`:`<div><dt>Balance</dt><dd>${s.qty} ${s.symbol}</dd></div><div><dt>${type==='position'?'Mark':'Price'}</dt><dd>${money(s.mark||s.price)}</dd></div><div><dt>Unrealized PnL</dt><dd class="gain">${signed(s.pnl??(s.mark-s.entry)*s.qty)}</dd></div>`}</dl>${type==='strategy'?`<button class="wide white" id="toggle-strategy">${s.running?'Pause strategy':'Resume strategy'}</button>`:''}`;
  $('#detail').hidden=false;
  if(type==='strategy')$('#toggle-strategy').onclick=()=>{s.running=!s.running;renderPanel();showDetail(type,i);};
  if(type==='position'){
    $('#detail-body').insertAdjacentHTML('beforeend',`<form id="protection-form"><label>Take profit<input id="take-profit" type="number" step=".01" min="${(s.mark+.01).toFixed(2)}" value="${s.takeProfit.toFixed(2)}" required></label><label>Stop loss<input id="stop-loss" type="number" step=".01" min=".01" max="${(s.mark-.01).toFixed(2)}" value="${s.stopLoss.toFixed(2)}" required></label><button class="white wide">Save TP/SL</button></form>`);
    $('#protection-form').onsubmit=e=>{e.preventDefault();const tp=Number($('#take-profit').value),sl=Number($('#stop-loss').value);if(!Number.isFinite(tp)||!Number.isFinite(sl)||tp<=s.mark||sl<=0||sl>=s.mark)return;s.takeProfit=tp;s.stopLoss=sl;$('#detail').hidden=true;receipt(`${s.symbol} TP/SL updated · Demo`);};
  }
}
function showShare(){
  interact();const summary=`Portfolio\nTotal value: ${money(total())}\nSpot: ${money(spotTotal())}\nPerps: ${money(perpBalance)}\nUnrealized PnL: ${signed(perpsPnl())}\nDemo account`;
  $('#detail-body').innerHTML=`<h2>Share portfolio</h2><textarea id="share-summary" readonly aria-label="Portfolio summary">${summary}</textarea><button class="white wide" id="copy-summary">${icon('Copy')}Copy summary</button>`;$('#detail').hidden=false;
  $('#copy-summary').onclick=async()=>{try{await navigator.clipboard.writeText(summary);receipt('Portfolio summary copied');}catch{$('#share-summary').select();receipt('Portfolio summary selected');}};
}
function showMarketplace(){
  interact();$('#detail-body').innerHTML=`<h2>Strategy Marketplace</h2><div class="market-list">${strategies.map((s,i)=>`<button data-market-strategy="${i}"><span>${s.name}<small>${s.universe} · ${s.creator}</small></span><b class="${cls(s.ret)}">${s.ret>0?'+':''}${s.ret.toFixed(2)}%</b>${icon('ArrowRight')}</button>`).join('')}</div>`;$('#detail').hidden=false;
  $$('#detail [data-market-strategy]').forEach(b=>b.onclick=()=>showDetail('strategy',Number(b.dataset.marketStrategy)));
}
$('#close-detail').onclick=()=>$('#detail').hidden=true;
$('#panel').onclick=e=>{
  const sub=e.target.closest('[data-sub]'),p=e.target.closest('[data-period]'),row=e.target.closest('[data-row]');
  if(sub){interact();activeSub=sub.dataset.sub;renderPanel();}
  else if(p){interact();period=p.dataset.period;renderPanel();}
  else if(e.target.closest('[data-share]'))showShare();
  else if(e.target.closest('[data-marketplace]'))showMarketplace();
  else if(row){const [type,i]=row.dataset.row.split(':');showDetail(type,Number(i));}
};
$('#panel').onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-row]')){e.preventDefault();e.target.click();}};
let action='Transfer',sourcePerps=false;
$$('[data-action]').forEach(b=>b.onclick=()=>{
  interact();action=b.dataset.action;sourcePerps=activeTab==='Perps';const cash=sourcePerps?available:holdings[3].qty;
  $('#action-title').textContent=action;$('#confirm-action').textContent=`Confirm ${action.toLowerCase()}`;
  $('#action-destination').innerHTML=`<option>${sourcePerps?'Spot wallet':'official strategy'}</option>`;
  $('#destination-label').hidden=action!=='Transfer';$('#action-amount').max=action==='Deposit'?1000000:cash.toFixed(2);$('#action-amount').value=Math.min(15000,cash);$('#cash-available').textContent=`${cash.toLocaleString('en-US',{minimumFractionDigits:2})} USDC`;$('#action-dialog').showModal();
});
$('#close-dialog').onclick=()=>$('#action-dialog').close();
$('#action-form').onsubmit=e=>{
  e.preventDefault();const amount=Number($('#action-amount').value);if(!Number.isFinite(amount)||amount<=0||(action!=='Deposit'&&amount>(sourcePerps?available:holdings[3].qty)))return;
  const delta=action==='Deposit'?amount:-amount;
  if(sourcePerps){perpBalance+=delta;available+=delta;if(action==='Transfer')holdings[3].qty+=amount;}
  else{holdings[3].qty+=delta;if(action==='Transfer'){perpBalance+=amount;available+=amount;}}
  $('#action-dialog').close();selectTab(activeTab);receipt(`${action} complete · ${money(amount)} USDC · Demo`);
};
addEventListener('keydown',e=>{if(e.key==='Escape'){closeOverlays();return;}if(e.code==='Space'&&!/INPUT|SELECT|BUTTON/.test(e.target.tagName)&&!$('#action-dialog').open){e.preventDefault();driver?pause():play();}});
window.__timelines={'s14-s15':tl};
window.scene={seek,play,pause,interact,duration,cards,holdings,positions,strategies,get state(){return {time,tab:activeTab,sub:activeSub,period,manual,total:total(),spot:spotTotal(),perps:perpBalance,pnl:perpsPnl()};}};
$('#flow').addEventListener('loadeddata',()=>sync(time));
$('#scrub').max=duration;
$('#stage').dataset.duration=duration;
$$('[data-seek]').forEach(b=>b.dataset.seek=Number(b.dataset.seek)<1?Number(b.dataset.seek)*2:Number(b.dataset.seek)+introExtension);
seek(1.64);initialPoster=true;
