(this.webpackJsonpsocial_network=this.webpackJsonpsocial_network||[]).push([[5],{500:function(e,a,s){"use strict";a.a=s.p+"static/media/defaultAvatar.153ee148.jpg"},505:function(e,a,s){e.exports={mainWrap:"chat_mainWrap__4IgBi",addMess:"chat_addMess__1co1R",userMess:"chat_userMess__3hGtu",myMess:"chat_myMess__2F2_o",userText:"chat_userText__2Gmag",myText:"chat_myText__SIBSi",messageWrap:"chat_messageWrap__2n3tL",avatar:"chat_avatar__269cD"}},509:function(e,a,s){"use strict";s.r(a),s.d(a,"Chat",(function(){return O}));var t=s(17),c=s(16),n=s(0),r=s(505),i=s.n(r),u=s(484),o=s(500),l=s(479),d=s(477),j=s(50),m=s(27),h=s(1),b=new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"),O=function(e){var a=Object(m.d)((function(e){var a;return null===(a=e.auth.userData)||void 0===a?void 0:a.id})),s=Object(n.useState)([]),r=Object(c.a)(s,2),O=r[0],_=r[1],v=Object(n.useState)(),p=Object(c.a)(v,2),x=(p[0],p[1],Object(n.useState)(!1)),f=Object(c.a)(x,2);f[0],f[1];Object(n.useEffect)((function(){var e=function(e){var a=JSON.parse(e.data);_((function(e){return[].concat(Object(t.a)(e),Object(t.a)(a))}))};return b.addEventListener("message",e),function(){return b.removeEventListener("message",e)}}),[]);var g=O.map((function(e,s){var t=Object(h.jsxs)("div",{className:i.a.userMess,children:[Object(h.jsx)("div",{children:Object(h.jsx)(j.b,{to:"/profile/".concat(e.userId),children:Object(h.jsx)(u.a,{className:i.a.avatar,src:e.photo||o.a,size:"large"})})}),Object(h.jsxs)("p",{className:i.a.userText,children:[Object(h.jsx)("span",{children:e.userName}),e.message]})]},s),c=Object(h.jsx)("div",{className:i.a.myMess,children:Object(h.jsx)("p",{className:i.a.myText,children:e.message})},s);return a===e.userId?c:t})),y=Object(n.useState)(""),M=Object(c.a)(y,2),N=M[0],w=M[1];return Object(h.jsxs)("div",{className:i.a.mainWrap,children:[Object(h.jsx)("div",{className:i.a.messageWrap,children:g}),Object(h.jsxs)("div",{className:i.a.addMess,children:[Object(h.jsx)(l.a,{value:N,onChange:function(e){w(e.currentTarget.value)},fullWidth:!0,label:"Write message",margin:"normal",variant:"outlined",multiline:!0,minRows:1,maxRows:10}),Object(h.jsx)(d.a,{style:{fontFamily:"Mochiy Pop P One, sans-serif"},onClick:function(){N&&(b.send(N),w(""))},variant:"contained",color:"primary",children:"Send message"})]})]})};a.default=O}}]);
//# sourceMappingURL=5.9cb5a406.chunk.js.map