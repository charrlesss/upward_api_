"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[6439],{13784:function(t,e,n){n.d(e,{Z:function(){return c}});var a=n(1413),o=n(45987),r=n(71652),i=n(48193),d=n(93777),l=n(80184),s=["label","name","onChange","value","onKeyDown","inputRef","datePickerRef","fullWidth","textField","minWidth"];function c(t){var e=t.label,n=t.name,c=t.onChange,u=t.value,p=t.onKeyDown,h=t.inputRef,g=t.datePickerRef,f=t.fullWidth,x=t.textField,m=t.minWidth,y=void 0===m?"200px":m,v=(0,o.Z)(t,s);return(0,l.jsx)(r._,{dateAdapter:i.H,children:(0,l.jsx)(d.M,(0,a.Z)({floatingLabelStyle:{color:"black"},value:u,onChange:c,ref:g,slotProps:{textField:(0,a.Z)({size:"small",label:e,name:n,onKeyDown:p,inputRef:h,fullWidth:f},x)},InputLabelProps:{sx:{color:"black"}},sx:{minWidth:y,fieldset:{borderColor:"black"},".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}},v))})}},23508:function(t,e,n){n.d(e,{bq:function(){return d}});var a,o=n(74165),r=n(15861);function i(t){var e=t.data,n=t.column,a=t.beforeArrangeData,o=t.adjustMaxHeight,r=t.fontSize,i=void 0===r?"11px":r,d=t.summaryHeight,l=void 0===d?0:d,s=[],c=0,u=[],p=document.querySelector(".content").getBoundingClientRect().height-o;return e.forEach((function(t,o){t=a(t);var r=document.querySelector(".content"),d=document.createElement("table"),h=d.insertRow();t.summaryReport&&p-c<=l+20&&(c+=p-c),n.forEach((function(e){var n=h.insertCell();d.style.visibility="hidden",d.style.width="100%",d.style.fontSize=i,function(t,e,n,a,o){t.style.width=n,t.textContent=e,a.appendChild(o)}(n,t[e.datakey],e.width,r,d)})),c+=h.getBoundingClientRect().height,r.removeChild(d),u.push(t),(c>=p||o===e.length-1&&c<p)&&(s.push(u),c=0,u=[])})),s}var d=function(t){return(a=a||(0,r.Z)((0,o.Z)().mark((function t(e){var n,a,r,d,l,s,c,u;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.data,a=e.column,r=e.beforeArrangeData,d=e.adjustMaxHeight,l=e.cb,s=e.fontSize,c=void 0===s?"11px":s,u=e.summaryHeight,void 0!==n){t.next=3;break}return t.abrupt("return",[]);case 3:if(!l){t.next=5;break}return t.abrupt("return",l({data:n,column:a,beforeArrangeData:r,adjustMaxHeight:d}));case 5:return t.abrupt("return",i({data:n,column:a,beforeArrangeData:r,adjustMaxHeight:d,fontSize:c,summaryHeight:u}));case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}},36549:function(t,e,n){n.r(e),n.d(e,{default:function(){return E},reducer:function(){return k}});var a=n(74165),o=n(15861),r=n(4942),i=n(1413),d=n(72791),l=n(27391),s=n(64554),c=n(68096),u=n(94925),p=n(58406),h=n(23786),g=n(91933),f=n(3380),x=n(13784),m=n(39709),y=n(48193),v=n(71652),b=n(93777),I=n(71012),S=n(23508),Z=n(16386),j=n(80184),w={dateFormat:"Monthly",date:new Date,sub_acct:"All",title:""},k=function(t,e){return"UPDATE_FIELD"===e.type?(0,i.Z)((0,i.Z)({},t),{},(0,r.Z)({},e.field,e.value)):t},P=[{groupHeader:"",groupId:"code"},{groupHeader:"",groupId:"title"},{groupHeader:"PREVIOUS BALANCE",groupId:"prev-bal"},{groupHeader:"TRANSACTION",groupId:"transaction"},{groupHeader:"ENDING",groupId:"ending"}],L=[{groupId:"code",datakey:"Code",header:"Acct No.",width:"100px"},{groupId:"title",datakey:"Title",header:"Account Name",width:"250px"},{groupId:"prev-bal",datakey:"PrevDebit",header:"Debit",total:!0,type:"number",width:"100px"},{groupId:"prev-bal",datakey:"PrevCredit",header:"Credit",total:!0,type:"number",width:"100px"},{groupId:"prev-bal",datakey:"PrevBalance",header:"Balance",total:!0,type:"number",width:"100px"},{groupId:"transaction",datakey:"CurrDebit",header:"Debit",total:!0,type:"number",width:"100px"},{groupId:"transaction",datakey:"CurrCredit",header:"Credit",total:!0,type:"number",width:"100px"},{groupId:"ending",datakey:"TotalBalance",header:"Balance",total:!0,type:"number",width:"100px"}];function A(t,e){return"".concat("UMIS"===e?"UPWARD MANAGEMENT INSURANCE SERVICES":"UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC.","\n").concat(t.dateFormat," Trial Balance (").concat(function(t){var e="";"Daily"===t.dateFormat?e=t.date.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"Monthly"===t.dateFormat&&(e=t.date.toLocaleDateString("en-US",{year:"numeric",month:"long"}));return e.toString()}(t),")")}function D(t){var e,n=t.state,I=t.dispatch,S=(0,d.useRef)(null),Z=(0,d.useContext)(f.V),w=Z.myAxios,k=Z.user,P=(0,g.useQuery)({queryKey:"sub-accounts",queryFn:function(){return(e=e||(0,o.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.get("/reports/accounting/get-sub-account-acronym",{headers:{Authorization:"Bearer ".concat(null===k||void 0===k?void 0:k.accessToken)}});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}}),L=P.data,D=P.isLoading,E=function(t){var e=t.target,a=e.name,o=e.value;I({type:"UPDATE_FIELD",field:a,value:o}),I({type:"UPDATE_FIELD",field:"title",value:A((0,i.Z)((0,i.Z)({},n),{},(0,r.Z)({},a,o)),null===k||void 0===k?void 0:k.department)})};return(0,j.jsxs)("div",{style:{padding:"10px"},children:[(0,j.jsx)(l.Z,{label:"Title",fullWidth:!0,name:"title",value:n.title,onChange:E,rows:6,multiline:!0,InputProps:{style:{height:"140px",fontSize:"12px"}},sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,j.jsxs)(s.Z,{sx:function(t){return(0,r.Z)({height:"100%",display:"grid",gridTemplateColumns:"repeat(1,1fr)",gap:"10px",margin:"10px 0"},t.breakpoints.down("sm"),{gridTemplateColumns:"repeat(1,1fr)"})},children:[(0,j.jsxs)(c.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,j.jsx)(u.Z,{id:"date_format",children:"Report"}),(0,j.jsxs)(p.Z,{labelId:"date_format",value:n.dateFormat,label:"Report",name:"dateFormat",onChange:E,sx:{height:"27px",fontSize:"14px"},children:[(0,j.jsx)(h.Z,{value:"Daily",children:"Daily"}),(0,j.jsx)(h.Z,{value:"Monthly",children:"Monthly"})]})]}),D?(0,j.jsx)(m.Z,{loading:D}):(0,j.jsxs)(c.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,j.jsx)(u.Z,{id:"sub_account_id",children:"Sub Account"}),(0,j.jsxs)(p.Z,{labelId:"sub_account_id",value:n.sub_acct,label:"Sub Account",name:"sub_acct",onChange:E,sx:{height:"27px",fontSize:"14px"},children:[(0,j.jsx)(h.Z,{value:"All",children:"All"}),null===L||void 0===L?void 0:L.data.sub_account.map((function(t,e){return(0,j.jsx)(h.Z,{value:t.Acronym,children:t.Acronym},e)}))]})]}),"Monthly"===n.dateFormat&&(0,j.jsx)(v._,{dateAdapter:y.H,children:(0,j.jsx)(b.M,{sx:{width:"100%",".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},slotProps:{textField:{size:"small",name:"",InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}},label:"Date",views:["month","year"],value:n.date,onChange:function(t){I({type:"UPDATE_FIELD",field:"date",value:t}),n.date=t,I({type:"UPDATE_FIELD",field:"title",value:A(n,null===k||void 0===k?void 0:k.department)})}})}),"Daily"===n.dateFormat&&(0,j.jsx)(x.Z,{fullWidth:!0,label:"Date From",onChange:function(t){I({type:"UPDATE_FIELD",field:"date",value:t}),n.date=t,I({type:"UPDATE_FIELD",field:"title",value:A(n,null===k||void 0===k?void 0:k.department)})},value:new Date(n.date),onKeyDown:function(t){if("Enter"===t.code||"NumpadEnter"===t.code)var e=setTimeout((function(){var t,n;null===(t=S.current)||void 0===t||null===(n=t.querySelector("button"))||void 0===n||n.click(),clearTimeout(e)}),150)},datePickerRef:S,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}})]})]})}function E(){var t,e=(0,d.useContext)(f.V),n=e.user,r=e.myAxios;return w.title=A(w,null===n||void 0===n?void 0:n.department),(0,j.jsx)(I.ZP,{column:L,initialState:w,Setting:function(t,e){return(0,j.jsx)(D,{state:t,dispatch:e})},onReportSubmit:function(e,i,d){return(t=t||(0,o.Z)((0,a.Z)().mark((function t(e,o,i){var d,l;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.post("/reports/accounting/trial-balance-report",i,{headers:{Authorization:"Bearer ".concat(null===n||void 0===n?void 0:n.accessToken)}});case 2:return d=t.sent,t.next=5,d.data;case 5:l=t.sent,(0,S.bq)({data:l.report,column:L,beforeArrangeData:function(t){var e=L.filter((function(t){return"number"===t.type})).map((function(t){return t.datakey}));return e.forEach((function(e){t.hasOwnProperty(e)&&(t[e]=(0,I.pw)(parseFloat(parseFloat(t[e].toString()).toString().replace(/,/g,""))))})),t},adjustMaxHeight:250}).then((function(t){e(t),o(!1)}));case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)},scaleDefaultValue:90,drawTable:function(t,e){return t.map((function(n,a){return(0,j.jsxs)("div",{className:"page out-page",children:[(0,j.jsx)("div",{className:"header",style:{height:"50px"}}),(0,j.jsx)("div",{className:"content",children:(0,j.jsxs)("table",{children:[(0,j.jsxs)("thead",{children:[e.title.split("\n").map((function(t,e){return(0,j.jsx)("tr",{children:(0,j.jsx)("th",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"left"},colSpan:L.length,children:t})},e)})),(0,j.jsx)("tr",{style:{height:"40px"}}),(0,j.jsx)("tr",{children:P.map((function(t,e){var n=L.filter((function(e){return e.groupId===t.groupId}));return(0,j.jsx)("th",{colSpan:n.length,style:{fontSize:"12.5px",fontWeight:"bold",textAlign:"center"},children:t.groupHeader},e)}))}),(0,j.jsx)("tr",{children:L.map((function(e,n){return(0,j.jsx)("th",{onDoubleClick:function(n){return(0,I.PE)(n,e.datakey,t)},style:{width:e.width,fontSize:"12px",fontWeight:"bold",borderBottom:"1px solid black",textAlign:"Code"===e.datakey||"Title"===e.datakey?"left":"right"},children:e.header},n)}))})]}),(0,j.jsxs)("tbody",{children:[(0,j.jsx)("tr",{style:{height:"10px"}}),n.map((function(t,e){return(0,j.jsx)("tr",{children:L.map((function(n,o){return(0,j.jsx)("td",{onClick:I.mp,className:"editable not-looking page-".concat(a,"  row-").concat(e,"_col-").concat(o),style:{fontSize:"11px",fontWeight:"500",width:"".concat(n.width," !important"),textAlign:"AssuredName"===n.datakey||"Mortgagee"===n.datakey?"center":n.total||"InsuredValue"===n.datakey?"right":"left"},children:t[n.datakey]},o)}))},e)})),(0,j.jsx)("tr",{style:{height:"10px"}})]}),(0,j.jsx)("tfoot",{children:a===t.length-1&&(0,j.jsxs)(d.Fragment,{children:[(0,j.jsx)("tr",{style:{height:"8px",borderTop:"1px solid black"}}),(0,j.jsxs)("tr",{children:[(0,j.jsxs)("td",{style:{fontWeight:"bold",fontSize:"11px"},colSpan:2,children:["No. of Records: ",t.flat().length-1]}),L.map((function(e,n){if(!e.total)return n<2?(0,j.jsx)(d.Fragment,{},n):(0,j.jsx)("td",{},n);var a=t.flat().reduce((function(t,n){var a;return t+parseFloat(null===(a=n[e.datakey])||void 0===a?void 0:a.replace(/,/g,""))}),0);return(0,j.jsx)("td",{style:{fontWeight:"bold",textAlign:"right",fontSize:"11px"},children:isNaN(a)?"0":(0,I.pw)(a)},n)}))]})]})})]})}),(0,j.jsxs)("div",{className:"footer",style:{height:"50px",display:"flex",justifyContent:"space-between"},children:[(0,j.jsx)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:(0,Z.Z)(new Date,"dd/MM/yyyy")}),(0,j.jsxs)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:["Page ",a+1," of ",t.length]})]})]},a)}))},pageHeight:"14in",pageWidth:"10.5in",addHeaderGroup:(0,j.jsx)("tr",{children:P.map((function(t,e){var n=L.filter((function(e){return e.groupId===t.groupId}));return(0,j.jsx)("th",{colSpan:n.length,style:{fontSize:"12.5px",fontWeight:"bold",textAlign:"center"},children:t.groupHeader},e)}))})})}},39709:function(t,e,n){n.d(e,{Z:function(){return I}});var a=n(4942),o=n(63366),r=n(87462),i=n(72791),d=n(14036),l=n(67384),s=n(94419),c=n(66934),u=n(31402),p=n(36151),h=n(13239),g=n(21217);function f(t){return(0,g.Z)("MuiLoadingButton",t)}var x=(0,n(75878).Z)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),m=n(80184),y=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],v=(0,c.ZP)(p.Z,{shouldForwardProp:function(t){return function(t){return"ownerState"!==t&&"theme"!==t&&"sx"!==t&&"as"!==t&&"classes"!==t}(t)||"classes"===t},name:"MuiLoadingButton",slot:"Root",overridesResolver:function(t,e){return[e.root,e.startIconLoadingStart&&(0,a.Z)({},"& .".concat(x.startIconLoadingStart),e.startIconLoadingStart),e.endIconLoadingEnd&&(0,a.Z)({},"& .".concat(x.endIconLoadingEnd),e.endIconLoadingEnd)]}})((function(t){var e=t.ownerState,n=t.theme;return(0,r.Z)((0,a.Z)({},"& .".concat(x.startIconLoadingStart,", & .").concat(x.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0}),"center"===e.loadingPosition&&(0,a.Z)({transition:n.transitions.create(["background-color","box-shadow","border-color"],{duration:n.transitions.duration.short})},"&.".concat(x.loading),{color:"transparent"}),"start"===e.loadingPosition&&e.fullWidth&&(0,a.Z)({},"& .".concat(x.startIconLoadingStart,", & .").concat(x.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginRight:-8}),"end"===e.loadingPosition&&e.fullWidth&&(0,a.Z)({},"& .".concat(x.startIconLoadingStart,", & .").concat(x.endIconLoadingEnd),{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0,marginLeft:-8}))})),b=(0,c.ZP)("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:function(t,e){var n=t.ownerState;return[e.loadingIndicator,e["loadingIndicator".concat((0,d.Z)(n.loadingPosition))]]}})((function(t){var e=t.theme,n=t.ownerState;return(0,r.Z)({position:"absolute",visibility:"visible",display:"flex"},"start"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{left:"small"===n.size?10:14},"start"===n.loadingPosition&&"text"===n.variant&&{left:6},"center"===n.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(e.vars||e).palette.action.disabled},"end"===n.loadingPosition&&("outlined"===n.variant||"contained"===n.variant)&&{right:"small"===n.size?10:14},"end"===n.loadingPosition&&"text"===n.variant&&{right:6},"start"===n.loadingPosition&&n.fullWidth&&{position:"relative",left:-10},"end"===n.loadingPosition&&n.fullWidth&&{position:"relative",right:-10})})),I=i.forwardRef((function(t,e){var n=(0,u.Z)({props:t,name:"MuiLoadingButton"}),a=n.children,i=n.disabled,c=void 0!==i&&i,p=n.id,g=n.loading,x=void 0!==g&&g,I=n.loadingIndicator,S=n.loadingPosition,Z=void 0===S?"center":S,j=n.variant,w=void 0===j?"text":j,k=(0,o.Z)(n,y),P=(0,l.Z)(p),L=null!=I?I:(0,m.jsx)(h.Z,{"aria-labelledby":P,color:"inherit",size:16}),A=(0,r.Z)({},n,{disabled:c,loading:x,loadingIndicator:L,loadingPosition:Z,variant:w}),D=function(t){var e=t.loading,n=t.loadingPosition,a=t.classes,o={root:["root",e&&"loading"],startIcon:[e&&"startIconLoading".concat((0,d.Z)(n))],endIcon:[e&&"endIconLoading".concat((0,d.Z)(n))],loadingIndicator:["loadingIndicator",e&&"loadingIndicator".concat((0,d.Z)(n))]},i=(0,s.Z)(o,f,a);return(0,r.Z)({},a,i)}(A),E=x?(0,m.jsx)(b,{className:D.loadingIndicator,ownerState:A,children:L}):null;return(0,m.jsxs)(v,(0,r.Z)({disabled:c||x,id:P,ref:e},k,{variant:w,classes:D,ownerState:A,children:["end"===A.loadingPosition?a:E,"end"===A.loadingPosition?E:a]}))}))},45987:function(t,e,n){n.d(e,{Z:function(){return o}});var a=n(63366);function o(t,e){if(null==t)return{};var n,o,r=(0,a.Z)(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}}}]);
//# sourceMappingURL=6439.844b6aac.chunk.js.map