"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[4906],{37209:function(e,n,t){t.d(n,{sT:function(){return s},lq:function(){return c},iA:function(){return l},oi:function(){return u}});var i=t(1413),r=t(72791),o=t(80184);function l(e){var n=e.input,t=e.label,l=e.inputRef,u=e.icon,c=e.iconPosition,s=void 0===c?"end":c,a=e.disableIcon,d=void 0!==a&&a,f=e.onIconClick,v=void 0===f?function(e){}:f,h=e.onChange,p=void 0===h?function(e){}:h,m=(0,r.useId)(),x=function(e){if(!e)return e;var n=e.split(".");return n[0]=n[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),n.join(".")},g=function(e){return e.replace(/,/g,"")};return(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center",position:"relative"},children:[(0,o.jsx)("label",(0,i.Z)((0,i.Z)({},t),{},{htmlFor:m,children:t.title})),u&&"start"===s&&(0,o.jsx)("div",{style:{position:"absolute",left:"8px",zIndex:1},children:u}),(0,o.jsx)("input",(0,i.Z)((0,i.Z)({ref:l,id:m},n),{},{type:"text",style:(0,i.Z)({height:"100%"},n.style),onChange:function(e){!function(e){var n=e.target.value;n=g(n),(""===(n=g(n))||/^-?\d+(,\d{3})*(\.\d*)?$/.test(n))&&(e.target.value=x(n))}(e),p(e)},onBlur:function(e){!function(e){var n=g(e.target.value);n=function(e){return e.includes(".")?1===e.split(".")[1].length?e+"0":e:""===e?"0.00":e+".00"}(n),e.target.value=x(n)}(e)}})),u&&"end"===s&&(0,o.jsx)("div",{onClick:v,style:{position:"absolute",right:"2px",top:"50%",transform:"translateY(-50%)",zIndex:1,cursor:d?"none":"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"white",pointerEvents:d?"none":"auto"},children:u})]})}function u(e){var n=e.input,t=e.label,l=e.inputRef,u=e.icon,c=e.iconPosition,s=void 0===c?"end":c,a=e.disableIcon,d=void 0!==a&&a,f=e.onIconClick,v=void 0===f?function(e){}:f,h=(0,r.useId)();return(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center",position:"relative"},children:[(0,o.jsx)("label",(0,i.Z)((0,i.Z)({},t),{},{htmlFor:h,children:t.title})),u&&"start"===s&&(0,o.jsx)("div",{style:{position:"absolute",left:"8px",zIndex:1},children:u}),(0,o.jsx)("input",(0,i.Z)((0,i.Z)({ref:l,id:h},n),{},{style:(0,i.Z)({height:"100%"},n.style)})),u&&"end"===s&&(0,o.jsx)("div",{onClick:v,style:{position:"absolute",right:"2px",top:"50%",transform:"translateY(-50%)",zIndex:1,cursor:d?"none":"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"white",pointerEvents:d?"none":"auto"},children:u})]})}function c(e){var n=e.select,t=e.label,l=e.selectRef,u=e.datasource,c=void 0===u?[]:u,s=e.values,a=void 0===s?"":s,d=e.display,f=void 0===d?"":d,v=(0,r.useId)();return(0,o.jsxs)("div",{style:{display:"flex",height:"18px",alignItems:"center"},children:[(0,o.jsx)("label",(0,i.Z)((0,i.Z)({},t),{},{htmlFor:v,children:t.title})),(0,o.jsx)("select",(0,i.Z)((0,i.Z)({},n),{},{ref:l,className:"select",style:(0,i.Z)({height:"18px"},n.style),children:c.map((function(e,n){return(0,o.jsx)("option",{value:e[a],children:e[f]},n)}))}))]})}function s(e){var n=e.buttonRetRef,t=e.button,r=e.tooltipText,l=void 0===r?"":r,u=e.children,c=e.disabled,s=void 0!==c&&c;return(0,o.jsxs)("div",{className:"tooltip",children:[(0,o.jsx)("button",(0,i.Z)((0,i.Z)({disabled:s},t),{},{ref:n,style:(0,i.Z)((0,i.Z)({},t.style),{},{background:s?"#f1f1f1":"transparent"}),className:"tooltip-button",children:u})),!s&&(0,o.jsx)("span",{className:"tooltip-text",children:l})]})}},93346:function(e,n,t){t.d(n,{r:function(){return c}});var i=t(93433),r=t(29439),o=t(72791),l=t(16088),u=t(80184),c=(0,o.forwardRef)((function(e,n){var t,c=e.rows,s=e.column,a=e.width,d=e.height,f=e.dataReadOnly,v=e.onSelectionChange,h=void 0===v?function(){}:v,p=e.isMultipleSelect,m=void 0!==p&&p,x=e.freeze,g=void 0!==x&&x,y=e.onKeyDown,b=e.inputsearchselector,w=void 0===b?".search-input-up-on-key-down":b,j=e.isRowSelectable,Z=void 0===j||j,k=e.unSelectable,I=void 0===k?function(){return!1}:k,S=e.isLoading,N=(0,o.useState)([]),D=(0,r.Z)(N,2),C=D[0],R=D[1],E=(0,o.useState)(0),M=(0,r.Z)(E,2),q=M[0],z=M[1],T=(0,o.useRef)(h),L=(0,o.useRef)(y),K=(0,o.useState)(s.filter((function(e){return!e.hide}))),F=(0,r.Z)(K,2),P=F[0],V=F[1],A=(0,o.useState)(null),B=(0,r.Z)(A,2),O=B[0],H=B[1],U=(0,o.useState)([0]),X=(0,r.Z)(U,2),Y=X[0],W=X[1],$=(0,o.useState)(0),G=(0,r.Z)($,2),J=G[0],Q=G[1],_=(0,o.useState)([]),ee=(0,r.Z)(_,2),ne=ee[0],te=ee[1],ie=(0,o.useRef)(null),re=(0,o.useState)(null),oe=(0,r.Z)(re,2),le=oe[0],ue=oe[1];(0,o.useEffect)((function(){var e=function(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,t=[],i=0;i<e.length;i+=n)t.push(e.slice(i,i+n));return t}(c,100);R(e)}),[c]);var ce=function(e,n){n.preventDefault(),n.stopPropagation();var t=n.clientX,r=P[e].width,o=function(n){var o=r+(n.clientX-t),l=(0,i.Z)(P);l[e].width=o>50?o:50,V(l)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",(function e(){document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",e)}))},se=function(e){H(e)},ae=function(){H(null)};return(0,o.useImperativeHandle)(n,(function(){return{resetTableSelected:function(){if(W([0]),Q(0),te([]),c.length>0){var e=document.querySelector(".row-".concat(0));null===e||void 0===e||e.scrollIntoView({block:"end",behavior:"smooth"})}},getSelectedRows:function(){return c.filter((function(e,n){return ne.includes(n)}))},setSelectRows:function(e){te(e)}}})),(0,u.jsx)("div",{style:{display:"flex",justifyContent:"center"},onKeyDown:function(e){if("ArrowDown"===e.key)e.preventDefault(),W((function(e){var n;if(null===e[e.length-1])return[0];if(e[e.length-1]>=c.length-1)return[c.length-1];var t=e[e.length-1]+1,i=document.querySelector(".row-".concat(t));return null===i||void 0===i||null===(n=i.querySelector("input"))||void 0===n||n.focus(),null===i||void 0===i||i.scrollIntoView({block:"end",behavior:"smooth"}),[t]}));else if("ArrowUp"===e.key){if(e.preventDefault(),0===Y[Y.length-1]){var n=document.querySelector(w);if(n&&"INPUT"===n.tagName)null===n||void 0===n||n.focus();else if(n&&"DIV"===n.tagName){var t=document.querySelector("".concat(w," input"));null===t||void 0===t||t.focus()}}W((function(e){var n;if(0===e[e.length-1])return[0];var t=e[e.length-1]-1,i=document.querySelector(".row-".concat(t));return null===i||void 0===i||i.scrollIntoView({block:"end",behavior:"smooth"}),null===i||void 0===i||null===(n=i.querySelector("input"))||void 0===n||n.focus(),[t]}))}},children:(0,u.jsxs)("div",{children:[(0,u.jsxs)("div",{className:"table-frame-color",children:[(0,u.jsx)("div",{style:{display:"flex",flexDirection:"column",width:"".concat(a-10,"px        "),height:"".concat(d-135,"px"),minHeight:"270px"},className:"table-frame",children:(0,u.jsx)("div",{className:"table-panel",children:(0,u.jsxs)("div",{ref:ie,className:"grid-container ",tabIndex:-1,children:[(0,u.jsx)("div",{className:"grid-row grid-header",style:{position:"sticky",zIndex:"10",top:"-1px",background:"white"},children:P.map((function(e,n){return(0,u.jsxs)("div",{className:"grid-cell header-cell ".concat(O===n?"highlight-column":""),style:{width:e.width,height:"20px"},children:[(0,u.jsx)("input",{style:{fontWeight:"bold"},defaultValue:e.headerName,readOnly:!0,onChange:function(e){}}),(0,u.jsx)("div",{className:"resize-handle",onMouseDown:function(e){return ce(n,e)},onMouseEnter:function(e){e.preventDefault(),se(n)},onMouseLeave:function(e){e.preventDefault(),ae()}})]},n)}))}),null===(t=C[q])||void 0===t?void 0:t.map((function(e,n){return(0,u.jsx)("div",{className:"grid-row row-".concat(n),onClick:function(e){return function(e,n){if(m)if(n.shiftKey&&null!==J){for(var t=Math.min(J,e),r=Math.max(J,e),o=[],l=t;l<=r;l++)Y.includes(l)||o.push(l);var u=[].concat((0,i.Z)(ne),o);W([].concat((0,i.Z)(Y),o));var s=function(e){var n=e.map((function(e,n){return I(e)?null:{idx:n,data:e}})).filter((function(e){return null!==e})),t=n.map((function(e){return e.data}));return{newSelectedRowsFiltered:n.map((function(e){return e.idx})),data:t}}(c.filter((function(e,n){return u.includes(n)}))),a=s.newSelectedRowsFiltered;s.data,te(a)}else if(n.ctrlKey||n.metaKey)if(Y.includes(e)&&!g){W(Y.filter((function(n){return n!==e}))),te((function(n){return n=n.filter((function(n){return n!==e})),n}));var d=ne.filter((function(n){return n!==e}));c.filter((function(e,n){return d.includes(n)})),te(d)}else{W([].concat((0,i.Z)(Y),[e])),te((function(n){return n.push(e),n}));var f=[].concat((0,i.Z)(ne),[e]);c.filter((function(e,n){return f.includes(n)})),te(f)}else W([e]);else W([e]);Q(e)}(n,e)},onDoubleClick:function(e){le&&(clearTimeout(le),ue(null));var t=setTimeout((function(){!function(e,n){var t=c[e];if(!I(t)&&Z){var r=[];if(r=m?[].concat((0,i.Z)(ne),(0,i.Z)(Y)):[e],ne.includes(e)&&!g)return r=ne.filter((function(n){return n!==e})),te(r),void T.current([],e);te(r),T.current([t],e)}}(n)}),200);ue(t)},onKeyDown:function(e){le&&(clearTimeout(le),ue(null));var n=setTimeout((function(){!function(e){if(e.stopPropagation(),"Enter"===e.key||"NumpadEnter"===e.key){if(e.preventDefault(),!Z)return;var n=[],t=Y[Y.length-1];n=m?[].concat((0,i.Z)(ne),(0,i.Z)(Y)):[t];var r=c[n[n.length-1]];if(I(r))return;if(ne.includes(t)&&!g)return n=ne.filter((function(e){return e!==t})),te(n),void T.current([],t);te(n),T.current([r],t)}else if("Delete"===e.key||"Backspace"===e.key){if(!Z)return;var o=Y[Y.length-1],l=c.filter((function(e,n){return Y.includes(n)}));null!==L&&void 0!==L&&L.current&&(null===L||void 0===L||L.current(l,e.key,o))}}(e)}),200);ue(n)},children:P.map((function(t,i){return(0,u.jsxs)("div",{style:{width:t.width},className:"grid-cell ".concat(O===i?"highlight-column":""),children:[(0,u.jsx)("input",{value:e[t.field],onChange:function(e){},readOnly:f,className:"".concat(Y.includes(n)?"selected-row":""," ").concat(ne.includes(n)?"selected-items":"","\n                          ").concat("number"===t.type?"number":"text","\n                          ")}),(0,u.jsx)("div",{className:"resize-handle",onMouseDown:function(e){e.preventDefault(),ce(i,e)},onMouseEnter:function(e){e.preventDefault(),se(i)},onMouseLeave:function(e){e.preventDefault(),ae()}})]},i)}))},n)}))]})})}),S&&(0,u.jsx)("div",{className:"table-loading",children:(0,u.jsx)("div",{className:"loader"})})]}),(0,u.jsxs)("div",{className:"table-panel-footer",children:[(0,u.jsxs)("div",{children:["Records : ",c.length]}),(0,u.jsx)("div",{children:(0,u.jsx)(l.Z,{count:C.length,onChange:function(e,n){z(n-1)}})})]})]})})}))}}]);
//# sourceMappingURL=4906.04d861ec.chunk.js.map