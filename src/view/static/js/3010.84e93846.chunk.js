"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[3010,7899],{40134:function(e,t,n){n.r(t),n.d(t,{default:function(){return k}});var a=n(93433),l=n(74165),i=n(15861),o=n(29439),r=n(72791),u=n(37209),s=n(36151),c=n(11690),d=n(81258),p=n(91933),f=n(3380),h=n(39709),x=n(16395),v=n(16386),y=n(33551),g=n(1104),m=n(65413),w=n(80184),b=[{key:"ln",label:"#",width:40},{key:"CheckNo",label:"Check No",width:120},{key:"Bank",label:"Bank",width:200},{key:"Amount",label:"Amount",width:120},{key:"OldDepositDate",label:"Old Deposit Date",width:200},{key:"NewDate",label:"New Deposit Date",width:200},{key:"Penalty",label:"Penalty",width:120},{key:"Datediff",label:"Datediff",width:120},{key:"Reason",label:"Reason",width:200}];function k(){var e,t,n,k,D,S=(0,r.useContext)(f.V),N=S.myAxios,Z=S.user,j=(0,r.useRef)(null),R=(0,r.useState)("text"),C=(0,o.Z)(R,2),z=C[0],A=C[1],F=(0,r.useState)(""),B=(0,o.Z)(F,2),P=B[0],M=B[1],T=(0,r.useState)(""),W=(0,o.Z)(T,2),K=W[0],q=W[1],V=(0,r.useState)(""),L=(0,o.Z)(V,2),E=L[0],O=L[1],G=(0,r.useState)(""),I=(0,o.Z)(G,2),H=I[0],Y=I[1],Q=(0,r.useRef)(null),_=(0,r.useRef)(null),J=(0,r.useRef)(null),U=(0,r.useRef)(null),X=(0,r.useRef)(null),$=(0,r.useRef)(null),ee=(0,r.useRef)(null),te=(0,r.useRef)(null),ne=(0,r.useRef)(null),ae=(0,r.useRef)(null),le=(0,r.useRef)(null),ie=(0,r.useRef)(null),oe=(0,r.useRef)(null),re=(0,r.useRef)(null),ue=(0,r.useRef)(null),se=(0,r.useRef)(null),ce=(0,r.useRef)(null),de=(0,r.useRef)(null),pe=(0,r.useRef)(null),fe=(0,r.useRef)(null),he=(0,p.useQuery)({queryKey:"load-pnno",queryFn:function(){return(e=e||(0,i.Z)((0,l.Z)().mark((function e(){return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.get("/task/accounting/check-postponement/request/load-pnno",{headers:{Authorization:"Bearer ".concat(null===Z||void 0===Z?void 0:Z.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){if(!e.data.success)return alert(e.data.message);var t=null===e||void 0===e?void 0:e.data.data;t.length>0&&(0,x.wait)(100).then((function(){U.current.setDataSource(t),$.current.setDataSource(t)}))}}),xe=he.isLoading,ve=(0,p.useQuery)({queryKey:"auto-id",queryFn:function(){return(t=t||(0,i.Z)((0,l.Z)().mark((function e(){return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.get("/task/accounting/check-postponement/request/auto-id",{headers:{Authorization:"Bearer ".concat(null===Z||void 0===Z?void 0:Z.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){if(!e.data.success)return alert(e.data.message);var t=null===e||void 0===e?void 0:e.data.data;t.length>0&&(0,x.wait)(100).then((function(){Q.current&&(Q.current.value="HORPCD".concat(t[0].Year).concat(t[0].Count))}))}}),ye=ve.isLoading,ge=ve.refetch,me=(0,p.useMutation)({mutationKey:"load-checks",mutationFn:function(e){return(n=n||(0,i.Z)((0,l.Z)().mark((function e(t){return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.post("/task/accounting/check-postponement/request/load-checks",t,{headers:{Authorization:"Bearer ".concat(null===Z||void 0===Z?void 0:Z.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){if(!e.data.success)return alert(e.data.message);ee.current.setDataSource(null===e||void 0===e?void 0:e.data.data)}}),we=me.isLoading,be=me.mutate,ke=(0,p.useMutation)({mutationKey:"load-check-details",mutationFn:function(e){return(k=k||(0,i.Z)((0,l.Z)().mark((function e(t){return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.post("/task/accounting/check-postponement/request/load-checks-details",t,{headers:{Authorization:"Bearer ".concat(null===Z||void 0===Z?void 0:Z.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){if(!e.data.success)return alert(e.data.message);var t=null===e||void 0===e?void 0:e.data.data;t.length>0?(A("date"),setTimeout((function(){ae.current&&(ae.current.value=(0,v.Z)(new Date(t[0].CheckDate),"yyyy-MM-dd")),ie.current&&(ie.current.value=t[0].Bank),oe.current&&(oe.current.value=t[0].Amount)}),100)):(A("text"),setTimeout((function(){ae.current&&(ae.current.value=""),ie.current&&(ie.current.value=""),oe.current&&(oe.current.value="")}),100))}}),De=ke.isLoading,Se=ke.mutate,Ne=(0,p.useMutation)({mutationKey:"check-is-pending",mutationFn:function(e){return(D=D||(0,i.Z)((0,l.Z)().mark((function e(t){return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.post("/task/accounting/check-postponement/request/check-is-pending",t,{headers:{Authorization:"Bearer ".concat(null===Z||void 0===Z?void 0:Z.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){var t,n,l,i,o,r,u,s;if(!e.data.success)return alert(e.data.message);var c=null===e||void 0===e?void 0:e.data.data;if(c.length>0)return alert(" Pending Request \nRPCD No.: ".concat(c[0].RPCDNo,"!"));var d=j.current.getData();if(d.some((function(e){var t;return e[1]===(null===(t=te.current)||void 0===t?void 0:t.value)})))return alert("Already added");var p=(0,y.Z)(new Date(null===(t=ne.current)||void 0===t?void 0:t.value),new Date(null===(n=ae.current)||void 0===n?void 0:n.value));if(p<=0)return alert("Invalid date for deposit");var f=d.map((function(e){return{ln:e[0],CheckNo:e[1],Bank:e[2],Amount:e[3],OldDepositDate:e[4],NewDate:e[5],Penalty:e[6],Datediff:e[7],Reason:e[8]}})),h=[].concat((0,a.Z)(f),[{ln:d.length+1,CheckNo:null===(l=te.current)||void 0===l?void 0:l.value,Bank:null===(i=ie.current)||void 0===i?void 0:i.value,Amount:null===(o=oe.current)||void 0===o?void 0:o.value,OldDepositDate:null===(r=ae.current)||void 0===r?void 0:r.value,NewDate:null===(u=ne.current)||void 0===u?void 0:u.value,Penalty:"",Datediff:p,Reason:null===(s=le.current)||void 0===s?void 0:s.value}]);j.current.setDataFormated(h),function(){te.current&&(te.current.value="");ae.current&&(ae.current.value="");le.current&&(le.current.value="");ie.current&&(ie.current.value="");oe.current&&(oe.current.value="");A("text")}()}}),Ze=Ne.isLoading,je=Ne.mutate;return(0,w.jsxs)("div",{style:{padding:"10px",background:"#F1F1F1",height:"100%"},children:[Ze&&(0,w.jsx)(m.g,{}),(0,w.jsxs)("div",{style:{position:"relative",padding:"12px",borderLeft:"1px solid #d1d5db",borderRight:"1px solid #d1d5db",borderTop:"1px solid #d1d5db"},children:[(0,w.jsx)("span",{style:{fontSize:"12px",position:"absolute",top:"-10px",left:"20px",background:"#F1F1F1",padding:"0 5px"},children:"Account Informations"}),(0,w.jsxs)("div",{style:{display:"flex",columnGap:"50px"},children:[ye?(0,w.jsx)(h.Z,{loading:ye}):(0,w.jsx)(u.oi,{containerStyle:{width:"50%",marginBottom:"8px"},label:{title:"RPCD no. :",style:{fontSize:"12px",fontWeight:"bold",width:"80px"}},input:{disabled:!0,type:"text",style:{width:"calc(100% - 80px) "},onKeyDown:function(e){"NumpadEnter"===e.code||e.code}},inputRef:Q}),(0,w.jsx)(u.oi,{containerStyle:{width:"50%",marginBottom:"8px"},label:{title:"Branch :",style:{fontSize:"12px",fontWeight:"bold",width:"110px"}},input:{disabled:!0,type:"text",style:{width:"calc(100% - 100px)"},onKeyDown:function(e){"NumpadEnter"===e.code||e.code}},inputRef:_})]}),(0,w.jsxs)("div",{style:{display:"flex",columnGap:"50px"},children:[xe?(0,w.jsx)(h.Z,{loading:xe}):(0,w.jsx)(u.lq,{ref:U,label:{title:"PN NO: :",style:{fontSize:"12px",fontWeight:"bold",width:"80px"}},selectRef:J,select:{disabled:""===H,style:{flex:1,height:"22px"},defaultValue:"Non-VAT",onChange:function(e){var t=U.current.getDataSource().filter((function(t){return t.PNo===e.target.value}));be({PNNo:t[0].PNo}),J.current&&(J.current.value=t[0].PNo),_.current&&(_.current.value=t[0].BName),X.current&&(X.current.value=t[0].Name)}},containerStyle:{width:"50%",marginBottom:"12px"},datasource:[],values:"PNo",display:"PNo"}),xe?(0,w.jsx)(h.Z,{loading:xe}):(0,w.jsx)(u.lq,{ref:$,label:{title:"Account Name :",style:{fontSize:"12px",fontWeight:"bold",width:"110px"}},selectRef:X,select:{disabled:""===H,style:{flex:1,height:"22px"},defaultValue:"Non-VAT",onChange:function(e){var t=$.current.getDataSource().filter((function(t){return t.Name===e.target.value}));be({PNNo:t[0].PNo}),J.current&&(J.current.value=t[0].PNo),_.current&&(_.current.value=t[0].BName),X.current&&(X.current.value=t[0].Name)}},containerStyle:{width:"50%",marginBottom:"12px"},datasource:[],values:"Name",display:"Name"})]})]}),(0,w.jsxs)("div",{style:{position:"relative",padding:"12px",border:"1px solid #d1d5db"},children:[(0,w.jsx)("span",{style:{fontSize:"12px",position:"absolute",top:"-10px",left:"20px",background:"#F1F1F1",padding:"0 5px"},children:"Check Details :"}),(0,w.jsxs)("div",{style:{display:"flex",columnGap:"50px"},children:[ye?(0,w.jsx)(h.Z,{loading:we}):(0,w.jsx)(u.lq,{ref:ee,label:{title:"Check No. :",style:{fontSize:"12px",fontWeight:"bold",width:"80px"}},selectRef:te,select:{disabled:""===H,style:{flex:1,height:"22px"},defaultValue:"",onChange:function(e){var t;Se({checkNo:e.target.value,PNNo:null===(t=J.current)||void 0===t?void 0:t.value})}},containerStyle:{width:"50%",marginBottom:"12px"},datasource:[],values:"CheckNo",display:"CheckNo"}),(0,w.jsx)(u.oi,{containerStyle:{width:"50%",marginBottom:"8px"},label:{title:"New Date :",style:{fontSize:"12px",fontWeight:"bold",width:"110px"}},input:{disabled:""===H,type:"date",defaultValue:(0,v.Z)((0,g.Z)(new Date,1),"yyyy-MM-dd"),style:{width:"calc(100% - 100px)"},onKeyDown:function(e){"NumpadEnter"===e.code||e.code}},inputRef:ne})]}),(0,w.jsxs)("div",{style:{display:"flex",columnGap:"50px",width:"100%"},children:[De?(0,w.jsx)("span",{children:"Loading..."}):(0,w.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"50%"},children:[(0,w.jsx)(u.oi,{containerStyle:{width:"100%",marginBottom:"8px"},label:{title:"Date :",style:{fontSize:"12px",fontWeight:"bold",width:"80px"}},input:{disabled:!0,type:z,style:{width:"calc(100% - 80px)"},defaultValue:"",onKeyDown:function(e){"NumpadEnter"===e.code||e.code}},inputRef:ae}),(0,w.jsx)(u.oi,{containerStyle:{width:"100%",marginBottom:"8px"},label:{title:"Bank :",style:{fontSize:"12px",fontWeight:"bold",width:"80px"}},input:{disabled:!0,type:"text",style:{width:"calc(100% - 80px)"},onKeyDown:function(e){"NumpadEnter"===e.code||e.code}},inputRef:ie})]}),(0,w.jsx)("div",{style:{width:"50%"},children:(0,w.jsx)(u.Fz,{label:{title:"Reason : ",style:{fontSize:"12px",fontWeight:"bold",width:"110px"}},textarea:{disabled:""===H,rows:3,style:{flex:1},onKeyDown:function(e){"NumpadEnter"===e.code||e.code},onChange:function(e){M(e.target.value)}},_inputRef:le})})]}),(0,w.jsxs)("div",{style:{display:"flex",columnGap:"50px",justifyContent:"space-between"},children:[De?(0,w.jsx)("span",{children:"Loading..."}):(0,w.jsx)(u.iA,{label:{title:"Amount : ",style:{fontSize:"12px",fontWeight:"bold",width:"80px"}},containerStyle:{width:"50%"},input:{disabled:!0,type:"text",style:{width:"calc(100% - 105px)"},onKeyDown:function(e){"NumpadEnter"===e.code||e.code}},inputRef:oe}),(0,w.jsx)(s.Z,{disabled:""===P,sx:{height:"22px",fontSize:"11px"},variant:"contained",onClick:function(){var e;if(ie.current&&""===ie.current.value||ie.current&&null===ie.current.value||ie.current&&void 0===ie.current.value||te.current&&""===te.current.value||te.current&&null===te.current.value||te.current&&void 0===te.current.value)return alert("Incomplete details!");je({checkNo:null===(e=te.current)||void 0===e?void 0:e.value})},color:"success",children:"Add"})]})]}),(0,w.jsx)(c.BW,{ref:j,columns:b,rows:[],containerStyle:{height:"180px"},getSelectedItem:function(e,t,n){if(e){if(window.confirm("Are you sure you want to delete?")){var a=j.current.getData();a.splice(n,1),j.current.setDataFormated(a)}j.current.setSelectedRow(null)}},onKeyDown:function(e,t,n){"Delete"===n.code||n.code}}),(0,w.jsxs)("div",{style:{position:"relative",padding:"12px",border:"1px solid #d1d5db",marginTop:"10px"},children:[(0,w.jsx)("span",{style:{fontSize:"12px",position:"absolute",top:"-10px",left:"20px",background:"#F1F1F1",padding:"0 5px"},children:"Fees and Charges"}),(0,w.jsxs)("div",{style:{display:"flex",columnGap:"50px"},children:[(0,w.jsxs)("div",{style:{flex:1,display:"flex",rowGap:"10px",flexDirection:"column"},children:[(0,w.jsx)(u.iA,{label:{title:"Holding Fees :",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},containerStyle:{width:"100%"},input:{defaultValue:"0.00",disabled:""===H,type:"text",style:{width:"calc(100% - 100px)"},onKeyDown:function(e){"NumpadEnter"===e.code||e.code}},inputRef:re}),(0,w.jsx)(u.iA,{label:{title:"Penalty Charge :",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},containerStyle:{width:"100%"},input:{defaultValue:"0.00",disabled:""===H,type:"text",style:{width:"calc(100% - 100px)"},onKeyDown:function(e){"NumpadEnter"===e.code||e.code}},inputRef:ue}),(0,w.jsx)(u.iA,{label:{title:"Surplus:",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},containerStyle:{width:"100%"},input:{defaultValue:"0.00",disabled:""===H,type:"text",style:{width:"calc(100% - 100px)"},onKeyDown:function(e){"NumpadEnter"===e.code||e.code}},inputRef:se}),(0,w.jsx)(u.lq,{label:{title:"Deducted to:",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},selectRef:ce,select:{disabled:""===H,style:{flex:1,height:"22px"},defaultValue:"Non-VAT"},containerStyle:{width:"100%",marginBottom:"12px"},datasource:[{key:"",value:""},{key:"Penalties",value:"Penalties"},{key:"Loan Amortization",value:"Loan Amortization"},{key:"Loan Amort.-Other Charges",value:"Loan Amort.-Other Charges"},{key:"Miscellaneous Income",value:"Miscellaneous Income"}],values:"value",display:"key"}),(0,w.jsx)(u.iA,{label:{title:"Total :",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},containerStyle:{width:"100%"},input:{defaultValue:"0.00",disabled:""===H,type:"text",style:{width:"calc(100% - 100px)"},onKeyDown:function(e){"NumpadEnter"===e.code||e.code}},inputRef:de})]}),(0,w.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column"},children:[(0,w.jsx)(u.lq,{label:{title:"How to be paid :",style:{fontSize:"12px",fontWeight:"bold",width:"120px"}},selectRef:pe,select:{disabled:""===H,style:{flex:1,height:"22px"},value:K,onChange:function(e){q(e.target.value),O("")}},containerStyle:{width:"50%",marginBottom:"12px"},datasource:[{key:"",value:""},{key:"Over-The-Counter",value:"Over-The-Counter"},{key:"Direct Deposit",value:"Direct Deposit"}],values:"value",display:"key"}),(0,w.jsx)("label",{htmlFor:"remarks",style:{fontSize:"12px",fontWeight:"bold"},children:"Name of Bank && Branch / Date && Time of deposit :"}),(0,w.jsx)(u.Fz,{label:{title:"",style:{display:"none"}},textarea:{disabled:""===H||""===K||"Over-The-Counter"===K,rows:4,style:{flex:1},id:"remarks",value:E,onChange:function(e){O(e.target.value)}},_inputRef:fe}),(0,w.jsxs)("div",{style:{flex:1,display:"flex",justifyContent:"flex-end",alignItems:"center",columnGap:"7px"},children:[(0,w.jsx)(s.Z,{disabled:""!==H,variant:"contained",color:"info",style:{height:"25px",fontSize:"12px"},onClick:function(e){ge(),Y("add")},children:"Add"}),(0,w.jsx)(s.Z,{disabled:""!==H,variant:"contained",color:"success",style:{height:"25px",fontSize:"12px",background:d.Z[800]},onClick:function(e){Y("edit")},children:"edit"}),(0,w.jsx)(s.Z,{disabled:""===H||""===K||"Direct Deposit"===K&&""===E,variant:"contained",color:"success",style:{height:"25px",fontSize:"12px"},onClick:function(){var e=j.current.getData();"add"===H&&console.log(e.some((function(e){return e[7]<=0})))},children:"save"}),(0,w.jsx)(s.Z,{disabled:""===H,variant:"contained",color:"error",style:{height:"25px",fontSize:"12px"},onClick:function(e){Y("")},children:"cancel"})]})]})]})]})]})}},29823:function(e,t,n){var a=n(64836);t.Z=void 0;var l=a(n(45649)),i=n(80184),o=(0,l.default)((0,i.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.Z=o},5403:function(e,t,n){var a=n(64836);t.Z=void 0;var l=a(n(45649)),i=n(80184),o=(0,l.default)((0,i.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");t.Z=o},1104:function(e,t,n){n.d(t,{Z:function(){return o}});var a=n(29297),l=n(38527),i=n(4522);function o(e,t){(0,i.Z)(2,arguments);var n=(0,l.Z)(e),o=(0,a.Z)(t);if(isNaN(o))return new Date(NaN);if(!o)return n;var r=n.getDate(),u=new Date(n.getTime());return u.setMonth(n.getMonth()+o+1,0),r>=u.getDate()?u:(n.setFullYear(u.getFullYear(),u.getMonth(),r),n)}},33551:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(38527),l=n(4697),i=n(18347),o=n(4522),r=864e5;function u(e,t){var n=e.getFullYear()-t.getFullYear()||e.getMonth()-t.getMonth()||e.getDate()-t.getDate()||e.getHours()-t.getHours()||e.getMinutes()-t.getMinutes()||e.getSeconds()-t.getSeconds()||e.getMilliseconds()-t.getMilliseconds();return n<0?-1:n>0?1:n}function s(e,t){(0,o.Z)(2,arguments);var n=(0,a.Z)(e),s=(0,a.Z)(t),c=u(n,s),d=Math.abs(function(e,t){(0,o.Z)(2,arguments);var n=(0,i.Z)(e),a=(0,i.Z)(t),u=n.getTime()-(0,l.Z)(n),s=a.getTime()-(0,l.Z)(a);return Math.round((u-s)/r)}(n,s));n.setDate(n.getDate()-c*d);var p=c*(d-Number(u(n,s)===-c));return 0===p?0:p}},18347:function(e,t,n){n.d(t,{Z:function(){return i}});var a=n(38527),l=n(4522);function i(e){(0,l.Z)(1,arguments);var t=(0,a.Z)(e);return t.setHours(0,0,0,0),t}}}]);
//# sourceMappingURL=3010.84e93846.chunk.js.map