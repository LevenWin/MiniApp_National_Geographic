// pages/comment/comment.js
var api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleId:'',
    pageNum : 1,
    comments:[],
    commentText:'',
    ifNoMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '全部评论',
    })

    var that = this;
    api.getComment(options.id, this.data.pageNum).then(res => {
      that.setData({
        articleId: options.id,
        pageNum: that.data.pageNum+1,
        comments: Array.prototype.concat(that.data.comments, res.data.data.rows),
        ifNoMore: res.data.data.pagination.pageIndexRange.to - res.data.data.pagination.pageIndexRange.from < res.data.data.pagination.totalCount
      });

    }).catch({

    })
  },
  inputUpdate(e) {
    console.log(e);
    this.setData({
      commentText:e.detail.value
    })
  },
  sendComment(e) {
    api.postComment(this.data.comment, this.data.articleId).then(res => {
      wx.showToast({
        title: res.data.message,
        icon:'none'
      })
    }).catch(res => {
      console.log(res.data)
    })
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