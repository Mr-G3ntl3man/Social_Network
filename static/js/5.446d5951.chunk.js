(this.webpackJsonpsocial_network=this.webpackJsonpsocial_network||[]).push([[5],{542:function(e,t,s){"use strict";t.a=s.p+"static/media/defaultAvatar.153ee148.jpg"},543:function(e,t,s){e.exports={mainWrap:"chat_mainWrap__11Akb",addMess:"chat_addMess__1rsu9",userMess:"chat_userMess__377qw",myMess:"chat_myMess__nyNpp",userText:"chat_userText__3lTO9",myText:"chat_myText__sUIPJ",messageWrap:"chat_messageWrap__cpMbc",avatar:"chat_avatar__2XWHA"}},551:function(e,t,s){"use strict";s.r(t),s.d(t,"Chat",(function(){return _}));var a=s(4),c=s(0),r=s.n(c),n=s(543),i=s.n(n),o=s(18),u=s(186),l=s(49),j=s(528),d=s(542),b=s(1),h=r.a.memo((function(e){var t=e.user,s=Object(o.d)((function(e){var t;return null===(t=e.auth.userData)||void 0===t?void 0:t.id})),a=Object(b.jsxs)("div",{className:i.a.userMess,children:[Object(b.jsx)("div",{children:Object(b.jsx)(l.b,{to:"/profile/".concat(t.userId),children:Object(b.jsx)(j.a,{style:t.photo?{}:{border:"2px solid #7e7e7e"},className:i.a.avatar,src:t.photo||d.a,size:"large"})})}),Object(b.jsxs)("p",{className:i.a.userText,children:[Object(b.jsx)("span",{children:t.userName}),t.message]})]}),c=Object(b.jsx)("div",{className:i.a.myMess,children:Object(b.jsx)("p",{className:i.a.myText,children:t.message})});return s===t.userId?c:a})),O=s(526),m=s(522),f=function(){var e=Object(c.useState)(""),t=Object(a.a)(e,2),s=t[0],r=t[1],n=Object(o.d)((function(e){return e.chat.status})),l=Object(o.c)(),j=function(e){n===u.a.READY&&"Enter"===e.key&&s&&(l(Object(u.c)(s)),r(""))};return Object(b.jsxs)("div",{className:i.a.addMess,children:[Object(b.jsx)(O.a,{onKeyPress:j,value:s,onChange:function(e){return r(e.currentTarget.value)},fullWidth:!0,label:"Write message",margin:"normal",variant:"outlined",multiline:!0,minRows:1,maxRows:10}),Object(b.jsx)(m.a,{style:{fontFamily:"Mochiy Pop P One, sans-serif"},disabled:n!==u.a.READY,onClick:function(){s&&(l(Object(u.c)(s)),r(""))},onKeyPress:j,variant:"contained",color:"primary",children:"Send message"})]})},p=s(201),v=s(19),x=s(72),_=function(){var e=Object(o.d)((function(e){return e.chat.status})),t=Object(o.d)((function(e){return e.chat.messages})),s=Object(o.d)((function(e){return e.chat.error})),r=Object(o.d)((function(e){return e.auth.isAuth})),n=Object(c.useState)(!1),l=Object(a.a)(n,2),j=l[0],d=l[1],O=Object(c.useState)(!1),m=Object(a.a)(O,2),_=m[0],g=m[1],y=t.map((function(e){return Object(b.jsx)(h,{user:e},e.id)})),M=Object(c.useRef)(null),N=Object(o.c)(),T=Object(v.g)();Object(c.useEffect)((function(){return r?(N(Object(u.d)()),function(){N(Object(u.e)())}):T(x.a.HOME)}),[N]),Object(c.useEffect)((function(){var e=M.current;return _?j&&e&&e.scrollBy({top:e.scrollHeight,behavior:"smooth"}):e&&(e.scrollTop=e.scrollHeight),function(){g(!1)}}),[t]);return Object(b.jsxs)(b.Fragment,{children:[e===u.a.ERROR&&Object(b.jsx)(p.a,{messages:"Something went wrong, please reload the page!!!",severity:"error",open:s,anchorOrigin:{vertical:"top",horizontal:"center"}}),Object(b.jsxs)("div",{className:i.a.mainWrap,children:[Object(b.jsx)("div",{ref:M,onScroll:function(){var e=M.current;e&&(e.clientHeight>=Math.floor(e.scrollHeight-e.scrollTop)?(!j&&d(!0),g(!0)):j&&d(!1))},className:i.a.messageWrap,children:y}),Object(b.jsx)(f,{})]})]})};t.default=_}}]);
//# sourceMappingURL=5.446d5951.chunk.js.map