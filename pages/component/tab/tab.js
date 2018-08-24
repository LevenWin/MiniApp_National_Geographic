// pages/component/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type : Array,
      value: []
    },
    selectedIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  ready: function() {
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapTab(e) {
      this.setData({
        selectedIndex:e.currentTarget.dataset.index
      })
      this.triggerEvent('tapTab', e.currentTarget.dataset);
    }
  }
})
