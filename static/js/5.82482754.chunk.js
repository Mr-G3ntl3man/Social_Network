(this.webpackJsonpsocial_network=this.webpackJsonpsocial_network||[]).push([[5],{578:function(e,t,a){"use strict";t.a=a.p+"static/media/defaultAvatar.153ee148.jpg"},580:function(e,t,a){e.exports={mainWrap:"chat_mainWrap__21Fgy",addMess:"chat_addMess__38wCR",userMess:"chat_userMess__2Cgnn",myMess:"chat_myMess__3AT8F",userText:"chat_userText__2twUi",myText:"chat_myText__bQKNM",messageWrap:"chat_messageWrap__396lK",avatar:"chat_avatar__2PxiR"}},589:function(e,t,a){"use strict";a.r(t),a.d(t,"Chat",(function(){return v}));var s=a(14),c=a(0),r=a.n(c),n=a(580),i=a.n(n),o=a(19),u=a(213),l=a(50),j=a(562),d=a(578),b=a(1),h=r.a.memo((function(e){var t=e.user,a=Object(o.d)((function(e){var t;return null===(t=e.auth.userData)||void 0===t?void 0:t.id})),s=Object(b.jsxs)("div",{className:i.a.userMess,children:[Object(b.jsx)("div",{children:Object(b.jsx)(l.b,{to:"/profile/".concat(t.userId),children:Object(b.jsx)(j.a,{style:t.photo?{}:{border:"2px solid #7e7e7e"},className:i.a.avatar,src:t.photo||d.a,size:"large"})})}),Object(b.jsxs)("p",{className:i.a.userText,children:[Object(b.jsx)("span",{children:t.userName}),t.message]})]}),c=Object(b.jsx)("div",{className:i.a.myMess,children:Object(b.jsx)("p",{className:i.a.myText,children:t.message})});return a===t.userId?c:s})),O=a(559),m=a(557),f=function(){var e=Object(c.useState)(""),t=Object(s.a)(e,2),a=t[0],r=t[1],n=Object(o.d)((function(e){return e.chat.status})),l=Object(o.c)(),j=function(e){n===u.a.READY&&"Enter"===e.key&&a&&(l(Object(u.c)(a)),r(""))};return Object(b.jsxs)("div",{className:i.a.addMess,children:[Object(b.jsx)(O.a,{onKeyPress:j,value:a,onChange:function(e){return r(e.currentTarget.value)},fullWidth:!0,label:"Write message",margin:"normal",variant:"outlined",multiline:!0,minRows:1,maxRows:10}),Object(b.jsx)(m.a,{style:{fontFamily:"Mochiy Pop P One, sans-serif"},disabled:n!==u.a.READY,onClick:function(){a&&(l(Object(u.c)(a)),r(""))},onKeyPress:j,variant:"contained",color:"primary",children:"Send message"})]})},p=a(229),x=a(22),g=a(76),v=function(){var e=Object(o.d)((function(e){return e.chat.status})),t=Object(o.d)((function(e){return e.chat.messages})),a=Object(o.d)((function(e){return e.chat.error})),r=Object(o.d)((function(e){return e.auth.isAuth})),n=Object(c.useState)(!1),l=Object(s.a)(n,2),j=l[0],d=l[1],O=Object(c.useState)(!1),m=Object(s.a)(O,2),v=m[0],_=m[1],y=t.map((function(e){return Object(b.jsx)(h,{user:e},e.id)})),M=Object(c.useRef)(null),w=Object(o.c)(),N=Object(x.g)();Object(c.useEffect)((function(){return r?(w(Object(u.d)()),function(){w(Object(u.e)())}):N(g.a.HOME)}),[w]),Object(c.useEffect)((function(){var e=M.current;return v?j&&e&&e.scrollBy({top:e.scrollHeight,behavior:"smooth"}):e&&(e.scrollTop=e.scrollHeight),function(){_(!1)}}),[t]);return Object(b.jsxs)(b.Fragment,{children:[e===u.a.ERROR&&Object(b.jsx)(p.a,{messages:"Something went wrong, please reload the page!!!",severity:"error",open:a,anchorOrigin:{vertical:"top",horizontal:"center"}}),Object(b.jsxs)("div",{className:i.a.mainWrap,children:[Object(b.jsx)("div",{ref:M,onScroll:function(){var e=M.current;e&&(e.clientHeight>=Math.floor(e.scrollHeight-e.scrollTop)?(!j&&d(!0),_(!0)):j&&d(!1))},className:i.a.messageWrap,children:y}),Object(b.jsx)(f,{})]})]})};t.default=v}}]);
//# sourceMappingURL=5.82482754.chunk.js.map