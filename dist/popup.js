(()=>{"use strict";var e,t,o,n,l={975:(e,t,o)=>{o.a(e,(async(e,t)=>{try{let o=[],n=[],l=document.querySelector("table");chrome.runtime.onInstalled.addListener((e=>{console.log("we have just installed this for the first time!!!")})),chrome.runtime.onStartup.addListener((()=>{console.log("we have just started up this")})),await chrome.storage.sync.get("data").then((async e=>{console.log("result[data]: "+e.data),null==e.data&&(console.log("first time creating data!"),await i())})),await c(),await h(),await u();let a=document.querySelector("#cars");async function s(){o=[]}async function r(){chrome.storage.sync.set({data:[]})}async function i(){console.log("set default"),o.push(["Click here!","Some Assignements","0001-01-01","low"]),n.push(["Click here!","Some Assignements","0001-01-01","low"]),await chrome.storage.sync.set({data:o})}async function c(){await s(),console.log("running fetchData"),chrome.storage.sync.get(["data"]).catch((e=>{console.log("the reason we couldnt find data is "+e.type),r()})),await chrome.storage.sync.get("data").then((async e=>{console.log("result[data]: "+e.data),null==e.data&&(console.log("first time creating data!"),await i()),""==e.data&&(console.log("chrome's data is empty"),await g()),console.log("result[data] is "+typeof e.data),null==e.data&&(console.log("some error here idk why"),await r(),await g());for(let t=0;t<e.data.length;t++){let l=[];if(console.log("we are in for loop and result[data][i].length is "+typeof e.data[t].length),0!=e.data[t].length){for(let o=0;o<e.data[t].length;o++)console.log("i: "+t+" j: "+o),console.log("result[data][i][j] is "+e.data[t][o]),l.push(e.data[t][o]);for(let e=0;e<l.length;e++)console.log("row "+e+" data is "+l[e]);o.push(l),n.push(l),await f(o)}}})),console.log("local data after setLocal"),f(o)}async function d(e){if(console.log("we are removing index "+e+" localData.length "+o.length),f(o),e==o.length)return void console.log("some weird error");if(e==o.length-1)return console.log("last index"),void o.pop();let t=o.length;for(let n=e+1;n<t;n++)o[n-1]=o[n];o.pop(),await chrome.storage.sync.set({data:o})}async function g(){console.log("setting local data from HTML"),s();let e=document.querySelector("table");console.log("table is "+typeof e);const t=e.rows.length;console.log("rowLength is "+t);for(let a=1;a<t;a++){let t=e.rows.item(a).cells;console.log("cells is "+t);let s=t.length;console.log("cellLength is "+s);let r=[];for(var l=0;l<s-1;l++){let e=t.item(l),o=e.getElementsByTagName("input"),n=e.getElementsByTagName("select");if(null!=o[0]){const e=o[0];r.push(e.value)}if(null!=n[0]){const e=n[0];r.push(e.value)}}console.log("row data is "+r),console.log("row data length is "+r.length),o.push(r),n.push(r)}switch(a.options[a.selectedIndex].value){case"user":for(let e=0;e<n.length;e++)for(let t=0;t<n[e].length;t++)o[e][t]=n[e][t];break;case"date":o.sort((function(e,t){return""==e[2]&&""==t[2]?(console.log("Local data has been sorted to: "+o),0):""==e[2]?(console.log("Local data has been sorted to: "+o),-1*new Date(t[2]).getTime()):""==t[2]?(console.log("Local data has been sorted to: "+o),new Date(e[2]).getTime()):(console.log("Local data has been sorted to: "+o),new Date(e[2]).getTime()-new Date(t[2]).getTime())}));break;case"priority":o.sort((function(e,t){return t[3]==e[3]?0:Number(t[3])>Number(e[3])?1:-1}))}await chrome.storage.sync.set({data:o}),await u()}async function u(){var e,t;if(console.log("creating HTML from Data"),0==o.length){console.log("local data is empty so lets make something else");let e=document.createElement("h1");return e.textContent="Up to date!",e.classList.add("up-to-date"),void document.body.replaceChild(e,l)}let n=document.createElement("table");n.classList.add("styled-table");let a=n.createTHead().insertRow(0),s=a.insertCell(0),r=a.insertCell(1),i=a.insertCell(2),c=a.insertCell(3),h=a.insertCell(4);s.innerHTML="<b>Subject</b>",r.innerHTML="<b>Assignment</b>",i.innerHTML="<b>Due</b>",c.innerHTML="<b>Priority</b>",h.innerHTML="<b>Done</b>";for(let e=0;e<o.length;e++){let t=n.insertRow(e+1),l=t.insertCell(0),a=t.insertCell(1),s=t.insertCell(2),r=t.insertCell(3),i=t.insertCell(4);l.innerHTML=`<input type="text" value="${o[e][0]}">`,console.log("cell1 = "+l.innerHTML),a.innerHTML=`<input type="text" value="${o[e][1]}">`,console.log("cell2 = "+a.innerHTML),s.innerHTML=`<input type="date" value="${o[e][2]}">`,console.log("cell3 = "+s.innerHTML);let c=o[e][3];switch(console.log(`localdata[${e}][3] = ${o[e][3]}`),c){case"3":default:r.innerHTML=`\n                <select name="priority${e}" id="priority${e}">\n                    <option value="3" selected>High</option>\n                    <option value="2">Medium</option>\n                    <option value="1">Low</option>\n                </select>`;break;case"2":r.innerHTML=`\n                <select name="priority${e}" id="priority${e}">\n                    <option value="3">High</option>\n                    <option value="2" selected>Medium</option>\n                    <option value="1">Low</option>\n                </select>`;break;case"1":r.innerHTML=`\n                <select name="priority${e}" id="priority${e}">\n                    <option value="3">High</option>\n                    <option value="2">Medium</option>\n                    <option value="1" selected>Low</option>\n                </select>`}console.log("cell3 = "+s.innerHTML),i.innerHTML="<button>Done</button>",l.addEventListener("change",(e=>{g()})),a.addEventListener("change",(e=>{g()})),s.addEventListener("change",(e=>{g()})),r.addEventListener("change",(e=>{g()})),i.addEventListener("click",(()=>{console.log("buton clicked! "+e),d(e),u()}))}if(null!=l.parentNode)null===(e=l.parentNode)||void 0===e||e.replaceChild(n,l),console.log("we replaced table");else if(document.querySelector(".up-to-date")){let e=document.querySelector(".up-to-date");null===(t=e.parentNode)||void 0===t||t.replaceChild(n,e),console.log("we replaced header")}l=n}async function h(){console.log("we are in the function addListeners");let e=document.querySelector("table"),t=e.rows.length;for(let o=0;o<t;o++){let t=e.rows.item(o).cells,n=t.length;for(let e=0;e<n-1;e++){console.log("looping!");let o=t.item(e).getElementsByTagName("input");if(null!=o[0]){const e=o[0];console.log("we are adding listener to "+e.name),e.addEventListener("change",(e=>{console.log("input changed!"),g()}))}}let l=t.item(n-1).getElementsByTagName("button");if(null!=l[0]){const e=l[0];console.log("adding event listener to button"),e.addEventListener("click",(()=>{console.log("buton clicked! "+o),d(o),u()}))}}}async function p(e,t){let l=t.rows.length;for(let e=0;e<l;e++){let l=t.rows.item(e).cells,r=new Array(0),i=l.length;for(var s=0;s<i-1;s++){let e=l.item(s).getElementsByTagName("input");if(null!=e[0]){const t=e[0];console.log("we are in AddTableRows and "),console.log(`we are adding ${t.value} to data ${o}`),r.push(t.value),t.value=""}}let c=document.getElementById("addPriority"),d=c.options[c.selectedIndex].value;switch(r.push(d),console.log("row data length is "+r.length),console.log("rowData[3] = "+r[3]),o.push(r),n.push(r),a.options[a.selectedIndex].value){case"user":break;case"date":o.sort((function(e,t){return""==e[2]&&""==t[2]?(console.log("Local data has been sorted to: "+o),0):""==e[2]?(console.log("Local data has been sorted to: "+o),-1*new Date(t[2]).getTime()):""==t[2]?(console.log("Local data has been sorted to: "+o),new Date(e[2]).getTime()):(console.log("Local data has been sorted to: "+o),new Date(e[2]).getTime()-new Date(t[2]).getTime())}));break;case"priority":o.sort((function(e,t){return t[3]==e[3]?0:Number(t[3])>Number(e[3])?1:-1}))}await chrome.storage.sync.set({data:o}),await u()}}a.addEventListener("change",(e=>{console.log("Identified change in sort"),g()}));const m=document.querySelector("#addingTable");async function f(e){console.log("data.length: "+e.length);for(let t=0;t<e.length;t++){console.log("data[i].length is "+e[t].length);for(let o=0;o<e[t].length;o++)console.log(`data[${t}][${o}] is ${e[t][o]}`)}}document.querySelector("#add").addEventListener("click",(e=>{p(0,m)})),t()}catch(w){t(w)}}),1)}},a={};function s(e){var t=a[e];if(void 0!==t)return t.exports;var o=a[e]={exports:{}};return l[e](o,o.exports,s),o.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",o="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",n=e=>{e&&!e.d&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},s.a=(l,a,s)=>{var r;s&&((r=[]).d=1);var i,c,d,g=new Set,u=l.exports,h=new Promise(((e,t)=>{d=t,c=e}));h[t]=u,h[e]=e=>(r&&e(r),g.forEach(e),h.catch((e=>{}))),l.exports=h,a((l=>{var a;i=(l=>l.map((l=>{if(null!==l&&"object"==typeof l){if(l[e])return l;if(l.then){var a=[];a.d=0,l.then((e=>{s[t]=e,n(a)}),(e=>{s[o]=e,n(a)}));var s={};return s[e]=e=>e(a),s}}var r={};return r[e]=e=>{},r[t]=l,r})))(l);var s=()=>i.map((e=>{if(e[o])throw e[o];return e[t]})),c=new Promise((t=>{(a=()=>t(s)).r=0;var o=e=>e!==r&&!g.has(e)&&(g.add(e),e&&!e.d&&(a.r++,e.push(a)));i.map((t=>t[e](o)))}));return a.r?c:s()}),(e=>(e?d(h[o]=e):c(u),n(r)))),r&&(r.d=0)},s(975)})();