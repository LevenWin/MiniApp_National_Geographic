var Promise = require("../plugins/es6-promise.js")
var config = require("config.js")
var util = require("util.js")
function fetchApi(url, params) {
  params["SESSION"]="404e5c1c-601c-4eb6-9354-56cffedf2a39";
  console.log(url, params);
  return new Promise((resolve, reject)=>{
    wx.request({
      url: `${url}`,
      method:"POST",
      data: JSON.stringify(params),
      header:{
        "Content-Type": "application/json",
        "User-Agent":"NationalGeographic/2.0.6 (com.ngmchina.ipad; build:216; iOS 11.4.1) Alamofire/4.7.2",
      },
      success:(res => {
        console.log(res)
        resolve(res)
      }),
      fail:reject
    })
  })
}

function loadMore(discatId, pageNumber) {
  var url = 'http://wap.ngchina.cn/article/articleDiscat/get/do?discatId=' + discatId;
  var params = {
      "pagination":{
        "pageSize": 10,
        "pageNumber": pageNumber
      }
  };
  return fetchApi(url, params);
}

function loadDetailArticle(articleId) {
  var url = 'http://wap.ngchina.cn/article/get/do';
  var params = {
    'id':articleId
  }
  return fetchApi(url, params);
}
function postComment(comment, articleId) {
  var url = 'http://wap.ngchina.cn/member/comment/save/do';
  var params = {
    'content':comment,
    'articleId':articleId
  }
  return fetchApi(url, params);
}
function getComment(articleId, pageNum) {
  var url = 'http://wap.ngchina.cn/article/memberComment/list/get';
  var params = {
    "pagination": {
      "pageSize": 40,
      "pageNumber": pageNum
    },
    "filterItems": {
      "articleId": articleId
    }
  }
   return fetchApi(url, params);
}



module.exports={
  getHome: function() {
    return fetchApi(config.home, {})
      .then(res => res.data)
  },
  loadHomeMore: loadMore,
  loadDetailArticle: loadDetailArticle,
  postComment: postComment,
  getComment: getComment
}

