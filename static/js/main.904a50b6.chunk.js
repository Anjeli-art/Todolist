(this.webpackJsonpmy=this.webpackJsonpmy||[]).push([[0],{12:function(t,e,n){},13:function(t,e,n){},15:function(t,e,n){"use strict";n.r(e);var c=n(1),i=n.n(c),a=n(6),s=n.n(a),o=(n(12),n(7)),l=n(3),r=(n(13),n(0));function j(t){var e=Object(c.useState)(""),n=Object(l.a)(e,2),i=n[0],a=n[1],s=function(){t.addTask(i),a("")};return Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{children:t.title}),Object(r.jsxs)("div",{children:[Object(r.jsx)("input",{value:i,onChange:function(t){a(t.currentTarget.value)},onKeyPress:function(t){13===t.charCode&&s()}}),Object(r.jsx)("button",{onClick:s,children:"+"})]}),Object(r.jsx)("ul",{children:t.tasks.map((function(e){return Object(r.jsxs)("li",{children:[Object(r.jsx)("input",{type:"checkbox",checked:e.isDone}),Object(r.jsx)("button",{onClick:function(){t.taskDelet(e.id)},children:"x"}),e.title]},e.id)}))}),Object(r.jsxs)("div",{children:[Object(r.jsx)("button",{onClick:function(){t.taskChanged("all")},children:"all"}),Object(r.jsx)("button",{onClick:function(){t.taskChanged("active")},children:"active"}),Object(r.jsx)("button",{onClick:function(){t.taskChanged("complited")},children:"complited"})]})]})}var u=n(17);var d=function(){var t=Object(c.useState)([{id:Object(u.a)(),title:"html",isDone:!0},{id:Object(u.a)(),title:"css",isDone:!0},{id:Object(u.a)(),title:"js",isDone:!1},{id:Object(u.a)(),title:"restAPI",isDone:!0},{id:Object(u.a)(),title:"graphQL",isDone:!1}]),e=Object(l.a)(t,2),n=e[0],i=e[1],a=Object(c.useState)("all"),s=Object(l.a)(a,2),d=s[0],b=s[1],h=n;return"complited"===d&&(h=n.filter((function(t){return t.isDone}))),"active"===d&&(h=n.filter((function(t){return!t.isDone}))),Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(j,{title:"what to learn",tasks:h,taskDelet:function(t){var e=n.filter((function(e){return e.id!==t}));i(e)},taskChanged:function(t){b(t)},addTask:function(t){var e=[{id:Object(u.a)(),title:t,isDone:!1}].concat(Object(o.a)(n));i(e)},changeStatus:function(){}})})},b=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(e){var n=e.getCLS,c=e.getFID,i=e.getFCP,a=e.getLCP,s=e.getTTFB;n(t),c(t),i(t),a(t),s(t)}))};s.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(d,{})}),document.getElementById("root")),b()}},[[15,1,2]]]);
//# sourceMappingURL=main.904a50b6.chunk.js.map