"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[8804],{11690:function(e,t,n){n.d(t,{B:function(){return v},J:function(){return g}});var o=n(74165),r=n(15861),i=n(1413),l=n(93433),c=n(29439),u=n(72791),a=n(637),s=n(5403),d=n(37209),f=n(79018),p=n(29823),x=n(58340),h=n(80184),v=(0,u.forwardRef)((function(e,t){var n=e.columns,o=(e.rows,e.height),r=void 0===o?"400px":o,a=e.getSelectedItem,s=e.onKeyDown,d=e.disbaleTable,f=void 0!==d&&d,p=e.isTableSelectable,x=void 0===p||p,v=e.containerStyle,m=e.focusElementOnMaxTop,y=(0,u.useRef)(null),g=(0,u.useRef)(null),b=(0,u.useState)([]),w=(0,c.Z)(b,2),j=w[0],k=w[1],Z=(0,u.useState)([]),S=(0,c.Z)(Z,2),I=S[0],C=S[1],E=(0,u.useState)(0),D=(0,c.Z)(E,2),R=D[0],z=D[1],T=(0,u.useState)(null),N=(0,c.Z)(T,2),B=N[0],F=N[1],A=I.reduce((function(e,t){return e+t.width}),0);return(0,u.useEffect)((function(){n.length>0&&C(n.filter((function(e){return!e.hide})))}),[n]),(0,u.useImperativeHandle)(t,(function(){return{checkNoIsExist:function(e){return j.some((function(t){return t[2]===e}))},selectedRow:function(){return R},getData:function(){return(0,l.Z)(j)},setData:function(e){k(e)},getColumns:function(){return n},resetTable:function(){k([]),z(0)},getSelectedRow:function(){return B},setSelectedRow:function(e){return F(e)},_setSelectedRow:function(e){return z(e)},setDataFormated:function(e){k(e.map((function(e){return n.map((function(t){return e[t.key]}))})))},getDataFormatted:function(){return(0,l.Z)(j).map((function(e){return{Check_No:e[0],Check_Date:e[1],Check_Amnt:e[2],BankName:e[3],Branch:e[4],Check_Remarks:e[5],Deposit_Slip:e[6],DateDeposit:e[7],OR_No:e[8],BankCode:e[9]}}))},getElementBody:function(){return g.current},getParentElement:function(){return y.current}}})),(0,h.jsx)("div",{ref:y,style:(0,i.Z)((0,i.Z)({width:"100%",height:r,overflow:"auto",position:"relative",pointerEvents:f?"none":"auto",border:f?"2px solid #8c8f8e":"2px solid #c0c0c0",boxShadow:"inset -2px -2px 0 #ffffff, \n                        inset 2px 2px 0 #808080"},v),{},{background:"#dcdcdc"}),children:(0,h.jsxs)("div",{style:{position:"absolute",width:"".concat(A,"px"),height:"auto"},children:[(0,h.jsxs)("table",{id:"upward-cutom-table",style:{borderCollapse:"collapse",width:"100%",position:"relative",background:"#dcdcdc"},children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{style:{width:"30px",border:"none",position:"sticky",top:0,zIndex:1,background:"#f0f0f0"}}),I.map((function(e,t){return(0,h.jsx)("th",{style:{width:e.width,borderRight:"1px solid #e2e8f0",position:"sticky",top:0,zIndex:1,background:"#f0f0f0",fontSize:"12px",textAlign:"left",padding:"0px 5px"},children:e.label},t)}))]})}),(0,h.jsx)("tbody",{ref:g,children:null===j||void 0===j?void 0:j.map((function(e,t){return(0,h.jsxs)("tr",{"data-index":t,className:"row ".concat(R===t||B===t?"selected":""),children:[(0,h.jsx)("td",{style:{position:"relative",border:"none",cursor:"pointer",background:R===t?"#0076d":"",padding:0,margin:0},children:(0,h.jsx)("div",{style:{width:"18px",height:"18px",position:"relative",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,h.jsx)("input",{style:{cursor:"pointer",margin:"0px !important",position:"absolute"},readOnly:!0,checked:B===t,type:"checkbox",onClick:function(){x&&(F(t),a&&a(e,null,t,null),z(null))}})})}),I.map((function(n,o){return(0,h.jsx)("td",{className:"td row-".concat(t," col-").concat(o," "),tabIndex:0,onDoubleClick:function(){x&&(B===t?(F(null),a&&a(null,null,t,null)):(F(t),a&&a(e,null,t,null)),z(null))},onClick:function(){z(t)},onKeyDown:function(n){if(s&&s(e,t,n),"ArrowUp"===n.key?z((function(e){var t=Math.max(e-1,-1),n=document.querySelector(".td.row-".concat(t));if(!(t<0))return n&&n.focus(),t;m&&m()})):"ArrowDown"===n.key&&z((function(e){var t=Math.min(e+1,j.length-1),n=document.querySelector(".td.row-".concat(t));return n&&(n.focus(),t<=15)?(y.current.style.overflow="hidden",setTimeout((function(){y.current.style.overflow="auto"}),100),t):t})),"Enter"===n.code||"NumpadEnter"===n.code){if(n.preventDefault(),!x)return;F(t),a&&a(e,null,t,null),z(null)}},style:{border:"none",fontSize:"12px",padding:"0px 5px",cursor:"pointer",height:"20px",userSelect:"none"},children:(0,h.jsx)("input",{readOnly:!0,value:e[o],style:{width:n.width,pointerEvents:"none",border:"none",background:"transparent",userSelect:"none",height:"100%",textAlign:"number"===n.type?"right":"left"}})},o)}))]},t)}))})]}),(0,h.jsx)("style",{children:"\n             #upward-cutom-table tr td{\n               border-right:1px solid #f1f5f9 !important;\n             }\n          \n              #upward-cutom-table tr:nth-child(odd) td {\n                  background-color: #ffffff !important;\n              }\n              #upward-cutom-table tr:nth-child(even) td {\n                  background-color: #f5f5f5 !important;\n              }\n              #upward-cutom-table tr.selected td {\n                  background-color: #0076d7 !important;\n                  color: #ffffff !important;\n                  border-right:1px solid white !important;\n              }\n              \n               #upward-cutom-table tr.selected td input {\n                  color: #ffffff !important;\n              }\n  \n              "})]})})})),m=[],y="",g=function(e){var t=e.column,n=e.query,i=e.getSelectedItem,l=e.onKeyDown,g=(0,u.useState)(!1),b=(0,c.Z)(g,2),w=b[0],j=b[1],k=(0,u.useRef)(null);function Z(){j(!1),m=[]}var S=function(){var e,x,g=(0,u.useState)(!1),b=(0,c.Z)(g,2),j=b[0],S=b[1],I=(0,u.useState)([]),C=(0,c.Z)(I,2),E=C[0],D=C[1],R=(0,a.Z)().executeQueryToClient,z=(0,u.useRef)(null);return(0,u.useEffect)((function(){m.length>0&&(k.current&&(k.current.value=y),D(m))}),[D]),(0,u.useEffect)((function(){var e;E.length>0&&(m=E,null===(e=z.current)||void 0===e||e.setDataFormated(E))}),[E]),w?(0,h.jsxs)("div",{id:"modal-inject",children:[(0,h.jsx)("div",{style:{position:"fixed",top:0,bottom:0,left:0,right:0,background:"transparent",zIndex:"88"},onClick:function(){S(!0),setTimeout((function(){S(!1)}),250)}}),(0,h.jsxs)("div",{style:{background:"#F1F1F1",width:j?"451px":"450px",height:j?"501px":"500px",position:"absolute",zIndex:111111,top:"50%",left:"50%",transform:"translate(-50%,-50%)",boxShadow:"3px 6px 32px -7px rgba(0,0,0,0.75)",boxSizing:"border-box",display:"flex",flexDirection:"column"},children:[(0,h.jsxs)("div",{style:{height:"22px",background:"white",display:"flex",justifyContent:"space-between",padding:"5px",position:"relative",alignItems:"center"},children:[(0,h.jsx)("span",{style:{fontSize:"13px",fontWeight:"bold"},children:"Search"}),(0,h.jsx)("button",{className:"btn-check-exit-modal",style:{padding:"0 5px",borderRadius:"0px",background:"white",color:"black",height:"22px",position:"absolute",top:0,right:0},onClick:function(){Z()},children:(0,h.jsx)(p.Z,{sx:{fontSize:"22px"}})})]}),(0,h.jsx)("div",{style:{padding:"5px"},children:(0,h.jsx)(d.oi,{containerStyle:{width:"100%"},label:{title:"Search : ",style:{fontSize:"12px",fontWeight:"bold",width:"70px",display:"none"}},input:{type:"text",style:{width:"100%"},onKeyDown:function(t){return(e=e||(0,r.Z)((0,o.Z)().mark((function e(t){var r,i,l,c,u;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("NumpadEnter"!==t.code&&"Enter"!==t.code){e.next=7;break}return y=t.currentTarget.value,r=n(t.currentTarget.value),e.next=5,R(r);case 5:i=e.sent,D(i.data.data);case 7:"ArrowDown"===t.code&&((c=document.querySelector(".td.row-0"))&&(u=z.current.getParentElement(),c.focus({preventScroll:!0}),u.style.overflow="hidden",(0,f.D)(100).then((function(){u.style.overflow="auto"}))),null===(l=z.current)||void 0===l||l._setSelectedRow(0));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},inputRef:k,icon:(0,h.jsx)(s.Z,{sx:{fontSize:"18px"}}),onIconClick:function(e){return(x=x||(0,r.Z)((0,o.Z)().mark((function e(t){var r,i,l;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),k.current&&(y=k.current.value),i=n(null===(r=k.current)||void 0===r?void 0:r.value),e.next=5,R(i);case 5:l=e.sent,D(l.data.data);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}})}),(0,h.jsx)("div",{style:{flex:1},children:(0,h.jsx)(v,{columns:t,height:"100%",ref:z,getSelectedItem:i,onKeyDown:l,focusElementOnMaxTop:function(){var e;null===(e=k.current)||void 0===e||e.focus()}})}),(0,h.jsx)("style",{children:"\n          .btn-check-exit-modal:hover{\n            background:red !important;\n            color:white !important;\n          }\n        "})]})]}):(0,h.jsx)(h.Fragment,{})};return{openModal:function(){var e=document.body,t=document.createElement("div");t.id="modal-portal",document.getElementById("modal-portal")&&e.removeChild(document.getElementById("modal-portal")),e.insertBefore(t,document.getElementById("root")),(0,f.D)(100).then((function(){t.innerHTML=x.renderToString((0,h.jsx)(S,{}))})),j(!0),setTimeout((function(){if(k.current){var e=new KeyboardEvent("keydown",{code:"Enter",bubbles:!0});k.current.focus(),k.current.dispatchEvent(e),setTimeout((function(){var e;null===(e=k.current)||void 0===e||e.focus()}),100)}}),100)},closeModal:Z,UpwardTableModalSearch:S}}},70272:function(e,t,n){var o=n(54270),r=n(80184);t.Z=function(e){var t=e.title,n=void 0===t?"":t;return(0,r.jsxs)(o.q,{children:[(0,r.jsx)("title",{children:n}),(0,r.jsx)("link",{rel:"icon",type:"image/png",href:"".concat("/","/logo.png")})]})}},37209:function(e,t,n){n.d(t,{sT:function(){return s},lq:function(){return a},Fz:function(){return u},iA:function(){return l},oi:function(){return c}});var o=n(1413),r=n(72791),i=n(80184);function l(e){var t=e.input,n=e.label,l=e.inputRef,c=e.icon,u=e.iconPosition,a=void 0===u?"end":u,s=e.disableIcon,d=void 0!==s&&s,f=e.onIconClick,p=void 0===f?function(e){}:f,x=e.onChange,h=void 0===x?function(e){}:x,v=e.containerStyle,m=(0,r.useId)(),y=function(e){if(!e)return e;var t=e.split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),t.join(".")},g=function(e){return e.replace(/,/g,"")};return(0,i.jsxs)("div",{style:(0,o.Z)({display:"flex",alignItems:"center",position:"relative"},v),children:[(0,i.jsx)("label",(0,o.Z)((0,o.Z)({},n),{},{htmlFor:m,children:n.title})),c&&"start"===a&&(0,i.jsx)("div",{style:{position:"absolute",left:"8px",zIndex:1},children:c}),(0,i.jsx)("input",(0,o.Z)((0,o.Z)({ref:l,id:m},t),{},{type:"text",style:(0,o.Z)({height:"100%"},t.style),onChange:function(e){!function(e){var t=e.target.value;t=g(t),(""===(t=g(t))||/^-?\d+(,\d{3})*(\.\d*)?$/.test(t))&&(e.target.value=y(t))}(e),h(e)},onBlur:function(e){!function(e){var t=g(e.target.value);t=function(e){return e.includes(".")?1===e.split(".")[1].length?e+"0":e:""===e?"0.00":e+".00"}(t),e.target.value=y(t)}(e)}})),c&&"end"===a&&(0,i.jsx)("div",{onClick:p,style:{position:"absolute",right:"2px",top:"50%",transform:"translateY(-50%)",zIndex:1,cursor:d?"none":"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"white",pointerEvents:d?"none":"auto"},children:c})]})}function c(e){var t=e.input,n=e.label,l=e.inputRef,c=e.icon,u=e.iconPosition,a=void 0===u?"end":u,s=e.disableIcon,d=void 0!==s&&s,f=e.containerStyle,p=e.onIconClick,x=void 0===p?function(e){}:p,h=(0,r.useId)();return(0,i.jsxs)("div",{style:(0,o.Z)({display:"flex",alignItems:"center",position:"relative"},f),children:[(0,i.jsx)("label",(0,o.Z)((0,o.Z)({},n),{},{htmlFor:h,children:n.title})),c&&"start"===a&&(0,i.jsx)("div",{style:{position:"absolute",left:"8px",zIndex:1},children:c}),(0,i.jsx)("input",(0,o.Z)((0,o.Z)({ref:l,id:h},t),{},{style:(0,o.Z)({height:"100%"},t.style)})),c&&"end"===a&&(0,i.jsx)("div",{onClick:x,style:{position:"absolute",right:"2px",top:"50%",transform:"translateY(-50%)",zIndex:1,cursor:d?"none":"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"white",pointerEvents:d?"none":"auto"},children:c})]})}function u(e){var t=e.textarea,n=e.label,l=e._inputRef,c=e.icon,u=e.iconPosition,a=void 0===u?"end":u,s=e.disableIcon,d=void 0!==s&&s,f=e.onIconClick,p=void 0===f?function(e){}:f,x=(0,r.useId)();return(0,i.jsxs)("div",{style:{display:"flex",alignItems:"center",position:"relative"},children:[(0,i.jsx)("label",(0,o.Z)((0,o.Z)({},n),{},{htmlFor:x,children:n.title})),c&&"start"===a&&(0,i.jsx)("div",{style:{position:"absolute",left:"8px",zIndex:1},children:c}),(0,i.jsx)("textarea",(0,o.Z)((0,o.Z)({ref:l,id:x},t),{},{style:(0,o.Z)({height:"100%"},t.style)})),c&&"end"===a&&(0,i.jsx)("div",{onClick:p,style:{position:"absolute",right:"2px",top:"50%",transform:"translateY(-50%)",zIndex:1,cursor:d?"none":"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"white",pointerEvents:d?"none":"auto"},children:c})]})}function a(e){var t=e.select,n=e.label,l=e.selectRef,c=e.datasource,u=void 0===c?[]:c,a=e.values,s=void 0===a?"":a,d=e.display,f=void 0===d?"":d,p=e.containerStyle,x=(0,r.useId)();return(0,i.jsxs)("div",{style:(0,o.Z)({display:"flex",height:"18px",alignItems:"center"},p),children:[(0,i.jsx)("label",(0,o.Z)((0,o.Z)({},n),{},{htmlFor:x,children:n.title})),(0,i.jsx)("select",(0,o.Z)((0,o.Z)({},t),{},{ref:l,className:"select ".concat(t.className),style:(0,o.Z)({height:"18px"},t.style),children:u.map((function(e,t){return(0,i.jsx)("option",{value:e[s],children:e[f]},t)}))}))]})}function s(e){var t=e.buttonRetRef,n=e.button,r=e.tooltipText,l=void 0===r?"":r,c=e.children,u=e.disabled,a=void 0!==u&&u;return(0,i.jsxs)("div",{className:"tooltip",children:[(0,i.jsx)("button",(0,o.Z)((0,o.Z)({disabled:a},n),{},{ref:t,style:(0,o.Z)((0,o.Z)({},n.style),{},{background:a?"#f1f1f1":"transparent"}),className:"tooltip-button",children:c})),!a&&(0,i.jsx)("span",{className:"tooltip-text",children:l})]})}},637:function(e,t,n){n.d(t,{Z:function(){return c}});var o=n(74165),r=n(15861),i=n(72791),l=n(3380);function c(){var e,t=(0,i.useContext)(l.V),n=t.myAxios,c=t.user;return{executeQueryToClient:function(t){return(e=e||(0,r.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.post("/execute-query",{query:t},{headers:{Authorization:"Bearer ".concat(null===c||void 0===c?void 0:c.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}}}}]);
//# sourceMappingURL=8804.15f61406.chunk.js.map