(self.webpackChunkupward=self.webpackChunkupward||[]).push([[5648],{56580:function(e,t,n){"use strict";n.d(t,{a:function(){return s}});var o=n(1413),i=n(45987),r=n(72791),a=n(30948),l=n(80184),u=["onChange"],s=r.forwardRef((function(e,t){var n=e.onChange,r=(0,i.Z)(e,u);return(0,l.jsx)(a.h3,(0,o.Z)((0,o.Z)({},r),{},{getInputRef:t,onValueChange:function(t){n({target:{name:e.name,value:t.value}})},allowNegative:!1,thousandSeparator:!0,valueIsNumericString:!0}))}))},89767:function(e,t,n){"use strict";var o=n(93433),i=n(1413),r=n(29439),a=n(72791),l=n(57482),u=n(64554),s=n(70561),c=n(29961),d=n(54277),f=n(70169),p=n(5794),h=n(16088),m=n(80184),x=(0,a.createContext)({rows:[],rowSelectionModel:[],footerChildren:function(){return(0,m.jsx)("div",{})},footerPaginationPosition:"right-left",showFooterSelectedCount:!0}),v=(0,a.forwardRef)((function(e,t){var n=e.isLoading,u=e.columns,c=e.rows,d=e.table_id,f=e.isSingleSelection,p=e.isRowFreeze,h=e.dataSelection,v=e.CustomFooterComponent,g=void 0===v?C:v,w=e.isRowSelectable,b=e.getCellClassName,y=e.checkboxSelection,S=void 0===y||y,Z=e.footerChildren,k=void 0===Z?function(e,t){return(0,m.jsx)("div",{})}:Z,D=e.footerPaginationPosition,I=void 0===D?"right-left":D,j=e.showFooterSelectedCount,M=void 0===j||j,N=(0,a.useState)([]),F=(0,r.Z)(N,2),P=F[0],z=F[1];function T(e,t,n){h&&h(e,t,n)}(0,a.useImperativeHandle)(t,(function(){return{removeSelection:function(){z([])},getSelectedRows:function(){return c.filter((function(e){return null===P||void 0===P?void 0:P.includes(e[d])}))},setSelectedRows:function(e){z(e)}}}));var B=[];return(0,m.jsx)(x.Provider,{value:{showFooterSelectedCount:M,footerPaginationPosition:I,rowSelectionModel:P,rows:c,footerChildren:k},children:(0,m.jsx)(s._$,{slots:{loadingOverlay:l.Z,footer:g},initialState:{pagination:{paginationModel:{pageSize:35}}},loading:n,getRowId:function(e){return e[d]},columns:u.filter((function(e){return!e.hide})),rows:c,showCellVerticalBorder:!0,showColumnVerticalBorder:!0,checkboxSelection:S,rowSelectionModel:P,rowHeight:25,columnHeaderHeight:35,pageSizeOptions:[10,20,35,50,75,100],sx:(0,i.Z)((0,i.Z)({"& .cash":{color:"#ec4899"},"& .check":{color:"#0891b2"},"& .approved":{color:"green"},"& .pending":{color:"orange"},"& .disapproved":{color:"red"},"& .normal":{color:"red"},"& .MuiDataGrid-row.Mui-selected:hover":{color:"black","& .MuiSvgIcon-root ":{fill:"#3b82f6"}},"& .hover-keyboard":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row:hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row.hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiTablePagination-root p ":{padding:"0 !important"}},{"& .MuiDataGrid-columnHeaders":{background:"#64748b",color:"white",fontSize:"14px"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer .MuiSvgIcon-root ":{display:f||p?"none":"block",fill:"white"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer input ":{display:f||p?"none":"block"}}),{fontSize:13,fontWeight:500,"& .MuiDataGrid-checkboxInput":{height:"27px",width:"27px"},"& .MuiDataGrid-checkboxInput svg":{height:"20px",width:"20px"}}),onRowSelectionModelChange:function(e){if(p){if(e.length<=0)return;if(B=e,P.includes(B[B.length-1]))return;return z(e),void T([e[e.length-1]],c,null)}if(!p&&f)if(P&&(null===P||void 0===P?void 0:P.length)>0){var t=new Set(P);z(e.filter((function(e){return!t.has(e)})))}else z(e);else z(e);T([e[e.length-1]],c,null)},onCellKeyDown:function(e,t){if(["NumpadEnter","Enter","Delete","Backspace"].includes(t.code))return t.preventDefault(),"Enter"===t.code||"NumpadEnter"===t.code?f&&!p?z((function(n){return n&&n.length>0&&n[0]===e.rowNode.id?(T([],c,t.code),[]):(T([e.rowNode.id],c,t.code),[e.rowNode.id])})):void z((function(n){return n&&!p&&n.length>0&&n.includes(e.rowNode.id)?(n=n.filter((function(t){return t!==e.rowNode.id})),T([],c,t.code),n):n&&p&&n.length>0&&n.includes(e.rowNode.id)?n:(T([e.rowNode.id],c,t.code),[].concat((0,o.Z)(n),[e.rowNode.id]))})):"Delete"===t.code||"Backspace"===t.code?(z([e.rowNode.id]),T([e.rowNode.id],c,t.code)):void 0},disableVirtualization:!0,isRowSelectable:w,getCellClassName:b})})}));function g(e){var t=e.page,n=e.onPageChange,o=e.className,i=(0,c.l)(),r=(0,d.P)(i,f.UB);return(0,m.jsx)(h.Z,{variant:"outlined",color:"primary",className:o,count:r,page:t+1,onChange:function(e,t){n(e,t-1)}})}function w(e){return(0,m.jsx)(p.x,(0,i.Z)({ActionsComponent:g},e))}function C(e){var t=(0,a.useContext)(x),n=t.rowSelectionModel,o=t.showFooterSelectedCount,r=t.footerPaginationPosition,l=t.footerChildren,s=t.rows;return(0,m.jsxs)(u.Z,{sx:{columnGap:"50px",display:"flex",width:"100%",justifyContent:"space-between",px:3,alignItems:"center",flexDirection:"right-left"===r?"row-reverse":"row"},children:[(0,m.jsx)(w,(0,i.Z)({},e)),(0,m.jsxs)(u.Z,{sx:{display:"flex",justifyContent:"right-left"===r?"flex-start":"flex-end",flex:1,alignItems:"center"},children:[o&&(0,m.jsxs)("div",{children:["Selected:",null===n||void 0===n?void 0:n.length]}),(0,m.jsx)("div",{children:l(n,s)})]})]})}t.Z=v},48084:function(e,t,n){"use strict";n.r(t),n.d(t,{ctplColumn:function(){return F},default:function(){return z},reducer:function(){return N},setNewStateValue:function(){return T}});var o=n(74165),i=n(15861),r=n(29439),a=n(4942),l=n(1413),u=n(72791),s=n(64554),c=n(27391),d=n(36151),f=n(57482),p=n(73766),h=n(42419),m=n(3380),x=n(91933),v=n(21830),g=n.n(v),w=n(79018),C=n(29823),b=n(53329),y=n(27247),S=n(56580),Z=n(89767),k=n(39709),D=n(64230),I=n(4378),j=n(80184),M={Prefix:"",NumSeriesFrom:0,NumSeriesTo:0,Cost:"",ctplType:"",search:"",mode:"",ctplId:""},N=function(e,t){return"UPDATE_FIELD"===t.type?(0,l.Z)((0,l.Z)({},e),{},(0,a.Z)({},t.field,t.value)):e},F=[{field:"Prefix",headerName:"Prefix",width:150},{field:"NumSeriesFrom",headerName:"NumSeriesFrom",flex:1},{field:"NumSeriesTo",headerName:"NumSeriesTo",flex:1},{field:"Cost",headerName:"Cost",flex:1},{field:"CreatedBy",headerName:"Created By",width:250},{field:"createdAt",headerName:"Created At",width:150}],P="ctpl";function z(){var e,t,n,v,z,B,L=(0,u.useRef)(null),A=(0,u.useReducer)(N,M),E=(0,r.Z)(A,2),R=E[0],_=E[1],G=(0,u.useContext)(m.V),H=G.myAxios,O=G.user,V=(0,u.useState)([]),U=(0,r.Z)(V,2),q=U[0],W=U[1],K=(0,u.useRef)(null),Y=(0,x.useQueryClient)(),Q=(0,x.useQuery)({queryKey:P,queryFn:function(){return(e=e||(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H.get("/reference/get-ctpl?ctplSearch=".concat(R.search),{headers:{Authorization:"Bearer ".concat(null===O||void 0===O?void 0:O.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){W(null===e||void 0===e?void 0:e.data.ctpl.ctpl)}}),X=Q.data,$=Q.isLoading,J=Q.refetch,ee=(0,x.useMutation)({mutationKey:P,mutationFn:function(e){return(t=t||(0,i.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return delete t.mode,e.next=3,H.post("/reference/add-ctpl",t,{headers:{Authorization:"Bearer ".concat(null===O||void 0===O?void 0:O.accessToken)}});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:se}),te=ee.mutate,ne=ee.isLoading,oe=(0,x.useMutation)({mutationKey:P,mutationFn:function(e){return(n=n||(0,i.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return delete t.mode,e.next=3,H.post("/reference/delete-ctpl",t,{headers:{Authorization:"Bearer ".concat(null===O||void 0===O?void 0:O.accessToken)}});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:se}),ie=oe.mutate,re=oe.isLoading,ae=function(e){var t=e.target,n=t.name,o=t.value;"Line"===n&&_({type:"UPDATE_FIELD",field:"Type",value:""}),_({type:"UPDATE_FIELD",field:n,value:o})};function le(e){return e.preventDefault(),R.Cost=""===R.Cost?"0":parseFloat(R.Cost).toFixed(2),""===R.Cost?g().fire({position:"center",icon:"warning",title:"Cost is required!",showConfirmButton:!1,timer:1500}):R.Cost.length>=200?g().fire({position:"center",icon:"warning",title:"Cost is too long!",showConfirmButton:!1,timer:1500}):void(0,D.L)({isConfirm:function(){te(R)}})}function ue(){var e;T(_,M),null===(e=K.current)||void 0===e||e.removeSelection(),(0,w.D)(500).then((function(){J()}))}function se(e){if(e.data.success)return Y.invalidateQueries(P),ue(),g().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500});g().fire({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:1500})}return(0,j.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%",flex:1},children:[(0,j.jsxs)(s.Z,{sx:function(e){return(0,a.Z)({display:"flex",alignItems:"center",columnGap:"20px"},e.breakpoints.down("sm"),{flexDirection:"column",alignItems:"flex-start",flex:1,marginBottom:"15px"})},children:[(0,j.jsx)("div",{style:{marginTop:"10px",marginBottom:"12px",width:"100%"},children:(0,j.jsx)(c.Z,{label:"Search",fullWidth:!0,size:"small",type:"text",name:"search",value:R.search,onChange:ae,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"500px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),J()}})}),(0,j.jsx)("div",{style:{display:"flex",alignItems:"center",columnGap:"20px"},children:(0,j.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px"},children:[""===R.mode&&(0,j.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,j.jsx)(h.Z,{}),id:"entry-header-save-button",onClick:function(){ae({target:{value:"add",name:"mode"}})},children:"New"}),(0,j.jsx)(k.Z,{sx:{height:"30px",fontSize:"11px"},id:"save-entry-header",color:"primary",variant:"contained",type:"submit",onClick:le,disabled:""===R.mode||"edit"===R.mode,startIcon:(0,j.jsx)(b.Z,{}),loading:ne,children:"Save"}),""!==R.mode&&(0,j.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,j.jsx)(C.Z,{}),color:"error",onClick:function(){g().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){e.isConfirmed&&ue()}))},children:"Cancel"}),(0,j.jsx)(k.Z,{variant:"contained",sx:{height:"30px",fontSize:"11px",backgroundColor:I.Z[500],"&:hover":{backgroundColor:I.Z[600]}},disabled:"edit"!==R.mode,startIcon:(0,j.jsx)(y.Z,{}),loading:re,onClick:function(){(0,D.s)({isUpdate:!1,cb:function(e){ie({ctplId:R.ctplId,userCodeConfirmation:e})}})},children:"Delete"})]})})]}),(0,j.jsx)("form",{onSubmit:le,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),void le(e)},children:(0,j.jsxs)(s.Z,{sx:function(e){return(0,a.Z)({display:"flex",columnGap:"15px",flexDirection:"row"},e.breakpoints.down("md"),{flexDirection:"column",rowGap:"10px"})},children:[$?(0,j.jsx)(f.Z,{}):(0,j.jsx)(p.Z,{disabled:""===R.mode||"edit"===R.mode,value:R.Prefix,onChange:function(e,t){!function(e){var t=e.name,n=e.value;_({type:"UPDATE_FIELD",field:t,value:n})}({name:"Prefix",value:t})},size:"small",freeSolo:!0,disableClearable:!0,options:null===(v=X.data)||void 0===v||null===(z=v.ctpl)||void 0===z?void 0:z.prefix.map((function(e){return e.prefixName})),getOptionLabel:function(e){return e},sx:function(e){return(0,a.Z)({width:500,".MuiFormLabel-root":{fontSize:"14px"},".MuiInputBase-input":{width:"100% !important"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiAutocomplete-input ":{position:"absolute"}},e.breakpoints.down("md"),{width:"100%"})},renderInput:function(e){return(0,j.jsx)(c.Z,(0,l.Z)((0,l.Z)({},e),{},{label:"Prefix",name:"Prefix",InputProps:(0,l.Z)((0,l.Z)({},e.InputProps),{},{style:{height:"27px",fontSize:"14px"}}),onChange:ae}))}}),(0,j.jsx)(c.Z,{required:!0,fullWidth:!0,type:"number",variant:"outlined",size:"small",label:"NumSeriesFrom",name:"NumSeriesFrom",value:R.NumSeriesFrom,onChange:ae,disabled:""===R.mode||"edit"===R.mode,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,j.jsx)(c.Z,{required:!0,fullWidth:!0,type:"number",variant:"outlined",size:"small",label:"NumSeriesTo",name:"NumSeriesTo",value:R.NumSeriesTo,onChange:ae,disabled:""===R.mode||"edit"===R.mode,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,j.jsx)(c.Z,{required:!0,fullWidth:!0,type:"text",variant:"outlined",size:"small",label:"Cost",name:"Cost",value:R.Cost,onChange:ae,disabled:""===R.mode||"edit"===R.mode,placeholder:"0.00",InputProps:{style:{height:"27px",fontSize:"14px"},inputComponent:S.a},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){_({type:"UPDATE_FIELD",field:"Cost",value:parseFloat(R.Cost).toFixed(2)})}})]})}),(0,j.jsx)("div",{ref:L,style:{marginTop:"10px",width:"100%",position:"relative",flex:1},children:(0,j.jsx)(s.Z,{style:{height:"".concat(null===(B=L.current)||void 0===B?void 0:B.getBoundingClientRect().height,"px"),width:"100%",overflowX:"scroll",position:"absolute"},children:(0,j.jsx)(Z.Z,{ref:K,isLoading:ne||$,columns:F,rows:q,table_id:"ctplId",isSingleSelection:!0,isRowFreeze:!1,dataSelection:function(e,t,n){var o=t.filter((function(t){return t.ctplId===e[0]}))[0];if(void 0===o||o.length<=0)return T(_,M),void ae({target:{value:"",name:"mode"}});ae({target:{value:"edit",name:"mode"}}),"Delete"!==n&&"Backspace"!==n?T(_,o):(0,D.s)({isUpdate:!1,cb:function(e){ie({ctplId:o.ctplId,userCodeConfirmation:e})}})}})})})]})}function T(e,t){Object.entries(t).forEach((function(t){var n=(0,r.Z)(t,2),o=n[0],i=n[1];e({type:"UPDATE_FIELD",field:o,value:i})}))}},64230:function(e,t,n){"use strict";n.d(t,{L:function(){return u},s:function(){return l}});var o=n(74165),i=n(15861),r=n(21830),a=n.n(r);function l(e){var t;a().fire({title:"Are you sure!",html:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:e.isUpdate?"Are you sure you want to make this change?":"Are you sure you want to delete this?",icon:"warning",input:"text",inputAttributes:{autocapitalize:"off"},showCancelButton:!0,confirmButtonText:"Save",confirmButtonColor:"green",showLoaderOnConfirm:!0,preConfirm:function(n){return(t=t||(0,i.Z)((0,o.Z)().mark((function t(n){return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{e.cb(n)}catch(o){a().showValidationMessage("\n            Request failed: ".concat(o,"\n          "))}case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)},allowOutsideClick:function(){return!a().isLoading()}}).then((function(t){if(t.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}function u(e){a().fire({title:"Are you sure?",text:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:"Do you want to proceed with saving?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!"}).then((function(t){if(t.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}},42419:function(e,t,n){"use strict";var o=n(64836);t.Z=void 0;var i=o(n(45649)),r=n(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.Z=a},27247:function(e,t,n){"use strict";var o=n(64836);t.Z=void 0;var i=o(n(45649)),r=n(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=a},53329:function(e,t,n){"use strict";var o=n(64836);t.Z=void 0;var i=o(n(45649)),r=n(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"}),"Save");t.Z=a},4378:function(e,t){"use strict";t.Z={50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",A100:"#ff80ab",A200:"#ff4081",A400:"#f50057",A700:"#c51162"}},80888:function(e,t,n){"use strict";var o=n(79047);function i(){}function r(){}r.resetWarningCache=i,e.exports=function(){function e(e,t,n,i,r,a){if(a!==o){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:r,resetWarningCache:i};return n.PropTypes=n,n}},52007:function(e,t,n){e.exports=n(80888)()},79047:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);
//# sourceMappingURL=5648.137dc892.chunk.js.map