"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[7890],{13784:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(1413),r=n(45987),i=n(71652),o=n(48193),l=n(93777),d=n(80184),u=["label","name","onChange","value","onKeyDown","inputRef","datePickerRef","fullWidth","textField","minWidth"];function s(e){var t=e.label,n=e.name,s=e.onChange,c=e.value,p=e.onKeyDown,h=e.inputRef,f=e.datePickerRef,x=e.fullWidth,m=e.textField,g=e.minWidth,b=void 0===g?"200px":g,y=(0,r.Z)(e,u);return(0,d.jsx)(i._,{dateAdapter:o.H,children:(0,d.jsx)(l.M,(0,a.Z)({floatingLabelStyle:{color:"black"},value:c,onChange:s,ref:f,slotProps:{textField:(0,a.Z)({size:"small",label:t,name:n,onKeyDown:p,inputRef:h,fullWidth:x},m)},InputLabelProps:{sx:{color:"black"}},sx:{minWidth:b,fieldset:{borderColor:"black"},".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}},y))})}},23508:function(e,t,n){n.d(t,{bq:function(){return l}});var a,r=n(74165),i=n(15861);function o(e){var t=e.data,n=e.column,a=e.beforeArrangeData,r=e.adjustMaxHeight,i=e.fontSize,o=void 0===i?"11px":i,l=e.summaryHeight,d=void 0===l?0:l,u=[],s=0,c=[],p=document.querySelector(".content").getBoundingClientRect().height-r;return t.forEach((function(e,r){e=a(e);var i=document.querySelector(".content"),l=document.createElement("table"),h=l.insertRow();e.summaryReport&&p-s<=d+20&&(s+=p-s),n.forEach((function(t){var n=h.insertCell();l.style.visibility="hidden",l.style.width="100%",l.style.fontSize=o,function(e,t,n,a,r){e.style.width=n,e.textContent=t,a.appendChild(r)}(n,e[t.datakey],t.width,i,l)})),s+=h.getBoundingClientRect().height,i.removeChild(l),c.push(e),(s>=p||r===t.length-1&&s<p)&&(u.push(c),s=0,c=[])})),u}var l=function(e){return(a=a||(0,i.Z)((0,r.Z)().mark((function e(t){var n,a,i,l,d,u,s,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.data,a=t.column,i=t.beforeArrangeData,l=t.adjustMaxHeight,d=t.cb,u=t.fontSize,s=void 0===u?"11px":u,c=t.summaryHeight,void 0!==n){e.next=3;break}return e.abrupt("return",[]);case 3:if(!d){e.next=5;break}return e.abrupt("return",d({data:n,column:a,beforeArrangeData:i,adjustMaxHeight:l}));case 5:return e.abrupt("return",o({data:n,column:a,beforeArrangeData:i,adjustMaxHeight:l,fontSize:s,summaryHeight:c}));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},48964:function(e,t,n){n.r(t),n.d(t,{default:function(){return C},reducer:function(){return Z}});var a=n(74165),r=n(15861),i=n(4942),o=n(1413),l=n(72791),d=n(27391),u=n(64554),s=n(68096),c=n(94925),p=n(58406),h=n(23786),f=n(91933),x=n(3380),m=n(13784),g=n(39709),b=n(71012),y=n(16386),v=n(23508),S=n(48193),j=n(71652),k=n(93777),w=n(80184),A={dateFormat:"Monthly",format:0,date:new Date,sub_acct:"All",title:""},Z=function(e,t){return"UPDATE_FIELD"===t.type?(0,o.Z)((0,o.Z)({},e),{},(0,i.Z)({},t.field,t.value)):e},D=[{datakey:"Title",header:"PARTICULARS",width:"400px"},{datakey:"PrevBalance",header:"PREVIOUS BALANCE",total:!0,type:"number",width:"100px"},{datakey:"CurrBalance",header:"TRANSACTIONS",total:!0,type:"number",width:"100px"},{datakey:"TotalBalance",header:"ENDING BALANCE",total:!0,type:"number",width:"100px"}];function F(e,t){return"".concat("UMIS"===t?"UPWARD MANAGEMENT INSURANCE SERVICES":"UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC.","\n").concat(e.dateFormat," Income Statement - Long\n").concat(function(e){var t="";"Daily"===e.dateFormat?t=e.date.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"Monthly"===e.dateFormat&&(t=e.date.toLocaleDateString("en-US",{year:"numeric",month:"long"}));return t.toString()}(e))}function E(e){var t,n=e.state,b=e.dispatch,y=(0,l.useRef)(null),v=(0,l.useContext)(x.V),A=v.myAxios,Z=v.user,D=(0,f.useQuery)({queryKey:"sub-accounts",queryFn:function(){return(t=t||(0,r.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.get("/reports/accounting/get-sub-account-acronym",{headers:{Authorization:"Bearer ".concat(null===Z||void 0===Z?void 0:Z.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),E=D.data,C=D.isLoading,z=function(e){var t=e.target,a=t.name,r=t.value;b({type:"UPDATE_FIELD",field:"title",value:F((0,o.Z)((0,o.Z)({},n),{},(0,i.Z)({},a,r)),null===Z||void 0===Z?void 0:Z.department)}),b({type:"UPDATE_FIELD",field:a,value:r})};return(0,w.jsxs)("div",{style:{padding:"10px"},children:[(0,w.jsx)(d.Z,{label:"Title",fullWidth:!0,name:"title",value:n.title,onChange:z,rows:6,multiline:!0,InputProps:{style:{height:"140px",fontSize:"12px"}},sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,w.jsxs)(u.Z,{sx:function(e){return(0,i.Z)({height:"100%",display:"grid",gridTemplateColumns:"repeat(1,1fr)",gap:"10px",margin:"10px 0"},e.breakpoints.down("sm"),{gridTemplateColumns:"repeat(1,1fr)"})},children:[(0,w.jsxs)(s.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,w.jsx)(c.Z,{id:"format",children:"Format"}),(0,w.jsxs)(p.Z,{labelId:"format",value:n.format,label:"Format",name:"format",onChange:z,sx:{height:"27px",fontSize:"14px"},children:[(0,w.jsx)(h.Z,{value:0,children:"Default"}),(0,w.jsx)(h.Z,{value:1,children:"Summary"})]})]}),(0,w.jsxs)(s.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,w.jsx)(c.Z,{id:"date_format",children:"Report"}),(0,w.jsxs)(p.Z,{labelId:"date_format",value:n.dateFormat,label:"Report",name:"dateFormat",onChange:z,sx:{height:"27px",fontSize:"14px"},children:[(0,w.jsx)(h.Z,{value:"Daily",children:"Daily"}),(0,w.jsx)(h.Z,{value:"Monthly",children:"Monthly"})]})]}),C?(0,w.jsx)(g.Z,{loading:C}):(0,w.jsxs)(s.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,w.jsx)(c.Z,{id:"sub_account_id",children:"Sub Account"}),(0,w.jsxs)(p.Z,{labelId:"sub_account_id",value:n.sub_acct,label:"Sub Account",name:"sub_acct",onChange:z,sx:{height:"27px",fontSize:"14px"},children:[(0,w.jsx)(h.Z,{value:"All",children:"All"}),null===E||void 0===E?void 0:E.data.sub_account.map((function(e,t){return(0,w.jsx)(h.Z,{value:e.Acronym,children:e.Acronym},t)}))]})]}),"Monthly"===n.dateFormat?(0,w.jsx)(j._,{dateAdapter:S.H,children:(0,w.jsx)(k.M,{sx:{width:"100%",".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},slotProps:{textField:{size:"small",name:"",InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}},label:"Date",views:["month","year"],value:n.date,onChange:function(e){b({type:"UPDATE_FIELD",field:"date",value:e}),n.date=e,b({type:"UPDATE_FIELD",field:"title",value:F(n,null===Z||void 0===Z?void 0:Z.department)})}})}):(0,w.jsx)(m.Z,{fullWidth:!0,label:"Date From",onChange:function(e){b({type:"UPDATE_FIELD",field:"date",value:e}),n.date=e,b({type:"UPDATE_FIELD",field:"title",value:F(n,null===Z||void 0===Z?void 0:Z.department)})},value:new Date(n.date),onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=y.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:y,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}})]})]})}function C(){var e,t=(0,l.useContext)(x.V),n=t.user,i=t.myAxios;return A.title=F(A,null===n||void 0===n?void 0:n.department),(0,w.jsx)(b.ZP,{column:D,initialState:A,Setting:function(e,t){return(0,w.jsx)(E,{state:e,dispatch:t})},onReportSubmit:function(t,o,l){return(e=e||(0,r.Z)((0,a.Z)().mark((function e(t,r,o){var l,d;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.post("/reports/accounting/income-statement-report",o,{headers:{Authorization:"Bearer ".concat(null===n||void 0===n?void 0:n.accessToken)}});case 2:return l=e.sent,e.next=5,l.data;case 5:d=e.sent,(0,v.bq)({data:d.report,column:D,beforeArrangeData:function(e){var t=D.filter((function(e){return"number"===e.type})).map((function(e){return e.datakey}));return t.forEach((function(t){if(e.hasOwnProperty(t)){if(isNaN(parseFloat(e[t])))return e;e[t]=(0,b.pw)(parseFloat(Math.abs(parseFloat(e[t].toString())).toString().replace(/,/g,"")))}})),e},adjustMaxHeight:500}).then((function(e){t(e),r(!1)}));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)},scaleDefaultValue:100,drawTable:function(e,t){return e.map((function(n,a){return(0,w.jsxs)("div",{className:"page out-page",children:[(0,w.jsx)("div",{className:"header",style:{height:"50px"}}),(0,w.jsx)("div",{className:"content",children:(0,w.jsxs)("table",{children:[(0,w.jsxs)("thead",{children:[t.title.split("\n").map((function(e,t){return(0,w.jsx)("tr",{children:(0,w.jsx)("th",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"left"},colSpan:D.length,children:e})},t)})),(0,w.jsx)("tr",{style:{height:"40px"}}),(0,w.jsx)("tr",{children:D.map((function(t,n){return(0,w.jsx)("th",{onDoubleClick:function(n){return(0,b.PE)(n,t.datakey,e)},style:{width:t.width,fontSize:"12px",fontWeight:"bold",borderBottom:"1px solid black",textAlign:"Title"===t.datakey?"left":"right"},children:t.header},n)}))})]}),(0,w.jsx)("tbody",{children:n.map((function(e,t){return(0,w.jsx)("tr",{children:D.map((function(n,r){return(0,w.jsx)("td",{onClick:b.mp,className:"editable not-looking page-".concat(a,"  row-").concat(t,"_col-").concat(r),style:{borderBottom:e.third&&"Title"!==n.datakey?"1px dashed #cbd5e1":"Title"!==n.datakey&&(e.totalIncome||e.totalExpenses)?"1px solid black":"",paddingTop:e.third||e.first?"10px":"",paddingBottom:e.third||e.first?"10px":"",paddingLeft:e.first?"":e.second?"20px":"50px",fontSize:"11px",fontWeight:e.third||e.first?"bold":"500",width:"".concat(n.width," !important"),textAlign:"Title"===n.datakey?"left":"right"},children:e[n.datakey]},r)}))},t)}))}),(0,w.jsx)("tfoot",{children:a===e.length-1&&(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{style:{fontWeight:"bold",fontSize:"11px"},colSpan:1,children:"NET INCOME / (LOSS)"},"dddd"),D.map((function(t,n){if(!t.total)return(0,w.jsx)(l.Fragment,{},n);var a=e.flat().filter((function(e){return e.second})).reduce((function(e,n){var a;return e+Math.abs(parseFloat(null===(a=n[t.datakey])||void 0===a?void 0:a.replace(/,/g,"")))}),0);return(0,w.jsx)("td",{style:{borderBottom:"1px solid black",fontWeight:"bold",textAlign:"right",fontSize:"11px",paddingTop:"20px",paddingBottom:"5px"},children:isNaN(a)?"0":(0,b.pw)(a)},n)}))]},"qwewqe")})]})}),(0,w.jsxs)("div",{className:"footer",style:{height:"50px",display:"flex",justifyContent:"space-between"},children:[(0,w.jsx)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:(0,y.Z)(new Date,"MM/dd/Y")}),(0,w.jsxs)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:["Page ",a+1," of ",e.length]})]})]},a)}))},pageHeight:"14in",pageWidth:"10.5in"})}},45987:function(e,t,n){n.d(t,{Z:function(){return r}});var a=n(63366);function r(e,t){if(null==e)return{};var n,r,i=(0,a.Z)(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}}}]);
//# sourceMappingURL=7890.bfd79107.chunk.js.map