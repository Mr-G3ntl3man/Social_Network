(this.webpackJsonpsocial_network=this.webpackJsonpsocial_network||[]).push([[4],{497:function(e,s,t){e.exports={userMain:"user_userMain__1YJup",avatar:"user_avatar__14SSM",usersWrap:"user_usersWrap__2iJNF",userControl:"user_userControl__2ibJj",userContent:"user_userContent__3TBWG",userName:"user_userName__lV0Do",userCountry:"user_userCountry__3L1g-",selectedPage:"user_selectedPage__3Khzo",defaultCount:"user_defaultCount__2XEYf",fetching:"user_fetching__2B9d9",countWrap:"user_countWrap__3Oh9q",usersMainWrap:"user_usersMainWrap__1LDni",page:"user_page__-VJwd",userLocation:"user_userLocation__2KprE",countPageValue:"user_countPageValue__pDlb6",pageNumber:"user_pageNumber__2Xnai",userStatus:"user_userStatus__yJ8TK"}},505:function(e,s,t){"use strict";t.r(s);var a=t(29),n=t(198),r=t(0),c=t(497),u=t.n(c),i=t(66),o=t(473),l=t(490),d=t(1),j=function(e){var s=Object(a.d)((function(e){return e.usersPage.isFetching})),t=Object(a.d)((function(e){return e.usersPage.users})),r=Object(a.d)((function(e){return e.usersPage.followingInProgress})),c=Object(a.c)(),j=s?"".concat(u.a.userMain," ").concat(u.a.fetching):u.a.userMain;return Object(d.jsx)("div",{className:j,children:t.map((function(e){var s,t,a;return Object(d.jsxs)("div",{className:u.a.usersWrap,children:[Object(d.jsxs)("div",{className:u.a.userControl,children:[Object(d.jsx)("span",{className:u.a.avatar,children:Object(d.jsx)(i.c,{to:"/profile/".concat(e.id),children:Object(d.jsx)("img",{src:(a=e.photos.small,a||"https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"),alt:"avatar"})})}),e.followed?Object(d.jsx)(o.a,{disabled:r.some((function(s){return s===e.id})),variant:"contained",color:"secondary",onClick:function(){return s=e.id,void c(Object(n.c)(s));var s},children:"UnFollow"}):Object(d.jsx)(o.a,{disabled:r.some((function(s){return s===e.id})),variant:"contained",color:"primary",onClick:function(){return s=e.id,void c(Object(n.a)(s));var s},children:"Follow"})]}),Object(d.jsx)("div",{className:u.a.userContent,children:Object(d.jsxs)(l.a,{style:{width:"100%",padding:"20px",display:"flex",justifyContent:"space-between"},elevation:8,children:[Object(d.jsxs)("div",{className:u.a.userInfo,children:[Object(d.jsx)("span",{className:u.a.userName,children:e.name}),Object(d.jsx)("p",{className:u.a.userStatus,children:e.status||"No status specified"})]}),Object(d.jsxs)("div",{className:u.a.userLocation,children:[Object(d.jsx)("span",{className:u.a.userCountry,children:(null===(s=e.location)||void 0===s?void 0:s.country)||"Country not specified"}),Object(d.jsx)("span",{className:u.a.userCity,children:(null===(t=e.location)||void 0===t?void 0:t.city)||"City not specified"})]})]})})]},e.id)}))})},_=t(104),b=t(503);s.default=function(){var e=Object(a.d)((function(e){return e.usersPage.currentPage})),s=Object(a.d)((function(e){return e.usersPage.pageSize})),t=Object(a.d)((function(e){return e.usersPage.totalUserCount})),c=Object(a.d)((function(e){return e.usersPage.isFetching})),i=Object(a.c)();Object(r.useEffect)((function(){i(Object(n.b)(e,s))}),[i,e,s]);return Object(d.jsxs)("div",{className:u.a.usersMainWrap,children:[c&&Object(d.jsx)(_.a,{}),Object(d.jsx)(b.a,{onChange:function(e,s){0===e&&(e=1),i(Object(n.b)(e,s))},defaultCurrent:1,defaultPageSize:s,total:t}),Object(d.jsx)(j,{})]})}}}]);
//# sourceMappingURL=4.45ad0225.chunk.js.map