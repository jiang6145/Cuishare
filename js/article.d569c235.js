(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["article"],{"71db":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"article article--editor-read"},[n("b-container",[n("b-row",[n("b-col",{staticClass:"mx-auto",attrs:{cols:"12",lg:"10"}},[n("div",{attrs:{id:"editor-read"}}),n("div",{staticClass:"article--editor-read__interactive"},[t.article?n("ArticleInteractive",{attrs:{article:t.article,size:"lg",isShowComment:!0}}):t._e()],1),t.article?n("div",{staticClass:"article--editor-read__author"},[n("b-avatar",{staticClass:"article__avatar",attrs:{src:t.article.author.photoUrl,to:"/blog/"+t.article.author._id,size:"5rem"}}),n("div",{staticClass:"article__info"},[n("span",{staticClass:"article__author-name"},[t._v(t._s(t.article.author.username))]),n("p",{staticClass:"article__author-about"},[t._v(t._s(t.article.author.about))])]),n("FollowButton",{attrs:{author:t.article.author}})],1):t._e()])],1)],1),t.article?n("CommentSidebar",{attrs:{article:t.article}}):t._e()],1)},a=[],i=(n("96cf"),n("1da1")),o=n("057e"),s=n("c7f8"),c=n("e292"),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-sidebar",{ref:"commentSidebar",staticClass:"comment comment--sidebar",attrs:{id:"comment-sidebar","no-close-on-route-change":"",backdrop:"",right:"",shadow:"","no-header":""},on:{change:t.onChange},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.hide;e.show;return[n("div",{staticClass:"comment__header"},[n("b-button-close",{staticClass:"btn btn--close",on:{click:r}}),n("h4",{staticClass:"comment__title"},[t._v("留言")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.commentText,expression:"commentText"},{name:"dynamic-height",rawName:"v-dynamic-height",value:{minHeight:"42px"},expression:"{ minHeight: '42px' }"}],ref:"textarea",staticClass:"comment__input-textarea",attrs:{placeholder:"分享你的想法吧"},domProps:{value:t.commentText},on:{focus:t.onFocus,blur:t.onBlur,input:function(e){e.target.composing||(t.commentText=e.target.value)}}}),t.isShowButton?n("div",{staticClass:"comment__button-group"},[n("b-button",{staticClass:"mr-2 custom-btn",attrs:{variant:"outline-secondary",size:"sm"},on:{click:t.onCancel}},[t._v("取消")]),n("b-button",{staticClass:"custom-btn",attrs:{disabled:t.isDisabled,variant:"outline-warning",size:"sm"},on:{click:t.onSubmit}},[t._v("留言")])],1):t._e()],1),t._l(t.comments,(function(e){return n("div",{key:e._id,staticClass:"comment__item"},[n("b-avatar",{staticClass:"comment__user-avatar",attrs:{to:"/blog/"+e.byUser._id,src:e.byUser.photoUrl,size:"md"}}),n("div",{staticClass:"comment__info"},[n("span",{staticClass:"comment__username"},[t._v(t._s(e.byUser.username))]),n("span",{staticClass:"comment__create-at"},[t._v(t._s(e.createDate))]),t.isArticleAuthor||t.isCommentAuthor(e)||t.user.isAdmin?n("b-dropdown",{attrs:{text:"Left align",variant:"link","no-caret":"",right:""},scopedSlots:t._u([{key:"button-content",fn:function(){return[n("font-awesome-icon",{staticClass:"icon",attrs:{icon:["fas","ellipsis-v"],"fixed-width":""}})]},proxy:!0}],null,!0)},[n("b-dropdown-item",{staticClass:"dropdown--danger",on:{click:function(n){return t.deleteComment(e)}}},[t._v("刪除留言")])],1):t._e()],1),n("p",{staticClass:"comment__content"},[t._v(t._s(e.text))])],1)}))]}}])})},l=[],d=(n("c740"),n("d81d"),n("a434"),n("498a"),n("7a17")),m=n.n(d),h=n("6608"),f={name:"CommentSidebar",directives:{DynamicHeight:m.a},props:{article:Object},data:function(){return{commentText:"",comments:[],isDisabled:!0,isShowButton:!1}},watch:{commentText:function(){this.commentText.trim()?this.isDisabled=!1:this.isDisabled=!0}},computed:{user:function(){return this.$store.state.user},isArticleAuthor:function(){return this.article.author._id===this.user.id}},methods:{isCommentAuthor:function(t){return t.byUser._id===this.user.id},onFocus:function(t){t.target.style["min-height"]="84px",this.isShowButton=!0},onBlur:function(){this.commentText.trim()||this.resetTextarea()},onCancel:function(){this.resetTextarea()},onSubmit:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,r,a,i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.commentText.trim()){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,n={text:t.commentText},e.next=6,t.axios.post("https://cuishare.herokuapp.com/comments/"+t.article._id,n);case 6:r=e.sent,a=r.data,i=a.success,o=a.result,i&&(o.createDate=Object(h["a"])(o.createDate),t.comments.unshift(o),t.resetTextarea()),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](2),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[2,11]])})))()},onChange:function(){this.user.id&&!this.user.isBlocked||(this.$refs.commentSidebar.hide(),this.user.id||this.$bvModal.show("user-modal"),this.user.isBlocked&&this.$toasted.error("你已被封鎖不能留言"))},resetTextarea:function(){this.commentText="",this.isShowButton=!1,this.$refs.textarea.style["min-height"]="42px",this.$refs.textarea.style.height="42px"},deleteComment:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,a,i,o,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.axios.delete("https://cuishare.herokuapp.com/comments/"+t._id);case 3:r=n.sent,a=r.data,i=a.success,o=a.result,i&&(s=e.comments.findIndex((function(t){return t._id===o._id})),e.comments.splice(s,1)),n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](0),console.log(n.t0);case 11:case"end":return n.stop()}}),n,null,[[0,8]])})))()}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,r,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.axios.get("https://cuishare.herokuapp.com/comments/"+t.article._id);case 3:n=e.sent,r=n.data,a=r.success,i=r.result,a&&(t.comments=i.map((function(t){return t.createDate=Object(h["a"])(t.createDate),t}))),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}},p=f,v=n("2877"),b=Object(v["a"])(p,u,l,!1,null,null,null),_=b.exports,g={name:"ArticleRead",components:{ArticleInteractive:s["a"],FollowButton:c["a"],CommentSidebar:_},data:function(){return{article:null}},methods:{initEditor:function(){var t=this;o["a"].create(document.querySelector("#editor-read"),{toolbar:[]}).then((function(e){e.isReadOnly=!0;var n=t.article.text,r=e.data.processor.toView(n),a=e.data.toModel(r);e.model.insertContent(a)})).catch((function(t){console.log(t)}))}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,r,a,i,o,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.$loading.show(),e.prev=1,r=t.$route.params.id,e.next=5,t.axios.get("https://cuishare.herokuapp.com/articles/"+r);case 5:a=e.sent,i=a.data,o=i.success,s=i.result,s.isBlocked&&(t.$router.go(-1),t.$toasted.error("此文章已被封鎖，不可閱讀")),o&&(t.article=s,t.initEditor()),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),console.log(e.t0);case 14:n.hide();case 15:case"end":return e.stop()}}),e,null,[[1,11]])})))()}},w=g,x=Object(v["a"])(w,r,a,!1,null,null,null);e["default"]=x.exports},"7a17":function(t,e,n){!function(e,n){t.exports=n()}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";function r(t){t.target.style.height=0,t.target.style.height="".concat(t.target.scrollHeight,"px")}e.a={bind:function(t,e){var n;(null===(n=e.value)||void 0===n?void 0:n.disabled)||(function(t){t.style.overflow="hidden"}(t),function(t,e){e.value&&e.value.minHeight&&(t.style["min-height"]=e.value.minHeight)}(t,e),function(t){setTimeout((function(){r({target:t})}))}(t),t.addEventListener("input",r))},unbind:function(t,e){var n;(null===(n=e.value)||void 0===n?void 0:n.disabled)||t.removeEventListener("input",r)}}},function(t,e,n){"use strict";n.r(e),function(t){n.d(e,"installVueDynamicHeight",(function(){return a}));var r=n(0);function a(t){a.installed||(a.installed=!0,t.directive("DynamicHeight",r.a))}var i={installVueDynamicHeight:a},o=null;"undefined"!=typeof window?o=window.Vue:void 0!==t&&(o=t.Vue),o&&o.use(i),e.default=r.a}.call(this,n(2))},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n}])}))},e292:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.isMyself?t._e():n("b-button",{staticClass:"custom-btn custom-btn--follow",class:t.isFollow?"btn--following":"",attrs:{variant:"outline-warning",size:"sm"},on:{click:t.follow}},[t._v(t._s(t.isFollow?"追蹤中":"追蹤"))])],1)},a=[],i=(n("caad"),n("2532"),n("96cf"),n("1da1")),o={name:"FollowButton",props:{author:Object},computed:{user:function(){return this.$store.state.user},isFollow:function(){return this.user.following.includes(this.author._id)},isMyself:function(){return this.author._id===this.user.id}},methods:{follow:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,r,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.user.isBlocked){e.next=2;break}return e.abrupt("return",t.$toasted.error("你的帳號被封鎖，不能操作"));case 2:if(e.prev=2,t.user.id){e.next=5;break}return e.abrupt("return",t.$bvModal.show("user-modal"));case 5:return e.next=7,t.axios.patch("https://cuishare.herokuapp.com/users/follow/"+t.author._id);case 7:n=e.sent,r=n.data,a=r.success,i=r.result,a&&(t.$store.commit("following",i),t.$emit("onClick",i)),e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](2),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[2,12]])})))()}}},s=o,c=n("2877"),u=Object(c["a"])(s,r,a,!1,null,null,null);e["a"]=u.exports}}]);
//# sourceMappingURL=article.d569c235.js.map