"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[470],{13784:function(e,t,n){n.d(t,{Z:function(){return c}});var o=n(1413),r=n(45987),a=n(71652),i=n(93862),l=n(93777),d=n(80184),u=["label","name","onChange","value","onKeyDown","inputRef","datePickerRef","fullWidth","textField","minWidth"];function c(e){var t=e.label,n=e.name,c=e.onChange,s=e.value,h=e.onKeyDown,p=e.inputRef,f=e.datePickerRef,x=e.fullWidth,m=e.textField,v=e.minWidth,g=void 0===v?"200px":v,b=(0,r.Z)(e,u);return(0,d.jsx)(a._,{dateAdapter:i.H,children:(0,d.jsx)(l.M,(0,o.Z)({floatingLabelStyle:{color:"black"},value:s,onChange:c,ref:f,slotProps:{textField:(0,o.Z)({size:"small",label:t,name:n,onKeyDown:h,inputRef:p,fullWidth:x},m)},InputLabelProps:{sx:{color:"black"}},sx:{minWidth:g,fieldset:{borderColor:"black"},".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}},b))})}},81582:function(e,t,n){n.d(t,{XT:function(){return p},ZP:function(){return h},rO:function(){return f}});n(72791);var o=n(88447),r=n(64554),a=n(20890),i=n(27391),l=n(13400),d=n(29823),u=n(89767),c=n(80184),s={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"70%",bgcolor:"background.paper",boxShadow:24,p:4,heigth:"auto"};function h(e){var t=e.height,n=e.isLoading,h=(e.queryKey,e.columns),x=e.onSelectionChange,m=(e.setRows,e.rows),v=e.id,g=e.onCloseModal,b=e.showModal,y=e.onClickCloseIcon,w=e.searchOnChange,S=e.title,j=void 0===S?"":S,D=e.searchRef,F=(e.onCellKeyDown,e.onSearchKeyEnter),C=void 0===F?function(){}:F,k=e.isRowSelectable,I=e.getCellClassName,Z=p();return(0,c.jsx)(o.Z,{open:b,onClose:g,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,c.jsxs)(r.Z,{sx:s,children:[(0,c.jsx)(a.Z,{id:"modal-modal-title",variant:"h6",component:"h2",mb:2,children:j}),(0,c.jsx)(i.Z,{size:"small",label:"Search",sx:{marginBottom:"10px"},fullWidth:!0,onChange:w,InputProps:{inputRef:D},onKeyDown:function(e){var t;"Enter"!==e.code&&"NumpadEnter"!==e.code||(e.preventDefault(),C(null===D||void 0===D||null===(t=D.current)||void 0===t?void 0:t.value));f(e,Z,null===D||void 0===D?void 0:D.current)}}),(0,c.jsx)("div",{className:"".concat(Z," main-table-selection-container"),style:{position:"relative",height:"".concat(t+20,"px")},children:(0,c.jsx)(u.Z,{isSingleSelection:!0,isRowFreeze:!1,columns:h,isLoading:n,dataSelection:function(e,t,n){x(e,t)},table_id:v,rows:m,isRowSelectable:k,getCellClassName:I})}),(0,c.jsx)("div",{style:{position:"absolute",top:"10px",right:"10px"},children:(0,c.jsx)(l.Z,{"aria-label":"search-client",color:"secondary",onClick:y,children:(0,c.jsx)(d.Z,{})})})]})})}function p(){return"main-"+Math.floor(1e4*Math.random())}function f(e,t,n){var o=t;if("ArrowDown"===e.code){var r,a=document.querySelectorAll(".".concat(o," .MuiDataGrid-row"));e.preventDefault(),null===(r=a[0])||void 0===r||r.classList.add("hover-keyboard"),function(e,t){var n=document.querySelector(".".concat(e," .MuiDataGrid-row")),o=null===n||void 0===n?void 0:n.querySelector("input");null===o||void 0===o||o.focus();var r=new MouseEvent("mouseenter",{bubbles:!0,cancelable:!0,view:window});null===n||void 0===n||n.dispatchEvent(r),null===o||void 0===o||o.addEventListener("keydown",(function(e){"ArrowUp"===e.key&&(e.preventDefault(),t.focus()),"ArrowUp"===e.key&&(null===n||void 0===n||n.classList.remove("hover-keyboard"))}))}(t,n),a.forEach((function(e,t){e.addEventListener("keydown",(function(e){if("ArrowUp"===e.key){var n,o;if(t<=0)return;return e.preventDefault(),null===(n=a[t])||void 0===n||n.classList.remove("hover-keyboard"),void(null===(o=a[t-1])||void 0===o||o.classList.add("hover-keyboard"))}if("ArrowDown"===e.key){var r,i;if(e.preventDefault(),t>=a.length-1)return;null===(r=a[t])||void 0===r||r.classList.remove("hover-keyboard"),null===(i=a[t+1])||void 0===i||i.classList.add("hover-keyboard")}}))}))}}},23508:function(e,t,n){n.d(t,{bq:function(){return l}});var o,r=n(74165),a=n(15861);function i(e){var t=e.data,n=e.column,o=e.beforeArrangeData,r=e.adjustMaxHeight,a=e.fontSize,i=void 0===a?"11px":a,l=e.summaryHeight,d=void 0===l?0:l,u=[],c=0,s=[],h=document.querySelector(".content").getBoundingClientRect().height-r;return t.forEach((function(e,r){e=o(e);var a=document.querySelector(".content"),l=document.createElement("table"),p=l.insertRow();e.summaryReport&&h-c<=d+20&&(c+=h-c),n.forEach((function(t){var n=p.insertCell();l.style.visibility="hidden",l.style.width="100%",l.style.fontSize=i,function(e,t,n,o,r){e.style.width=n,e.textContent=t,o.appendChild(r)}(n,e[t.datakey],t.width,a,l)})),c+=p.getBoundingClientRect().height,a.removeChild(l),s.push(e),(c>=h||r===t.length-1&&c<h)&&(u.push(s),c=0,s=[])})),u}var l=function(e){return(o=o||(0,a.Z)((0,r.Z)().mark((function e(t){var n,o,a,l,d,u,c,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.data,o=t.column,a=t.beforeArrangeData,l=t.adjustMaxHeight,d=t.cb,u=t.fontSize,c=void 0===u?"11px":u,s=t.summaryHeight,void 0!==n){e.next=3;break}return e.abrupt("return",[]);case 3:if(!d){e.next=5;break}return e.abrupt("return",d({data:n,column:o,beforeArrangeData:a,adjustMaxHeight:l}));case 5:return e.abrupt("return",i({data:n,column:o,beforeArrangeData:a,adjustMaxHeight:l,fontSize:c,summaryHeight:s}));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},89767:function(e,t,n){var o=n(93433),r=n(1413),a=n(29439),i=n(72791),l=n(57482),d=n(64554),u=n(25060),c=n(29961),s=n(54277),h=n(70169),p=n(6484),f=n(16088),x=n(80184),m=(0,i.createContext)({rows:[],rowSelectionModel:[],footerChildren:function(){return(0,x.jsx)("div",{})},footerPaginationPosition:"right-left",showFooterSelectedCount:!0}),v=(0,i.forwardRef)((function(e,t){var n=e.isLoading,d=e.columns,c=e.rows,s=e.table_id,h=e.isSingleSelection,p=e.isRowFreeze,f=e.dataSelection,v=e.CustomFooterComponent,g=void 0===v?y:v,b=e.isRowSelectable,w=e.getCellClassName,S=e.checkboxSelection,j=void 0===S||S,D=e.footerChildren,F=void 0===D?function(e,t){return(0,x.jsx)("div",{})}:D,C=e.footerPaginationPosition,k=void 0===C?"right-left":C,I=e.showFooterSelectedCount,Z=void 0===I||I,M=(0,i.useState)([]),L=(0,a.Z)(M,2),A=L[0],z=L[1];function E(e,t,n){f&&f(e,t,n)}(0,i.useImperativeHandle)(t,(function(){return{removeSelection:function(){z([])},getSelectedRows:function(){return c.filter((function(e){return null===A||void 0===A?void 0:A.includes(e[s])}))},setSelectedRows:function(e){z(e)}}}));var N=[];return(0,x.jsx)(m.Provider,{value:{showFooterSelectedCount:Z,footerPaginationPosition:k,rowSelectionModel:A,rows:c,footerChildren:F},children:(0,x.jsx)(u._$,{slots:{loadingOverlay:l.Z,footer:g},initialState:{pagination:{paginationModel:{pageSize:35}}},loading:n,getRowId:function(e){return e[s]},columns:d.filter((function(e){return!e.hide})),rows:c,showCellVerticalBorder:!0,showColumnVerticalBorder:!0,checkboxSelection:j,rowSelectionModel:A,rowHeight:25,columnHeaderHeight:35,pageSizeOptions:[10,20,35,50,75,100],sx:(0,r.Z)((0,r.Z)({"& .cash":{color:"#ec4899"},"& .check":{color:"#0891b2"},"& .approved":{color:"green"},"& .pending":{color:"orange"},"& .disapproved":{color:"red"},"& .normal":{color:"red"},"& .MuiDataGrid-row.Mui-selected:hover":{color:"black","& .MuiSvgIcon-root ":{fill:"#3b82f6"}},"& .hover-keyboard":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row:hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row.hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiTablePagination-root p ":{padding:"0 !important"}},{"& .MuiDataGrid-columnHeaders":{background:"#64748b",color:"white",fontSize:"14px"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer .MuiSvgIcon-root ":{display:h||p?"none":"block",fill:"white"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer input ":{display:h||p?"none":"block"}}),{fontSize:13,fontWeight:500,"& .MuiDataGrid-checkboxInput":{height:"27px",width:"27px"},"& .MuiDataGrid-checkboxInput svg":{height:"20px",width:"20px"}}),onRowSelectionModelChange:function(e){if(p){if(e.length<=0)return;if(N=e,A.includes(N[N.length-1]))return;return z(e),void E([e[e.length-1]],c,null)}if(!p&&h)if(A&&(null===A||void 0===A?void 0:A.length)>0){var t=new Set(A);z(e.filter((function(e){return!t.has(e)})))}else z(e);else z(e);E([e[e.length-1]],c,null)},onCellKeyDown:function(e,t){if(["NumpadEnter","Enter","Delete","Backspace"].includes(t.code))return t.preventDefault(),"Enter"===t.code||"NumpadEnter"===t.code?h&&!p?z((function(n){return n&&n.length>0&&n[0]===e.rowNode.id?(E([],c,t.code),[]):(E([e.rowNode.id],c,t.code),[e.rowNode.id])})):void z((function(n){return n&&!p&&n.length>0&&n.includes(e.rowNode.id)?(n=n.filter((function(t){return t!==e.rowNode.id})),E([],c,t.code),n):n&&p&&n.length>0&&n.includes(e.rowNode.id)?n:(E([e.rowNode.id],c,t.code),[].concat((0,o.Z)(n),[e.rowNode.id]))})):"Delete"===t.code||"Backspace"===t.code?(z([e.rowNode.id]),E([e.rowNode.id],c,t.code)):void 0},disableVirtualization:!0,isRowSelectable:b,getCellClassName:w})})}));function g(e){var t=e.page,n=e.onPageChange,o=e.className,r=(0,c.l)(),a=(0,s.P)(r,h.UB);return(0,x.jsx)(f.Z,{variant:"outlined",color:"primary",className:o,count:a,page:t+1,onChange:function(e,t){n(e,t-1)}})}function b(e){return(0,x.jsx)(p.x,(0,r.Z)({ActionsComponent:g},e))}function y(e){var t=(0,i.useContext)(m),n=t.rowSelectionModel,o=t.showFooterSelectedCount,a=t.footerPaginationPosition,l=t.footerChildren,u=t.rows;return(0,x.jsxs)(d.Z,{sx:{columnGap:"50px",display:"flex",width:"100%",justifyContent:"space-between",px:3,alignItems:"center",flexDirection:"right-left"===a?"row-reverse":"row"},children:[(0,x.jsx)(b,(0,r.Z)({},e)),(0,x.jsxs)(d.Z,{sx:{display:"flex",justifyContent:"right-left"===a?"flex-start":"flex-end",flex:1,alignItems:"center"},children:[o&&(0,x.jsxs)("div",{children:["Selected:",null===n||void 0===n?void 0:n.length]}),(0,x.jsx)("div",{children:l(n,u)})]})]})}t.Z=v},68946:function(e,t,n){n.r(t),n.d(t,{default:function(){return R}});var o=n(29439),r=n(4942),a=n(1413),i=n(74165),l=n(15861),d=n(72791),u=n(71012),c=n(3380),s=n(71652),h=n(93777),p=n(27391),f=n(64554),x=n(68096),m=n(94925),v=n(58406),g=n(23786),b=n(77196),y=n(63466),w=n(13400),S=n(93862),j=n(91933),D=n(39709),F=n(54164),C=n(13784),k=n(93263),I=n(91421),Z=n(23508),M=n(16386),L=n(80184),A={format:0,account:"",account_title:"",dateFormat:"Yearly",dateFrom:new Date,dateTo:new Date,yearCount:(new Date).getFullYear().toString().slice(-2),subsi:1,subsi_options:"All",sort:"Name",order:"asc",title:""},z=[{datakey:"GL_Acct",header:"ID No.",width:"220px"},{datakey:"mSub_Acct",header:"IDENTITY",width:"400px"},{datakey:"Balance",header:"AMOUNT",total:!0,type:"number",width:"160px"}],E=[{datakey:"ID_No",header:"ID No.",width:"220px"},{datakey:"mID",header:"IDENTITY",width:"400px"},{datakey:"Balance",header:"AMOUNT",total:!0,type:"number",width:"160px"}],N=[{datakey:"ID_No",header:"ID. No.",width:"220px"},{datakey:"mID",header:"Insurance",width:"400px"},{datakey:"Balance",header:"Balance",total:!0,type:"number",width:"160px"}];function _(e){return[z,E,N][e]}function P(e){var t=e.state,n=e.dispatch,o=e.handleInputChange,r=e.user,a=(0,d.useRef)(null),i=(0,d.useRef)(null);return(0,L.jsxs)("div",{style:{width:"100%",display:"flex",flexDirection:"column",rowGap:"10px"},children:["Custom"===t.dateFormat&&(0,L.jsxs)(d.Fragment,{children:[(0,L.jsx)(C.Z,{fullWidth:!0,label:"Date From",onChange:function(e){n({type:"UPDATE_FIELD",field:"dateFrom",value:e}),t.dateFrom=e,n({type:"UPDATE_FIELD",field:"title",value:U(t,null===r||void 0===r?void 0:r.department)})},value:new Date(t.dateFrom),onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=a.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:a,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}}),(0,L.jsx)(C.Z,{fullWidth:!0,label:"Date To",onChange:function(e){n({type:"UPDATE_FIELD",field:"dateTo",value:e}),t.dateTo=e,n({type:"UPDATE_FIELD",field:"title",value:U(t,null===r||void 0===r?void 0:r.department)})},value:new Date(t.dateTo),onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=i.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:i,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}})]}),"Daily"===t.dateFormat&&(0,L.jsx)(C.Z,{fullWidth:!0,label:"Date",onChange:function(e){n({type:"UPDATE_FIELD",field:"dateFrom",value:e}),t.dateFrom=e,n({type:"UPDATE_FIELD",field:"title",value:U(t,null===r||void 0===r?void 0:r.department)})},value:new Date(t.dateFrom),onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=a.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:a,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}}),(0,L.jsxs)(s._,{dateAdapter:S.H,children:["Monthly"===t.dateFormat&&(0,L.jsx)(h.M,{sx:{width:"100%",".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},slotProps:{textField:{size:"small",name:"",InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}},label:"Date",views:["month","year"],value:t.dateFrom,onChange:function(e){n({type:"UPDATE_FIELD",field:"dateFrom",value:e}),t.dateFrom=e,n({type:"UPDATE_FIELD",field:"title",value:U(t,null===r||void 0===r?void 0:r.department)})}}),"Yearly"===t.dateFormat&&(0,L.jsxs)(d.Fragment,{children:[(0,L.jsx)(h.M,{sx:{width:"100%",".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},slotProps:{textField:{size:"small",name:"",inputRef:a,InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}},label:"Date",views:["year"],value:t.dateFrom,onChange:function(e){n({type:"UPDATE_FIELD",field:"dateFrom",value:e}),t.dateFrom=e,n({type:"UPDATE_FIELD",field:"title",value:U(t,null===r||void 0===r?void 0:r.department)})}}),(0,L.jsx)(p.Z,{type:"number",label:"Year Count",name:"yearCount",value:t.yearCount,onChange:o,InputProps:{style:{height:"27px",fontSize:"12px"}},sx:{".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})]})]})}function T(e){var t,n,o=e.state,s=e.dispatch,h=(0,d.useRef)(null),S=(0,d.useRef)(null),F=(0,d.useContext)(c.V),C=F.myAxios,Z=F.user,M=(0,j.useQuery)({queryKey:"chart-account",queryFn:function(){return(t=t||(0,l.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.get("/reports/accounting/schedule-accounts",{headers:{Authorization:"Bearer ".concat(null===Z||void 0===Z?void 0:Z.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),A=M.data,z=M.isLoading,E=(0,j.useQuery)({queryKey:"sub-accounts",queryFn:function(){return(n=n||(0,l.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.get("/reports/accounting/get-sub-account-acronym",{headers:{Authorization:"Bearer ".concat(null===Z||void 0===Z?void 0:Z.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),N=E.data,_=E.isLoading,T=(0,k.Z)({link:{url:"/task/accounting/search-pdc-policy-id",queryUrlName:"searchPdcPolicyIds"},columns:[{field:"Type",headerName:"Type",width:130},{field:"IDNo",headerName:"ID No.",width:200},{field:"Name",headerName:"Name",flex:1},{field:"ID",headerName:"ID",flex:1,hide:!0}],queryKey:"client-ids",uniqueId:"IDNo",responseDataKey:"clientsId",onSelected:function(e,t){s({type:"UPDATE_FIELD",field:"subsi_options",value:e[0].IDNo}),K()},searchRef:S}),R=T.ModalComponent,q=T.openModal,W=T.isLoading,K=T.closeModal,G=(0,k.Z)({link:{url:"/reports/accounting/chart-schedule-account",queryUrlName:"account_search"},columns:[{field:"Acct_Code",headerName:"Code",width:130},{field:"Acct_Title",headerName:"Tittle",flex:1},{field:"Short",headerName:"Short Name",flex:1}],queryKey:"chart-account-ids",uniqueId:"Acct_Code",responseDataKey:"chartAccount",onSelected:function(e,t){s({type:"UPDATE_FIELD",field:"account",value:e[0].Acct_Code}),s({type:"UPDATE_FIELD",field:"account_title",value:e[0].Acct_Title}),o.account=e[0].Acct_Code,s({type:"UPDATE_FIELD",field:"title",value:U(o,null===Z||void 0===Z?void 0:Z.department)}),o.account_title=e[0].Acct_Title,s({type:"UPDATE_FIELD",field:"title",value:U(o,null===Z||void 0===Z?void 0:Z.department)}),Y()},searchRef:h}),H=G.ModalComponent,B=G.openModal,O=G.isLoading,Y=G.closeModal,X=function(e){var t=e.target,n=t.name,i=t.value;"policy"===n&&"TPL"!==i&&s({type:"UPDATE_FIELD",field:"mortgagee",value:""}),"mortgagee"===n&&""!==i&&s({type:"UPDATE_FIELD",field:"account",value:""}),s({type:"UPDATE_FIELD",field:"title",value:U((0,a.Z)((0,a.Z)({},o),{},(0,r.Z)({},n,i)),null===Z||void 0===Z?void 0:Z.department)}),s({type:"UPDATE_FIELD",field:n,value:i})};return(0,L.jsxs)("div",{style:{padding:"10px",background:"transparent"},children:[(0,L.jsx)(p.Z,{label:"Title",fullWidth:!0,name:"title",value:o.title,onChange:X,rows:6,multiline:!0,InputProps:{style:{height:"140px",fontSize:"12px"}},sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,L.jsxs)(f.Z,{sx:function(e){return{height:"100%",display:"flex",gap:"10px",margin:"10px 0",flexDirection:"column"}},children:[(0,L.jsxs)(x.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl":{background:u.qX}},children:[(0,L.jsx)(m.Z,{id:"report",children:"Report"}),(0,L.jsxs)(v.Z,{labelId:"report",value:o.format,label:"Report",name:"format",onChange:function(e){X(e),s({type:"UPDATE_FIELD",field:"account",value:""}),s({type:"UPDATE_FIELD",field:"account_title",value:""})},sx:{height:"27px",fontSize:"14px"},children:[(0,L.jsx)(g.Z,{value:0,children:"All Accounts"}),(0,L.jsx)(g.Z,{value:1,children:"GL Account (Detailed)"})]})]}),O?(0,L.jsx)(D.Z,{loading:O}):(0,L.jsxs)(x.Z,{sx:{width:"100%",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl":{background:u.qX}},variant:"outlined",size:"small",disabled:0===o.format,children:[(0,L.jsx)(m.Z,{htmlFor:"account_id",children:"Account"}),(0,L.jsx)(b.Z,{sx:{height:"27px",fontSize:"14px"},name:"account",value:o.account,onChange:X,id:"account_id",onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return B(o.account)},endAdornment:(0,L.jsx)(y.Z,{position:"end",children:(0,L.jsx)(w.Z,{disabled:0===o.format,onClick:function(){B(o.account)},edge:"end",color:"secondary",children:(0,L.jsx)(I.Z,{})})}),label:"Account"})]}),(0,L.jsx)(p.Z,{fullWidth:!0,name:"account_title",value:o.account_title,onChange:X,InputProps:{readOnly:!0,style:{height:"27px"}},sx:{gridColumn:"1 / span 2",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl":{background:u.qX}}}),(0,L.jsxs)(x.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl":{background:u.qX}},children:[(0,L.jsx)(m.Z,{id:"subsi_id",children:"Subsidiary"}),(0,L.jsxs)(v.Z,{labelId:"subsi_id",value:o.subsi,label:"Subsidiary",name:"subsi",onChange:X,sx:{height:"27px",fontSize:"14px"},children:[(0,L.jsx)(g.Z,{value:0,children:"Sub Acct"}),(0,L.jsx)(g.Z,{value:1,children:"I.D No."}),(0,L.jsx)(g.Z,{value:2,children:"Insurance"})]})]}),0===o.subsi&&(0,L.jsx)(d.Fragment,{children:_?(0,L.jsx)(D.Z,{loading:_}):(0,L.jsxs)(x.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl":{background:u.qX}},children:[(0,L.jsx)(m.Z,{id:"sub_account_id",children:"Sub Account"}),(0,L.jsxs)(v.Z,{labelId:"sub_account_id",value:o.subsi_options,label:"Sub Account",name:"subsi_options",onChange:X,sx:{height:"27px",fontSize:"14px"},children:[(0,L.jsx)(g.Z,{value:"All",children:"All"}),null===N||void 0===N?void 0:N.data.sub_account.map((function(e,t){return(0,L.jsx)(g.Z,{value:e.Acronym,children:e.Acronym},t)}))]})]})}),1===o.subsi&&(0,L.jsx)(d.Fragment,{children:W?(0,L.jsx)(D.Z,{loading:W}):(0,L.jsxs)(x.Z,{sx:{width:"100%",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl":{background:u.qX}},variant:"outlined",size:"small",children:[(0,L.jsx)(m.Z,{htmlFor:"clients_id",children:"Clients"}),(0,L.jsx)(b.Z,{sx:{height:"27px",fontSize:"14px"},label:"Clients",name:"subsi_options",value:o.subsi_options,onChange:X,id:"clients_id",onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return q(o.subsi_options)},endAdornment:(0,L.jsx)(y.Z,{position:"end",children:(0,L.jsx)(w.Z,{onClick:function(){q(o.subsi_options)},edge:"end",color:"secondary",children:(0,L.jsx)(I.Z,{})})})})]})}),2===o.subsi&&(0,L.jsx)(d.Fragment,{children:z?(0,L.jsx)(D.Z,{loading:z}):(0,L.jsxs)(x.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl":{background:u.qX}},children:[(0,L.jsx)(m.Z,{id:"insurance_id",children:"Insurance"}),(0,L.jsxs)(v.Z,{labelId:"insurance_id",value:o.subsi_options,label:"Insurance",name:"subsi_options",onChange:X,sx:{height:"27px",fontSize:"14px"},children:[(0,L.jsx)(g.Z,{value:"All",children:"All"}),null===A||void 0===A?void 0:A.data.accounts.map((function(e,t){return(0,L.jsx)(g.Z,{value:e.AccountCode,children:e.AccountCode},t)}))]})]})}),(0,L.jsxs)(x.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl":{background:u.qX}},children:[(0,L.jsx)(m.Z,{id:"dateFormat_id",children:"Date Format"}),(0,L.jsxs)(v.Z,{id:"dateFormat_id",label:"Date Format",value:o.dateFormat,name:"dateFormat",onChange:X,sx:{height:"27px",fontSize:"14px"},children:[(0,L.jsx)(g.Z,{value:"Daily",children:"Daily"}),(0,L.jsx)(g.Z,{value:"Monthly",children:"Monthly"}),(0,L.jsx)(g.Z,{value:"Yearly",children:"Yearly"}),(0,L.jsx)(g.Z,{value:"Custom",children:"Custom"})]})]}),(0,L.jsx)(P,{dispatch:s,state:o,handleInputChange:X})]}),(0,L.jsx)(f.Z,{sx:{height:"100%",flex:1,alignItems:"center",padding:"20px 10px",border:"1px solid #94a3b8"},children:(0,L.jsxs)(f.Z,{sx:function(e){return(0,r.Z)({width:"100%",display:"flex",flexDirection:"row",columnGap:"10px",alignItems:"center"},e.breakpoints.down("sm"),{flexDirection:"column",rowGap:"10px"})},children:[(0,L.jsxs)(x.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl":{background:u.qX}},children:[(0,L.jsx)(m.Z,{id:"sort",children:"Sort"}),(0,L.jsxs)(v.Z,{labelId:"sort",value:o.sort,label:"Sort",name:"sort",onChange:X,sx:{height:"27px",fontSize:"14px"},children:[(0,L.jsx)(g.Z,{value:"Name",children:"Name"}),(0,L.jsx)(g.Z,{value:"Sub Account/I.D No.",children:"Sub Account/I.D No."})]})]}),(0,L.jsxs)(x.Z,{fullWidth:!0,variant:"outlined",size:"small",sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl":{background:u.qX}},children:[(0,L.jsx)(m.Z,{id:"order",children:"Order"}),(0,L.jsxs)(v.Z,{labelId:"order",value:o.order,label:"Sort",name:"order",onChange:X,sx:{height:"27px",fontSize:"14px"},children:[(0,L.jsx)(g.Z,{value:"asc",children:"Ascending"}),(0,L.jsx)(g.Z,{value:"desc",children:"Descending"})]})]})]})}),H,R]})}function R(){var e,t=(0,d.useContext)(c.V),n=t.myAxios,r=t.user,a=(0,d.useState)(_(A.subsi)),s=(0,o.Z)(a,2),h=s[0],p=s[1];return A.title=U(A,null===r||void 0===r?void 0:r.department),(0,L.jsx)(u.ZP,{column:h,initialState:A,Setting:function(e,t){return(0,L.jsx)(T,{state:e,dispatch:t})},onReportSubmit:function(t,o,a){return(e=e||(0,l.Z)((0,i.Z)().mark((function e(t,o,a){var l,d,c;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l=_(a.subsi),(0,F.flushSync)((function(){p(l)})),e.next=4,n.post("/reports/accounting/schedule-account-report",a,{headers:{Authorization:"Bearer ".concat(null===r||void 0===r?void 0:r.accessToken)}});case 4:return d=e.sent,e.next=7,d.data;case 7:c=e.sent,(0,Z.bq)({data:c.report,column:l,beforeArrangeData:function(e){var t=l.filter((function(e){return"number"===e.type})).map((function(e){return e.datakey}));return t.forEach((function(t){e.hasOwnProperty(t)&&(e[t]=(0,u.pw)(Math.abs(parseFloat(e[t].toString().replace(/,/g,"")))))})),e},adjustMaxHeight:520}).then((function(e){t(e),o(!1)}));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)},scaleDefaultValue:100,drawTable:function(e,t){return e.map((function(n,o){return(0,L.jsxs)("div",{className:"page out-page",children:[(0,L.jsx)("div",{className:"header",style:{height:"50px"}}),(0,L.jsx)("div",{className:"content",children:(0,L.jsxs)("table",{children:[(0,L.jsxs)("thead",{children:[t.title.split("\n").map((function(e,t){return(0,L.jsx)("tr",{children:(0,L.jsx)("th",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"left"},colSpan:h.length,children:e})},t)})),(0,L.jsx)("tr",{style:{height:"40px"}}),(0,L.jsx)("tr",{children:h.map((function(t,n){return(0,L.jsx)("th",{onDoubleClick:function(n){return(0,u.PE)(n,t.datakey,e)},style:{width:t.width,fontSize:"12px",fontWeight:"bold",borderBottom:"1px solid black"},children:t.header},n)}))})]}),(0,L.jsxs)("tbody",{children:[(0,L.jsx)("tr",{style:{height:"20px"}}),n.map((function(e,t){return e.ArrayHeader?(0,L.jsx)("tr",{children:(0,L.jsx)("td",{className:"editable not-looking page-".concat(o,"  row-").concat(t,"_col-0"),colSpan:h.length,style:{fontWeight:"bold",fontSize:"11px"},children:e.mShort})},t):(0,L.jsxs)(d.Fragment,{children:[(0,L.jsx)("tr",{children:h.map((function(n,r){return e.ArrayFooter?0===r?null:1===r?(0,L.jsxs)("td",{className:"editable not-looking  page-".concat(o," row-").concat(t,"_col-").concat(r),colSpan:2,style:{borderTop:"1px dashed #cbd5e1",width:n.width,fontSize:"11px",fontWeight:"bold",textAlign:"right"},children:["TOTAL:"," "]},r):(0,L.jsx)("td",{className:"editable not-looking  page-".concat(o," row-").concat(t,"_col-").concat(r),style:{textAlign:"right",borderTop:"1px dashed #cbd5e1",width:n.width,fontSize:"11px",fontWeight:"500"},children:e[n.datakey]},r):(0,L.jsx)("td",{onClick:u.mp,className:"editable not-looking  page-".concat(o," row-").concat(t,"_col-").concat(r),style:{fontSize:"11px",fontWeight:"500",paddingLeft:"GL_Acct"===n.datakey||"ID_No"===n.datakey?"50px":"10px",width:"".concat(n.width," !important"),textAlign:"Balance"===n.datakey?"right":"left"},children:e[n.datakey]},r)}))},t),(0,L.jsx)("tr",{style:{height:"7px"}})]},t)}))]}),(0,L.jsx)("tfoot",{children:o===e.length-1&&(0,L.jsxs)(d.Fragment,{children:[(0,L.jsx)("tr",{style:{height:"10px"}}),(0,L.jsxs)("tr",{children:[(0,L.jsxs)("td",{style:{fontWeight:"bold",fontSize:"11px"},children:["No. of Records:"," ",(e.flat().length-1).toLocaleString("en-US")]}),(0,L.jsxs)("td",{style:{textAlign:"right",fontWeight:"bold",fontSize:"11px"},children:["TOTAL:"," "]}),h.map((function(t,n){if(!t.total)return n<3?(0,L.jsx)(d.Fragment,{},n):(0,L.jsx)("td",{},n);var o=e.flat().filter((function(e){return!isNaN(parseFloat(e.Balance))&&e.ArrayFooter})).reduce((function(e,t){return e+parseFloat(t.Balance.toString().replace(/,/g,""))}),0);return(0,L.jsx)("td",{style:{fontWeight:"bold",textAlign:"right",fontSize:"11px"},children:isNaN(o)?"0":(0,u.pw)(o)},n)}))]})]})})]})}),(0,L.jsxs)("div",{className:"footer",style:{height:"50px",display:"flex",justifyContent:"space-between"},children:[(0,L.jsx)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:(0,M.Z)(new Date,"dd/MM/yyyy")}),(0,L.jsxs)("p",{style:{fontSize:"10px",fontWeight:"bold"},children:["Page ",o+1," of ",e.length]})]})]},o)}))},pageHeight:"14in",pageWidth:"8.5in"})}function U(e,t){return"".concat("UMIS"===t?"UPWARD MANAGEMENT INSURANCE SERVICES":"UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC.","\nSchedule of ").concat(0===e.format?"Accounts ":"".concat(e.account_title," (").concat(e.account,") "),"\nCut off Date: ").concat(function(e){var t="";if("Daily"===e.dateFormat)t=e.dateFrom.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});else if("Monthly"===e.dateFormat)t=e.dateFrom.toLocaleDateString("en-US",{year:"numeric",month:"long"});else if("Yearly"===e.dateFormat){var n=function(e,t){var n=new Date(e,0,1),o=new Date(e+t,11,31),r=n.getFullYear(),a=o.getFullYear();return a<r?{startYearFormatted:a,endYearFormatted:r}:{startYearFormatted:r,endYearFormatted:a}}(new Date(e.dateFrom).getFullYear(),parseInt(e.yearCount)),o=n.startYearFormatted,r=n.endYearFormatted;t="".concat(o,"-").concat(r)}else{var a=e.dateFrom.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),i=e.dateTo.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});t="".concat(a," to ").concat(i)}return t}(e),"\n")}},93263:function(e,t,n){var o,r=n(29439),a=n(74165),i=n(15861),l=n(72791),d=n(91933),u=n(3380),c=n(81582),s=n(54164),h=n(80184);function p(e,t,n){return(o=o||(0,i.Z)((0,a.Z)().mark((function e(t,n,o){var r,i=arguments;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=i.length>3&&void 0!==i[3]?i[3]:"",e.abrupt("return",t.get("".concat(null===o||void 0===o?void 0:o.url,"?").concat(null===o||void 0===o?void 0:o.queryUrlName,"=").concat(r),{headers:{Authorization:"Bearer ".concat(null===n||void 0===n?void 0:n.accessToken)}}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t.Z=function(e){var t,n,o=e.link,f=e.uniqueId,x=e.queryKey,m=e.responseDataKey,v=e.columns,g=e.onSelected,b=void 0===g?function(){}:g,y=e.onRemoveSelected,w=void 0===y?function(){}:y,S=e.onSuccess,j=void 0===S?function(){}:S,D=e.searchRef,F=e.onCellKeyDown,C=e.onCloseFunction,k=void 0===C?function(){}:C,I=e.CustomizeAxios,Z=void 0===I?p:I,M=e.isRowSelectable,L=e.getCellClassName,A=(0,l.useContext)(u.V),z=A.myAxios,E=A.user,N=(0,l.useState)(!1),_=(0,r.Z)(N,2),P=_[0],T=_[1],R=(0,l.useState)([]),U=(0,r.Z)(R,2),q=U[0],W=U[1];function K(){return(t=t||(0,i.Z)((0,a.Z)().mark((function e(){var t,n=arguments;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:"",e.next=3,Z(z,E,o,t);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var G=(0,d.useQuery)({queryKey:x,queryFn:function(){return(n=n||(0,i.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t=e;W(t.data[m]),j(t)},refetchOnWindowFocus:!1}),H=G.isLoading,B=G.refetch;return{show:P,rows:q,isLoading:H,openModal:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";(0,s.flushSync)((function(){T(!0)})),null!==D&&void 0!==D&&D.current&&(D.current.value=e,K(e).then((function(e){if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));W(e.data[m]),null!==D&&void 0!==D&&D.current&&D.current.focus()})))},closeModal:function(){var e;(T(!1),k)&&k(null===D||void 0===D||null===(e=D.current)||void 0===e?void 0:e.value)},ModalComponent:(0,h.jsx)(c.ZP,{getCellClassName:L,searchRef:D,showModal:P,onCloseModal:function(){var e;(T(!1),k)&&k(null===D||void 0===D||null===(e=D.current)||void 0===e?void 0:e.value)},onClickCloseIcon:function(){var e;(T(!1),k)&&k(null===D||void 0===D||null===(e=D.current)||void 0===e?void 0:e.value)},searchOnChange:function(e){},onSearchKeyEnter:function(e){K(e).then((function(e){if(null===e||void 0===e||!e.data.success)return alert("Error : ".concat(null===e||void 0===e?void 0:e.data.message));W(e.data[m])}))},onCellKeyDown:F,height:300,isLoading:H,queryKey:x,columns:v,onSelectionChange:function(e,t){if(e.length<=0)return w(t);var n=new Set(e),o=t.filter((function(e){return n.has(e[f].toString())}));o.length<=0||b(o,t)},id:f,rows:q,setRows:W,isRowSelectable:M}),refetch:B}}},91421:function(e,t,n){var o=n(64836);t.Z=void 0;var r=o(n(45649)),a=n(80184),i=(0,r.default)([(0,a.jsx)("circle",{cx:"10",cy:"8",r:"4"},"0"),(0,a.jsx)("path",{d:"M10.35 14.01C7.62 13.91 2 15.27 2 18v2h9.54c-2.47-2.76-1.23-5.89-1.19-5.99zm9.08 4.01c.36-.59.57-1.28.57-2.02 0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c.74 0 1.43-.22 2.02-.57L20.59 22 22 20.59l-2.57-2.57zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"},"1")],"PersonSearch");t.Z=i},45987:function(e,t,n){n.d(t,{Z:function(){return r}});var o=n(63366);function r(e,t){if(null==e)return{};var n,r,a=(0,o.Z)(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}}}]);
//# sourceMappingURL=470.231a24e0.chunk.js.map