(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[7],{209:function(e,t,a){},210:function(e,t,a){},211:function(e,t,a){},217:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"getRunningProcesses",(function(){return p}));var r=a(0),c=a.n(r),l=a(41),s=a(83),u=a.n(s),m=a(85),i=a(86),o=a.n(i);function p(){return E.apply(this,arguments)}function E(){return(E=Object(m.a)(u.a.mark((function e(){var t,a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(d.AGENT_HOST,"/process"),e.next=3,o.a.get(t);case 3:return a=e.sent,n=a.data,e.abrupt("return",n);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var d=a(30),b={loading:!1,processes:[]},f=a(29),g=a(208),h=a.n(g),O=a(57),v=a.n(O);function N(){return c.a.createElement("tr",null,c.a.createElement("th",null,c.a.createElement("abbr",null,"Order")),c.a.createElement("th",null,c.a.createElement("abbr",null,"Name")),c.a.createElement("th",null,c.a.createElement("abbr",null,"CPU Usage")),c.a.createElement("th",null,c.a.createElement("abbr",null,"Memory Usage")))}function j(e){var t=e.name,a=e.cpuUsage,n=e.memUsage,r=e.idx,l=e.$id;return c.a.createElement("tr",{id:l},c.a.createElement("td",null,r),c.a.createElement("td",null,t),c.a.createElement("td",null,a),c.a.createElement("td",null,n))}a(209);function U(){var e=Object(l.useGlobal)("loading"),t=Object(f.a)(e,2)[1],a=Object(l.useGlobal)("processes"),s=Object(f.a)(a,2),u=s[0],m=s[1];return Object(r.useEffect)((function(){t(!0),n.getRunningProcesses().then((function(e){var t=e.command,a=e.memory,n=e.cpu,r=h.a.zip(t,a,n).map((function(e){var t=Object(f.a)(e,3);return{processName:t[0],memUsage:t[1],cpuUsage:t[2],id:v.a.generate()}}));m(r)})).finally((function(){return t(!1)}))}),[]),c.a.createElement("div",{className:"ProcessList table-container"},c.a.createElement("table",{className:"table is-bordered"},c.a.createElement("thead",null,c.a.createElement(N,null)),c.a.createElement("tbody",null,u.map((function(e,t){return c.a.createElement(j,{key:e.id,$id:e.id,idx:t+1,name:e.processName,memUsage:e.memUsage,cpuUsage:e.cpuUsage})})))))}function y(e){var t=e.searchText,a=Object(l.useGlobal)("processes"),n=Object(f.a)(a,1)[0].filter((function(e){return e.processName&&e.processName.startsWith(t)}));return c.a.createElement("aside",{className:"menu"},c.a.createElement("p",{className:"menu-label"},"Search Result"),c.a.createElement("ul",{className:"menu-list"},n.map((function(e){return c.a.createElement("li",{key:e.id},c.a.createElement("a",{href:"#".concat(e.id)},e.processName))}))))}a(210);function P(){var e=Object(r.useState)(""),t=Object(f.a)(e,2),a=t[0],n=t[1];return c.a.createElement("div",{className:"Sidebar"},c.a.createElement("input",{className:"input is-small",type:"text",value:a,onChange:function(e){return n(e.target.value)},placeholder:"Search Process Name",style:{borderRight:"0"}}),c.a.createElement(y,{searchText:a}))}a(211);function x(){return c.a.createElement("div",{className:"ProcessMonitorPage"},c.a.createElement(P,null),c.a.createElement(U,null))}Object(l.setGlobal)(b),a.d(t,"default",(function(){return x}))},30:function(e,t,a){"use strict";a.r(t),a.d(t,"AGENT_HOST",(function(){return n})),a.d(t,"FILE_EXPLORER_ROOT",(function(){return r}));var n="/api",r="/home"}}]);
//# sourceMappingURL=7.07df621c.chunk.js.map