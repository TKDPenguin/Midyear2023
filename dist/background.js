(()=>{"use strict";var e;(e={}).data=void 0,e.data=[],chrome.storage.onChanged.addListener(((e,a)=>{for(let[o,{oldValue:n,newValue:t}]of Object.entries(e))console.log(`Storage key "${o}" in namespace "${a}" changed.`,`Old value was "${n}", new value is "${t}".`)}))})();