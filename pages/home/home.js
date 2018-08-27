// pages/home/home.js
var api = require("../../utils/api.js")

Page({
  data: {
    tabList:['推荐','摄影','视频','活动'],
    dataList: [],
    onLoading: true,
    mainIndex:0,
    winHeight:0,
    currentIndex:0,

  },

  onLoad: function (opinion) {
    var that = this;
    api.getHome().then(res => {
      console.log(res.data)
      that.setData({
        dataList: res.data
      })
    });
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight:res.windowHeight
        })
      },
    }) ;
    wx.setNavigationBarTitle({
      title: '首页'
    })
  },

  tapTab:function(e) {
    this.setData({
      currentIndex: e.detail.index
    })
  },
  bindchange:function(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  clickItem :function(e) {
    wx.navigateTo({
      url: '../detailArticles/detailArticle?id=' + e.detail.id
    })

    console.log(e.detail.id);
  },

  bannerTap: function(e) {
   
  },

  swiperChange: function(e) {
    this.setData({
      mainIndex:e.detail.current
    })
  },
  tabTap:function(e) {
    this.setData({
      mainIndex: e.currentTarget.id*1
    })
  }
  
})