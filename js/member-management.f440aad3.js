(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["member-management"],{"2ca0":function(e,t,r){"use strict";var s=r("23e7"),a=r("06cf").f,n=r("50c4"),i=r("5a34"),c=r("1d80"),l=r("ab13"),o=r("c430"),u="".startsWith,m=Math.min,d=l("startsWith"),h=!o&&!d&&!!function(){var e=a(String.prototype,"startsWith");return e&&!e.writable}();s({target:"String",proto:!0,forced:!h&&!d},{startsWith:function(e){var t=String(c(this));i(e);var r=n(m(arguments.length>1?arguments[1]:void 0,t.length)),s=String(e);return u?u.call(t,s,r):t.slice(r,r+s.length)===s}})},"954f":function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"member-management"},[r("h3",{staticClass:"d-inline-block mb-4 mr-3"},[e._v("會員管理")]),r("span",{staticClass:"tag no-hover"},[e._v(e._s("會員人數："+e.members.length))]),r("b-form",{staticClass:"mb-4"},[r("b-form-input",{attrs:{type:"text",placeholder:"搜尋用戶暱稱或輸入會員狀態來查詢 ..."},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}})],1),r("div",{staticClass:"member-management__main"},[r("b-table",{attrs:{fields:e.fields,items:e.filterMembers,responsive:"",striped:"",hover:""},scopedSlots:e._u([{key:"cell(photoUrl)",fn:function(e){return[r("b-avatar",{attrs:{src:e.item.photoUrl,to:"/blog/"+e.item._id,size:"3rem"}})]}},{key:"cell(isBlocked)",fn:function(t){return[r("b-button",{staticClass:"custom-btn custom-btn--blockade",class:t.item.isBlocked?"btn--blocked":"",attrs:{variant:"outline-success",size:"sm"},on:{click:function(r){return e.blockade(t)}}},[e._v(e._s(t.item.isBlocked?"封鎖中":"正常"))])]}}])})],1)],1)},a=[],n=(r("4de4"),r("c975"),r("d81d"),r("2ca0"),r("96cf"),r("1da1")),i=r("6608"),c={name:"MemberManagement",data:function(){return{searchValue:"",fields:[{key:"photoUrl",label:""},{key:"username",label:"用戶暱稱",sortable:!0},{key:"email",label:"帳號",sortable:!0},{key:"createDate",label:"註冊日期",sortable:!0},{key:"followers",label:"粉絲人數",sortable:!0},{key:"isBlocked",label:"會員狀態"}],members:[]}},computed:{filterMembers:function(){var e=this;return this.searchValue.startsWith("正常")?this.members.filter((function(e){return!e.isBlocked})):this.searchValue.startsWith("封鎖")?this.members.filter((function(e){return e.isBlocked})):this.members.filter((function(t){return t.username.indexOf(e.searchValue)>=0}))}},methods:{blockade:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var s,a,n,i,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,s={isBlocked:!e.item.isBlocked},r.next=4,t.axios.patch("https://cuishare.herokuapp.com/users/blockade/"+e.item._id,s);case 4:a=r.sent,n=a.data,i=n.success,c=n.result,i&&(e.item.isBlocked=c.isBlocked),r.next=12;break;case 9:r.prev=9,r.t0=r["catch"](0),console.log(r.t0);case 12:case"end":return r.stop()}}),r,null,[[0,9]])})))()}},mounted:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r,s,a,n,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.$loading.show(),t.prev=1,t.next=4,e.axios.get("https://cuishare.herokuapp.com/users");case 4:s=t.sent,a=s.data,n=a.success,c=a.result,n&&(e.members=c.map((function(e){return e.createDate=Object(i["b"])(e.createDate),e.followers=e.followers.length,e}))),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](1),console.log(t.t0);case 12:r.hide();case 13:case"end":return t.stop()}}),t,null,[[1,9]])})))()}},l=c,o=r("2877"),u=Object(o["a"])(l,s,a,!1,null,null,null);t["default"]=u.exports},c975:function(e,t,r){"use strict";var s=r("23e7"),a=r("4d64").indexOf,n=r("a640"),i=r("ae40"),c=[].indexOf,l=!!c&&1/[1].indexOf(1,-0)<0,o=n("indexOf"),u=i("indexOf",{ACCESSORS:!0,1:0});s({target:"Array",proto:!0,forced:l||!o||!u},{indexOf:function(e){return l?c.apply(this,arguments)||0:a(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=member-management.f440aad3.js.map