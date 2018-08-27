// pages/home/component/articleCell/article-list.js
var api = require("../../../../utils/api.js")
var utils = require("../../../../utils/util.js")

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemObj:{
      type:Object,
      observer: function (newVal, oldVal, changedPath) {
        var pic = newVal.discatArticles ? false : true
        this.setData({
          banners:newVal.banners,
          articles: !pic ? newVal.discatArticles.rows : newVal.discatAtlas.rows,
          isPic: pic
        })
      }
    },  
  },

  /**
   * 组件的初始数据
   */
  data: {
    bannerConfig: {
      autoplay: true,
      duration: 500,
      interval: 2000,
    },
    isPic:false,
    pageNumber: 2,
    banners: [],
    articles:[],
    bannerIndex: 0,
    isLoading:false,
    loadMoreString:'正在加载...'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bannerChange: function (e) {
      this.setData({
        bannerIndex: e.detail.current
      })
    },
    tapAction(e){
      this.triggerEvent('clickItem',e.currentTarget.dataset)
    },
    loadMore: function(){
      console.log(this);
      if (this.data.isLoading) return;
      this.setData({
        isLoading: true
      })
      api.loadHomeMore(this.properties.itemObj.id, this.data.pageNumber).then(res => {
        console.log(res);
        var totalCount = this.data.isPic ? res.data.data.discatAtlas.pagination.totalCount : res.data.data.discatArticles.pagination.totalCount;
        this.setData({
          pageNumber: this.data.pageNumber+1,
          isLoading: false,
          articles: this.data.isPic ? (Array.prototype.concat(this.data.articles, res.data.data.discatAtlas.rows)) : (Array.prototype.concat(this.data.articles, res.data.data.discatArticles.rows)),
          loadMoreString: totalCount > this.data.pageNumber ? "正在加载..." : "我是有底线的"
          
        })
      }).catch(res => {
        console.log(res);
      });
    },
    refreshData:((e) => {
      console.log(e);
    })
  }
})
