"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[6915],{37209:function(e,n,t){t.d(n,{sT:function(){return a},lq:function(){return s},Fz:function(){return c},iA:function(){return l},oi:function(){return u}});var i=t(1413),o=t(72791),r=t(80184);function l(e){var n=e.input,t=e.label,l=e.inputRef,u=e.icon,c=e.iconPosition,s=void 0===c?"end":c,a=e.disableIcon,d=void 0!==a&&a,f=e.onIconClick,v=void 0===f?function(e){}:f,h=e.onChange,p=void 0===h?function(e){}:h,x=(0,o.useId)(),m=function(e){if(!e)return e;var n=e.split(".");return n[0]=n[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),n.join(".")},g=function(e){return e.replace(/,/g,"")};return(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",position:"relative"},children:[(0,r.jsx)("label",(0,i.Z)((0,i.Z)({},t),{},{htmlFor:x,children:t.title})),u&&"start"===s&&(0,r.jsx)("div",{style:{position:"absolute",left:"8px",zIndex:1},children:u}),(0,r.jsx)("input",(0,i.Z)((0,i.Z)({ref:l,id:x},n),{},{type:"text",style:(0,i.Z)({height:"100%"},n.style),onChange:function(e){!function(e){var n=e.target.value;n=g(n),(""===(n=g(n))||/^-?\d+(,\d{3})*(\.\d*)?$/.test(n))&&(e.target.value=m(n))}(e),p(e)},onBlur:function(e){!function(e){var n=g(e.target.value);n=function(e){return e.includes(".")?1===e.split(".")[1].length?e+"0":e:""===e?"0.00":e+".00"}(n),e.target.value=m(n)}(e)}})),u&&"end"===s&&(0,r.jsx)("div",{onClick:v,style:{position:"absolute",right:"2px",top:"50%",transform:"translateY(-50%)",zIndex:1,cursor:d?"none":"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"white",pointerEvents:d?"none":"auto"},children:u})]})}function u(e){var n=e.input,t=e.label,l=e.inputRef,u=e.icon,c=e.iconPosition,s=void 0===c?"end":c,a=e.disableIcon,d=void 0!==a&&a,f=e.onIconClick,v=void 0===f?function(e){}:f,h=(0,o.useId)();return(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",position:"relative"},children:[(0,r.jsx)("label",(0,i.Z)((0,i.Z)({},t),{},{htmlFor:h,children:t.title})),u&&"start"===s&&(0,r.jsx)("div",{style:{position:"absolute",left:"8px",zIndex:1},children:u}),(0,r.jsx)("input",(0,i.Z)((0,i.Z)({ref:l,id:h},n),{},{style:(0,i.Z)({height:"100%"},n.style)})),u&&"end"===s&&(0,r.jsx)("div",{onClick:v,style:{position:"absolute",right:"2px",top:"50%",transform:"translateY(-50%)",zIndex:1,cursor:d?"none":"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"white",pointerEvents:d?"none":"auto"},children:u})]})}function c(e){var n=e.textarea,t=e.label,l=e._inputRef,u=e.icon,c=e.iconPosition,s=void 0===c?"end":c,a=e.disableIcon,d=void 0!==a&&a,f=e.onIconClick,v=void 0===f?function(e){}:f,h=(0,o.useId)();return(0,r.jsxs)("div",{style:{display:"flex",alignItems:"center",position:"relative"},children:[(0,r.jsx)("label",(0,i.Z)((0,i.Z)({},t),{},{htmlFor:h,children:t.title})),u&&"start"===s&&(0,r.jsx)("div",{style:{position:"absolute",left:"8px",zIndex:1},children:u}),(0,r.jsx)("textarea",(0,i.Z)((0,i.Z)({ref:l,id:h},n),{},{style:(0,i.Z)({height:"100%"},n.style)})),u&&"end"===s&&(0,r.jsx)("div",{onClick:v,style:{position:"absolute",right:"2px",top:"50%",transform:"translateY(-50%)",zIndex:1,cursor:d?"none":"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"white",pointerEvents:d?"none":"auto"},children:u})]})}function s(e){var n=e.select,t=e.label,l=e.selectRef,u=e.datasource,c=void 0===u?[]:u,s=e.values,a=void 0===s?"":s,d=e.display,f=void 0===d?"":d,v=(0,o.useId)();return(0,r.jsxs)("div",{style:{display:"flex",height:"18px",alignItems:"center"},children:[(0,r.jsx)("label",(0,i.Z)((0,i.Z)({},t),{},{htmlFor:v,children:t.title})),(0,r.jsx)("select",(0,i.Z)((0,i.Z)({},n),{},{ref:l,className:"select ".concat(n.className),style:(0,i.Z)({height:"18px"},n.style),children:c.map((function(e,n){return(0,r.jsx)("option",{value:e[a],children:e[f]},n)}))}))]})}function a(e){var n=e.buttonRetRef,t=e.button,o=e.tooltipText,l=void 0===o?"":o,u=e.children,c=e.disabled,s=void 0!==c&&c;return(0,r.jsxs)("div",{className:"tooltip",children:[(0,r.jsx)("button",(0,i.Z)((0,i.Z)({disabled:s},t),{},{ref:n,style:(0,i.Z)((0,i.Z)({},t.style),{},{background:s?"#f1f1f1":"transparent"}),className:"tooltip-button",children:u})),!s&&(0,r.jsx)("span",{className:"tooltip-text",children:l})]})}},2548:function(e,n,t){t.d(n,{r:function(){return c}});var i=t(93433),o=t(29439),r=t(72791),l=(t(71268),t(16088)),u=t(80184),c=(0,r.forwardRef)((function(e,n){var t,c=e.rows,s=e.column,a=e.width,d=e.height,f=e.dataReadOnly,v=e.onSelectionChange,h=void 0===v?function(){}:v,p=e.isMultipleSelect,x=void 0!==p&&p,m=e.freeze,g=void 0!==m&&m,y=e.onKeyDown,b=e.inputsearchselector,j=void 0===b?".search-input-up-on-key-down":b,w=e.isRowSelectable,Z=void 0===w||w,k=e.unSelectable,I=void 0===k?function(){return!1}:k,N=e.isLoading,S=e.onRightClick,C=(0,r.useState)([]),D=(0,o.Z)(C,2),R=D[0],E=D[1],z=(0,r.useState)(0),M=(0,o.Z)(z,2),q=M[0],T=M[1],F=(0,r.useRef)(h),L=(0,r.useRef)(y),K=(0,r.useState)(s.filter((function(e){return!e.hide}))),P=(0,o.Z)(K,2),V=P[0],A=P[1],B=(0,r.useState)(null),O=(0,o.Z)(B,2),Y=O[0],H=O[1],U=(0,r.useState)([0]),X=(0,o.Z)(U,2),W=X[0],$=X[1],_=(0,r.useState)(0),G=(0,o.Z)(_,2),J=G[0],Q=G[1],ee=(0,r.useState)([]),ne=(0,o.Z)(ee,2),te=ne[0],ie=ne[1],oe=(0,r.useRef)(null),re=(0,r.useState)(null),le=(0,o.Z)(re,2),ue=le[0],ce=le[1];(0,r.useEffect)((function(){var e=function(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,t=[],i=0;i<e.length;i+=n)t.push(e.slice(i,i+n));return t}(c,100);E(e)}),[c]);var se=function(e,n){n.preventDefault(),n.stopPropagation();var t=n.clientX,o=V[e].width,r=function(n){var r=o+(n.clientX-t),l=(0,i.Z)(V);l[e].width=r>50?r:50,A(l)};document.addEventListener("mousemove",r),document.addEventListener("mouseup",(function e(){document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",e)}))},ae=function(e){H(e)},de=function(){H(null)};(0,r.useImperativeHandle)(n,(function(){return{resetTableSelected:function(){if($([0]),Q(0),ie([]),c.length>0){var e=document.querySelector(".row-".concat(0));null===e||void 0===e||e.scrollIntoView({block:"end",behavior:"smooth"})}},getSelectedRows:function(){return c.filter((function(e,n){return te.includes(n)}))},setSelectRows:function(e){ie(e)}}}));return(0,u.jsx)("div",{style:{display:"flex",justifyContent:"center"},onKeyDown:function(e){if("ArrowDown"===e.key)e.preventDefault(),$((function(e){var n;if(null===e[e.length-1])return[0];if(e[e.length-1]>=c.length-1)return[c.length-1];var t=e[e.length-1]+1,i=document.querySelector(".row-".concat(t));return null===i||void 0===i||null===(n=i.querySelector("input"))||void 0===n||n.focus(),null===i||void 0===i||i.scrollIntoView({block:"end",behavior:"smooth"}),[t]}));else if("ArrowUp"===e.key){if(e.preventDefault(),0===W[W.length-1]){var n=document.querySelector(j);if(n&&"INPUT"===n.tagName)null===n||void 0===n||n.focus();else if(n&&"DIV"===n.tagName){var t=document.querySelector("".concat(j," input"));null===t||void 0===t||t.focus()}}$((function(e){var n;if(0===e[e.length-1])return[0];var t=e[e.length-1]-1,i=document.querySelector(".row-".concat(t));return null===i||void 0===i||i.scrollIntoView({block:"end",behavior:"smooth"}),null===i||void 0===i||null===(n=i.querySelector("input"))||void 0===n||n.focus(),[t]}))}},children:(0,u.jsxs)("div",{children:[(0,u.jsxs)("div",{className:"table-frame-color",children:[(0,u.jsx)("div",{style:{display:"flex",flexDirection:"column",width:"".concat(a-10,"px        "),height:"".concat(d-135,"px"),minHeight:"270px"},className:"table-frame",children:(0,u.jsx)("div",{className:"table-panel",children:(0,u.jsxs)("div",{ref:oe,className:"grid-container ",tabIndex:-1,children:[(0,u.jsx)("div",{className:"grid-row grid-header",style:{position:"sticky",zIndex:"10",top:"-1px",background:"white"},children:V.map((function(e,n){return(0,u.jsxs)("div",{className:"grid-cell header-cell ".concat(Y===n?"highlight-column":""),style:{width:e.width,height:"20px"},children:[(0,u.jsx)("input",{style:{fontWeight:"bold"},defaultValue:e.headerName,readOnly:!0,onChange:function(e){}}),(0,u.jsx)("div",{className:"resize-handle",onMouseDown:function(e){return se(n,e)},onMouseEnter:function(e){e.preventDefault(),ae(n)},onMouseLeave:function(e){e.preventDefault(),de()}})]},n)}))}),null===(t=R[q])||void 0===t?void 0:t.map((function(e,n){return(0,u.jsx)("div",{className:"grid-row row-".concat(n),onClick:function(e){return function(e,n){if(x)if(n.shiftKey&&null!==J){for(var t=Math.min(J,e),o=Math.max(J,e),r=[],l=t;l<=o;l++)W.includes(l)||r.push(l);var u=[].concat((0,i.Z)(te),r);$([].concat((0,i.Z)(W),r));var s=function(e){var n=e.map((function(e,n){return I(e)?null:{idx:n,data:e}})).filter((function(e){return null!==e})),t=n.map((function(e){return e.data}));return{newSelectedRowsFiltered:n.map((function(e){return e.idx})),data:t}}(c.filter((function(e,n){return u.includes(n)}))),a=s.newSelectedRowsFiltered;s.data,ie(a)}else if(n.ctrlKey||n.metaKey)if(W.includes(e)&&!g){$(W.filter((function(n){return n!==e}))),ie((function(n){return n=n.filter((function(n){return n!==e})),n}));var d=te.filter((function(n){return n!==e}));c.filter((function(e,n){return d.includes(n)})),ie(d)}else{$([].concat((0,i.Z)(W),[e])),ie((function(n){return n.push(e),n}));var f=[].concat((0,i.Z)(te),[e]);c.filter((function(e,n){return f.includes(n)})),ie(f)}else $([e]);else $([e]);Q(e)}(n,e)},onDoubleClick:function(e){ue&&(clearTimeout(ue),ce(null));var t=setTimeout((function(){!function(e,n){var t=c[e];if(!I(t)&&Z){var o=[];if(o=x?[].concat((0,i.Z)(te),(0,i.Z)(W)):[e],te.includes(e)&&!g)return o=te.filter((function(n){return n!==e})),ie(o),void F.current([],e);ie(o),F.current([t],e)}}(n)}),200);ce(t)},onKeyDown:function(e){ue&&(clearTimeout(ue),ce(null));var n=setTimeout((function(){!function(e){if(e.stopPropagation(),"Enter"===e.key||"NumpadEnter"===e.key){if(e.preventDefault(),!Z)return;var n=[],t=W[W.length-1];n=x?[].concat((0,i.Z)(te),(0,i.Z)(W)):[t];var o=c[n[n.length-1]];if(I(o))return;if(te.includes(t)&&!g)return n=te.filter((function(e){return e!==t})),ie(n),void F.current([],t);ie(n),F.current([o],t)}else if("Delete"===e.key||"Backspace"===e.key){if(!Z)return;var r=W[W.length-1],l=c.filter((function(e,n){return W.includes(n)}));null!==L&&void 0!==L&&L.current&&(null===L||void 0===L||L.current(l,e.key,r))}}(e)}),200);ce(n)},onContextMenu:function(e){return function(e,n){e.preventDefault();var t=c[n];S&&S(t,e)}(e,n)},children:V.map((function(t,i){return(0,u.jsxs)("div",{style:{width:t.width},className:"grid-cell ".concat(Y===i?"highlight-column":""),children:[(0,u.jsx)("input",{value:e[t.field],onChange:function(e){},readOnly:f,className:"".concat(W.includes(n)?"selected-row":""," ").concat(te.includes(n)?"selected-items":"","\n                          ").concat("number"===t.type?"number":"text","\n                          ")}),(0,u.jsx)("div",{className:"resize-handle",onMouseDown:function(e){e.preventDefault(),se(i,e)},onMouseEnter:function(e){e.preventDefault(),ae(i)},onMouseLeave:function(e){e.preventDefault(),de()}})]},i)}))},n)}))]})})}),N&&(0,u.jsx)("div",{className:"table-loading",children:(0,u.jsx)("div",{className:"loader"})})]}),(0,u.jsxs)("div",{className:"table-panel-footer",children:[(0,u.jsxs)("div",{children:["Records : ",c.length]}),(0,u.jsx)("div",{children:(0,u.jsx)(l.Z,{count:R.length,onChange:function(e,n){T(n-1)}})})]})]})})}))},71268:function(){}}]);
//# sourceMappingURL=6915.4f632df3.chunk.js.map