(self.webpackChunkupward=self.webpackChunkupward||[]).push([[2856],{89767:function(e,t,n){"use strict";var o=n(93433),i=n(1413),r=n(29439),a=n(72791),c=n(57482),u=n(64554),l=n(70561),s=n(29961),d=n(54277),f=n(70169),p=n(5794),h=n(16088),g=n(80184),m=(0,a.createContext)({rows:[],rowSelectionModel:[],footerChildren:function(){return(0,g.jsx)("div",{})},footerPaginationPosition:"right-left",showFooterSelectedCount:!0}),x=(0,a.forwardRef)((function(e,t){var n=e.isLoading,u=e.columns,s=e.rows,d=e.table_id,f=e.isSingleSelection,p=e.isRowFreeze,h=e.dataSelection,x=e.CustomFooterComponent,v=void 0===x?y:x,w=e.isRowSelectable,b=e.getCellClassName,C=e.checkboxSelection,Z=void 0===C||C,S=e.footerChildren,M=void 0===S?function(e,t){return(0,g.jsx)("div",{})}:S,k=e.footerPaginationPosition,j=void 0===k?"right-left":k,D=e.showFooterSelectedCount,P=void 0===D||D,I=(0,a.useState)([]),z=(0,r.Z)(I,2),B=z[0],A=z[1];function T(e,t,n){h&&h(e,t,n)}(0,a.useImperativeHandle)(t,(function(){return{removeSelection:function(){A([])},getSelectedRows:function(){return s.filter((function(e){return null===B||void 0===B?void 0:B.includes(e[d])}))},setSelectedRows:function(e){A(e)}}}));var L=[];return(0,g.jsx)(m.Provider,{value:{showFooterSelectedCount:P,footerPaginationPosition:j,rowSelectionModel:B,rows:s,footerChildren:M},children:(0,g.jsx)(l._$,{slots:{loadingOverlay:c.Z,footer:v},initialState:{pagination:{paginationModel:{pageSize:35}}},loading:n,getRowId:function(e){return e[d]},columns:u.filter((function(e){return!e.hide})),rows:s,showCellVerticalBorder:!0,showColumnVerticalBorder:!0,checkboxSelection:Z,rowSelectionModel:B,rowHeight:25,columnHeaderHeight:35,pageSizeOptions:[10,20,35,50,75,100],sx:(0,i.Z)((0,i.Z)({"& .cash":{color:"#ec4899"},"& .check":{color:"#0891b2"},"& .approved":{color:"green"},"& .pending":{color:"orange"},"& .disapproved":{color:"red"},"& .normal":{color:"red"},"& .MuiDataGrid-row.Mui-selected:hover":{color:"black","& .MuiSvgIcon-root ":{fill:"#3b82f6"}},"& .hover-keyboard":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row:hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiDataGrid-row.hover":{background:"#2563eb",color:"white","& .MuiSvgIcon-root ":{fill:"white"}},"& .MuiTablePagination-root p ":{padding:"0 !important"}},{"& .MuiDataGrid-columnHeaders":{background:"#64748b",color:"white",fontSize:"14px"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer .MuiSvgIcon-root ":{display:f||p?"none":"block",fill:"white"},"& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer input ":{display:f||p?"none":"block"}}),{fontSize:13,fontWeight:500,"& .MuiDataGrid-checkboxInput":{height:"27px",width:"27px"},"& .MuiDataGrid-checkboxInput svg":{height:"20px",width:"20px"}}),onRowSelectionModelChange:function(e){if(p){if(e.length<=0)return;if(L=e,B.includes(L[L.length-1]))return;return A(e),void T([e[e.length-1]],s,null)}if(!p&&f)if(B&&(null===B||void 0===B?void 0:B.length)>0){var t=new Set(B);A(e.filter((function(e){return!t.has(e)})))}else A(e);else A(e);T([e[e.length-1]],s,null)},onCellKeyDown:function(e,t){if(["NumpadEnter","Enter","Delete","Backspace"].includes(t.code))return t.preventDefault(),"Enter"===t.code||"NumpadEnter"===t.code?f&&!p?A((function(n){return n&&n.length>0&&n[0]===e.rowNode.id?(T([],s,t.code),[]):(T([e.rowNode.id],s,t.code),[e.rowNode.id])})):void A((function(n){return n&&!p&&n.length>0&&n.includes(e.rowNode.id)?(n=n.filter((function(t){return t!==e.rowNode.id})),T([],s,t.code),n):n&&p&&n.length>0&&n.includes(e.rowNode.id)?n:(T([e.rowNode.id],s,t.code),[].concat((0,o.Z)(n),[e.rowNode.id]))})):"Delete"===t.code||"Backspace"===t.code?(A([e.rowNode.id]),T([e.rowNode.id],s,t.code)):void 0},disableVirtualization:!0,isRowSelectable:w,getCellClassName:b})})}));function v(e){var t=e.page,n=e.onPageChange,o=e.className,i=(0,s.l)(),r=(0,d.P)(i,f.UB);return(0,g.jsx)(h.Z,{variant:"outlined",color:"primary",className:o,count:r,page:t+1,onChange:function(e,t){n(e,t-1)}})}function w(e){return(0,g.jsx)(p.x,(0,i.Z)({ActionsComponent:v},e))}function y(e){var t=(0,a.useContext)(m),n=t.rowSelectionModel,o=t.showFooterSelectedCount,r=t.footerPaginationPosition,c=t.footerChildren,l=t.rows;return(0,g.jsxs)(u.Z,{sx:{columnGap:"50px",display:"flex",width:"100%",justifyContent:"space-between",px:3,alignItems:"center",flexDirection:"right-left"===r?"row-reverse":"row"},children:[(0,g.jsx)(w,(0,i.Z)({},e)),(0,g.jsxs)(u.Z,{sx:{display:"flex",justifyContent:"right-left"===r?"flex-start":"flex-end",flex:1,alignItems:"center"},children:[o&&(0,g.jsxs)("div",{children:["Selected:",null===n||void 0===n?void 0:n.length]}),(0,g.jsx)("div",{children:c(n,l)})]})]})}t.Z=x},93783:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return z},poliyAccountColumn:function(){return P},reducer:function(){return D},setNewStateValue:function(){return B}});var o=n(74165),i=n(15861),r=n(29439),a=n(4942),c=n(1413),u=n(72791),l=n(64554),s=n(27391),d=n(36151),f=n(42419),p=n(27247),h=n(4378),g=n(3380),m=n(91933),x=n(21830),v=n.n(x),w=n(79018),y=n(29823),b=n(53329),C=n(73766),Z=n(39709),S=n(89767),M=n(64230),k=n(80184),j={Mortgagee:"",Policy:"",mode:"",search:""},D=function(e,t){return"UPDATE_FIELD"===t.type?(0,c.Z)((0,c.Z)({},e),{},(0,a.Z)({},t.field,t.value)):e},P=[{field:"Policy",headerName:"Policy",flex:1},{field:"Mortgagee",headerName:"Mortgagee",flex:1},{field:"createdAt",headerName:"Created At",flex:1}],I="mortgagee-account";function z(){(0,u.useRef)(null);var e,t,n,x,z=(0,u.useReducer)(D,j),A=(0,r.Z)(z,2),T=A[0],L=A[1],N=(0,u.useContext)(g.V),F=N.myAxios,E=N.user,R=(0,u.useState)([]),G=(0,r.Z)(R,2),O=G[0],_=G[1],H=(0,m.useQueryClient)(),V=(0,u.useRef)(null),U=(0,m.useQuery)({queryKey:I,queryFn:function(){return(e=e||(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.get("/reference/get-mortgagee?mortgageeSearch=".concat(T.search),{headers:{Authorization:"Bearer ".concat(null===E||void 0===E?void 0:E.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){console.log(e),_(null===e||void 0===e?void 0:e.data.mortgagee.mortgagee)}}),K=U.data,q=U.isLoading,W=U.refetch,Y=(0,m.useMutation)({mutationKey:I,mutationFn:function(e){return(t=t||(0,i.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.post("/reference/add-mortgagee",t,{headers:{Authorization:"Bearer ".concat(null===E||void 0===E?void 0:E.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:ce}),Q=Y.mutate,X=Y.isLoading,$=(0,m.useMutation)({mutationKey:I,mutationFn:function(e){return(n=n||(0,i.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.post("/reference/update-mortgagee",t,{headers:{Authorization:"Bearer ".concat(null===E||void 0===E?void 0:E.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:ce}),J=$.mutate,ee=$.isLoading,te=(0,m.useMutation)({mutationKey:I,mutationFn:function(e){return(x=x||(0,i.Z)((0,o.Z)().mark((function e(t){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F.post("/reference/delete-mortgagee",t,{headers:{Authorization:"Bearer ".concat(null===E||void 0===E?void 0:E.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:ce}),ne=te.mutate,oe=te.isLoading;function ie(){var e;B(L,j),null===(e=V.current)||void 0===e||e.removeSelection(),(0,w.D)(500).then((function(){W()}))}var re=function(e){var t=e.name,n=e.value;L({type:"UPDATE_FIELD",field:t,value:n})},ae=function(e){var t=e.target,n=t.name,o=t.value;L({type:"UPDATE_FIELD",field:n,value:o})};function ce(e){if(e.data.success)return H.invalidateQueries("bank-account-trans"),ie(),v().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500});v().fire({position:"center",icon:"error",title:e.data.message,showConfirmButton:!1,timer:1500})}function ue(e){return""===T.Policy||""===T.Mortgagee?v().fire({position:"center",icon:"warning",title:"Policy is required!",showConfirmButton:!1,timer:1500}):T.Policy.length>=90?v().fire({position:"center",icon:"warning",title:"Policy is too long!",showConfirmButton:!1,timer:1500}):T.Mortgagee.length>=200?v().fire({position:"center",icon:"warning",title:"Mortgagee is too long!",showConfirmButton:!1,timer:1500}):(e.preventDefault(),void("edit"===T.mode?(0,M.s)({isUpdate:!0,cb:function(e){J((0,c.Z)((0,c.Z)({},T),{},{userCodeConfirmation:e}))}}):(0,M.L)({isConfirm:function(){Q(T)}})))}return(0,k.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%",flex:1},children:[(0,k.jsxs)(l.Z,{sx:function(e){return(0,a.Z)({display:"flex",alignItems:"center",columnGap:"20px"},e.breakpoints.down("sm"),{flexDirection:"column",alignItems:"flex-start",flex:1,marginBottom:"15px"})},children:[(0,k.jsx)("div",{style:{marginTop:"10px",marginBottom:"12px",width:"100%"},children:(0,k.jsx)(s.Z,{label:"Search",fullWidth:!0,size:"small",type:"text",name:"search",value:T.search,onChange:ae,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"500px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),W()}})}),(0,k.jsx)("div",{style:{display:"flex",alignItems:"center",columnGap:"20px"},children:(0,k.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px"},children:[""===T.mode&&(0,k.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,k.jsx)(f.Z,{}),id:"entry-header-save-button",onClick:function(){ae({target:{value:"add",name:"mode"}})},children:"New"}),(0,k.jsx)(Z.Z,{sx:{height:"30px",fontSize:"11px"},id:"save-entry-header",color:"primary",variant:"contained",type:"submit",onClick:ue,disabled:""===T.mode,startIcon:(0,k.jsx)(b.Z,{}),loading:X||ee,children:"Save"}),""!==T.mode&&(0,k.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},variant:"contained",startIcon:(0,k.jsx)(y.Z,{}),color:"error",onClick:function(){v().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){e.isConfirmed&&ie()}))},children:"Cancel"}),(0,k.jsx)(Z.Z,{id:"save-entry-header",variant:"contained",sx:{height:"30px",fontSize:"11px",backgroundColor:h.Z[500],"&:hover":{backgroundColor:h.Z[600]}},disabled:"edit"!==T.mode,startIcon:(0,k.jsx)(p.Z,{}),loading:oe,onClick:function(){(0,M.s)({isUpdate:!1,cb:function(e){ne({Mortgagee:T.Mortgagee,userCodeConfirmation:e})}})},children:"Delete"})]})})]}),(0,k.jsx)("form",{onSubmit:ue,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),void ue(e)},children:(0,k.jsx)(l.Z,{sx:function(e){return(0,a.Z)({display:"flex",columnGap:"15px",flexDirection:"row"},e.breakpoints.down("md"),{flexDirection:"column",rowGap:"10px"})},children:!q&&(0,k.jsxs)(u.Fragment,{children:[(0,k.jsx)(C.Z,{disabled:""===T.mode,value:T.Policy,onChange:function(e,t){re({name:"Policy",value:t})},size:"small",freeSolo:!0,disableClearable:!0,options:K.data.mortgagee.policy.map((function(e){return e.Policy})),getOptionLabel:function(e){return e},sx:function(e){return(0,a.Z)({width:300,".MuiFormLabel-root":{fontSize:"14px"},".MuiInputBase-input":{width:"100% !important"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiAutocomplete-input ":{position:"absolute"}},e.breakpoints.down("md"),{width:"100%"})},renderInput:function(e){return(0,k.jsx)(s.Z,(0,c.Z)((0,c.Z)({},e),{},{label:"Policy",name:"Policy",InputProps:(0,c.Z)((0,c.Z)({},e.InputProps),{},{style:{height:"27px",fontSize:"14px"}}),onChange:ae}))}}),(0,k.jsx)(C.Z,{disabled:""===T.mode||"edit"===T.mode,value:T.Mortgagee,onChange:function(e,t){re({name:"Mortgagee",value:t})},size:"small",freeSolo:!0,disableClearable:!0,options:K.data.mortgagee.mortgagee.map((function(e){return e.Mortgagee})),getOptionLabel:function(e){return e},sx:function(e){return(0,a.Z)({width:700,".MuiFormLabel-root":{fontSize:"14px"},".MuiInputBase-input":{width:"100% !important"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"},".MuiAutocomplete-input ":{position:"absolute"}},e.breakpoints.down("md"),{width:"100%"})},renderInput:function(e){return(0,k.jsx)(s.Z,(0,c.Z)((0,c.Z)({},e),{},{label:"Mortgagee",name:"Mortgagee",InputProps:(0,c.Z)((0,c.Z)({},e.InputProps),{},{style:{height:"27px",fontSize:"14px"}}),onChange:ae}))}})]})})}),(0,k.jsx)("div",{style:{marginTop:"10px",width:"100%",position:"relative",flex:1},children:(0,k.jsx)(l.Z,{style:{height:"500px",width:"100%",overflowX:"scroll",position:"absolute"},children:(0,k.jsx)(S.Z,{ref:V,isLoading:q||X||ee||oe,columns:P,rows:O,table_id:"Mortgagee",isSingleSelection:!0,isRowFreeze:!1,dataSelection:function(e,t,n){var o=t.filter((function(t){return t.Mortgagee===e[0]}))[0];if(void 0===o||o.length<=0)return B(L,j),void ae({target:{value:"",name:"mode"}});ae({target:{value:"edit",name:"mode"}}),"Delete"!==n&&"Backspace"!==n?B(L,o):(0,M.s)({isUpdate:!1,cb:function(e){ne({Mortgagee:o.Mortgagee,userCodeConfirmation:e})}})}})})})]})}function B(e,t){Object.entries(t).forEach((function(t){var n=(0,r.Z)(t,2),o=n[0],i=n[1];e({type:"UPDATE_FIELD",field:o,value:i})}))}},64230:function(e,t,n){"use strict";n.d(t,{L:function(){return u},s:function(){return c}});var o=n(74165),i=n(15861),r=n(21830),a=n.n(r);function c(e){var t;a().fire({title:"Are you sure!",html:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:e.isUpdate?"Are you sure you want to make this change?":"Are you sure you want to delete this?",icon:"warning",input:"text",inputAttributes:{autocapitalize:"off"},showCancelButton:!0,confirmButtonText:"Save",confirmButtonColor:"green",showLoaderOnConfirm:!0,preConfirm:function(n){return(t=t||(0,i.Z)((0,o.Z)().mark((function t(n){return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{e.cb(n)}catch(o){a().showValidationMessage("\n            Request failed: ".concat(o,"\n          "))}case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)},allowOutsideClick:function(){return!a().isLoading()}}).then((function(t){if(t.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}function u(e){a().fire({title:"Are you sure?",text:null!==e&&void 0!==e&&e.text?null===e||void 0===e?void 0:e.text:"Do you want to proceed with saving?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, save it!"}).then((function(t){if(t.isConfirmed&&e.isConfirm)return e.isConfirm();e.isDeclined&&e.isDeclined()}))}},42419:function(e,t,n){"use strict";var o=n(64836);t.Z=void 0;var i=o(n(45649)),r=n(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.Z=a},27247:function(e,t,n){"use strict";var o=n(64836);t.Z=void 0;var i=o(n(45649)),r=n(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=a},53329:function(e,t,n){"use strict";var o=n(64836);t.Z=void 0;var i=o(n(45649)),r=n(80184),a=(0,i.default)((0,r.jsx)("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"}),"Save");t.Z=a},4378:function(e,t){"use strict";t.Z={50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",A100:"#ff80ab",A200:"#ff4081",A400:"#f50057",A700:"#c51162"}},80888:function(e,t,n){"use strict";var o=n(79047);function i(){}function r(){}r.resetWarningCache=i,e.exports=function(){function e(e,t,n,i,r,a){if(a!==o){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:r,resetWarningCache:i};return n.PropTypes=n,n}},52007:function(e,t,n){e.exports=n(80888)()},79047:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);
//# sourceMappingURL=2856.b95a0935.chunk.js.map