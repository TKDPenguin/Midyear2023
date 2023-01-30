(()=>{"use strict";var e,t,n,o,l={975:(e,t,n)=>{n.a(e,(async(e,t)=>{try{let n=[],o=document.querySelector("table");async function l(){n=[]}async function a(){chrome.storage.sync.set({data:[]})}async function r(){console.log("set default"),n.push(["Click here!","Some Assignements","0001-01-01"]),await chrome.storage.sync.set({data:n})}async function s(){await l(),console.log("running fetchData"),chrome.storage.sync.get(["data"]).catch((e=>{console.log("the reason we couldnt find data is "+e.type),a()})),await chrome.storage.sync.get("data").then((async e=>{console.log("result[data]: "+e.data),null==e.data&&(console.log("first time creating data!"),await r()),""==e.data&&(console.log("chrome's data is empty"),await c()),console.log("result[data] is "+typeof e.data),null==e.data&&(console.log("some error here idk why"),await a(),await c());for(let t=0;t<e.data.length;t++){let o=[];if(console.log("we are in for loop and result[data][i].length is "+typeof e.data[t].length),0!=e.data[t].length){for(let n=0;n<e.data[t].length;n++)console.log("i: "+t+" j: "+n),console.log("result[data][i][j] is "+e.data[t][n]),o.push(e.data[t][n]);for(let e=0;e<o.length;e++)console.log("row "+e+" data is "+o[e]);n.push(o),await p(n)}}})),console.log("local data after setLocal"),p(n)}async function i(e){if(console.log("we are removing index "+e),e!=n.length-1){for(let t=e+1;t<n.length;t++)n[t-1]=n[t];n.pop(),p(n)}else n.pop()}async function c(){console.log("setting local data from HTML"),l();let e=document.querySelector("table");console.log("table is "+typeof e);const t=e.rows.length;console.log("rowLength is "+t);for(let l=1;l<t;l++){let t=e.rows.item(l).cells;console.log("cells is "+t);let a=t.length;console.log("cellLength is "+a);let r=[];for(var o=0;o<a-1;o++){let e=t.item(o).getElementsByTagName("input");if(null!=e[0]){const t=e[0];r.push(t.value)}}n.push(r)}await chrome.storage.sync.set({data:n})}async function d(){var e;console.log("creating HTML from Data");let t=document.createElement("table");t.classList.add("styled-table");let l=t.createTHead().insertRow(0),a=l.insertCell(0),r=l.insertCell(1),s=l.insertCell(2),g=l.insertCell(3);a.innerHTML="<b>Subject</b>",r.innerHTML="<b>Assignment</b>",s.innerHTML="<b>Due</b>",g.innerHTML="<b>Done</b>";for(let e=0;e<n.length;e++){let o=t.insertRow(e+1),l=o.insertCell(0),a=o.insertCell(1),r=o.insertCell(2),s=o.insertCell(3),g=o.insertCell(4);l.innerHTML=`<input type="text" value="${n[e][0]}">`,console.log("cell1 = "+l.innerHTML),a.innerHTML=`<input type="text" value="${n[e][1]}">`,console.log("cell2 = "+a.innerHTML),r.innerHTML=`<input type="date" value="${n[e][2]}">`,console.log("cell3 = "+r.innerHTML),s.innerHTML='\n        <select name="priority" id="priority">\n          <option value="high">High Priority</option>\n          <option value="middle">Medium Priority</option>\n          <option value="low">Low Priority</option>\n        </select>',console.log("cell3 = "+r.innerHTML),g.innerHTML="<button>Done</button>",l.addEventListener("change",(e=>{c()})),a.addEventListener("change",(e=>{c()})),r.addEventListener("change",(e=>{c()})),g.addEventListener("click",(()=>{console.log("buton clicked! "+e),i(e),d()}))}null===(e=o.parentNode)||void 0===e||e.replaceChild(t,o),o=t}async function g(){console.log("we are in the function addListeners");let e=document.querySelector("table"),t=e.rows.length;for(let n=0;n<t;n++){let t=e.rows.item(n).cells,o=t.length;for(let e=0;e<o-1;e++){console.log("looping!");let n=t.item(e).getElementsByTagName("input");if(null!=n[0]){const e=n[0];console.log("we are adding listener to "+e.name),e.addEventListener("change",(e=>{console.log("input changed!"),c()}))}}let l=t.item(o-1).getElementsByTagName("button");if(null!=l[0]){const e=l[0];console.log("adding event listener to button"),e.addEventListener("click",(()=>{console.log("buton clicked! "+n),i(n),d()}))}}}async function u(e,t){let o=t.rows.length;for(let e=0;e<o;e++){let o=t.rows.item(e).cells,a=new Array(0),r=o.length;for(var l=0;l<r-1;l++){let e=o.item(l).getElementsByTagName("input");if(null!=e[0]){const t=e[0];console.log("we are in AddTableRows and "),console.log(`we are adding ${t.value} to data ${n}`),a.push(t.value),t.value=""}}n.push(a),await chrome.storage.sync.set({data:n}),await d(),await g()}}chrome.runtime.onInstalled.addListener((e=>{console.log("we have just installed this for the first time!!!")})),chrome.runtime.onStartup.addListener((()=>{console.log("we have just started up this")})),await chrome.storage.sync.get("data").then((async e=>{console.log("result[data]: "+e.data),null==e.data&&(console.log("first time creating data!"),await r())})),await s(),await g(),await d();const h=document.querySelector("#addingTable");async function p(e){console.log("data.length: "+e.length);for(let t=0;t<e.length;t++){console.log("data[i].length is "+e[t].length);for(let n=0;n<e[t].length;n++)console.log(`data[${t}][${n}] is ${e[t][n]}`)}}document.querySelector("#add").addEventListener("click",(e=>{u(0,h)})),t()}catch(f){t(f)}}),1)}},a={};function r(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={exports:{}};return l[e](n,n.exports,r),n.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",o=e=>{e&&!e.d&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},r.a=(l,a,r)=>{var s;r&&((s=[]).d=1);var i,c,d,g=new Set,u=l.exports,h=new Promise(((e,t)=>{d=t,c=e}));h[t]=u,h[e]=e=>(s&&e(s),g.forEach(e),h.catch((e=>{}))),l.exports=h,a((l=>{var a;i=(l=>l.map((l=>{if(null!==l&&"object"==typeof l){if(l[e])return l;if(l.then){var a=[];a.d=0,l.then((e=>{r[t]=e,o(a)}),(e=>{r[n]=e,o(a)}));var r={};return r[e]=e=>e(a),r}}var s={};return s[e]=e=>{},s[t]=l,s})))(l);var r=()=>i.map((e=>{if(e[n])throw e[n];return e[t]})),c=new Promise((t=>{(a=()=>t(r)).r=0;var n=e=>e!==s&&!g.has(e)&&(g.add(e),e&&!e.d&&(a.r++,e.push(a)));i.map((t=>t[e](n)))}));return a.r?c:r()}),(e=>(e?d(h[n]=e):c(u),o(s)))),s&&(s.d=0)},r(975)})();