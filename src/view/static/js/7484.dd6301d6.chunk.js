(self.webpackChunkupward=self.webpackChunkupward||[]).push([[7484],{89767:function(e,n,t){"use strict";var o=t(93433),i=t(1413),r=t(29439),a=t(72791),c=t(57482),s=t(64554),u=t(25060),l=t(29961),d=t(54277),f=t(70169),h=t(6484),p=t(16088),v=t(80184),m=(0,a.createContext)({rows:[],rowSelectionModel:[],footerChildren:function(){return(0,v.jsx)("div",{})},footerPaginationPosition:"right-left",showFooterSelectedCount:!0}),x=(0,a.forwardRef)((function(e,n){var t=e.isLoading,s=e.columns,l=e.rows,d=e.table_id,f=e.isSingleSelection,h=e.isRowFreeze,p=e.dataSelection,x=e.CustomFooterComponent,g=void 0===x?C:x,w=e.isRowSelectable,k=e.getCellClassName,b=e.checkboxSelection,y=void 0===b||b,S=e.footerChildren,Z=void 0===S?function(e,n){return(0,v.jsx)("div",{})}:S,B=e.footerPaginationPosition,D=void 0===B?"right-left":B,j=e.showFooterSelectedCount,I=void 0===j||j,M=(0,a.useState)([]),z=(0,r.Z)(M,2),_=z[0],T=z[1];function N(e,n,t){p&&p(e,n,t)}(0,a.useImperativeHandle)(n,(function(){return{removeSelection:function(){T([])},getSelectedRows:function(){return l.filter((function(e){return null===_||void 0===_?void 0:_.includes(e[d])}))},setSelectedRows:function(e){T(e)}}}));var P=[];return(0,v.jsx)(m.Provider,{value:{showFooterSelectedCount:I,footerPaginationPosition:D,rowSelectionModel:_,rows:l,footerChildren:Z},children:(0,v.jsx)(u._$,{slots:{loadingOverlay:c.Z,footer:g},initialState:{pagination:{paginationModel:{pageSize:35}}},loading:t,getRowId:function(e){return e[d]},columns:s.filter((function(e){return!e.hide})),rows:l,showCellVerticalBorder:!0,showColumnVerticalBorder:!0,checkboxSelection:y,rowSelectionModel:_,rowHeight:25,columnHeaderHeight:35,pageSizeOptions:[10,20,35,50,75,100],sx:(0,i.Z)((0,i.Z)({"& .cash":{color:"#ec4899"},"& .check":{color:"#0891b2"},"& .approved":{color:"green"},"& .pending":{color:"orange"},"& .disapproved":{color:"red"},"& .normal":{color:"red"},"& .MuiDataGrid-row.Mui-selected:hover":{color:"black","& .MuiSvgIcon-root ":{fill:"#3b82f6"}},"& .hover-keyboard":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row:hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row.hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiTablePagination-root p ":{padding:"0 !important"}},{"& .MuiDataGrid-columnHeaders":{background:"#64748b",color:"white",fontSize:"14px"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer .MuiSvgIcon-root ":{display:f||h?"none":"block",fill:"white"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer input ":{display:f||h?"none":"block"}}),{fontSize:13,fontWeight:500,"& .MuiDataGrid-checkboxInput":{height:"27px",width:"27px"},"& .MuiDataGrid-checkboxInput svg":{height:"20px",width:"20px"}}),onRowSelectionModelChange:function(e){if(h){if(e.length<=0)return;if(P=e,_.includes(P[P.length-1]))return;return T(e),void N([e[e.length-1]],l,null)}if(!h&&f)if(_&&(null===_||void 0===_?void 0:_.length)>0){var n=new Set(_);T(e.filter((function(e){return!n.has(e)})))}else T(e);else T(e);N([e[e.length-1]],l,null)},onCellKeyDown:function(e,n){if(["NumpadEnter","Enter","Delete","Backspace"].includes(n.code))return n.preventDefault(),"Enter"===n.code||"NumpadEnter"===n.code?f&&!h?T((function(t){return t&&t.length>0&&t[0]===e.rowNode.id?(N([],l,n.code),[]):(N([e.rowNode.id],l,n.code),[e.rowNode.id])})):void T((function(t){return t&&!h&&t.length>0&&t.includes(e.rowNode.id)?(t=t.filter((function(n){return n!==e.rowNode.id})),N([],l,n.code),t):t&&h&&t.length>0&&t.includes(e.rowNode.id)?t:(N([e.rowNode.id],l,n.code),[].concat((0,o.Z)(t),[e.rowNode.id]))})):"Delete"===n.code||"Backspace"===n.code?(T([e.rowNode.id]),N([e.rowNode.id],l,n.code)):void 0},disableVirtualization:!0,isRowSelectable:w,getCellClassName:k})})}));function g(e){var n=e.page,t=e.onPageChange,o=e.className,i=(0,l.l)(),r=(0,d.P)(i,f.UB);return(0,v.jsx)(p.Z,{variant:"outlined",color:"primary",className:o,count:r,page:n+1,onChange:function(e,n){t(e,n-1)}})}function w(e){return(0,v.jsx)(h.x,(0,i.Z)({ActionsComponent:g},e))}function C(e){var n=(0,a.useContext)(m),t=n.rowSelectionModel,o=n.showFooterSelectedCount,r=n.footerPaginationPosition,c=n.footerChildren,u=n.rows;return(0,v.jsxs)(s.Z,{sx:{columnGap:"50px",display:"flex",width:"100%",justifyContent:"space-between",px:3,alignItems:"center",flexDirection:"right-left"===r?"row-reverse":"row"},children:[(0,v.jsx)(w,(0,i.Z)({},e)),(0,v.jsxs)(s.Z,{sx:{display:"flex",justifyContent:"right-left"===r?"flex-start":"flex-end",flex:1,alignItems:"center"},children:[o&&(0,v.jsxs)("div",{children:["Selected:",null===t||void 0===t?void 0:t.length]}),(0,v.jsx)("div",{children:c(t,u)})]})]})}n.Z=x},42272:function(e,n,t){"use strict";t.r(n),t.d(n,{bankColumn:function(){return M},default:function(){return _},reducer:function(){return I},setNewStateValue:function(){return T}});var o=t(74165),i=t(15861),r=t(29439),a=t(4942),c=t(1413),s=t(72791),u=t(64554),l=t(27391),d=t(36151),f=t(42419),h=t(27247),p=t(4378),v=t(3380),m=t(91933),x=t(21830),g=t.n(x),w=t(79018),C=t(29823),k=t(53329),b=t(94454),y=t(85523),S=t(39709),Z=t(89767),B=t(64230),D=t(80184),j={Bank_Code:"",Bank:"",Inactive:!1,search:"",mode:""},I=function(e,n){return"UPDATE_FIELD"===n.type?(0,c.Z)((0,c.Z)({},e),{},(0,a.Z)({},n.field,n.value)):e},M=[{field:"Bank_Code",headerName:"Bank Code",flex:1},{field:"Bank",headerName:"Bank",flex:1},{field:"Inactive",headerName:"Active",flex:1}],z="bank";function _(){var e,n,t,x,_,N=(0,s.useRef)(null),P=(0,s.useReducer)(I,j),A=(0,r.Z)(P,2),E=A[0],F=A[1],L=(0,s.useContext)(v.V),R=L.myAxios,G=L.user,H=(0,s.useState)([]),O=(0,r.Z)(H,2),V=O[0],U=O[1],q=(0,s.useRef)(null),K=(0,m.useQueryClient)(),W=(0,m.useQuery)({queryKey:z,queryFn:function(){return(e=e||(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.get("/reference/get-banks?bankSearch=".concat(E.search),{headers:{Authorization:"Bearer ".concat(null===G||void 0===G?void 0:G.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){U(null===e||void 0===e?void 0:e.data.bank)}}),Y=W.isLoading,Q=W.refetch,X=(0,m.useMutation)({mutationKey:z,mutationFn:function(e){return(n=n||(0,i.Z)((0,o.Z)().mark((function e(n){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.post("/reference/add-bank",n,{headers:{Authorization:"Bearer ".concat(null===G||void 0===G?void 0:G.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:ue}),$=X.mutate,J=X.isLoading,ee=(0,m.useMutation)({mutationKey:z,mutationFn:function(e){return(t=t||(0,i.Z)((0,o.Z)().mark((function e(n){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.post("/reference/update-bank",n,{headers:{Authorization:"Bearer ".concat(null===G||void 0===G?void 0:G.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:ue}),ne=ee.mutate,te=ee.isLoading,oe=(0,m.useMutation)({mutationKey:z,mutationFn:function(e){return(x=x||(0,i.Z)((0,o.Z)().mark((function e(n){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.post("/reference/delete-bank",n,{headers:{Authorization:"Bearer ".concat(null===G||void 0===G?void 0:G.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:ue}),ie=oe.mutate,re=oe.isLoading,ae=function(e){var n=e.target,t=n.name,o=n.value;F({type:"UPDATE_FIELD",field:t,value:o})};function ce(e){return e.preventDefault(),""===E.Bank_Code?g().fire({position:"center",icon:"warning",title:"Bank Code is Required",showConfirmButton:!1,timer:1500}):""===E.Bank?g().fire({position:"center",icon:"warning",title:"Bank is Required",showConfirmButton:!1,timer:1500}):E.Bank_Code.length>=10?g().fire({position:"center",icon:"warning",title:"Invalid bank code is too long",showConfirmButton:!1,timer:1500}):E.Bank.length>=50?g().fire({position:"center",icon:"warning",title:"Invalid bank is too long",showConfirmButton:!1,timer:1500}):void("edit"===E.mode?(0,B.s)({isUpdate:!0,cb:function(e){ne((0,c.Z)((0,c.Z)({},E),{},{userCodeConfirmation:e}))}}):(0,B.L)({isConfirm:function(){$(E)}}))}function se(){var e;T(F,j),null===(e=q.current)||void 0===e||e.removeSelection(),(0,w.D)(500).then((function(){Q()}))}function ue(e){if(e.data.success)return K.invalidateQueries(z),se(),g().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500});g().fire({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:1500})}return(0,D.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%",flex:1},children:[(0,D.jsxs)(u.Z,{sx:function(e){return(0,a.Z)({display:"flex",alignItems:"center",columnGap:"20px"},e.breakpoints.down("sm"),{flexDirection:"column",alignItems:"flex-start",marginBottom:"15px"})},children:[(0,D.jsx)("div",{style:{marginTop:"10px",marginBottom:"12px",width:"100%"},children:(0,D.jsx)(l.Z,{label:"Search",fullWidth:!0,size:"small",type:"text",value:E.search,name:"search",onChange:ae,InputProps:{style:{height:"27px",fontSize:"14px"}},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),Q()},sx:{height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})}),(0,D.jsx)("div",{style:{display:"flex",alignItems:"center",columnGap:"20px"},children:(0,D.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px"},children:[""===E.mode&&(0,D.jsx)(d.Z,{variant:"contained",startIcon:(0,D.jsx)(f.Z,{}),id:"entry-header-save-button",sx:{height:"30px",fontSize:"11px"},onClick:function(){ae({target:{value:"add",name:"mode"}})},children:"New"}),(0,D.jsx)(S.Z,{id:"save-entry-header",color:"primary",variant:"contained",type:"submit",sx:{height:"30px",fontSize:"11px"},onClick:ce,startIcon:(0,D.jsx)(k.Z,{}),disabled:""===E.mode,loading:J||te,children:"Save"}),""!==E.mode&&(0,D.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,D.jsx)(C.Z,{}),color:"error",onClick:function(){g().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){e.isConfirmed&&se()}))},children:"Cancel"}),(0,D.jsx)(S.Z,{id:"save-entry-header",variant:"contained",sx:{height:"30px",fontSize:"11px",backgroundColor:p.Z[500],"&:hover":{backgroundColor:p.Z[600]}},loading:re,startIcon:(0,D.jsx)(h.Z,{}),disabled:"edit"!==E.mode,onClick:function(){(0,B.s)({isUpdate:!1,cb:function(e){ie({Bank_Code:E.Bank_Code,userCodeConfirmation:e})}})},children:"Delete"})]})})]}),(0,D.jsx)("form",{onSubmit:ce,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),void ce(e)},children:(0,D.jsxs)(u.Z,{sx:function(e){return(0,a.Z)({width:"100%",display:"flex",columnGap:"15px",flexDirection:"row"},e.breakpoints.down("md"),{flexDirection:"column",rowGap:"10px"})},children:[(0,D.jsx)(l.Z,{InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},required:!0,variant:"outlined",size:"small",label:"Bank Code",name:"Bank_Code",value:E.Bank_Code,onChange:ae,disabled:"edit"===E.mode||""===E.mode}),(0,D.jsx)(l.Z,{required:!0,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},variant:"outlined",size:"small",label:"Bank Name",name:"Bank",value:E.Bank,onChange:ae,disabled:""===E.mode}),(0,D.jsx)(y.Z,{sx:{".MuiTypography-root":{fontSize:"14px"},minWidth:"200px"},disabled:""===E.mode,control:(0,D.jsx)(b.Z,{size:"small",name:"Inactive",checked:E.Inactive,onChange:function(e){F({type:"UPDATE_FIELD",field:"Inactive",value:e.target.checked})}}),label:"Mark As Inactive"})]})}),(0,D.jsx)("div",{ref:N,style:{marginTop:"10px",width:"100%",position:"relative",flex:1},children:(0,D.jsx)(u.Z,{style:{height:"".concat(null===(_=N.current)||void 0===_?void 0:_.getBoundingClientRect().height,"px"),width:"100%",overflowX:"scroll",position:"absolute"},children:(0,D.jsx)(Z.Z,{ref:q,isLoading:Y||re||te||J,columns:M,rows:V,table_id:"Bank_Code",isSingleSelection:!0,isRowFreeze:!1,dataSelection:function(e,n,t){var o=n.filter((function(n){return n.Bank_Code===e[0]}))[0];if(void 0===o||o.length<=0)return T(F,j),void ae({target:{value:"",name:"mode"}});var i={Bank_Code:o.Bank_Code,Bank:o.Bank,Inactive:"NO"===o.Inactive,mode:"edit"};T(F,i),"Delete"!==t&&"Backspace"!==t||(0,w.D)(350).then((function(){(0,B.s)({isUpdate:!1,cb:function(e){ie({Bank_Code:o.Bank_Code,userCodeConfirmation:e})}})}))}})})})]})}function T(e,n){Object.entries(n).forEach((function(n){var t=(0,r.Z)(n,2),o=t[0],i=t[1];e({type:"UPDATE_FIELD",field:o,value:i})}))}},64230:function(e,n,t){"use strict";t.d(n,{L:function(){return s},s:function(){return c}});var o=t(74165),i=t(15861),r=t(21830),a=t.n(r);function c(e){var n;a().fire({title:"Are you sure!",html:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:e.isUpdate?"Are you sure you want to make this change?":"Are you sure you want to delete this?",icon:"warning",input:"text",inputAttributes:{autocapitalize:"off"},showCancelButton:!0,confirmButtonText:"Save",confirmButtonColor:"green",showLoaderOnConfirm:!0,preConfirm:function(t){return(n=n||(0,i.Z)((0,o.Z)().mark((function n(t){return(0,o.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:try{e.cb(t)}catch(o){a().showValidationMessage("\n            Request failed: ".concat(o,"\n          "))}case 1:case"end":return n.stop()}}),n)})))).apply(this,arguments)},allowOutsideClick:function(){return!a().isLoading()}}).then((function(n){if(n.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}function s(e){a().fire({title:"Are you sure?",text:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:"Do you want to proceed with saving?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!"}).then((function(n){if(n.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}},42419:function(e,n,t){"use strict";var o=t(64836);n.Z=void 0;var i=o(t(45649)),r=t(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");n.Z=a},27247:function(e,n,t){"use strict";var o=t(64836);n.Z=void 0;var i=o(t(45649)),r=t(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");n.Z=a},53329:function(e,n,t){"use strict";var o=t(64836);n.Z=void 0;var i=o(t(45649)),r=t(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"}),"Save");n.Z=a},4378:function(e,n){"use strict";n.Z={50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",A100:"#ff80ab",A200:"#ff4081",A400:"#f50057",A700:"#c51162"}},80888:function(e,n,t){"use strict";var o=t(79047);function i(){}function r(){}r.resetWarningCache=i,e.exports=function(){function e(e,n,t,i,r,a){if(a!==o){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function n(){return e}e.isRequired=e;var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:r,resetWarningCache:i};return t.PropTypes=t,t}},52007:function(e,n,t){e.exports=t(80888)()},79047:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);
//# sourceMappingURL=7484.dd6301d6.chunk.js.map