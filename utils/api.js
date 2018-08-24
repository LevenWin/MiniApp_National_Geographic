var Promise = require("../plugins/es6-promise.js")
var config = require("config.js")
var util = require("util.js")
function fetchApi(url, params) {
  params["SESSION"]="ae4e1f54-c2c7-417b-b689-76d18888cffa";
  return new Promise((resolve, reject)=>{
    wx.request({
      url: `${url}`,
      method:"POST",
      data: JSON.stringify(params),
      header:{
        "Content-Type": "application/json"
      },
      success:resolve,
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



module.exports={
  getHome: function() {
    return fetchApi(config.home, {})
      .then(res => res.data)
  },
  loadHomeMore: loadMore
}

