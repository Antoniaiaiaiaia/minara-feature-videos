# SS2 v2 — Unified visual and motion specification（Required for every scene; keep it consistent）

This is the single source of truth for the Strategy Studio 2.0 v2 film。所有 scene HTML 必须严格套这套Palette/字体/缓动/结构。Reference implementation: `../v1/scene*/index.html`（same visual language, carried through consistently in v2）。

## 0. Canvas and composition structure（HyperFrames hard rules; violations break rendering）

```html
<!doctype html><html><head><meta charset="utf-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#F9F9F9}
#root,[data-composition-id="root"]{position:relative;width:1920px;height:1080px;overflow:hidden;
  background:#F9F9F9;font-family:'Geist',system-ui,-apple-system,sans-serif;color:#141416}
/* ...scene scene-specific styles... */
</style></head>
<body>
<div id="root" data-composition-id="root" data-width="1920" data-height="1080" data-start="0" data-duration="<秒>">
  <!-- elements -->
</div>
<script src="lib/three.min.js"></script>   <!-- only scenes that need 3D should include it -->
<script src="lib/gsap.min.js"></script>
<script src="lib/CustomEase.min.js"></script>
<script>
gsap.registerPlugin(CustomEase);
const SNAP=CustomEase.create("snap","M0,0 C0.95,0.03 0,0.98 1,1");
const tl=gsap.timeline({paused:true});   // must be paused
// ...
window.__timelines=window.__timelines||{};window.__timelines["root"]=tl;   // must be registered
</script></body></html>
```

**Non-negotiable rules：**
1. Root div also `id="root"` + `data-composition-id="root"`；CSS selectors `#root,[data-composition-id="root"]{}` include both（otherwise the browser falls back to serif）。
2. `#root` explicitly required `width:1920px;height:1080px`（otherwise previews and screenshots collapse to zero height）。
3. timeline `paused:true`，at the end `window.__timelines["root"]=tl`。
4. **Do not `Math.random()`**——用 mulberry32 固定 seed（see §5）。**Do not `repeat:-1`**（infinite loops cannot render；有限 `repeat:N` May以）。
5. **Do not staggered `from`**（`tl.from(sel,{...stagger})` 在 seek 渲染下会卡首elements）。For entrances, always `gsap.set(els,{opacity:0,y:24})` + 逐elements `tl.to(el,{...},T)` 或 `tl.fromTo(sel,{...},{...,stagger},T)`。
6. three.js 必须 `gsap.timeline({paused:true,onUpdate:render3})`，`render3` 里 `renderer.render(scene,cam)`，otherwise 3D will not follow seek time。lib Use relative paths for imports `lib/xxx.min.js`（each scene directory carries its own lib/）。
7. Always use **Geist**（Body/heading/numbers/buttons），Use for code **Geist Mono**。numbers加 `font-variant-numeric:tabular-nums`。Do not Inter / serif。

## 1. Palette（Light theme，v2 canonical）

| Use | Value |
|---|---|
| Background | `#F9F9F9` |
| Primary text | `#141416` |
| Secondary text / notes | `#8a8a8a`（Deep）/ `#9a9a9a`（Light） |
| Card fill | `#fff` |
| Hairline border | `#ECECEC`（primary）/ `#EFEFEF` / `#F1F1F1` |
| 卡片投影 | `0 40-60px 90-130px -45px rgba(0,0,0,.2-.4)`（越重要越Deep） |
| Deep色buttons | `#141416`（white text） |
| Light底块 | `#FAFAFA` / `#F5F5F5` / `#F2F2F2` |
| **Brand gradient** | `linear-gradient(120deg,#EB53FF,#FF538E 48%,#FF9A32)` |
| Gradient shadow | `0 22px 50px -16px rgba(255,83,142,.55)` |
| Success green（positive/LIVE/verified/success） | `#07B56A`；soft fill `#E7F8EF`；area fill `rgba(7,181,106,.10)` |
| Danger red（negative/drawdown） | `#F75D5F` |

**Brand gradientUse only for**：primary CTA buttons（Subscribe/Deploy/Autopilot/Allocate）、closing/heading的强调词、VIP badge。**Do not**拿它当positivenegative语义——positive/success is always green `#07B56A`。
Gradient text：`background:linear-gradient(...);-webkit-background-clip:text;background-clip:text;color:transparent`。

**tagsPalette**：liquidity `#E8F1FF/#2f7ff0`、crypto `#FFF0E2/#E7830f`、stock `#E9F7FF/#2aa3d6`、technical `#EAF7EE/#2a9d55`、volatility `#EEF0FF/#5b63e6`、neutral `#F1F1F1/#555`、green `#E7F8EF/#07B56A`。

**Token brand colors（circular badge，white text）**：BTC `#F7931A`(₿)、ETH `#627EEA`(Ξ)、SOL `#14F195`(◎,black text)、NVDA `#76B900`(N)、AAPL `#111`(A)、GOLD `#E8B10A`(Au)、S&P `#2f7ff0`(S)、NASDAQ `#5b63e6`(N)、USDC `#2775CA`。

## 2. Type scale（Video is viewed on phones: large, minimal, and spacious）

一屏最多 3–5 个elements。Body ≥28px、heading ≥48px、关键numbers巨大（88–140px）。参考 v1：
- 幕heading h1/h2 88px 800；card name 34–50px 700；关键收益numbers 62–140px 800 绿；副标/说明 24–32px 600 灰。

## 3. Signature easing

- **Default curve（all moves, scales, fades, draws, pushes, and count-ups）**：`SNAP`（= `cubic-bezier(0.95,0.03,0,0.98)`）。Tight start → sweep → settle，no overshoot。Typical 0.5–0.8s。
- **pop pop**（chips / badge / logo / success check / avatar）：`back.out(1.4–1.8)`。
- Exit acceleration：`power2.in`；count-up：`power1.out`；curve stroke drawing：`power1.inOut`； pulse/breathing：`sine.inOut`（May `yoyo:true,repeat:N`）。
- **Do not linear/constant speed**（except for explicitly permitted infinite light sweeps）。
- Between-scene transitions ≤0.5s（clean and decisive）；scene continuous motion inside a scene is not a transition，let it run as long as needed。

## 4. Signature shot vocabulary（recipe patterns，always write the code fresh）

> ⛔️ **Copying v1 code is forbidden（Antonia 2026-07-05 Non-negotiable rules，violations require a v3 rebuild）**：`../v1/` only as**visual and motion reference**for visual inspection，**all code must be written fresh**，do not copy-paste v1 HTML/JS/SVG。v1 has known bugs（如回测curve SVG 的 `viewBox`/width 与卡片宽度对不上 → curve撑不满或溢出卡片）。When writing new code：**SVG curve的 width/viewBox must match the actual card container width**，用 `preserveAspectRatio="none"` + 100% 宽，points/path compute points in the container’s real pixels，肉眼确认curve完整贴合卡片再交。


- **Everything converges into one**：一组elements `tl.to(els,{left:960,top:520,xPercent:-50,yPercent:-50,scale:.2-.3,opacity:0,duration:.6,ease:SNAP,stagger:.02-.03})` → target object `fromTo` pop in。（v1 scene2/scene4）
- **Code flow**：line by line `fromTo({opacity:0,x:-20},{opacity:1,x:0,stagger:.16,ease:SNAP})`，Syntax colors span（Geist Mono）。kw `#8b3bd6` fn `#2f7ff0` num `#0b8a45` cm `#9aa0a6` str `#c0392b`。（v1 scene5）
- **收益curvedrawing**：SVG path `strokeDasharray=L;strokeDashoffset=L` → `tl.to(line,{strokeDashoffset:0,duration:2.6,ease:'power1.inOut'})`，**描完再淡入area fill**（先线后面）。Use a continuous random walk for realism `open[i]=close[i-1]`（see §5 equityPath）。（v1 scene9）
- **count-up**：`tl.to('#val',{textContent:目标,duration:2.2,ease:'power1.out',snap:{textContent:1},modifiers:{textContent:v=>'+$'+Math.round(v).toLocaleString()}})`。（v1 scene6）
- **tap point tap**：`.touch` semi-transparent gray circle `rgba(20,20,20,.14)` 70–80px；`tap(x,y,t)=tl.set + fromTo({opacity:.5,scale:1.4},{opacity:0,scale:.7,.4,power2.out})`。（v1 scene5/8/9）
- **full-screen dim + spotlight**：`.dim` full screen `rgba(249,249,245,.5-.6)` opacity 0→1 + `.spot` 卡 `back.out(1.5)` pop in。（v1 scene8/9）
- **three.js 3D object**：`WebGLRenderer({antialias:true,alpha:true})` + `setPixelRatio(2)`；PerspectiveCamera(38,W/H,.1,100);slow rotation `tl.to(obj.rotation,{y:...,ease:'none'})`。（v1 scene1）
- **Ring-distributed nodes**：`a=(-90+(i+.5)*(360/N))*PI/180; x=cx+cos(a)*R; y=cy+sin(a)*R`。（v1 scene6）
- **Success pill**：白药丸 + 绿圆check（`#07B56A` 底白 ✓）`back.out(1.7)` 从 `y:-20 scale:.8` pop in。（v1 scene9 okpill / scene10 verif）

## 5. 确定性工具（禁 Math.random）

```js
// mulberry32 固定 seed
function mk(s){return()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const rnd=mk(7);
// 连续随机游走收益curve（真实感）
function equityPath(seed,w,h,n){const r=mk(seed);let v=0.12,p=[];for(let i=0;i<n;i++){const drift=0.006+(i/n)*0.012;v+=drift+(r()-0.46)*0.03;v=Math.max(0.05,v);p.push([i/(n-1)*w,h-v*h]);}return p;}
```

## 6. Assets

- Official avatar：`assets/avatar.png`（Minara 黑白像素avatar；closing圆 logo + globe 中心用它）。scene each scene directory must include `assets/avatar.png` 才能渲染/预览。
- lib：`lib/{gsap,CustomEase,three}.min.js`，每个 scene 目录一份。

## 7. Business constraints

- For any strategy with max drawdown >20% must be reviewed before external use（this is a public marketing film，drawdown误导 LP）。v2 里出现的示例numbers优先用 v1 已用过的（+105.82% / DD 20.11% / Sharpe 1.33 等）。
- LONG 绿 / SHORT 红。PnL numbers三到四位 `+$12,480`，avoid awkward five-digit layouts。

## 8. TASTE Non-negotiable rules（Antonia 2026-07-05 定，源自本地 design-taste-frontend skill + 她的直接反馈）

**这是"人类社会拍出来的视频"，不是"把所有elements缩小塞进一屏"。** anti-slop guidance：

1. **elementsMay以、且应该出框（crop past the frame edge）**。资产环、卡墙、面板不必整体缩到画面内——让最外圈/边缘elements自然被 1920×1080 边界裁掉。挤在中间一小团 = slop。
2. **非对称、大小有节奏**（DESIGN_VARIANCE 高）。Do not一切对称居中、等大、等距。primaryelements大、次elements小，错落有致。
3. **手机端May读优先**。Viewers watch on phones：elements要大、留白要足、一屏 focus 少。Do not use dense small text = 看不清 = 失败。宁May大到出框，Do not小到看不清。
4. **elements间距要够**。同类elements（如 badge 圆圈）间距 ≥ 自身直径，Do not挤成一坨。
5. **Do not hand-roll 假 UI 的简陋感**：When simulating a real product interface（DeFi dashboard / 交易面板）时要有真实的information density and hierarchy——多卡片、多指标、真实布局，不是一个孤零零的小卡。
6. **⛔️ 全片Do not出现中文（English only，Non-negotiable rules）**：所有屏幕上的文字——heading、card name、策略名、tags、buttons、numbers单位——一律英文。真实 Minara UI 里有用户用中文起的策略名（如"质量+日内反转多头"），**do not copy it into the video**，use an English strategy name instead。
7. **Dashboard/产品界面Reference the real Minara UI**：When a Strategy Studio dashboard appears，用真实 Minara bento 布局——top bar `● ● ●  Strategy Studio  …  [Tradfi 30 ▾]`；feature card「☆ AI Factor · IC 0.086 · α · Zero-Volume Days · [Liquidity][Crypto][Stock] tags」；strategy card「名称 + 绿色收益curve + +128% + Sharpe」；Balance card「$ 圆 + $12,480」；Allocation bar「segmented color bar + NVDA 34% / TSLA 26% / BTC 18% / ETH 14% / SOL 8% legend」。Top-Strategies Use the real layout for the page：`Top strategies, measured honestly.`（honestly 用Brand gradient）+ Consistent/Aggressive tab + cumulative return line + 表格（Strategy / CAGR / Return / Sharpe / Max DD / Trades / Window）+ Rising Creators sidebar——**all in English**。

## 9. Real company LOGO（scene4 资产、scene5 券商等"展示真实品牌"时必用）

**Do not用字母 monogram 冒充Real company**（除非该品牌确实没有May得 logo）。Source priority：

1. **Simple Icons CDN**：`https://cdn.simpleicons.org/{slug}/{hexcolor}` — Covers binance、coinbase、kraken、robinhood、nvidia、tesla、apple、bitcoin、ethereum、solana、cardano 等。slug 全小写去空格。
2. **股票 logo**：FMP `https://financialmodelingprep.com/image-stock/{TICKER}.png`（no key required，走代理 7890）。**scan downloaded images for empty files**（PIL nonwhite <2% 判空剔除，见 v1 教训）。
3. **下载到本地再引用**（渲染要内联）：`curl` 走 `HTTPS_PROXY=http://127.0.0.1:7890` 存到 `sceneN/assets/logos/{slug}.(svg|png)`，HTML 里 `<img src="assets/logos/xxx.svg">`。Do not直接引 CDN（渲染时外部请求不稳）。
4. **If no real logo can be found**（Some traditional brokerages Schwab/Fidelity/IBKR May能 Simple Icons 没有）→ clean text wordmark（Geist 700，品牌primary色）fallback，do not use decorative letter circles。
5. logo Put every logo in a white circular or rounded container（`background:#fff;border-radius:50%或16px;object-fit:contain;padding`），Place transparent logos on white and keep them aligned。
