"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[8344,2074,7899],{28647:function(e,t,n){n.r(t),n.d(t,{default:function(){return W},reducer:function(){return O}});var a=n(74165),o=n(15861),i=n(29439),r=n(4942),s=n(1413),l=n(72791),c=n(68096),d=n(94925),u=n(58406),p=n(23786),h=n(77196),x=n(63466),f=n(13400),m=n(36151),v=n(88447),g=n(64554),S=n(20890),w=n(73766),y=n(27391),k=n(39709),b=n(42419),C=n(29823),Z=n(21830),D=n.n(Z),N=n(16656),j=n(3380),P=n(5403),R=n(91933),A=n(8185),E=n(13784),I=n(16386),F=n(54164),M=n(93346),_=n(70272),T=n(80184),L=[{field:"PNo",headerName:"PN No.",width:130},{field:"IDNo",headerName:"I.D. No",width:130},{field:"dateRecieved",headerName:"Date Received",width:120},{field:"Name",headerName:"Name",width:350},{field:"Check_Date",headerName:"Check Date",width:120},{field:"Check_No",headerName:"Check No.",width:120},{field:"Check_Amnt",headerName:"Check",width:130,type:"number"},{field:"Bank",headerName:"Bank",width:100},{field:"PDC_Status",headerName:"PDC Status",width:100},{field:"PDC_ID",headerName:"PDC_ID",width:100,hide:!0}],z={pdcStatus:"",searchType:"",searchBy:"IDNo",remarks:"",search:"",warehouseMode:"",modalRCPNoSearch:"",pdcStatusDisable:!1,pdcStatusDisableOnSearch:!1},B={pdcStatus:0,pdcRemarks:"",pnno:"",sort:0,dateFrom:new Date,dateTo:new Date,specificDate:!1},O=function(e,t){return"UPDATE_FIELD"===t.type?(0,s.Z)((0,s.Z)({},e),{},(0,r.Z)({},t.field,t.value)):e};function W(){var e,t,n,r,Z,E,I=(0,l.useRef)(null),F=(0,l.useState)(!1),B=(0,i.Z)(F,2),W=B[0],K=B[1],G=(0,l.useState)(!1),H=(0,i.Z)(G,2),q=H[0],V=H[1],Y=(0,l.useContext)(j.V),J=Y.myAxios,Q=Y.user,X=(0,l.useState)([]),$=(0,i.Z)(X,2),ee=$[0],te=$[1],ne=(0,l.useState)([]),ae=(0,i.Z)(ne,2),oe=ae[0],ie=ae[1],re=(0,l.useState)([]),se=(0,i.Z)(re,2),le=se[0],ce=se[1],de=(0,l.useReducer)(O,z),ue=(0,i.Z)(de,2),pe=ue[0],he=ue[1],xe=(0,l.useRef)(null),fe=(0,l.useRef)(null),me=(0,l.useRef)(null),ve=(0,l.useRef)(null),ge=(0,R.useMutation)({mutationKey:"pullout-rcpn-approved",mutationFn:function(t){return(e=e||(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.post("/task/accounting/pullout/approved/load-rcpn-approved",t,{headers:{Authorization:"Bearer ".concat(null===Q||void 0===Q?void 0:Q.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){ce(e.data.rcpn)}}),Se=ge.isLoading,we=ge.mutate,ye=(0,R.useMutation)({mutationKey:"pullout-approved-list",mutationFn:function(e){return(t=t||(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.post("/task/accounting/pullout/approved/load-rcpn-approved-list",t,{headers:{Authorization:"Bearer ".concat(null===Q||void 0===Q?void 0:Q.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){ie(e.data.rcpnList)}}),ke=ye.isLoading,be=ye.mutate,Ce=(0,R.useMutation)({mutationKey:"check-serach",mutationFn:function(e){return(n=n||(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",J.post("/task/accounting/warehouse/search-pdc-checks-client-policy",t,{headers:{Authorization:"Bearer ".concat(null===Q||void 0===Q?void 0:Q.accessToken)}}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){te(e.data.data),setTimeout((function(){var e;null===me||void 0===me||null===(e=me.current)||void 0===e||e.focus()}),100)}}),Ze=Ce.isLoading,De=Ce.mutate,Ne=(0,R.useQuery)({queryKey:"search-approved-pullout",queryFn:function(){return(r=r||(0,o.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.get("/task/accounting/warehouse/search-approved-pullout-warehouse?searchApprovedPullout=",{headers:{Authorization:"Bearer ".concat(null===Q||void 0===Q?void 0:Q.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},refetchOnWindowFocus:!1}),je=Ne.isLoading,Pe=(0,R.useMutation)({mutationKey:"selected-check",mutationFn:function(e){return(Z=Z||(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.post("/task/accounting/warehouse/search-checklist-approved-pullout-warehouse-selected",t,{headers:{Authorization:"Bearer ".concat(null===Q||void 0===Q?void 0:Q.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){te([]),te(null===e||void 0===e?void 0:e.data.data)}}),Re=Pe.mutate,Ae=Pe.isLoading,Ee=(0,R.useMutation)({mutationKey:"save-warehouse",mutationFn:function(e){return(E=E||(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.post("/task/accounting/warehouse/save",t,{headers:{Authorization:"Bearer ".concat(null===Q||void 0===Q?void 0:Q.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){return e.data.success?((0,A.setNewStateValue)(he,z),te([]),ie([]),D().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500})):D().fire({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:1500})}}),Ie=Ee.mutate,Fe=Ee.isLoading,Me=function(e){var t=e.target,n=t.name,a=t.value;he({type:"UPDATE_FIELD",field:n,value:a})},_e=window.innerWidth-100,Te=window.innerHeight-55;return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(_.Z,{title:"Treasury"}),(0,T.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%",flex:1,padding:"5px"},children:[(0,T.jsxs)("div",{style:{height:"80px",display:"flex",columnGap:"50px",padding:"10px 40px"},children:[(0,T.jsxs)("div",{style:{display:"flex",flex:1,flexDirection:"column",gap:"10px  "},children:[(0,T.jsxs)("div",{style:{display:"flex",columnGap:"10px"},children:[(0,T.jsxs)(c.Z,{disabled:"add"!==pe.warehouseMode||pe.pdcStatusDisableOnSearch||pe.pdcStatusDisable,size:"small",variant:"outlined",sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,T.jsx)(d.Z,{id:"label-selection-reason",children:"PDC Status"}),(0,T.jsxs)(u.Z,{labelId:"label-selection-reason",value:pe.pdcStatus,name:"pdcStatus",onChange:function(e){return Me(e),"2"===e.target.value?he({type:"UPDATE_FIELD",field:"remarks",value:"Fully Paid"}):he({type:"UPDATE_FIELD",field:"remarks",value:""})},autoWidth:!0,sx:{height:"27px",fontSize:"14px"},children:[(0,T.jsx)(p.Z,{value:""}),(0,T.jsx)(p.Z,{value:"0",children:"Stored in Warehouse"}),(0,T.jsx)(p.Z,{value:"1",children:"Endorse for Deposit"}),(0,T.jsx)(p.Z,{value:"2",children:"Pull Out"})]})]}),(0,T.jsxs)(c.Z,{size:"small",variant:"outlined",disabled:"2"!==pe.pdcStatus||"add"!==pe.warehouseMode,sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,T.jsx)(d.Z,{id:"remarks",children:"Remarks"}),(0,T.jsxs)(u.Z,{labelId:"remarks",value:pe.remarks,name:"remarks",onChange:Me,autoWidth:!0,sx:{height:"27px",fontSize:"14px"},children:[(0,T.jsx)(p.Z,{value:""}),(0,T.jsx)(p.Z,{value:"Fully Paid",children:"Fully Paid"}),(0,T.jsx)(p.Z,{value:"Cash Replacement",children:"Cash Replacement"}),(0,T.jsxs)(p.Z,{value:"Check Replacement",children:["Check Replacement"," "]}),(0,T.jsx)(p.Z,{value:"Account Closed",children:"Account Closed "}),(0,T.jsx)(p.Z,{value:"Hold",children:"Hold "}),(0,T.jsx)(p.Z,{value:"Not Renewed by",children:"Not Renewed by "})]})]})]}),(0,T.jsxs)("div",{style:{display:"flex",columnGap:"10px"},children:[(0,T.jsxs)(c.Z,{size:"small",variant:"outlined",disabled:"add"!==pe.warehouseMode,sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,T.jsx)(d.Z,{id:"search-type",children:"Search Type"}),(0,T.jsxs)(u.Z,{labelId:"search-type",value:pe.searchType,name:"searchType",onChange:Me,autoWidth:!0,sx:{height:"27px",fontSize:"14px"},children:[(0,T.jsx)(p.Z,{value:""}),(0,T.jsx)(p.Z,{value:"0",children:"Policy "}),(0,T.jsx)(p.Z,{value:"1",children:"ID No."}),(0,T.jsx)(p.Z,{value:"2",children:"Account Name"}),(0,T.jsx)(p.Z,{value:"3",children:"Bank"})]})]}),Ze?(0,T.jsx)(k.Z,{loading:Ze}):(0,T.jsxs)(c.Z,{variant:"outlined",size:"small",sx:{flex:1,".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},disabled:"add"!==pe.warehouseMode,children:[(0,T.jsx)(d.Z,{htmlFor:"Search",children:"Search"}),(0,T.jsx)(h.Z,{sx:{height:"27px",fontSize:"14px"},inputRef:me,className:"search-input-up-on-key-down",fullWidth:!0,label:"Search",name:"search",value:pe.search,onChange:Me,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code){if(e.preventDefault(),""===pe.pdcStatus)return D().fire({position:"center",icon:"warning",title:"Please provide status!",showConfirmButton:!1,timer:1500});if(""===pe.searchType)return D().fire({position:"center",icon:"warning",title:"Please select search type!",showConfirmButton:!1,timer:1500});if(""===pe.search)return D().fire({position:"center",icon:"warning",title:"Type field you want to search!",showConfirmButton:!1,timer:1500});De(pe)}"ArrowDown"===e.key&&(e.preventDefault(),document.querySelector(".grid-container").focus())},id:"policy-client-ref-id",endAdornment:(0,T.jsx)(x.Z,{position:"end",children:(0,T.jsx)(f.Z,{disabled:"add"!==pe.warehouseMode,"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){return""===pe.pdcStatus?D().fire({position:"center",icon:"warning",title:"Please provide status!",showConfirmButton:!1,timer:1500}):""===pe.searchType?D().fire({position:"center",icon:"warning",title:"Please select search type!",showConfirmButton:!1,timer:1500}):""===pe.search?D().fire({position:"center",icon:"warning",title:"Type field you want to search!",showConfirmButton:!1,timer:1500}):void De(pe)},children:(0,T.jsx)(P.Z,{})})})})]})]})]}),(0,T.jsx)("div",{style:{display:"flex",flex:1},children:(0,T.jsxs)("div",{style:{display:"flex",alignItems:"flex-end",columnGap:"10px",paddingBottom:"5px"},children:[""===pe.warehouseMode&&(0,T.jsx)(m.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,T.jsx)(b.Z,{sx:{width:15,height:15}}),id:"entry-header-save-button",onClick:function(){Me({target:{value:"add",name:"warehouseMode"}})},color:"primary",children:"New"}),(0,T.jsx)(k.Z,{sx:{height:"30px",fontSize:"11px"},disabled:""===pe.warehouseMode,onClick:function(){D().fire({title:"Are you sure?",text:"Do you want the check(s) to be "+["stored in warehouse?","endorse for deposit?","pulled out?"][parseInt(pe.pdcStatus)],icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!"}).then((function(e){if(e.isConfirmed){if("2"===pe.pdcStatus&&""===pe.remarks)return D().fire({position:"center",icon:"warning",title:"Please provide remarks!",timer:3e3});if(ee.length<=0)return D().fire({position:"center",icon:"warning",title:"No current record",timer:3e3});var t=xe.current.getSelectedRows();if(t.length<=0&&!pe.pdcStatusDisable)return D().fire({position:"center",icon:"warning",title:"Please select from list",timer:3e3});pe.pdcStatusDisable?Ie((0,s.Z)((0,s.Z)({},pe),{},{selected:JSON.stringify(ee)})):Ie((0,s.Z)((0,s.Z)({},pe),{},{selected:JSON.stringify(t)}))}}))},color:"success",variant:"contained",children:"Save"}),""!==pe.warehouseMode&&(0,T.jsx)(k.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,T.jsx)(C.Z,{sx:{width:15,height:15}}),color:"error",onClick:function(){D().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){var t;e.isConfirmed&&((0,A.setNewStateValue)(he,z),null===(t=xe.current)||void 0===t||t.resetTableSelected(),te([]))}))},children:"Cancel"}),(0,T.jsx)(k.Z,{sx:{height:"30px",fontSize:"11px"},disabled:""===pe.warehouseMode||"add"===pe.warehouseMode,color:"success",variant:"contained",children:"Delete"}),(0,T.jsx)(m.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",color:"info",onClick:function(){return V((function(e){return!e}))},children:"REPORT"}),(0,T.jsx)(k.Z,{sx:{height:"30px",fontSize:"11px",background:N.Z[500],":hover":{background:N.Z[600]}},variant:"contained",onClick:function(){K(!0),be({RCPN:""}),we({}),setTimeout((function(){var e;null===(e=ve.current)||void 0===e||e.focus()}),250)},disabled:""===pe.warehouseMode,children:"Check for pull-out"})]})})]}),(0,T.jsx)("div",{ref:I,style:{marginTop:"10px",width:"100%",position:"relative",flex:1},children:(0,T.jsx)(M.r,{ref:xe,isLoading:ke||Ae||Fe,rows:ee,column:L,width:_e,height:Te,dataReadOnly:!0,onSelectionChange:function(){},isMultipleSelect:!pe.pdcStatusDisable,isRowSelectable:!pe.pdcStatusDisable})}),(0,T.jsx)(v.Z,{open:W,onClose:function(){K(!1)},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,T.jsxs)(g.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",p:4},children:[(0,T.jsx)(S.Z,{id:"modal-modal-title",variant:"h6",component:"h2",children:"Pull Out Viewer"}),(0,T.jsx)("br",{}),(0,T.jsxs)("div",{style:{display:"flex",columnGap:"10px",width:"800px",height:"500px",flexDirection:"column"},children:[je?(0,T.jsx)(k.Z,{loading:je}):(0,T.jsx)(w.Z,{loading:Se,freeSolo:!0,options:le.map((function(e){return e.RCPNo})),value:pe.modalRCPNoSearch,onChange:function(e,t){t&&(he({type:"UPDATE_FIELD",field:"modalRCPNoSearch",value:t}),be({RCPN:t}))},onInput:function(e){he({type:"UPDATE_FIELD",field:"modalRCPNoSearch",value:e.target.value})},onBlur:function(e){var t=le.find((function(e){return e.RCPNo===pe.modalRCPNoSearch}));void 0!==t&&(he({type:"UPDATE_FIELD",field:"modalRCPNoSearch",value:t.RCPNo}),be({RCPN:t.RCPNo}))},onKeyDown:function(e){"NumpadEnter"!==e.code&&"Enter"!==e.code||(e.preventDefault(),be({RCPN:pe.modalRCPNoSearch}))},renderInput:function(e){return(0,T.jsx)(y.Z,(0,s.Z)((0,s.Z)({},e),{},{inputRef:ve,InputProps:(0,s.Z)((0,s.Z)({},e.InputProps),{},{style:{height:"27px",fontSize:"14px"}}),label:"PN No."}))},sx:{width:"100%",".MuiFormLabel-root":{fontSize:"14px"},".MuiInputBase-input":{width:"100% !important"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiAutocomplete-input ":{position:"absolute"}},size:"small"}),(0,T.jsx)("div",{style:{marginTop:"10px",width:"100%",position:"relative"},children:(0,T.jsx)(M.r,{ref:fe,rows:oe,column:[{field:"RCPNo",headerName:"RCP No.",width:150},{field:"PNNo",headerName:"PN No.",width:150},{field:"Name",headerName:"Name",flex:1,width:300},{field:"NoOfChecks",headerName:"No. of Checks",width:100},{field:"Reason",headerName:"Reason",flex:1,width:300}],width:800,height:550,dataReadOnly:!0,onSelectionChange:function(e){e.length>0&&(he({type:"UPDATE_FIELD",field:"pdcStatus",value:"2"}),he({type:"UPDATE_FIELD",field:"pdcStatusDisable",value:!0}),he({type:"UPDATE_FIELD",field:"remarks",value:e[0].Reason}),Re({RCPNo:e[0].RCPNo}),K(!1))}})}),(0,T.jsx)(f.Z,{style:{position:"absolute",top:"10px",right:"10px"},"aria-label":"search-client",onClick:function(){K(!1)},children:(0,T.jsx)(C.Z,{})})]})]})}),(0,T.jsx)(U,{showReportModal:q,setShowReportModal:V,myAxios:J,user:Q})]})]})}var U=function(e){var t,n,r=e.setShowReportModal,s=e.showReportModal,h=e.myAxios,x=e.user,f=(0,l.useRef)(),w=(0,l.useRef)(),b=(0,l.useReducer)(O,B),C=(0,i.Z)(b,2),Z=C[0],D=C[1],N=function(e){var t=e.target,n=t.name,a=t.value;D({type:"UPDATE_FIELD",field:n,value:a})},j=(0,R.useMutation)({mutationKey:"report",mutationFn:function(e){return(t=t||(0,o.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.post("/task/accounting/warehouse/report",t,{headers:{Authorization:"Bearer ".concat(null===x||void 0===x?void 0:x.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t=e,n="\n      ".concat("UMIS"===(null===x||void 0===x?void 0:x.department)?"UPWARD INSURANCE MANAGEMENT SERVICES \n":"UPWARD CONSULTANCY SERVICES AND MANAGEMENT INC.\n","\n      Post Dated Checks Warehousing Report\n\n      ").concat(["ALL","Stored","Endorsed","Pulled Out"][Z.pdcStatus]," ").concat("ALL"===Z.pdcRemarks?"":"(".concat(Z.pdcRemarks,")")," - (").concat(Z.specificDate?(0,I.Z)(Z.dateFrom,"MM/dd/yyyy"):"".concat((0,I.Z)(Z.dateFrom,"MM/dd/yyyy")," To ").concat((0,I.Z)(Z.dateTo,"MM/dd/yyyy")),")\n      ");console.log(n),(0,F.flushSync)((function(){localStorage.removeItem("printString"),localStorage.setItem("dataString",JSON.stringify(t.data.data)),localStorage.setItem("paper-width","8.5in"),localStorage.setItem("paper-height","11in"),localStorage.setItem("module","warehouse"),localStorage.setItem("state",JSON.stringify(Z)),localStorage.setItem("column",JSON.stringify([{datakey:"nRef_no",header:"Reference No.",width:"50px"},{datakey:"nNAME",header:"Name",width:"250px"},{datakey:"Check_No",header:"Check No.",width:"70px"},{datakey:"Check_Date",header:"Check Date",width:"70px"},{datakey:"Check_Amnt",header:"Check Amount",width:"70px"},{datakey:"check_remarks",header:"Reason",width:"100px"}])),localStorage.setItem("title",n)})),window.open("/dashboard/print","_blank")}}),P=j.isLoading,A=j.mutate;return(0,T.jsx)(v.Z,{open:s,onClose:function(){r(!1)},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,T.jsxs)(g.Z,{sx:{position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",width:"350px",height:"auto"},children:[(0,T.jsx)(S.Z,{id:"modal-modal-title",variant:"body2",component:"h3",sx:{marginBottom:"10px",p:1,textAlign:"center",background:"#dbeafe"},children:"Post Dated Checks Warehousing Report"}),(0,T.jsxs)("div",{style:{display:"flex",flexDirection:"column",rowGap:"10px",width:"100%",padding:"10px",height:"100%"},children:[(0,T.jsxs)(c.Z,{size:"small",variant:"outlined",sx:{width:"100%",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,T.jsx)(d.Z,{id:"label-selection-reason",children:"PDC Status"}),(0,T.jsxs)(u.Z,{labelId:"label-selection-reason",value:Z.pdcStatus,name:"pdcStatus",onChange:N,autoWidth:!0,sx:{height:"27px",fontSize:"14px"},children:[(0,T.jsx)(p.Z,{value:0,children:"ALL"}),(0,T.jsx)(p.Z,{value:1,children:"Store in Warehouse"}),(0,T.jsx)(p.Z,{value:2,children:"Endorse for Deposit"}),(0,T.jsx)(p.Z,{value:3,children:"Pull Out"})]})]}),(0,T.jsxs)(c.Z,{disabled:3!==Z.pdcStatus,size:"small",variant:"outlined",sx:{width:"100%",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,T.jsx)(d.Z,{id:"label-selection-reason",children:"PDC Remarks"}),(0,T.jsxs)(u.Z,{labelId:"label-selection-reason",value:Z.pdcRemarks,name:"pdcRemarks",onChange:N,autoWidth:!0,sx:{height:"27px",fontSize:"14px"},children:[(0,T.jsx)(p.Z,{value:"ALL",children:"ALL"}),(0,T.jsx)(p.Z,{value:"Fully Paid",children:"Fully Paid"}),(0,T.jsx)(p.Z,{value:"Replaced",children:"Replaced"}),(0,T.jsx)(p.Z,{value:"Foreclosed",children:"Foreclosed"}),(0,T.jsx)(p.Z,{value:"Account Closed",children:"Account Closed"})]})]}),(0,T.jsx)(y.Z,{label:"PN No.",size:"small",name:"pnno",value:Z.pnno,onChange:N,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,T.jsxs)(c.Z,{size:"small",variant:"outlined",sx:{width:"100%",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,T.jsx)(d.Z,{id:"label-selection-reason",children:"Sort Name By"}),(0,T.jsxs)(u.Z,{labelId:"label-selection-reason",value:Z.sort,name:"sort",onChange:N,autoWidth:!0,sx:{height:"27px",fontSize:"14px"},children:[(0,T.jsx)(p.Z,{value:0,children:"Ascending"}),(0,T.jsx)(p.Z,{value:1,children:"Descending"})]})]}),(0,T.jsxs)("div",{style:{border:"1px solid black",borderRadius:"6px",padding:"10px",display:"flex",flexDirection:"column",rowGap:"10px",marginBottom:"10px"},children:[(0,T.jsxs)("div",{style:{display:"flex",columnGap:"10px",width:"100%"},children:[(0,T.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,T.jsxs)("label",{htmlFor:"checkbox1",style:{fontSize:"13px",fontWeight:"500"},children:["Date Range :"," "]})," ",(0,T.jsx)("input",{checked:!Z.specificDate,id:"checkbox1",style:{fontSize:"13px",fontWeight:"500"},type:"checkbox",onChange:function(){N({target:{value:!1,name:"specificDate"}})}})]}),(0,T.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,T.jsxs)("label",{htmlFor:"checkbox2",style:{fontSize:"13px",fontWeight:"500"},children:["Specific Date :"," "]})," ",(0,T.jsx)("input",{checked:Z.specificDate,id:"checkbox2",type:"checkbox",onChange:function(){N({target:{value:!0,name:"specificDate"}})}})]})]}),(0,T.jsx)(E.Z,{fullWidth:!1,disabled:!Z.specificDate,label:"Date From",onChange:function(e){D({type:"UPDATE_FIELD",field:"dateFrom",value:e})},value:new Date(Z.dateFrom),onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=f.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:f,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}}),(0,T.jsx)(E.Z,{fullWidth:!1,label:"Date To",disabled:!Z.specificDate,onChange:function(e){D({type:"UPDATE_FIELD",field:"dateTo",value:e})},value:new Date(Z.dateTo),onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,n;null===(e=w.current)||void 0===e||null===(n=e.querySelector("button"))||void 0===n||n.click(),clearTimeout(t)}),150)},datePickerRef:w,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}}})]}),(0,T.jsxs)("div",{style:{width:"100%",display:"flex",justifyContent:"space-between",marginBottom:"10px"},children:[(0,T.jsx)(k.Z,{loading:P,disabled:P,sx:{height:"30px",fontSize:"11px",width:"150px"},variant:"contained",color:"success",onClick:function(){return(n=n||(0,o.Z)((0,a.Z)().mark((function e(){var t,n,o,i,r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=["(PDC_Status='Stored' OR PDC_Status='Endorsed' OR PDC_Status='Pulled Out')","(PDC_Status='Stored')","(PDC_Status='Endorsed')","(PDC_Status='Pulled Out')"],n=["Check_Date","Date_Stored","Date_Endorsed","Date_Pulled_Out"][Z.pdcStatus],o="WHERE ".concat(t[Z.pdcStatus]),Z.pdcRemarks&&(o+=" AND ifnull(PDC_Remarks,'') = '".concat(Z.pdcRemarks,"'")),Z.pnno&&(o+=" AND PNo = '".concat(Z.pnno,"'")),Z.specificDate?o+=" AND (".concat(n," >= '").concat(Z.dateFrom.toISOString().split("T")[0],"' AND ").concat(n," <= '").concat(Z.dateTo.toISOString().split("T")[0],"')"):o+="",i=0===Z.sort?"ASC":"DESC",r="SELECT \n                        *,\n                      CASE WHEN @prev_source_no = a.ref_no THEN '' ELSE a.ref_no END AS nRef_no,\n                      CASE WHEN @prev_source_no = a.ref_no THEN '' ELSE concat(a.PNo ,'    ',a.NAME) END AS nNAME,\n                      @prev_source_no := a.ref_no AS prev_source_no\n                    FROM \n                    (SELECT ref_no, check_remarks,Date_Pulled_Out,PNo, IDNo, UPPER(Name) AS NAME, Bank, date_format(Check_Date,'%m/%d/%Y') as Check_Date, Check_No,FORMAT(Check_Amnt, 2)   as Check_Amnt \n                        FROM PDC ".concat(o," ORDER BY Name ").concat(i,") AS a"),A({query:r});case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)},children:"Preview / Print"}),(0,T.jsx)(m.Z,{sx:{height:"30px",fontSize:"11px",width:"150px"},variant:"contained",color:"warning",onClick:function(){r(!1)},children:"Close"})]})]})]})})}},16656:function(e,t){t.Z={50:"#efebe9",100:"#d7ccc8",200:"#bcaaa4",300:"#a1887f",400:"#8d6e63",500:"#795548",600:"#6d4c41",700:"#5d4037",800:"#4e342e",900:"#3e2723",A100:"#d7ccc8",A200:"#bcaaa4",A400:"#8d6e63",A700:"#5d4037"}}}]);
//# sourceMappingURL=8344.f816cc54.chunk.js.map