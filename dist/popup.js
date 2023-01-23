(()=>{"use strict";var e,t,n,o,a={975:(e,t,n)=>{n.a(e,(async(e,t)=>{try{let n=[],o=document.querySelector("table");function a(){n=[]}async function l(){a(),console.log("running fetchData"),chrome.storage.sync.get(["data"]).catch((e=>{console.log("the reason we couldnt find data is "+e.type)})),await chrome.storage.sync.get("data").then((e=>{console.log("result[data]: "+e.data),""==e.data&&(console.log("chrome's data is empty"),r());for(let t=0;t<e.data.length;t++){let o=[];for(let n=0;n<e.data[t].length;n++)console.log("i: "+t+" j: "+n),console.log("result[data][i][j] is "+e.data[t][n]),o.push(e.data[t][n]);for(let e=0;e<o.length;e++)console.log("row "+e+" data is "+o[e]);n.push(o),d(n)}})),console.log("local data after setLocal"),d(n)}async function r(){console.log("setting local data from HTML"),a();let e=document.querySelector("table");const t=e.rows.length;for(let a=0;a<t;a++){let t=e.rows.item(a).cells,l=t.length,r=[];for(var o=0;o<l-1;o++){let e=t.item(o).getElementsByTagName("input");if(null!=e[0]){const t=e[0];r.push(t.value)}}n.push(r)}chrome.storage.sync.set({data:n})}async function c(){var e;console.log("creating HTML from Data");let t=document.createElement("table");for(let e=0;e<n.length;e++){let o=t.insertRow(e),a=o.insertCell(0),l=o.insertCell(1),c=o.insertCell(2),s=o.insertCell(3);a.innerHTML=`<input type="text" value="${n[e][0]}">`,console.log("cell1 = "+a.innerHTML),l.innerHTML=`<input type="text" value="${n[e][1]}">`,console.log("cell2 = "+l.innerHTML),c.innerHTML=`<input type="date" value="${n[e][2]}">`,console.log("cell3 = "+c.innerHTML),s.innerHTML="<button>Done</button>",a.addEventListener("change",(e=>{r()})),l.addEventListener("change",(e=>{r()})),c.addEventListener("change",(e=>{r()}))}null===(e=o.parentNode)||void 0===e||e.replaceChild(t,o),o=t}async function s(){let e=document.querySelector("table"),t=e.rows.length;for(let o=0;o<t;o++){let t=e.rows.item(o).cells,a=t.length;for(var n=0;n<a-1;n++){let e=t.item(n).getElementsByTagName("input");if(null!=e[0]){const t=e[0];console.log("we are adding listener to "+t.name),t.addEventListener("change",(e=>{r()}))}}}}async function i(e,t){let o=t.rows.length;for(let e=0;e<o;e++){let o=t.rows.item(e).cells,l=new Array(0),r=o.length;for(var a=0;a<r-1;a++){let e=o.item(a).getElementsByTagName("input");if(null!=e[0]){const t=e[0];console.log("we are in AddTableRows and "),console.log(`we are adding ${t.value} to data ${n}`),l.push(t.value)}}n.push(l),await chrome.storage.sync.set({data:n}),await c(),await s()}}await l(),await s(),await c();const u=document.querySelector("#addingTable");function d(e){console.log("data.length: "+e.length);for(let t=0;t<e.length;t++){console.log("data[i].length is "+e[t].length);for(let n=0;n<e[t].length;n++)console.log(`data[${t}][${n}] is ${e[t][n]}`)}}document.querySelector("#add").addEventListener("click",(e=>{i(0,u)})),t()}catch(g){t(g)}}),1)}},l={};function r(e){var t=l[e];if(void 0!==t)return t.exports;var n=l[e]={exports:{}};return a[e](n,n.exports,r),n.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",o=e=>{e&&!e.d&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},r.a=(a,l,r)=>{var c;r&&((c=[]).d=1);var s,i,u,d=new Set,g=a.exports,h=new Promise(((e,t)=>{u=t,i=e}));h[t]=g,h[e]=e=>(c&&e(c),d.forEach(e),h.catch((e=>{}))),a.exports=h,l((a=>{var l;s=(a=>a.map((a=>{if(null!==a&&"object"==typeof a){if(a[e])return a;if(a.then){var l=[];l.d=0,a.then((e=>{r[t]=e,o(l)}),(e=>{r[n]=e,o(l)}));var r={};return r[e]=e=>e(l),r}}var c={};return c[e]=e=>{},c[t]=a,c})))(a);var r=()=>s.map((e=>{if(e[n])throw e[n];return e[t]})),i=new Promise((t=>{(l=()=>t(r)).r=0;var n=e=>e!==c&&!d.has(e)&&(d.add(e),e&&!e.d&&(l.r++,e.push(l)));s.map((t=>t[e](n)))}));return l.r?i:r()}),(e=>(e?u(h[n]=e):i(g),o(c)))),c&&(c.d=0)},r(975)})();