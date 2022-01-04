(this.webpackJsonpmy=this.webpackJsonpmy||[]).push([[0],{122:function(t,e,n){"use strict";n.r(e);var i,c,o=n(0),a=n.n(o),r=n(10),d=n.n(r),l=(n(95),function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,165)).then((function(e){var n=e.getCLS,i=e.getFID,c=e.getFCP,o=e.getLCP,a=e.getTTFB;n(t),i(t),c(t),o(t),a(t)}))}),s=(n(96),n(161)),u=n(152),j=n(153),b=n(55),O=n.n(b),f=n(56),p=n(26),T=n(9),h=n(73),x=n.n(h).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1",withCredentials:!0,headers:{"API-KEY":"7ccc0386-8558-4e56-b3f7-82cd09cd2d3e"}});!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(i||(i={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.later=4]="later"}(c||(c={}));var C=function(){return x.get("/todo-lists")},k=function(t){return x.post("/todo-lists",{title:t})},g=function(t){return x.delete("/todo-lists/".concat(t))},m=function(t){return x.put("/todo-lists/".concat(t.todolistId),{title:t.title})},v=function(t){return x.get("/todo-lists/".concat(t,"/tasks"))},S=function(t,e){return x.post("/todo-lists/".concat(e,"/tasks"),{title:t})},I=function(t,e){return x.delete("/todo-lists/".concat(t,"/tasks/").concat(e))},y=function(t,e,n){return x.put("/todo-lists/".concat(e,"/tasks/").concat(n),t)},E={},D=function(t,e,n){return{type:"CHANGE-TASK-TITLE",title:e,taskid:t,todolistId:n}},A=n(23),L=n(162),w=n(41),N=n(149),K=n(5),H=a.a.memo((function(t){var e=t.title,n=t.onChange,i=Object(o.useState)(!1),c=Object(w.a)(i,2),a=c[0],r=c[1],d=Object(o.useState)(""),l=Object(w.a)(d,2),s=l[0],u=l[1];return a?Object(K.jsx)(N.a,{value:s,onChange:function(t){u(t.currentTarget.value)},onBlur:function(){r(!1),n(s)},autoFocus:!0}):Object(K.jsx)("span",{onDoubleClick:function(){r(!0),u(e)},children:e})})),R=a.a.memo((function(t){var e=t.task,n=t.todoId,c=Object(A.b)(),a=Object(o.useCallback)((function(){var t,i;c((t=n,i=e.id,function(e){I(t,i).then((function(n){e(function(t,e){return{type:"REMOVE-TASK",id:e,todolistId:t}}(t,i))}))}))}),[c,n,e.id]),r=Object(o.useCallback)((function(t){var o,a,r;c((o=e.id,a=n,r=t.currentTarget.checked?i.Completed:i.New,function(t,e){var n=e().tasks[a].find((function(t){return t.id===o}));if(n){var i={title:n.title,status:r,description:n.description,priority:n.priority,startDate:n.startDate,deadline:n.deadline};y(i,a,o).then((function(e){t(function(t,e,n){return{type:"CHANGE-TASK-STATUS",status:e,taskid:t,todolistId:n}}(o,r,a))}))}}))}),[c,e.id,n]),d=Object(o.useCallback)((function(t){c(D(e.id,t,n))}),[c,e.id,n]);return Object(K.jsxs)("li",{style:{listStyleType:"none"},className:e.status===i.Completed?"is-done":"",children:[Object(K.jsx)(L.a,{checked:e.status===i.Completed,onChange:r,color:"default",inputProps:{"aria-label":"checkbox with default color"}}),Object(K.jsx)(u.a,{"aria-label":"delete",color:"default",onClick:a,children:Object(K.jsx)(O.a,{})}),Object(K.jsx)(H,{title:e.title,onChange:d})]})})),G=n(159),F=a.a.memo((function(t){var e=t.callback,n=Object(o.useState)(""),i=Object(w.a)(n,2),c=i[0],a=i[1],r=Object(o.useState)(null),d=Object(w.a)(r,2),l=d[0],s=d[1],u=function(){""!==c.trim()?(e(c.trim()),a("")):s("title is required")};return Object(K.jsxs)("div",{children:[Object(K.jsx)(G.a,{variant:"outlined",value:c,onChange:function(t){a(t.currentTarget.value)},onKeyPress:function(t){null!==l&&s(null),13===t.charCode&&u()},label:"Type value",error:!!l,helperText:l}),Object(K.jsx)(j.a,{onClick:u,variant:"contained",color:"primary",style:{backgroundColor:"#ffca28",fontSize:"10px",padding:"18px 0px 18px 0px"},children:"+"})]})})),M=a.a.memo((function(t){Object(o.useEffect)((function(){var e;n((e=t.todolistid,function(t){v(e).then((function(n){t(function(t,e){return{type:"SET-TASKS",tasks:t,todolistId:e}}(n.data.items,e))}))}))}),[]);var e=Object(A.c)((function(e){return e.tasks[t.todolistid]})),n=Object(A.b)(),c=Object(o.useCallback)((function(){t.TodoChanged("all",t.todolistid)}),[t.TodoChanged,t.todolistid]),a=Object(o.useCallback)((function(){t.TodoChanged("active",t.todolistid)}),[t.TodoChanged,t.todolistid]),r=Object(o.useCallback)((function(){t.TodoChanged("completed",t.todolistid)}),[t.TodoChanged,t.todolistid]),d=Object(o.useCallback)((function(e){t.titleTodoStatus(t.todolistid,e)}),[t.titleTodoStatus,t.todolistid]),l=e;return"completed"===t.filter&&(l=l.filter((function(t){return t.status===i.Completed}))),"active"===t.filter&&(l=l.filter((function(t){return t.status===i.New}))),Object(K.jsxs)(s.a,{boxShadow:10,style:{padding:"15px",border:"3px #ffca28 solid",borderRadius:"10px",backgroundColor:"white"},children:[Object(K.jsxs)("h3",{children:[Object(K.jsx)(H,{title:t.title,onChange:d}),Object(K.jsx)(u.a,{"aria-label":"delete",color:"default",onClick:function(){return t.removeTodo(t.todolistid)},children:Object(K.jsx)(O.a,{})})]}),Object(K.jsx)(F,{callback:Object(o.useCallback)((function(e){n(function(t,e){return function(n){S(t,e).then((function(t){n({type:"ADD-TASK",task:t.data.data.item})}))}}(e,t.todolistid))}),[n,t.todolistid])}),Object(K.jsx)("ul",{children:l.map((function(e){return Object(K.jsx)(R,{task:e,todoId:t.todolistid},e.id)}))}),Object(K.jsxs)("div",{children:[Object(K.jsx)(j.a,{variant:"all"===t.filter?"contained":"text",style:{padding:"2px"},onClick:c,children:"all"}),Object(K.jsx)(j.a,{variant:"active"===t.filter?"contained":"text",style:{padding:"2px"},onClick:a,children:"active"}),Object(K.jsx)(j.a,{variant:"completed"===t.filter?"contained":"text",style:{padding:"2px"},onClick:r,children:"complited"})]})]})})),P=n(154),U=n(155),V=n(156),B=n(157),J=n(158),q=n(78),z=n.n(q),Y=[],Q=function(){Object(o.useEffect)((function(){t((function(t){C().then((function(e){t({type:"SET-TODO",todos:e.data})}))}))}),[]);var t=Object(A.b)(),e=Object(A.c)((function(t){return t.todolists})),n=Object(o.useCallback)((function(e){var n;t((n=e,function(t){g(n).then((function(e){t({type:"REMOVE-TODOLIST",id:n})}))}))}),[t]),i=Object(o.useCallback)((function(e,n){var i,c;t((i=e,c=n,function(t){m({todolistId:i,title:c}).then((function(e){t({type:"CHANGE-TODOLIST-TITLE",id:i,title:c})}))}))}),[t]),c=Object(o.useCallback)((function(e){t(function(t){return function(e){k(t).then((function(t){e({type:"ADD-TODOLIST",todolist:t.data.data.item})}))}}(e))}),[t]),a=Object(o.useCallback)((function(e,n){t({type:"CHANGE-TODOLIST-FILTER",id:n,filter:e})}),[t]);return Object(K.jsxs)(s.a,{children:[Object(K.jsx)(P.a,{position:"static",style:{backgroundColor:"#ffca28",padding:"20px"},children:Object(K.jsxs)(U.a,{children:[Object(K.jsx)(u.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(K.jsx)(z.a,{})}),Object(K.jsx)(V.a,{variant:"h2",style:{margin:"0px 40px 0px 40px"},children:"Todolist"}),Object(K.jsx)(j.a,{color:"inherit",children:"Login"})]})}),Object(K.jsxs)(B.a,{style:{marginTop:"20px"},children:[Object(K.jsx)(J.a,{container:!0,style:{padding:"20px"},children:Object(K.jsx)(F,{callback:c})}),Object(K.jsx)(J.a,{container:!0,spacing:3,children:e.map((function(t){return Object(K.jsx)(J.a,{item:!0,children:Object(K.jsx)(M,{title:t.title,todolistid:t.id,TodoChanged:a,filter:t.filter,removeTodo:n,titleTodoStatus:i})},t.id)}))})]})]})},W=n(57),X=n(79),Z=Object(W.b)({todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":return[Object(T.a)(Object(T.a)({},e.todolist),{},{filter:"all"})].concat(Object(f.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(T.a)(Object(T.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(T.a)(Object(T.a)({},t),{},{filter:e.filter}):t}));case"SET-TODO":return e.todos.map((function(t){return Object(T.a)(Object(T.a)({},t),{},{filter:"all"})}));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TODO":var n=Object(T.a)({},t);return e.todos.forEach((function(t){n[t.id]=[]})),n;case"REMOVE-TASK":return Object(T.a)(Object(T.a)({},t),{},Object(p.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.id}))));case"ADD-TASK":return Object(T.a)(Object(T.a)({},t),{},Object(p.a)({},e.task.todoListId,[e.task].concat(Object(f.a)(t[e.task.todoListId]))));case"CHANGE-TASK-STATUS":return Object(T.a)(Object(T.a)({},t),{},Object(p.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskid?Object(T.a)(Object(T.a)({},t),{},{status:e.status}):t}))));case"CHANGE-TASK-TITLE":return Object(T.a)(Object(T.a)({},t),{},Object(p.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskid?Object(T.a)(Object(T.a)({},t),{},{title:e.title}):t}))));case"ADD-TODOLIST":return Object(T.a)(Object(T.a)({},t),{},Object(p.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":var i=Object(T.a)({},t);return delete i[e.id],i;case"SET-TASKS":return Object(T.a)(Object(T.a)({},t),{},Object(p.a)({},e.todolistId,e.tasks));default:return t}}}),$=Object(W.c)(Z,Object(W.a)(X.a));window.store=$,d.a.render(Object(K.jsx)(A.a,{store:$,children:Object(K.jsx)(Q,{})}),document.getElementById("root")),l()},95:function(t,e,n){},96:function(t,e,n){}},[[122,1,2]]]);
//# sourceMappingURL=main.73640574.chunk.js.map