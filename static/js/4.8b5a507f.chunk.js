(this.webpackJsonpsocial_network=this.webpackJsonpsocial_network||[]).push([[4],{501:function(e,s,t){e.exports={userMain:"user_userMain__1emVf",avatar:"user_avatar__3BuL9",userControl:"user_userControl__3YJwY",paperContent:"user_paperContent__3rEOW",userContent:"user_userContent__1yVsg",usersWrap:"user_usersWrap__3SYKU",userName:"user_userName__16pJT",userCountry:"user_userCountry__3XJ4d",selectedPage:"user_selectedPage___uBXF",defaultCount:"user_defaultCount__2kr9u",fetching:"user_fetching__3t0O3",countWrap:"user_countWrap__3GJ1M",usersMainWrap:"user_usersMainWrap__1TtDB",page:"user_page__1TsXC",userLocation:"user_userLocation__2b8mp",countPageValue:"user_countPageValue__3LfA9",pageNumber:"user_pageNumber__dIYko",userStatus:"user_userStatus__1NboM",paginator:"user_paginator__2sJs7"}},509:function(e,s,t){"use strict";t.r(s);var a=t(29),r=t(201),n=t(0),c=t(501),u=t.n(c),o=t(56),i=t(477),l=t(494),d=t.p+"static/media/defaultAvatar.153ee148.jpg",_=t(1),j=function(e){var s=Object(a.d)((function(e){return e.usersPage.isFetching})),t=Object(a.d)((function(e){return e.usersPage.users})),n=Object(a.d)((function(e){return e.usersPage.followingInProgress})),c=Object(a.c)(),j=s?"".concat(u.a.userMain," ").concat(u.a.fetching):u.a.userMain;return Object(_.jsx)("div",{className:j,children:t.map((function(e){var s,t,a;return Object(_.jsxs)("div",{className:u.a.usersWrap,children:[Object(_.jsxs)("div",{className:u.a.userControl,children:[Object(_.jsx)("span",{style:e.photos.small?{}:{border:"2px solid #7e7e7e"},className:u.a.avatar,children:Object(_.jsx)(o.c,{to:"/profile/".concat(e.id),children:Object(_.jsx)("img",{src:(a=e.photos.small,a||d),alt:"avatar"})})}),e.followed?Object(_.jsx)(i.a,{disabled:n.some((function(s){return s===e.id})),variant:"contained",color:"secondary",onClick:function(){return s=e.id,c(Object(r.c)(s));var s},children:"UnFollow"}):Object(_.jsx)(i.a,{disabled:n.some((function(s){return s===e.id})),variant:"contained",color:"primary",onClick:function(){return s=e.id,c(Object(r.a)(s));var s},children:"Follow"})]}),Object(_.jsx)("div",{className:u.a.userContent,children:Object(_.jsxs)(l.a,{className:u.a.paperContent,elevation:8,children:[Object(_.jsxs)("div",{className:u.a.userInfo,children:[Object(_.jsx)("span",{className:u.a.userName,children:e.name}),Object(_.jsxs)("p",{className:u.a.userStatus,children:[Object(_.jsx)("span",{children:"Status:"})," ",e.status||"No status specified"]})]}),Object(_.jsxs)("div",{className:u.a.userLocation,children:[Object(_.jsx)("span",{className:u.a.userCountry,children:(null===(s=e.location)||void 0===s?void 0:s.country)||"Country not specified"}),Object(_.jsx)("span",{className:u.a.userCity,children:(null===(t=e.location)||void 0===t?void 0:t.city)||"City not specified"})]})]})})]},e.id)}))})},p=t(106),b=t(507);s.default=function(){var e=Object(a.d)((function(e){return e.usersPage.currentPage})),s=Object(a.d)((function(e){return e.usersPage.pageSize})),t=Object(a.d)((function(e){return e.usersPage.totalUserCount})),c=Object(a.d)((function(e){return e.usersPage.isFetching})),o=Object(a.c)();Object(n.useEffect)((function(){o(Object(r.b)(e,s))}),[o,e,s]);return Object(_.jsxs)("div",{className:u.a.usersMainWrap,children:[c&&Object(_.jsx)(p.a,{}),Object(_.jsx)(b.a,{className:u.a.paginator,onChange:function(e,s){0===e&&(e=1),o(Object(r.b)(e,s))},defaultCurrent:1,defaultPageSize:s,total:t}),Object(_.jsx)(j,{})]})}}}]);
//# sourceMappingURL=4.8b5a507f.chunk.js.map