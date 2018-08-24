//index.js
//获取应用实例
const app = getApp()
var api = require('../../utils/api.js')
Page({
  data:{
    dataList:[],
    onLoading:true
  },
  onLoad :function(opinion) {
    var that = this
    api.getHome().then(res=>{
      that.setData ({
        dataList : res.data
      })
    })
  },

  loadData: function() {

  }

})
