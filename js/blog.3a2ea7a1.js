(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["blog"],{e292:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.isMyself?t._e():r("b-button",{staticClass:"custom-btn custom-btn--follow",class:t.isFollow?"btn--following":"",attrs:{variant:"outline-warning",size:"sm"},on:{click:t.follow}},[t._v(t._s(t.isFollow?"追蹤中":"追蹤"))])],1)},s=[],o=(r("caad"),r("2532"),r("96cf"),r("1da1")),n={name:"FollowButton",props:{author:Object},computed:{user:function(){return this.$store.state.user},isFollow:function(){return this.user.following.includes(this.author._id)},isMyself:function(){return this.author._id===this.user.id}},methods:{follow:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.user.isBlocked){e.next=2;break}return e.abrupt("return",t.$toasted.error("你的帳號被封鎖，不能操作"));case 2:if(e.prev=2,t.user.id){e.next=5;break}return e.abrupt("return",t.$bvModal.show("user-modal"));case 5:return e.next=7,t.axios.patch("https://cuishare.herokuapp.com/users/follow/"+t.author._id);case 7:r=e.sent,a=r.data,s=a.success,o=a.result,s&&(t.$store.commit("following",o),t.$emit("onClick",o)),e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](2),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[2,12]])})))()}}},u=n,i=r("2877"),l=Object(i["a"])(u,a,s,!1,null,null,null);e["a"]=l.exports},fd3f:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"blog"},[r("b-container",[r("b-row",[t.blogArticles.length<=0?r("p",{staticClass:"no-articles-text"},[t._v("目前還沒有文章，趕快分享你的想法")]):t._e(),r("b-col",{attrs:{cols:"12",lg:"3"}},[t.blogArticles.length>0?r("b-card",{staticClass:"author-card",attrs:{"no-body":""}},[r("b-card-header",{staticClass:"author-card__header"},[r("b-avatar",{staticClass:"author-card__avatar",attrs:{src:t.author.photoUrl,size:"7rem",rounded:"sm"}})],1),r("b-card-body",{staticClass:"author-card__body"},[r("p",{staticClass:"author-card__username"},[t._v(t._s(t.author.username))]),r("p",{staticClass:"author-card__about"},[t._v(t._s(t.author.about))])]),r("b-card-footer",{staticClass:"author-card__footer"},[t.isBlogAuthor?t._e():r("FollowButton",{attrs:{author:t.author}})],1)],1):t._e()],1),r("b-col",{staticClass:"mr-auto",attrs:{cols:"12",lg:"7"}},t._l(t.blogArticles,(function(t){return r("div",{key:t._id,staticClass:"article-item"},[r("VerticalArticleCard",{attrs:{article:t}})],1)})),0)],1)],1)],1)},s=[],o=(r("4de4"),r("caad"),r("d81d"),r("2532"),r("96cf"),r("1da1")),n=r("a4b6"),u=r("e292"),i=r("6608"),l={name:"Blog",components:{VerticalArticleCard:n["a"],FollowButton:u["a"]},data:function(){return{blogArticles:[],author:{}}},computed:{user:function(){return this.$store.state.user},isFollow:function(){return this.user.following.includes(this.author._id)},isBlogAuthor:function(){return this.user.id===this.author._id}},methods:{filterPublished:function(t){return t.filter((function(t){var e=t.isPublished,r=t.isDraft,a=t.isBlocked,s=t.isUnlisted;return e&&!r&&!a&&!s})).map((function(t){return t.publishedDate=Object(i["a"])(t.publishedDate),t}))}},mounted:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,a,s,o,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.$loading.show(),e.prev=1,e.next=4,t.axios.get("https://cuishare.herokuapp.com/articles/author/"+t.$route.params.id);case 4:a=e.sent,s=a.data,o=s.success,n=s.result,n.length>0&&o&&(n[0].author.isBlocked&&(t.$router.go(-1),t.$toasted.error("此作者已被封鎖，不可訪問")),t.blogArticles=t.filterPublished(n),t.author=n[0].author),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](1),console.log(e.t0);case 12:r.hide();case 13:case"end":return e.stop()}}),e,null,[[1,9]])})))()}},c=l,d=r("2877"),h=Object(d["a"])(c,a,s,!1,null,null,null);e["default"]=h.exports}}]);
//# sourceMappingURL=blog.3a2ea7a1.js.map