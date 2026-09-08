window.MinaraMobileUI={
  status:({time='9:41',battery='100'}={})=>`<div class="m-status" data-grow><span>${time} ◐</span><span class="m-signal">▮▮▮ ◇</span><span class="m-battery">${battery}</span></div>`,
  wallet:({avatar,name='minara strategy',balance='$0.00'})=>`<div class="m-wallet" data-grow><span class="m-wallet-avatar"><img src="${avatar}" alt="Minara"></span><span class="m-wallet-name">${name}</span><span class="m-wallet-balance">Balance <b>${balance}</b></span></div>`,
  assetRow:({logo,name,meta})=>`<div class="m-asset-row" data-grow><span class="m-asset-logo"><img src="${logo}" alt="${name}"></span><strong>${name}</strong><span class="m-asset-meta">${meta}</span></div>`
};
