"use strict";(self.webpackChunkupward=self.webpackChunkupward||[]).push([[5744,793],{81218:function(e,t,o){o.r(t),o.d(t,{MSPRContext:function(){return W},default:function(){return X}});var n=o(74165),i=o(15861),a=o(29439),r=o(4942),l=o(1413),s=o(72791),d=o(36151),u=o(64554),c=o(27391),p=o(4378),x=o(42419),m=o(3380),f=o(91933),h=o(29823),y=o(53329),v=o(21830),g=o.n(v),b=o(27247),w=o(68096),F=o(94925),D=o(58406),Z=o(23786),S=o(93263),z=o(39709),M=o(98333),P=o(51760),j=o(25756),I=o(93433),C=o(77196),_=o(63466),A=o(13400),L=o(91421),k=o(13784),T=o(75105),N=o(80184);function E(){var e,t=(0,s.useContext)(W),o=t.state,a=t.handleInputChange,r=t.customInputchange,l=t.myAxios,d=t.user,u=t.isAddOrEditMode,p=t.keySave,x=(0,s.useRef)(null),m=(0,s.useRef)(null),h=(0,s.useRef)(null),y=(0,s.useRef)(null),v=(0,s.useRef)(null),g=(0,f.useQuery)({queryKey:"bond-policy-account-ss",queryFn:function(){return(e=e||(0,i.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.get("/task/production/policy-accounts-by-line?Line=MSPR",{headers:{Authorization:"Bearer ".concat(null===d||void 0===d?void 0:d.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),b=g.data,M=g.isLoading,P=(0,S.Z)({link:{url:"/task/production/get-clients",queryUrlName:"clientSearch"},columns:[{field:"entry_client_id",headerName:"ID",width:130},{field:"fullname",headerName:"First Name",flex:1},{field:"entry_type",headerName:"ID Type",width:150}],queryKey:"get-clients",uniqueId:"entry_client_id",responseDataKey:"clients",onSelected:function(e){r(e[0].entry_client_id,"client_id"),r(e[0].fullname,"client_name"),r(e[0].address,"client_address"),r(e[0].sale_officer,"sale_officer"),R()},onCellKeyDown:function(e,t){"Enter"!==t.code&&"NumpadEnter"!==t.code||(r(e.row.entry_client_id,"client_id"),r(e.row.fullname,"client_name"),r(e.row.address,"client_address"),r(e.row.sale_officer,"sale_officer"),R())},searchRef:y}),j=P.ModalComponent,E=P.openModal,G=P.isLoading,R=P.closeModal,K=(0,S.Z)({link:{url:"/task/production/get-agents",queryUrlName:"agentSearch"},columns:[{field:"entry_agent_id",headerName:"ID",width:130},{field:"fullname",headerName:"First Name",flex:1},{field:"entry_type",headerName:"ID Type",width:150}],queryKey:"get-agents",uniqueId:"entry_agent_id",responseDataKey:"agents",onSelected:function(e){r(e[0].entry_agent_id,"agent_id"),r(e[0].fullname,"agent_name"),O()},onCellKeyDown:function(e,t){"Enter"!==t.code&&"NumpadEnter"!==t.code||(r(e.row.entry_agent_id,"agent_id"),r(e.row.fullname,"agent_name"),O())},searchRef:v}),B=K.ModalComponent,q=K.openModal,U=K.isLoading,O=K.closeModal;return(0,N.jsxs)("div",{children:[(0,N.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[(0,N.jsx)("div",{style:{display:"flex",columnGap:"10px",flex:1,boxSizing:"border-box"},children:(0,N.jsxs)("fieldset",{style:{flex:1,display:"flex",flexDirection:"column",gap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px"},children:[(0,N.jsx)("legend",{style:{color:"#065f46"},children:"Insurer Information"}),(0,N.jsxs)("div",{style:{display:"flex",gap:"10px",flexDirection:"column"},children:[G?(0,N.jsx)(z.Z,{loading:G}):(0,N.jsxs)(w.Z,{variant:"outlined",size:"small",disabled:u,sx:{width:"170px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,N.jsx)(F.Z,{htmlFor:"client-id-field",children:"Client ID"}),(0,N.jsx)(C.Z,{sx:{height:"27px",fontSize:"14px"},disabled:u,fullWidth:!0,label:"Client ID",name:"client_id",value:o.client_id,onChange:a,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),E(o.client_id)},id:"client-id-field",endAdornment:(0,N.jsx)(_.Z,{position:"end",children:(0,N.jsx)(A.Z,{disabled:u,"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){E(o.client_id)},children:(0,N.jsx)(L.Z,{})})})})]}),(0,N.jsx)(c.Z,{onKeyDown:p,disabled:u,fullWidth:!0,variant:"outlined",size:"small",label:"Client Name",name:"client_name",value:o.client_name,onChange:a,InputProps:{style:{height:"27px",fontSize:"14px"},readOnly:!0},sx:{flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]}),(0,N.jsx)(c.Z,{rows:5,onKeyDown:p,disabled:u,fullWidth:!0,variant:"outlined",size:"small",label:"Client Address",multiline:!0,name:"client_address",value:o.client_address,onChange:a,InputProps:{style:{height:"100px",fontSize:"14px"},readOnly:!0},sx:{flex:1,height:"100px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})}),(0,N.jsx)("div",{style:{display:"flex",columnGap:"10px",flex:1,boxSizing:"border-box"},children:(0,N.jsxs)("fieldset",{style:{height:"100%",flexDirection:"row",gap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",flex:1,flexWrap:"wrap"},children:[(0,N.jsx)("legend",{style:{color:"#065f46"},children:"Agent Information"}),U?(0,N.jsx)(z.Z,{loading:U}):(0,N.jsxs)(w.Z,{variant:"outlined",size:"small",disabled:u,sx:{width:"170px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,N.jsx)(F.Z,{htmlFor:"AGENT-id-field",children:"Agent ID"}),(0,N.jsx)(C.Z,{sx:{height:"27px",fontSize:"14px"},disabled:u,label:"Agent ID",name:"agent_id",value:o.agent_id,onChange:a,onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)return e.preventDefault(),q(o.agent_id)},id:"AGENT-id-field",endAdornment:(0,N.jsx)(_.Z,{position:"end",children:(0,N.jsx)(A.Z,{disabled:u,"aria-label":"search-client",color:"secondary",edge:"end",onClick:function(){q(o.agent_id)},children:(0,N.jsx)(L.Z,{})})})})]}),(0,N.jsx)(c.Z,{fullWidth:!0,onKeyDown:p,disabled:u,variant:"outlined",size:"small",label:"Agent Name",name:"agent_name",value:o.agent_name,onChange:a,InputProps:{style:{height:"27px",fontSize:"14px"},readOnly:!0},sx:{marginTop:"10px",flex:1,height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,N.jsx)(c.Z,{onKeyDown:p,disabled:u,fullWidth:!0,variant:"outlined",size:"small",label:"Sale Officer",multiline:!0,name:"sale_officer",value:o.sale_officer,onChange:a,InputProps:{style:{height:"27px",fontSize:"14px"},readOnly:!0},sx:{marginTop:"10px",width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})})]}),(0,N.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[(0,N.jsx)("div",{style:{display:"flex",columnGap:"10px",flex:1,boxSizing:"border-box"},children:(0,N.jsxs)("fieldset",{style:{flexGrow:1,display:"flex",flexDirection:"column",gap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",marginBottom:"10px",height:"100%"},children:[(0,N.jsx)("legend",{style:{color:"#065f46"},children:"MSPR Policy"}),M?(0,N.jsx)(z.Z,{loading:M}):(0,N.jsxs)(w.Z,{size:"small",disabled:u,sx:{".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},children:[(0,N.jsx)(F.Z,{id:"PolicyAccount",children:"Account"}),(0,N.jsx)(D.Z,{sx:{height:"27px",fontSize:"14px"},labelId:"PolicyAccount",value:o.PolicyAccount,label:"Account",name:"PolicyAccount",onChange:a,children:[{Account:""}].concat((0,I.Z)(null===b||void 0===b?void 0:b.data.policyAccounts)).map((function(e,t){return(0,N.jsx)(Z.Z,{value:e.Account,children:e.Account},t)}))})]}),(0,N.jsx)(c.Z,{disabled:u||"delete"===o.msprActioMode,variant:"outlined",size:"small",label:"Policy No",name:"PolicyNo",value:o.PolicyNo,onChange:a,InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})}),(0,N.jsxs)("div",{style:{display:"flex",columnGap:"10px",flex:1,boxSizing:"border-box"},children:[" ",(0,N.jsxs)("fieldset",{style:{flexGrow:1,display:"flex",flexDirection:"column",gap:"10px",gridArea:"content4",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px"},children:[(0,N.jsx)("legend",{style:{color:"#065f46"},children:"Period of Insurance"}),(0,N.jsx)(k.Z,{disabled:u,label:"Date From",onChange:function(e){r(e,"DateFrom");var t=new Date(e),o=(0,T.Z)(t,1);r(o,"DateTo")},value:new Date(o.DateFrom),textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,o;null===(e=x.current)||void 0===e||null===(o=e.querySelector("button"))||void 0===o||o.click(),clearTimeout(t)}),150)},datePickerRef:x}),(0,N.jsx)(k.Z,{disabled:u,label:"Date To",onChange:function(e){r(e,"DateTo")},value:new Date(o.DateTo),textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,o;null===(e=m.current)||void 0===e||null===(o=e.querySelector("button"))||void 0===o||o.click(),clearTimeout(t)}),150)},datePickerRef:m}),(0,N.jsx)(k.Z,{label:"Date Issued",name:"DateIssued",onChange:function(e){r(e,"DateIssued")},value:new Date(o.DateIssued),disabled:u,textField:{InputLabelProps:{style:{fontSize:"14px"}},InputProps:{style:{height:"27px",fontSize:"14px"}}},onKeyDown:function(e){if("Enter"===e.code||"NumpadEnter"===e.code)var t=setTimeout((function(){var e,o;null===(e=h.current)||void 0===e||null===(o=e.querySelector("button"))||void 0===o||o.click(),clearTimeout(t)}),150)},datePickerRef:h})]})]})]}),(0,N.jsx)("div",{style:{display:"flex",gap:"20px",flexDirection:"column"},children:(0,N.jsxs)("fieldset",{style:{marginTop:"10px",display:"grid",gap:"10px",gridArea:"content5",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",gridTemplateColumns:"repeat(2,1fr)"},children:[(0,N.jsx)(c.Z,{onKeyDown:p,disabled:u,fullWidth:!0,variant:"outlined",size:"small",label:"Premises Address",name:"pAddress",value:o.pAddress,onChange:a,multiline:!0,rows:1,InputProps:{style:{height:"auto",fontSize:"14px"}},sx:{width:"100%",height:"auto",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,N.jsx)(c.Z,{onKeyDown:p,disabled:u,fullWidth:!0,variant:"outlined",size:"small",label:"Money Routes From",name:"moneyRoutesFrom",value:o.moneyRoutesFrom,onChange:a,multiline:!0,rows:1,InputProps:{style:{height:"auto",fontSize:"14px"}},sx:{width:"100%",height:"auto",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,N.jsx)(c.Z,{onKeyDown:p,disabled:u,fullWidth:!0,variant:"outlined",size:"small",label:"Safe and/or Strongroom Desc.",name:"safeDesc",value:o.safeDesc,onChange:a,multiline:!0,rows:1,InputProps:{style:{height:"auto",fontSize:"14px"}},sx:{width:"100%",height:"auto",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,N.jsx)(c.Z,{onKeyDown:p,disabled:u,fullWidth:!0,variant:"outlined",size:"small",label:"Money Routes To",name:"moneyRoutesTo",value:o.moneyRoutesTo,onChange:a,multiline:!0,rows:1,InputProps:{style:{height:"auto",fontSize:"14px"}},sx:{width:"100%",height:"auto",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,N.jsx)(c.Z,{onKeyDown:p,disabled:u,fullWidth:!0,variant:"outlined",size:"small",label:"Method of Transportation",name:"methodTrans",value:o.methodTrans,onChange:a,multiline:!0,rows:1,InputProps:{style:{height:"auto",fontSize:"14px"}},sx:{width:"100%",height:"auto",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,N.jsxs)("div",{style:{display:"flex",gap:"10px"},children:[(0,N.jsx)(c.Z,{onKeyDown:p,disabled:u,fullWidth:!0,variant:"outlined",size:"small",label:"Guards Minimum Number",name:"guardsMinNum",value:o.guardsMinNum,onChange:a,InputProps:{style:{height:"auto",fontSize:"14px"}},sx:{width:"100%",height:"auto",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),(0,N.jsx)(c.Z,{onKeyDown:p,disabled:u,fullWidth:!0,variant:"outlined",size:"small",label:"Messenger Maximum Number",name:"messengerMaxNum",value:o.messengerMaxNum,onChange:a,InputProps:{style:{height:"auto",fontSize:"14px"}},sx:{width:"100%",height:"auto",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}})]})]})}),j,B]})}var G=o(94721),R=o(56580);function K(){var e=(0,s.useContext)(W),t=e.state,o=e.handleInputChange,n=e.computation,i=e.isAddOrEditMode,a=e.dispatch,r=e.keySave;function l(e){"NumpadEnter"!==e.code&&"Enter"!==e.code||n()}return(0,N.jsxs)("div",{style:{display:"flex"},children:[(0,N.jsx)("div",{style:{display:"flex",flexDirection:"column",flexGrow:1},children:(0,N.jsxs)("fieldset",{style:{display:"flex",gap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",justifyContent:"center",flexGrow:1},children:[(0,N.jsx)("legend",{style:{height:"22px"}}),(0,N.jsxs)("div",{style:{display:"flex",flexDirection:"column",rowGap:"10px",flexGrow:1},children:[(0,N.jsx)(c.Z,{onKeyDown:r,disabled:i,required:!0,variant:"outlined",size:"small",label:"Section I Insurance",name:"sec1",value:t.sec1,onChange:o,placeholder:"0.00",InputProps:{inputComponent:R.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){a({type:"UPDATE_FIELD",field:"sec1",value:parseFloat(t.sec1).toFixed(2)})}}),(0,N.jsx)(c.Z,{onKeyDown:r,disabled:i,required:!0,variant:"outlined",size:"small",label:"Section IB Insurance",name:"sec2",value:t.sec2,onChange:o,placeholder:"0.00",InputProps:{inputComponent:R.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){a({type:"UPDATE_FIELD",field:"sec2",value:parseFloat(t.sec2).toFixed(2)})}}),(0,N.jsx)(c.Z,{onKeyDown:r,disabled:i,required:!0,variant:"outlined",size:"small",label:"Section II Insurance",name:"sec3",value:t.sec3,onChange:o,placeholder:"0.00",InputProps:{inputComponent:R.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){a({type:"UPDATE_FIELD",field:"sec3",value:parseFloat(t.sec3).toFixed(2)})}})]}),(0,N.jsxs)("div",{style:{display:"flex",flexDirection:"column",rowGap:"10px",flexGrow:1},children:[(0,N.jsx)(c.Z,{onKeyDown:r,disabled:i,required:!0,variant:"outlined",size:"small",label:"Premium",name:"prem1",value:t.prem1,onChange:o,placeholder:"0.00",InputProps:{inputComponent:R.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){a({type:"UPDATE_FIELD",field:"prem1",value:parseFloat(t.prem1).toFixed(2)})}}),(0,N.jsx)(c.Z,{onKeyDown:r,disabled:i,required:!0,variant:"outlined",size:"small",label:"Premium",name:"prem2",value:t.prem2,onChange:o,placeholder:"0.00",InputProps:{inputComponent:R.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){a({type:"UPDATE_FIELD",field:"prem2",value:parseFloat(t.prem2).toFixed(2)})}}),(0,N.jsx)(c.Z,{onKeyDown:r,disabled:i,required:!0,variant:"outlined",size:"small",label:"Premium",name:"prem3",value:t.prem3,onChange:o,placeholder:"0.00",InputProps:{inputComponent:R.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){a({type:"UPDATE_FIELD",field:"prem3",value:parseFloat(t.prem3).toFixed(2)})}})]})]})}),(0,N.jsxs)("fieldset",{style:{display:"flex",flexDirection:"column",rowGap:"10px",padding:"15px",border:"1px solid #cbd5e1",borderRadius:"5px",flexGrow:1},children:[(0,N.jsx)("legend",{children:"Premiums"}),(0,N.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",padding:"5px"},children:(0,N.jsx)(d.Z,{disabled:i,size:"small",variant:"contained",color:"primary",onClick:function(){n()},children:"Compute"})}),(0,N.jsx)(c.Z,{disabled:i,required:!0,variant:"outlined",size:"small",label:"Net Premium",name:"netPremium",value:t.netPremium,onChange:o,onKeyDown:l,placeholder:"0.00",InputProps:{inputComponent:R.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){a({type:"UPDATE_FIELD",field:"netPremium",value:parseFloat(t.netPremium).toFixed(2)})}}),(0,N.jsx)(c.Z,{disabled:i,required:!0,variant:"outlined",size:"small",label:"Vat",name:"vat",value:t.vat,onChange:o,onKeyDown:l,placeholder:"0.00",InputProps:{inputComponent:R.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){a({type:"UPDATE_FIELD",field:"vat",value:parseFloat(t.vat).toFixed(2)})}}),(0,N.jsx)(c.Z,{disabled:i,required:!0,variant:"outlined",size:"small",label:"Doc Stamp",name:"docStamp",value:t.docStamp,onChange:o,onKeyDown:l,placeholder:"0.00",InputProps:{inputComponent:R.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){a({type:"UPDATE_FIELD",field:"docStamp",value:parseFloat(t.docStamp).toFixed(2)})}}),(0,N.jsxs)("div",{style:{display:"flex",gap:"5px",position:"relative"},children:[(0,N.jsx)(c.Z,{disabled:i,required:!0,variant:"outlined",size:"small",name:"localGovTaxPercent",value:t.localGovTaxPercent,onChange:o,onKeyDown:l,placeholder:"0.00",InputProps:{inputComponent:R.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"80px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){a({type:"UPDATE_FIELD",field:"localGovTaxPercent",value:parseFloat(t.localGovTaxPercent).toFixed(2)})}}),(0,N.jsx)(c.Z,{disabled:i,required:!0,variant:"outlined",size:"small",label:"Local Gov Tax",name:"localGovTax",value:t.localGovTax,onChange:o,onKeyDown:l,placeholder:"0.00",InputProps:{inputComponent:R.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){a({type:"UPDATE_FIELD",field:"localGovTax",value:parseFloat(t.localGovTax).toFixed(2)})}})]}),(0,N.jsx)(G.Z,{color:"secondary"}),(0,N.jsx)(c.Z,{disabled:i,required:!0,variant:"outlined",size:"small",label:"Total Due",name:"totalDue",value:t.totalDue,onChange:o,placeholder:"0.00",InputProps:{inputComponent:R.a,style:{height:"27px",fontSize:"14px"}},sx:{width:"100%",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}},onBlur:function(){a({type:"UPDATE_FIELD",field:"totalDue",value:parseFloat(t.totalDue).toFixed(2)})}})]})]})}var B=o(64230),q={form_action:"REG",form_type:"COM",sub_account:"HO",client_id:"",client_name:"",client_address:"",agent_id:"",agent_name:"",agent_com:"0.00",sale_officer:"",PolicyAccount:"",PolicyNo:"",DateFrom:new Date,DateTo:(0,T.Z)(new Date,1),DateIssued:new Date,pAddress:"",moneyRoutesFrom:"",moneyRoutesTo:"",safeDesc:"",methodTrans:"",guardsMinNum:"0",messengerMaxNum:"0",sec1:"",sec2:"",sec3:"",prem1:"",prem2:"",prem3:"",netPremium:"",vat:"",docStamp:"",localGovTaxPercent:"0.75",localGovTax:"",totalDue:"",msprActioMode:""},U=function(e,t){return"UPDATE_FIELD"===t.type?(0,l.Z)((0,l.Z)({},e),{},(0,r.Z)({},t.field,t.value)):e},W=(0,s.createContext)({}),O="mspr-search",V="clients",H="agents",Q="mspr-policy",Y="mspr-policy",J="mspr-policy";function X(){var e,t,o,v,I,C,_=(0,j.Z)([(0,N.jsx)(E,{}),(0,N.jsx)(K,{})]),A=_.step,L=_.goTo,k=_.currentStepIndex,T=(0,s.useReducer)(U,q),G=(0,a.Z)(T,2),R=G[0],X=G[1],$=(0,s.useContext)(m.V),ee=$.myAxios,te=$.user,oe=(0,s.useState)([]),ne=(0,a.Z)(oe,2),ie=ne[0],ae=ne[1],re=(0,s.useState)([]),le=(0,a.Z)(re,2),se=le[0],de=le[1],ue=(0,s.useState)(""),ce=(0,a.Z)(ue,2),pe=ce[0],xe=ce[1],me=(0,s.useState)(!1),fe=(0,a.Z)(me,2),he=fe[0],ye=fe[1],ve=(0,s.useState)({thirdparty:"tpl"===R.form_type.toLowerCase(),compre:"com"===R.form_type.toLowerCase()}),ge=(0,a.Z)(ve,2),be=ge[0],we=ge[1],Fe=(0,f.useQueryClient)(),De=""===R.msprActioMode,Ze=(0,s.useRef)(null),Se=(0,s.useRef)(null),ze=(0,s.useRef)(null),Me=(0,s.useRef)(null),Pe=(0,f.useQuery)({queryKey:"get-sub_account",queryFn:function(){return(e=e||(0,i.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ee.get("/task/production/get-sub_account",{headers:{Authorization:"Bearer ".concat(null===te||void 0===te?void 0:te.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),je=Pe.data,Ie=Pe.isLoading,Ce=(0,S.Z)({link:{url:"/task/production/search-mspr-policy",queryUrlName:"searchMsprPolicy"},columns:[{field:"DateIssued",headerName:"Date",width:200},{field:"PolicyNo",headerName:"Policy No",width:250},{field:"Account",headerName:"Account",width:170},{field:"client_fullname",headerName:"Full Name",flex:1}],queryKey:"search-mspr-policy",uniqueId:"PolicyNo",responseDataKey:"msprPolicy",onSelected:function(e){Qe(e),ke()},onCellKeyDown:function(e,t){"Enter"!==t.code&&"NumpadEnter"!==t.code||(Qe([e.row]),ke())},onSuccess:function(e){console.log(e)},searchRef:Ze}),_e=Ce.ModalComponent,Ae=Ce.openModal,Le=Ce.isLoading,ke=Ce.closeModal,Te=(0,f.useMutation)({mutationKey:Y,mutationFn:function(e){return(t=t||(0,i.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("delete"!==R.msprActioMode){e.next=4;break}return e.next=3,ee.post("/task/production/update-mspr-policy",t,{headers:{Authorization:"Bearer ".concat(null===te||void 0===te?void 0:te.accessToken)}});case 3:case 6:return e.abrupt("return",e.sent);case 4:return e.next=6,ee.post("/task/production/add-mspr-policy",t,{headers:{Authorization:"Bearer ".concat(null===te||void 0===te?void 0:te.accessToken)}});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){return(o=o||(0,i.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.data.success){e.next=5;break}return e.next=3,He();case 3:return Ve(q,!0),e.abrupt("return",g().fire({position:"center",icon:"success",title:t.data.message,showConfirmButton:!1,timer:1500}));case 5:g().fire({position:"center",icon:"error",title:t.data.message,showConfirmButton:!1,timer:1500});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),Ne=Te.mutate,Ee=Te.isLoading,Ge=(0,f.useMutation)({mutationKey:J,mutationFn:function(e){return(v=v||(0,i.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ee.post("/task/production/delete-mspr-policy",t,{headers:{Authorization:"Bearer ".concat(null===te||void 0===te?void 0:te.accessToken)}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)},onSuccess:function(e){return(I=I||(0,i.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.data.success){e.next=5;break}return e.next=3,He();case 3:return Ve(q,!0),e.abrupt("return",g().fire({position:"center",icon:"success",title:t.data.message,showConfirmButton:!1,timer:1500}));case 5:g().fire({position:"center",icon:"error",title:t.data.message,showConfirmButton:!1,timer:1500});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),Re=Ge.mutate,Ke=Ge.isLoading,Be=(0,s.useCallback)((function(){R.sec1=""===R.sec1?"0":R.sec1,R.sec2=""===R.sec2?"0":R.sec2,R.sec3=""===R.sec3?"0":R.sec3,R.prem1=""===R.prem1?"0":R.prem1,R.prem2=""===R.prem2?"0":R.prem2,R.prem3=""===R.prem3?"0":R.prem3,R.netPremium=""===R.netPremium?"0":R.netPremium,R.vat=""===R.vat?"0":R.vat,R.docStamp=""===R.docStamp?"0":R.docStamp,R.localGovTaxPercent=""===R.localGovTaxPercent?"0":R.localGovTaxPercent,R.localGovTax=""===R.localGovTax?"0":R.localGovTax,R.totalDue=""===R.totalDue?"0":R.totalDue}),[R]),qe=(0,s.useCallback)((function(){return""===R.client_name||null===R.client_name||void 0===R.client_name?g().fire("Unable to save! Invalid Client ID","you missed the Client Id Field?","error"):""===R.client_id||null===R.client_id?g().fire("Unable to save! Invalid IDNo.","you missed the Client Id Field?","error"):""===R.PolicyAccount||null===R.PolicyAccount?g().fire("Unable to save! Please select Account.","you missed the Account Field?","error"):""===R.PolicyNo||null===R.PolicyNo?g().fire("Unable to save! Invalid Policy No.","you missed the Policy No Field?","error"):void("delete"===R.msprActioMode?(0,B.s)({isUpdate:!0,cb:function(e){Be(),Ne((0,l.Z)((0,l.Z)({},R),{},{userCodeConfirmation:e}))}}):(0,B.L)({isConfirm:function(){Be(),Ne(R)}}))}),[Be,R,Ne]);(0,s.useEffect)((function(){var e=function(e){var t,o,n;("AudioVolumeMute"!==e.code&&"F1"!==e.code&&173!==e.keyCode||(e.preventDefault(),L(0)),"AudioVolumeDown"!==e.code&&"F2"!==e.code&&174!==e.keyCode||(e.preventDefault(),L(1)),""!==R.msprActioMode||"KeyN"!==e.code&&"Enter"!==e.code&&"NumpadEnter"!==e.code)||(e.preventDefault(),null===(t=Se.current)||void 0===t||t.click());""!==R.msprActioMode&&"Escape"===e.code&&(e.preventDefault(),null===(o=ze.current)||void 0===o||o.click());"delete"===R.msprActioMode&&"Delete"===e.code&&(e.preventDefault(),null===(n=Me.current)||void 0===n||n.click())};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[qe,R.msprActioMode,L]);var Ue=function(e){var t=e.target,o=t.name,n=t.value;X({type:"UPDATE_FIELD",field:o,value:n})},We=function(e,t){X({type:"UPDATE_FIELD",field:t,value:e})};function Oe(){Be();var e=parseFloat(R.localGovTaxPercent);""===R.prem1&&(R.prem1="0.00"),""===R.prem2&&(R.prem2="0.00"),""===R.prem3&&(R.prem3="0.00");var t=parseFloat(R.prem1),o=parseFloat(R.prem2),n=parseFloat(R.prem3),i=e/100,a=t+o+n;We((.12*a).toFixed(2),"vat"),We((.125*a).toFixed(2),"docStamp"),We((i*a).toFixed(2),"localGovTax"),We(a.toFixed(2),"netPremium"),We(t.toFixed(2),"prim1"),We(o.toFixed(2),"prim2"),We(n.toFixed(2),"prim3"),We((parseFloat(a.toFixed(2))+parseFloat((.12*a).toFixed(2))+parseFloat((.125*a).toFixed(2))+parseFloat((i*a).toFixed(2))).toFixed(2),"totalDue")}function Ve(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.form_type=R.form_type,e.form_action=R.form_action,e.prem_text_one=R.prem_text_one,e.prem_text_two=R.prem_text_two,t||(e.msprActioMode=R.msprActioMode),Object.entries(e).forEach((function(e){var t=(0,a.Z)(e,2),o=t[0],n=t[1];We(n,o)}))}function He(){return(C=C||(0,i.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.all([Fe.invalidateQueries(O),Fe.invalidateQueries(V),Fe.invalidateQueries(H),Fe.invalidateQueries(Q),Fe.invalidateQueries(Y),Fe.invalidateQueries(J)]));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Qe(e){var t=e[0],o=t.PolicyNo,n=t.Account,i=t.PeriodFrom,a=t.PeriodTo,r=t.Location,l=t.Saferoom,s=t.OriginPoint,d=t.DestinationPoint,u=t.Method,c=t.Guard,p=t.Messenger,x=t.SecI,m=t.SecIPremium,f=t.SecIB,h=t.SecIPremiumB,y=t.SecII,v=t.SecIIPremium,g=t.IDNo,b=t.SubAcct,w=t.DateIssued,F=t.AgentID,D=t.AgentCom,Z=t.client_fullname,S=t.agent_fullname,z=t.address,M=t.sale_officer;We(b,"sub_account"),We(g,"client_id"),We(Z,"client_name"),We(z,"client_address"),We(F,"agent_id"),We(S,"agent_name"),We(D,"agent_com"),We(M,"sale_officer"),We(n,"PolicyAccount"),We(o,"PolicyNo"),We(i,"DateFrom"),We(a,"DateTo"),We(w,"DateIssued"),We(r,"pAddress"),We(s,"moneyRoutesFrom"),We(d,"moneyRoutesTo"),We(l,"safeDesc"),We(u,"methodTrans"),We("".concat(c),"guardsMinNum"),We("".concat(p),"messengerMaxNum"),We(x,"sec1"),We(f,"sec2"),We(y,"sec3"),R.prem1=m,R.prem2=h,R.prem3=v,Oe(),We("delete","msprActioMode")}return(0,N.jsxs)(W.Provider,{value:{state:R,handleInputChange:Ue,customInputchange:We,Mortgagee:he,setMortgagee:ye,showField:be,setShowField:we,clientRows:ie,setClientRows:ae,myAxios:ee,user:te,agentRows:se,setAgentRows:de,computation:Oe,isAddOrEditMode:De,dispatch:X,keySave:function(e){""===R.mode||"Enter"!==e.code&&"NumpadEnter"!==e.code||(e.preventDefault(),qe())}},children:[(0,N.jsxs)("div",{style:{display:"flex",columnGap:"5px"},children:[(0,N.jsxs)("div",{style:{display:"flex",columnGap:"8px",alignItems:"center"},children:[(0,N.jsx)(P.CustomButton,{onClick:function(){L(0)},currentStepIndex:k,index:0,children:"Policy Information"}),(0,N.jsx)(M.Z,{fontSize:"small"})]}),(0,N.jsx)("div",{style:{display:"flex",columnGap:"8px",alignItems:"center"},children:(0,N.jsx)(P.CustomButton,{onClick:function(){L(1)},currentStepIndex:k,index:1,children:"Policy Premium"})}),(0,N.jsx)("div",{style:{display:"flex",alignItems:"center",columnGap:"20px",marginLeft:"30px"},children:(0,N.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px"},children:[""===R.msprActioMode&&(0,N.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},ref:Se,variant:"contained",startIcon:(0,N.jsx)(x.Z,{}),onClick:function(){We("add","msprActioMode")},children:"New"}),(0,N.jsx)(z.Z,{sx:{height:"30px",fontSize:"11px"},loading:Ee,color:"primary",variant:"contained",type:"submit",onClick:qe,disabled:""===R.msprActioMode,startIcon:(0,N.jsx)(y.Z,{}),children:"Save"}),""!==R.msprActioMode&&(0,N.jsx)(d.Z,{sx:{height:"30px",fontSize:"11px"},ref:ze,variant:"contained",startIcon:(0,N.jsx)(h.Z,{}),color:"error",onClick:function(){g().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, cancel it!"}).then((function(e){e.isConfirmed&&(We("","msprActioMode"),Ve(q,!0))}))},children:"Cancel"}),(0,N.jsx)(z.Z,{loading:Ke,ref:Me,id:"save-entry-header",variant:"contained",sx:{height:"30px",fontSize:"11px",backgroundColor:p.Z[500],"&:hover":{backgroundColor:p.Z[600]}},disabled:"delete"!==R.msprActioMode,startIcon:(0,N.jsx)(b.Z,{}),onClick:function(){(0,B.s)({isUpdate:!1,cb:function(e){Re({PolicyAccount:R.PolicyAccount,PolicyNo:R.PolicyNo,policyType:R.policyType,userCodeConfirmation:e})}})},children:"Delete"})]})})]}),(0,N.jsx)(u.Z,{sx:function(e){return(0,r.Z)({display:"flex",alignItems:"center",columnGap:"20px",marginBottom:"10px"},e.breakpoints.down("sm"),{flexDirection:"column",alignItems:"flex-start",flex:1})},children:(0,N.jsx)("div",{style:{marginTop:"10px",marginBottom:"12px",width:"100%"}})}),(0,N.jsxs)("div",{style:{marginBottom:"5px",display:"flex",gap:"10px"},children:[Le?(0,N.jsx)(z.Z,{loading:Le}):(0,N.jsx)(c.Z,{label:"Search",size:"small",name:"search",value:pe,onChange:function(e){xe(e.target.value)},onKeyDown:function(e){"Enter"!==e.code&&"NumpadEnter"!==e.code||(e.preventDefault(),We("","msprActioMode"),Ve(q,!0),Ae(pe))},InputProps:{style:{height:"27px",fontSize:"14px"}},sx:{width:"300px",height:"27px",".MuiFormLabel-root":{fontSize:"14px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}}),Ie?(0,N.jsx)(z.Z,{loading:Ie}):(0,N.jsxs)(w.Z,{size:"small",sx:function(e){return{width:"150px",".MuiFormLabel-root":{fontSize:"14px",background:"white",zIndex:99,padding:"0 3px"},".MuiFormLabel-root[data-shrink=false]":{top:"-5px"}}},children:[(0,N.jsx)(F.Z,{id:"subAccount",children:"Sub Account"}),(0,N.jsx)(D.Z,{sx:{height:"27px",fontSize:"14px"},size:"small",labelId:"subAccount",label:"subAccount",name:"sub_account",value:R.sub_account,onChange:function(e){Ue(e)},children:(null===je||void 0===je?void 0:je.data.sub_account).map((function(e,t){return(0,N.jsx)(Z.Z,{value:e.Acronym.trim(),children:e.Acronym},t)}))})]})]}),A,_e]})}},42419:function(e,t,o){var n=o(64836);t.Z=void 0;var i=n(o(45649)),a=o(80184),r=(0,i.default)((0,a.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.Z=r},80813:function(e,t,o){var n=o(64836);t.Z=void 0;var i=n(o(45649)),a=o(80184),r=(0,i.default)((0,a.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"}),"Article");t.Z=r},27247:function(e,t,o){var n=o(64836);t.Z=void 0;var i=n(o(45649)),a=o(80184),r=(0,i.default)((0,a.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");t.Z=r},98333:function(e,t,o){var n=o(64836);t.Z=void 0;var i=n(o(45649)),a=o(80184),r=(0,i.default)((0,a.jsx)("path",{d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"NavigateNext");t.Z=r},67756:function(e,t,o){var n=o(64836);t.Z=void 0;var i=n(o(45649)),a=o(80184),r=(0,i.default)((0,a.jsx)("path",{d:"M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"}),"PersonOutline");t.Z=r},91421:function(e,t,o){var n=o(64836);t.Z=void 0;var i=n(o(45649)),a=o(80184),r=(0,i.default)([(0,a.jsx)("circle",{cx:"10",cy:"8",r:"4"},"0"),(0,a.jsx)("path",{d:"M10.35 14.01C7.62 13.91 2 15.27 2 18v2h9.54c-2.47-2.76-1.23-5.89-1.19-5.99zm9.08 4.01c.36-.59.57-1.28.57-2.02 0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c.74 0 1.43-.22 2.02-.57L20.59 22 22 20.59l-2.57-2.57zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"},"1")],"PersonSearch");t.Z=r},53329:function(e,t,o){var n=o(64836);t.Z=void 0;var i=n(o(45649)),a=o(80184),r=(0,i.default)((0,a.jsx)("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"}),"Save");t.Z=r},79012:function(e,t,o){o.d(t,{Z:function(){return v}});var n=o(63366),i=o(87462),a=o(72791),r=o(63733),l=o(94419),s=o(66934),d=o(31402),u=o(75878),c=o(21217);function p(e){return(0,c.Z)("MuiFormGroup",e)}(0,u.Z)("MuiFormGroup",["root","row","error"]);var x=o(52930),m=o(76147),f=o(80184),h=["className","row"],y=(0,s.ZP)("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:function(e,t){var o=e.ownerState;return[t.root,o.row&&t.row]}})((function(e){var t=e.ownerState;return(0,i.Z)({display:"flex",flexDirection:"column",flexWrap:"wrap"},t.row&&{flexDirection:"row"})})),v=a.forwardRef((function(e,t){var o=(0,d.Z)({props:e,name:"MuiFormGroup"}),a=o.className,s=o.row,u=void 0!==s&&s,c=(0,n.Z)(o,h),v=(0,x.Z)(),g=(0,m.Z)({props:o,muiFormControl:v,states:["error"]}),b=(0,i.Z)({},o,{row:u,error:g.error}),w=function(e){var t=e.classes,o={root:["root",e.row&&"row",e.error&&"error"]};return(0,l.Z)(o,p,t)}(b);return(0,f.jsx)(y,(0,i.Z)({className:(0,r.Z)(w.root,a),ownerState:b,ref:t},c))}))},4378:function(e,t){t.Z={50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",A100:"#ff80ab",A200:"#ff4081",A400:"#f50057",A700:"#c51162"}}}]);
//# sourceMappingURL=5744.ab7a5478.chunk.js.map