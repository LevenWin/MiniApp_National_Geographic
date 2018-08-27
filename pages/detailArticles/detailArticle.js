// pages/detailArticle.js
var api = require("../../utils/api.js")
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var articleId = options.id;
    this.setData({
      aid: articleId
    })
    var that = this;
    api.loadDetailArticle(articleId).then(res => {
      wx.setNavigationBarTitle({
        title: res.data.data.title,
      })
      var article = res.data.data.contentHtml;
      WxParse.wxParse('article', 'html', article, that, 5);
    }).catch(res => {

    });
  },
  shareArticle: function () {
    wx.showToast({
      title: '分享成功',
    })
  },
  favoriteArticle: function() {
    wx.showToast({
      title: '收藏成功',
    })
  },
  gotoComment(e) {
    wx.navigateTo({
      url: '../comment/comment?id='+this.data.aid,
    })
  },
  inputUpdate(e) {
    console.log(e.detail.value);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})