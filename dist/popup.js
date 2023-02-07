(()=>{"use strict";var e,t,o,n,l={975:(e,t,o)=>{o.a(e,(async(e,t)=>{try{let o=[],n=document.querySelector("table"),l=["user","date","priority"];async function a(){o=[]}async function s(){chrome.storage.sync.set({data:[]})}async function r(){console.log("set default"),a(),o.push(["user"]),o.push(["Click here!","Some Assignements","0001-01-01","low","1"]),await chrome.storage.sync.set({data:o})}async function i(){await a(),console.log("running fetchData"),chrome.storage.sync.get(["data"]).catch((e=>{console.log("the reason we couldnt find data is "+e.type),s()})),await chrome.storage.sync.get("data").then((async e=>{null==e.data&&await r(),""==e.data&&await d();for(let t=0;t<e.data.length;t++){let n=[];if(console.log("we are in for loop and result[data][i].length is "+typeof e.data[t].length),0!=e.data[t].length){for(let o=0;o<e.data[t].length;o++)console.log("i: "+t+" j: "+o),console.log("result[data][i][j] is "+e.data[t][o]),n.push(e.data[t][o]);o.push(n)}}})),console.log("local data after setLocal"),m(o)}async function c(e){if(e+=1,console.log("we are removing index "+e+" localData.length "+o.length),e==o.length-1)return console.log("last index"),o.pop(),console.log("removing data"),m(o),void await chrome.storage.sync.set({data:o});let t=o.length;for(let n=e+1;n<t;n++)o[n-1]=o[n];o.pop(),console.log("removing data"),m(o),await chrome.storage.sync.set({data:o})}async function d(){console.log("setting local data from HTML"),a();let e=document.querySelector("table");console.log("table is "+typeof e);const t=e.rows.length;console.log("rowLength is "+t);for(let l=1;l<t;l++){let t=e.rows.item(l).cells;console.log("cells is "+t);let a=t.length;console.log("cellLength is "+a);let s=[];for(var n=0;n<a-1;n++){let e=t.item(n),o=e.getElementsByTagName("input"),l=e.getElementsByTagName("select");if(null!=o[0]){const e=o[0];s.push(e.value)}if(null!=l[0]){const e=l[0];s.push(e.value)}}console.log("row data is "+s),console.log("row data length is "+s.length),o.push(s)}let l=document.querySelector("#sort"),s=l.options[l.selectedIndex].value;switch(s){case"user":o.sort((function(e,t){return e[4]>t[4]?1:e[4]<t[4]?-1:0}));break;case"date":o.sort((function(e,t){return""==e[2]&&""==t[2]?(console.log("Local data has been sorted to: "+o),0):""==e[2]?(console.log("Local data has been sorted to: "+o),-1*new Date(t[2]).getTime()):""==t[2]?(console.log("Local data has been sorted to: "+o),new Date(e[2]).getTime()):(console.log("Local data has been sorted to: "+o),new Date(e[2]).getTime()-new Date(t[2]).getTime())}));break;case"priority":o.sort((function(e,t){return t[3]==e[3]?0:Number(t[3])>Number(e[3])?1:-1}))}o.unshift([s]),await chrome.storage.sync.set({data:o}),await u()}async function u(){var e,t;if(console.log("creating HTML from Data"),1==o.length){console.log("local data is empty so lets make something else");let e=document.createElement("h1");return e.textContent="Up to date!",e.classList.add("up-to-date"),void document.body.replaceChild(e,n)}let a=document.createElement("table");a.classList.add("styled-table");let s=a.createTHead().insertRow(0),r=s.insertCell(0),i=s.insertCell(1),g=s.insertCell(2),h=s.insertCell(3),p=s.insertCell(4);r.innerHTML="<b>Subject</b>",i.innerHTML="<b>Assignment</b>",g.innerHTML="<b>Due</b>",h.innerHTML="<b>Priority</b>",p.innerHTML="<b>Done</b>",m(o);for(let e=1;e<o.length;e++){let t=a.insertRow(e),n=t.insertCell(0),l=t.insertCell(1),s=t.insertCell(2),r=t.insertCell(3),i=t.insertCell(4);n.innerHTML=`<input type="text" value="${o[e][0]}">`,console.log("cell1 = "+n.innerHTML),l.innerHTML=`<input type="text" value="${o[e][1]}">`,console.log("cell2 = "+l.innerHTML),s.innerHTML=`<input type="date" value="${o[e][2]}">`,console.log("cell3 = "+s.innerHTML);let g=o[e][3];switch(console.log(`localdata[${e}][3] = ${o[e][3]}`),g){case"3":default:r.innerHTML=`\n                <select name="priority${e}" id="priority${e}">\n                    <option value="3" selected>High</option>\n                    <option value="2">Medium</option>\n                    <option value="1">Low</option>\n                </select>`;break;case"2":r.innerHTML=`\n                <select name="priority${e}" id="priority${e}">\n                    <option value="3">High</option>\n                    <option value="2" selected>Medium</option>\n                    <option value="1">Low</option>\n                </select>`;break;case"1":r.innerHTML=`\n                <select name="priority${e}" id="priority${e}">\n                    <option value="3">High</option>\n                    <option value="2">Medium</option>\n                    <option value="1" selected>Low</option>\n                </select>`}console.log("cell3 = "+s.innerHTML),i.innerHTML="<button>Done</button>",n.addEventListener("change",(e=>{d()})),l.addEventListener("change",(e=>{d()})),s.addEventListener("change",(e=>{d()})),r.addEventListener("change",(e=>{d()})),i.addEventListener("click",(()=>{console.log("buton clicked! "+e),c(e),u()}))}let f=document.querySelector("#sort");if(f.selectedIndex=l.indexOf(o[0][0]),f.addEventListener("change",(e=>{console.log("Identified change in sort"),d()})),null!=n.parentNode)null===(e=n.parentNode)||void 0===e||e.replaceChild(a,n),console.log("we replaced table");else if(document.querySelector(".up-to-date")){let e=document.querySelector(".up-to-date");null===(t=e.parentNode)||void 0===t||t.replaceChild(a,e),console.log("we replaced header")}n=a}async function g(){console.log("we are in the function addListeners");let e=document.querySelector("table"),t=e.rows.length;for(let o=0;o<t;o++){let t=e.rows.item(o).cells,n=t.length;for(let e=0;e<n-1;e++){console.log("looping!");let o=t.item(e).getElementsByTagName("input");if(null!=o[0]){const e=o[0];console.log("we are adding listener to "+e.name),e.addEventListener("change",(e=>{console.log("input changed!"),d()}))}}let l=t.item(n-1).getElementsByTagName("button");if(null!=l[0]){const e=l[0];console.log("adding event listener to button"),e.addEventListener("click",(()=>{console.log("buton clicked! "+o),c(o),u()}))}}}async function h(e,t){let n=document.querySelector("#sort"),l=t.rows.item(0).cells,a=new Array(0);for(let e=0;e<l.length-1;e++){let t=l.item(e),o=t.getElementsByTagName("input"),n=t.getElementsByTagName("select");if(null!=o[0]){const e=o[0];a.push(e.value)}if(null!=n[0]){const e=n[0];a.push(e.value)}}let s=document.getElementById("addPriority"),r=s.options[s.selectedIndex].value;a.push(r),console.log("row data length is "+a.length),o.push(a),console.log("addTableRows: "),m(o);let i=n.options[n.selectedIndex].value;switch(c(-1),console.log("after removing data: "),m(o),i){case"user":o.sort((function(e,t){return e[4]>t[4]?1:e[4]<t[4]?-1:0}));break;case"date":o.sort((function(e,t){return""==e[2]&&""==t[2]?(console.log("Local data has been sorted to: "+o),0):""==e[2]?(console.log("Local data has been sorted to: "+o),-1*new Date(t[2]).getTime()):""==t[2]?(console.log("Local data has been sorted to: "+o),new Date(e[2]).getTime()):(console.log("Local data has been sorted to: "+o),new Date(e[2]).getTime()-new Date(t[2]).getTime())}));break;case"priority":o.sort((function(e,t){return t[3]==e[3]?0:Number(t[3])>Number(e[3])?1:-1}))}o.unshift([i]),await chrome.storage.sync.set({data:o}),await u()}chrome.runtime.onInstalled.addListener((e=>{console.log("we have just installed this for the first time!!!")})),chrome.runtime.onStartup.addListener((()=>{console.log("we have just started up this")})),await chrome.storage.sync.get("data").then((async e=>{console.log("result[data]: "+e.data),null==e.data&&(console.log("first time creating data!"),await r())})),await i(),await g(),await u();const p=document.querySelector("#addingTable");async function m(e){console.log("data.length: "+e.length);for(let t=0;t<e.length;t++){console.log("data[i].length is "+e[t].length);for(let o=0;o<e[t].length;o++)console.log(`data[${t}][${o}] is ${e[t][o]}`)}}document.querySelector("#add").addEventListener("click",(e=>{h(0,p)})),t()}catch(f){t(f)}}),1)}},a={};function s(e){var t=a[e];if(void 0!==t)return t.exports;var o=a[e]={exports:{}};return l[e](o,o.exports,s),o.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",o="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",n=e=>{e&&!e.d&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},s.a=(l,a,s)=>{var r;s&&((r=[]).d=1);var i,c,d,u=new Set,g=l.exports,h=new Promise(((e,t)=>{d=t,c=e}));h[t]=g,h[e]=e=>(r&&e(r),u.forEach(e),h.catch((e=>{}))),l.exports=h,a((l=>{var a;i=(l=>l.map((l=>{if(null!==l&&"object"==typeof l){if(l[e])return l;if(l.then){var a=[];a.d=0,l.then((e=>{s[t]=e,n(a)}),(e=>{s[o]=e,n(a)}));var s={};return s[e]=e=>e(a),s}}var r={};return r[e]=e=>{},r[t]=l,r})))(l);var s=()=>i.map((e=>{if(e[o])throw e[o];return e[t]})),c=new Promise((t=>{(a=()=>t(s)).r=0;var o=e=>e!==r&&!u.has(e)&&(u.add(e),e&&!e.d&&(a.r++,e.push(a)));i.map((t=>t[e](o)))}));return a.r?c:s()}),(e=>(e?d(h[o]=e):c(g),n(r)))),r&&(r.d=0)},s(975)})();