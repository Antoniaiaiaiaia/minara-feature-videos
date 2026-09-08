const fs=require('fs');
const files=['scene1.html','scene2.html','scene3.html','scene4.html','scene5.html','scene6.html','scene7.html'];
for(const f of files){
  let s=fs.readFileSync(f,'utf8');
  if(s.includes('__scaler')){ console.log(f,'already 2K, skip'); continue; }
  // 1) root dims in CSS
  s=s.replace(/width:\s*1920px;\s*height:\s*1080px;/, 'width:2560px; height:1440px;');
  // 2) inject scaler CSS before </style>
  s=s.replace('</style>', '  .__scaler{ position:absolute; left:0; top:0; width:1920px; height:1080px; transform:scale(1.3333333); transform-origin:top left; }\n</style>');
  // 3) data dims on root element
  s=s.replace('data-width="1920" data-height="1080"', 'data-width="2560" data-height="1440"');
  // 4) wrap content: open scaler right after root opening tag
  s=s.replace(/(<div id="root"[^>]*>)/, '$1\n<div class="__scaler">');
  // 5) close scaler right before the timeline <script>
  s=s.replace(/<\/div>(\s*)<script/, '</div>\n</div>$1<script');
  fs.writeFileSync(f,s);
  console.log(f,'-> 2K wrapped');
}
